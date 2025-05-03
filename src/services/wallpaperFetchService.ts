import { supabase } from '@/integrations/supabase/client';
import { Wallpaper } from '../types/wallpaper';
import { mapWallpaper } from './mappers';

// Define type for search parameters
type SearchWallpapersByTagParams = {
  search_tag: string;
};

export const wallpaperFetchService = {
  // other service methods would be here
  
  searchWallpapersByTag: async (tag: string): Promise<Wallpaper[]> => {
    try {
      const { data: tagResults, error } = await supabase.rpc<any[], SearchWallpapersByTagParams>(
        'search_wallpapers_by_tag',
        { search_tag: tag }
      );
      
      if (error) {
        console.error("Error searching wallpapers by tag:", error);
        return [];
      }
      
      if (!tagResults || !Array.isArray(tagResults)) {
        return [];
      }
      
      return tagResults.map(mapWallpaper);
    } catch (error) {
      console.error("Error searching wallpapers:", error);
      return [];
    }
  }
  
  // other service methods would be here
};
