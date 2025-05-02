
import { supabase } from '@/integrations/supabase/client';
import { Wallpaper, Category } from '../types/wallpaper';

// Map database wallpaper to app format
const mapWallpaper = (dbWallpaper: any): Wallpaper => ({
  id: dbWallpaper.id,
  title: dbWallpaper.title,
  imageUrl: dbWallpaper.image_url,
  thumbnailUrl: dbWallpaper.thumbnail_url,
  category: dbWallpaper.category_id,
  tags: dbWallpaper.tags || [],
  dimensions: {
    width: dbWallpaper.width,
    height: dbWallpaper.height
  },
  compatible_devices: dbWallpaper.compatible_devices || [],
  similar_wallpapers: dbWallpaper.similar_wallpapers || [],
  dateAdded: dbWallpaper.date_added
});

// Map database category to app format
const mapCategory = (dbCategory: any): Category => ({
  id: dbCategory.id,
  name: dbCategory.name,
  imageUrl: dbCategory.image_url,
  count: dbCategory.count
});

export const wallpaperService = {
  getWallpapers: async (): Promise<Wallpaper[]> => {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*')
      .order('date_added', { ascending: false });
    
    if (error) {
      console.error("Error fetching wallpapers:", error);
      return [];
    }
    
    return data.map(mapWallpaper);
  },
  
  getWallpaperById: async (id: string): Promise<Wallpaper | undefined> => {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      console.error("Error fetching wallpaper:", error);
      return undefined;
    }
    
    return mapWallpaper(data);
  },
  
  getWallpapersByCategory: async (categoryId: string): Promise<Wallpaper[]> => {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*')
      .eq('category_id', categoryId);
    
    if (error) {
      console.error("Error fetching wallpapers by category:", error);
      return [];
    }
    
    return data.map(mapWallpaper);
  },
  
  searchWallpapers: async (searchTerm: string): Promise<Wallpaper[]> => {
    const term = searchTerm.toLowerCase();
    
    // Search by title
    const { data: titleResults, error: titleError } = await supabase
      .from('wallpapers')
      .select('*')
      .ilike('title', `%${term}%`);
    
    if (titleError) {
      console.error("Error searching wallpapers by title:", titleError);
      return [];
    }
    
    // Search by tags (requires array contains in Postgres)
    // Fix for line 90: Use the proper type for search_term parameter
    const { data: tagResults, error: tagError } = await supabase.rpc(
      'search_wallpapers_by_tag',
      { search_term: term }
    );
    
    if (tagError) {
      console.error("Error searching wallpapers by tag:", tagError);
      return titleResults.map(mapWallpaper); // Fall back to title results if tag search fails
    }
    
    // Combine results and remove duplicates
    const combinedResults = [...titleResults, ...(tagResults || [])];
    const uniqueIds = new Set();
    const uniqueResults = combinedResults.filter(item => {
      if (uniqueIds.has(item.id)) return false;
      uniqueIds.add(item.id);
      return true;
    });
    
    return uniqueResults.map(mapWallpaper);
  },
  
  getCategories: async (): Promise<Category[]> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
    
    return data.map(mapCategory);
  },
  
  // Methods for managing favorites (using Supabase)
  getFavorites: async (): Promise<Wallpaper[]> => {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session?.user) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        wallpaper_id,
        wallpapers:wallpapers(*)
      `)
      .eq('user_id', session.session.user.id);
    
    if (error) {
      console.error("Error getting favorites:", error);
      return [];
    }
    
    return data.map(item => ({
      ...mapWallpaper(item.wallpapers),
      isFavorite: true
    }));
  },
  
  toggleFavorite: async (wallpaperId: string): Promise<boolean> => {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session?.user) {
      throw new Error('You must be logged in to manage favorites');
    }
    
    const userId = session.session.user.id;
    
    // Check if it's already a favorite
    const { data: existingFav } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('wallpaper_id', wallpaperId)
      .single();
    
    try {
      if (existingFav) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('id', existingFav.id);
        
        if (error) throw error;
        return false;
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: userId, wallpaper_id: wallpaperId });
        
        if (error) throw error;
        return true;
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  },
  
  isFavorite: (wallpaperId: string): boolean => {
    // This is just a client-side helper function, not an async method
    // It should return a boolean value, not a promise
    const favoritesString = localStorage.getItem('favorites');
    if (!favoritesString) return false;
    
    try {
      const favorites = JSON.parse(favoritesString);
      return Array.isArray(favorites) && favorites.includes(wallpaperId);
    } catch (e) {
      return false;
    }
  },

  // Admin methods for wallpaper management
  uploadWallpaper: async (
    file: File,
    wallpaperData: {
      title: string;
      category: string;
      tags: string[];
      compatibleDevices: string[];
    }
  ): Promise<Wallpaper | null> => {
    try {
      // 1. Upload the image to storage
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '-')}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('wallpapers')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      // 2. Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('wallpapers')
        .getPublicUrl(fileName);
      
      const imageUrl = publicUrlData.publicUrl;
      
      // 3. Create thumbnail version (using the same URL with different parameters)
      const thumbnailUrl = imageUrl.replace('?', '?width=500&quality=60&');
      
      // 4. Get image dimensions
      const img = new Image();
      img.src = imageUrl;
      await new Promise(resolve => {
        img.onload = resolve;
      });
      
      // 5. Insert the wallpaper into the database
      // Fix for line 263: Use the proper type for compatible_devices
      const { data: wallpaperRecord, error: insertError } = await supabase
        .from('wallpapers')
        .insert({
          title: wallpaperData.title,
          image_url: imageUrl,
          thumbnail_url: thumbnailUrl,
          category_id: wallpaperData.category,
          tags: wallpaperData.tags,
          compatible_devices: wallpaperData.compatibleDevices || [],
          width: img.width,
          height: img.height
        })
        .select()
        .single();
      
      if (insertError) throw insertError;
      
      // 6. Update the category count
      await supabase.rpc('increment_category_count', { 
        category_id: wallpaperData.category 
      });
      
      return mapWallpaper(wallpaperRecord);
    } catch (error) {
      console.error("Error uploading wallpaper:", error);
      return null;
    }
  }
};
