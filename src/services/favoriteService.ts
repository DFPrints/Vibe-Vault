
import { supabase } from '@/integrations/supabase/client';
import { Wallpaper } from '../types/wallpaper';
import { mapWallpaper } from './mappers';

export const favoriteService = {
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
  }
};
