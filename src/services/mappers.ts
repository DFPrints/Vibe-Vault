
import { Wallpaper, Category } from '../types/wallpaper';

// Map database wallpaper to app format
export const mapWallpaper = (dbWallpaper: any): Wallpaper => ({
  id: dbWallpaper.id,
  title: dbWallpaper.title,
  imageUrl: dbWallpaper.image_url || '',
  thumbnailUrl: dbWallpaper.thumbnail_url || '',
  category: dbWallpaper.category_id,
  tags: dbWallpaper.tags || [],
  dimensions: {
    width: dbWallpaper.width || 0,
    height: dbWallpaper.height || 0
  },
  compatible_devices: dbWallpaper.compatible_devices || [],
  similar_wallpapers: dbWallpaper.similar_wallpapers || [],
  dateAdded: dbWallpaper.date_added || new Date().toISOString(),
  views: dbWallpaper.views || 0,
  featured: dbWallpaper.featured || false,
  date_added: dbWallpaper.date_added || new Date().toISOString() // For backwards compatibility
});

// Map database category to app format
export const mapCategory = (dbCategory: any): Category => ({
  id: dbCategory.id,
  name: dbCategory.name,
  imageUrl: dbCategory.image_url || '',
  count: dbCategory.count || 0
});
