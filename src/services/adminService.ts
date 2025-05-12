
import { AddWallpaperData } from '@/types/admin';
import { supabase } from '@/integrations/supabase/client';

const addWallpaper = async (wallpaperData: AddWallpaperData): Promise<void> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error getting session:', sessionError);
      throw new Error('Could not retrieve session');
    }

    const session = sessionData?.session;

    if (!session) {
      console.error('No session found.');
      throw new Error('No session found');
    }

    // Get the user profile directly using the user ID from the session
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, is_admin')
      .eq('id', session.user.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      throw new Error('Could not retrieve user profile');
    }

    if (!profileData) {
      console.error('No profile found for the user.');
      throw new Error('No profile found for the user');
    }

    // Prepare wallpaper data with correct field names
    const wallpaperInsertData = {
      title: wallpaperData.title,
      image_url: wallpaperData.image_url,
      thumbnail_url: wallpaperData.thumbnail_url || wallpaperData.image_url,
      width: wallpaperData.width || 1920,
      height: wallpaperData.height || 1080,
      category_id: wallpaperData.category,
      tags: wallpaperData.tags || [],
      compatible_devices: wallpaperData.compatible_devices || [],
      content_rating: wallpaperData.content_rating || 'everyone'
    };

    const { error } = await supabase
      .from('wallpapers')
      .insert(wallpaperInsertData);

    if (error) {
      console.error('Error inserting wallpaper:', error);
      throw new Error('Could not insert wallpaper');
    }

    // Fixed RPC call typing
    const { error: rpcError } = await supabase.rpc(
      'increment_category_count',
      { category_id: wallpaperData.category }
    );
    
    if (rpcError) {
      console.error('Error incrementing category count:', rpcError);
    }

  } catch (error) {
    console.error('Error in addWallpaper:', error);
    throw error;
  }
};

export const adminService = {
  addWallpaper,
};
