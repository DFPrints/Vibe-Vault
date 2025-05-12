
export interface AddWallpaperData {
  title: string;
  image_url: string;
  thumbnail_url?: string;
  width?: number;
  height?: number;
  category: string;
  tags?: string[];
  compatible_devices?: string[];
}
