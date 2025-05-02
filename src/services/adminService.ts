
import { supabase } from '@/integrations/supabase/client';
import { Wallpaper } from '../types/wallpaper';
import { mapWallpaper } from './mappers';

// Define proper type for the RPC function parameters
type IncrementCategoryCountParams = {
  category_id: string;
};

export const adminService = {
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
      await supabase.rpc(
        'increment_category_count', 
        { category_id: wallpaperData.category } as IncrementCategoryCountParams
      );
      
      return mapWallpaper(wallpaperRecord);
    } catch (error) {
      console.error("Error uploading wallpaper:", error);
      return null;
    }
  }
};
