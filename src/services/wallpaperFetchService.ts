
import { Wallpaper, Category } from '@/types/wallpaper';
import { supabase } from '@/integrations/supabase/client';
import { favoriteService } from './favoriteService';

// Helper function to convert database wallpapers to our frontend Wallpaper type
const mapWallpaperFromDB = (dbWallpaper: any): Wallpaper => {
  return {
    id: dbWallpaper.id,
    title: dbWallpaper.title,
    imageUrl: dbWallpaper.image_url,
    thumbnailUrl: dbWallpaper.thumbnail_url,
    dimensions: {
      width: dbWallpaper.width,
      height: dbWallpaper.height
    },
    category: dbWallpaper.category_id,
    tags: dbWallpaper.tags || [],
    isFavorite: dbWallpaper.is_favorite || favoriteService.isFavorite(dbWallpaper.id),
    dateAdded: dbWallpaper.date_added,
    views: dbWallpaper.views,
    featured: Boolean(dbWallpaper.featured),
    compatible_devices: dbWallpaper.compatible_devices || [],
    content_rating: dbWallpaper.content_rating || 'everyone',
    description: dbWallpaper.description,
    color_palette: dbWallpaper.color_palette,
    author: dbWallpaper.author,
    download_count: dbWallpaper.download_count,
    premium: Boolean(dbWallpaper.premium),
    wallpaper_type: dbWallpaper.wallpaper_type || 'static'
  };
};

// Get all wallpapers with optional filtering and sorting
const getWallpapers = async (): Promise<Wallpaper[]> => {
  try {
    // First, get all wallpapers
    const { data: wallpapersData, error: wallpapersError } = await supabase
      .from('wallpapers')
      .select('*')
      .order('date_added', { ascending: false });
    
    if (wallpapersError) {
      console.error('Error fetching wallpapers:', wallpapersError);
      return [];
    }
    
    // Check for favorites and map to our frontend type
    const wallpapers = (wallpapersData || []).map(mapWallpaperFromDB);
    return wallpapers;
  } catch (error) {
    console.error('Error in getWallpapers:', error);
    return [];
  }
};

// Get a single wallpaper by ID
const getWallpaperById = async (id: string): Promise<Wallpaper | null> => {
  try {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      console.error('Error fetching wallpaper by ID:', error);
      return null;
    }
    
    return mapWallpaperFromDB(data);
  } catch (error) {
    console.error('Error in getWallpaperById:', error);
    return null;
  }
};

// Get wallpapers by category
const getWallpapersByCategory = async (categoryId: string): Promise<Wallpaper[]> => {
  try {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*')
      .eq('category_id', categoryId);
    
    if (error) {
      console.error('Error fetching wallpapers by category:', error);
      return [];
    }
    
    return (data || []).map(mapWallpaperFromDB);
  } catch (error) {
    console.error('Error in getWallpapersByCategory:', error);
    return [];
  }
};

// Search wallpapers by query string (searches title and tags)
const searchWallpapers = async (query: string): Promise<Wallpaper[]> => {
  if (!query) {
    return [];
  }
  
  try {
    // Search by title (case insensitive)
    const { data: titleResults, error: titleError } = await supabase
      .from('wallpapers')
      .select('*')
      .ilike('title', `%${query}%`);
    
    if (titleError) {
      console.error('Error searching wallpapers by title:', titleError);
      return [];
    }
    
    // We could also search by tags in a more advanced implementation
    // For now, let's just return the title matches
    // Note: In the future, implement more advanced search by calling an edge function
    
    // Return deduplicated results
    const uniqueResults = Array.from(
      new Map(titleResults.map(item => [item.id, item])).values()
    );
    
    return uniqueResults.map(mapWallpaperFromDB);
  } catch (error) {
    console.error('Error in searchWallpapers:', error);
    return [];
  }
};

// Search wallpapers by tag
const searchWallpapersByTag = async (tag: string): Promise<Wallpaper[]> => {
  try {
    // Note: This is a simplistic implementation. In a production app,
    // you would use a better tag search mechanism or database functions.
    const { data, error } = await supabase.rpc('search_wallpapers_by_tag', {
      search_tag: tag
    });
    
    if (error) {
      console.error('Error searching wallpapers by tag:', error);
      return [];
    }
    
    return (data || []).map(mapWallpaperFromDB);
  } catch (error) {
    console.error('Error in searchWallpapersByTag:', error);
    return [];
  }
};

// Export the service
export const wallpaperFetch = {
  getWallpapers,
  getWallpaperById,
  getWallpapersByCategory,
  searchWallpapers,
  searchWallpapersByTag,
};
