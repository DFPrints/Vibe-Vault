
import { supabase } from '@/integrations/supabase/client';
import { Wallpaper } from '../types/wallpaper';
import { mapWallpaper } from './mappers';

// Define type for search parameters
type SearchWallpapersByTagParams = {
  search_tag: string;
};

export const wallpaperFetchService = {
  // Add missing methods referenced in wallpaperService
  getWallpapers: async (): Promise<Wallpaper[]> => {
    try {
      const { data, error } = await supabase
        .from('wallpapers')
        .select('*')
        .order('date_added', { ascending: false });
      
      if (error) {
        console.error("Error fetching wallpapers:", error);
        return [];
      }
      
      return data.map(mapWallpaper);
    } catch (error) {
      console.error("Error in getWallpapers:", error);
      return [];
    }
  },
  
  getWallpaperById: async (id: string): Promise<Wallpaper | null> => {
    try {
      const { data, error } = await supabase
        .from('wallpapers')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error("Error fetching wallpaper:", error);
        return null;
      }
      
      return mapWallpaper(data);
    } catch (error) {
      console.error("Error in getWallpaperById:", error);
      return null;
    }
  },
  
  getWallpapersByCategory: async (categoryId: string): Promise<Wallpaper[]> => {
    try {
      const { data, error } = await supabase
        .from('wallpapers')
        .select('*')
        .eq('category_id', categoryId);
      
      if (error) {
        console.error("Error fetching wallpapers by category:", error);
        return [];
      }
      
      return data.map(mapWallpaper);
    } catch (error) {
      console.error("Error in getWallpapersByCategory:", error);
      return [];
    }
  },
  
  searchWallpapers: async (query: string): Promise<Wallpaper[]> => {
    try {
      const { data, error } = await supabase
        .from('wallpapers')
        .select('*')
        .ilike('title', `%${query}%`);
      
      if (error) {
        console.error("Error searching wallpapers:", error);
        return [];
      }
      
      return data.map(mapWallpaper);
    } catch (error) {
      console.error("Error in searchWallpapers:", error);
      return [];
    }
  },
  
  searchWallpapersByTag: async (tag: string): Promise<Wallpaper[]> => {
    try {
      // Fix type issues with the RPC call by using Record<string, any>[] as the return type
      // This is a more general type that can be mapped to Wallpaper[]
      const { data, error } = await supabase.rpc<Record<string, any>[], SearchWallpapersByTagParams>(
        'search_wallpapers_by_tag',
        { search_tag: tag }
      );
      
      if (error) {
        console.error("Error searching wallpapers by tag:", error);
        return [];
      }
      
      // Check that data exists and is an array before mapping
      if (!data || !Array.isArray(data)) {
        console.error("Unexpected data format returned from search_wallpapers_by_tag:", data);
        return [];
      }
      
      return data.map(mapWallpaper);
    } catch (error) {
      console.error("Error searching wallpapers:", error);
      return [];
    }
  }
};
