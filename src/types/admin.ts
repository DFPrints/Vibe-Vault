
import { ContentRating, DeviceType } from './wallpaper';

export interface AddWallpaperData {
  title: string;
  image_url: string;
  thumbnail_url?: string;
  width?: number;
  height?: number;
  category: string;
  tags?: string[];
  compatible_devices?: DeviceType[];
  content_rating?: ContentRating;
  description?: string;
  premium?: boolean;
  wallpaper_type?: 'static' | 'live' | 'dynamic';
}
