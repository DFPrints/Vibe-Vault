
import { SupabaseClient } from '@supabase/supabase-js';
import { Wallpaper } from '../types/wallpaper';
import { supabase as defaultSupabase } from '@/integrations/supabase/client';

// Function to map API wallpaper object to app wallpaper object
const mapApiWallpaperToApp = (apiWallpaper: any): Wallpaper => ({
  id: apiWallpaper.id,
  title: apiWallpaper.title,
  imageUrl: apiWallpaper.image_url,
  thumbnailUrl: apiWallpaper.thumbnail_url,
  dateAdded: apiWallpaper.date_added,
  views: apiWallpaper.views,
  featured: apiWallpaper.featured,
  isFavorite: apiWallpaper.is_favorite,
  category: apiWallpaper.category,
  tags: apiWallpaper.tags,
  dimensions: {
    width: apiWallpaper.width,
    height: apiWallpaper.height,
  },
  compatible_devices: apiWallpaper.compatible_devices,
});

// Updated function signature to make supabase parameter optional with default value
const getWallpapers = async (supabaseClient = defaultSupabase): Promise<Wallpaper[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('wallpapers')
      .select('*');

    if (error) {
      console.error('Error fetching wallpapers:', error);
      return [];
    }

    return data ? data.map(mapApiWallpaperToApp) : [];
  } catch (error) {
    console.error('Exception in getWallpapers:', error);
    return [];
  }
};

const getWallpaperById = async (id: string, supabaseClient = defaultSupabase): Promise<Wallpaper | null> => {
  try {
    const { data, error } = await supabaseClient
      .from('wallpapers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching wallpaper by ID:', error);
      return null;
    }

    return mapApiWallpaperToApp(data);
  } catch (error) {
    console.error('Exception in getWallpaperById:', error);
    return null;
  }
};

const getWallpapersByCategory = async (categoryId: string, supabaseClient = defaultSupabase): Promise<Wallpaper[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('wallpapers')
      .select('*')
      .eq('category', categoryId);

    if (error) {
      console.error('Error fetching wallpapers by category:', error);
      return [];
    }

    return data ? data.map(mapApiWallpaperToApp) : [];
  } catch (error) {
    console.error('Exception in getWallpapersByCategory:', error);
    return [];
  }
};

const getFavoriteWallpapers = async (supabaseClient = defaultSupabase): Promise<Wallpaper[]> => {
    try {
      const { data, error } = await supabaseClient
        .from('wallpapers')
        .select('*')
        .eq('is_favorite', true);
  
      if (error) {
        console.error('Error fetching favorite wallpapers:', error);
        return [];
      }
  
      if (!data) {
        console.warn('No data received for favorite wallpapers.');
        return [];
      }
  
      return data.map(mapApiWallpaperToApp);
    } catch (error) {
      console.error('Exception in getFavoriteWallpapers:', error);
      return [];
    }
};

const toggleFavoriteWallpaper = async (id: string, supabaseClient = defaultSupabase): Promise<boolean> => {
  try {
    // First, get the current is_favorite status
    const { data: currentWallpaper, error: selectError } = await supabaseClient
      .from('wallpapers')
      .select('is_favorite')
      .eq('id', id)
      .single();

    if (selectError) {
      console.error('Error fetching current wallpaper status:', selectError);
      throw selectError; // Re-throw to be caught by the caller
    }

    if (!currentWallpaper) {
      console.error('Wallpaper not found for ID:', id);
      return false; // Or throw an error, depending on your error handling policy
    }

    const newFavoriteStatus = !currentWallpaper.is_favorite;

    // Then, update the is_favorite status
    const { error: updateError } = await supabaseClient
      .from('wallpapers')
      .update({ is_favorite: newFavoriteStatus })
      .eq('id', id);

    if (updateError) {
      console.error('Error updating wallpaper favorite status:', updateError);
       throw updateError; // Re-throw to be caught by the caller
    }

    return newFavoriteStatus;
  } catch (error) {
    console.error('Error in toggleFavoriteWallpaper:', error);
    throw error; // Re-throw to be caught by the caller
  }
};

const isFavorite = (id: string): boolean => {
    try {
        const favorites = localStorage.getItem('favorites');
        if (!favorites) return false;
        const favoriteIds: string[] = JSON.parse(favorites);
        return favoriteIds.includes(id);
    } catch (error) {
        console.error("Error reading localStorage:", error);
        return false;
    }
};

const searchWallpapers = async (query: string, supabaseClient = defaultSupabase): Promise<Wallpaper[]> => {
  try {
    const { data, error } = await supabaseClient
      .from('wallpapers')
      .select('*')
      .ilike('title', `%${query}%`);

    if (error) {
      console.error('Error searching wallpapers:', error);
      return [];
    }

    return data ? data.map(mapApiWallpaperToApp) : [];
  } catch (error) {
    console.error('Exception in searchWallpapers:', error);
    return [];
  }
};

const searchWallpapersByTag = async (tag: string, supabaseClient = defaultSupabase): Promise<Wallpaper[]> => {
  try {
    const { data, error } = await supabaseClient.rpc('search_wallpapers_by_tag', { search_tag: tag });

    if (error) {
      console.error('Error searching wallpapers by tag:', error);
      return [];
    }

    if (!data || !Array.isArray(data)) {
      console.error('Invalid data returned from search_wallpapers_by_tag RPC');
      return [];
    }

    return data.map(mapApiWallpaperToApp);
  } catch (error) {
    console.error('Exception in searchWallpapersByTag:', error);
    return [];
  }
};

export const wallpaperFetchService = {
  getWallpapers,
  getWallpaperById,
  getWallpapersByCategory,
  getFavoriteWallpapers,
  toggleFavorite: toggleFavoriteWallpaper,
  isFavorite,
  searchWallpapers,
  searchWallpapersByTag
};
