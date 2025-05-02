
import { supabase } from '@/integrations/supabase/client';
import { Wallpaper } from '../types/wallpaper';
import { mapWallpaper } from './mappers';

// Define type for search parameters
type SearchWallpapersByTagParams = {
  search_term: string;
};

export const wallpaperFetchService = {
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
    const { data: tagResults, error: tagError } = await supabase.rpc<any[]>(
      'search_wallpapers_by_tag' as any,
      { search_term: term } as SearchWallpapersByTagParams
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
  }
};
