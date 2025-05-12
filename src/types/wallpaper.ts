
export interface Dimensions {
  width: number;
  height: number;
}

export type DeviceType = 'smartphone' | 'tablet' | 'desktop' | 'tv';
export type ContentRating = 'everyone' | 'mature' | 'nsfw';

export interface Wallpaper {
  id: string;
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  dimensions: Dimensions;
  category: string;
  tags: string[];
  isFavorite?: boolean;
  dateAdded?: string;
  views?: number;
  featured?: boolean;
  compatible_devices?: DeviceType[];
  content_rating?: ContentRating;
  description?: string;
  color_palette?: string[];
  author?: string;
  download_count?: number;
  premium?: boolean;
  wallpaper_type?: 'static' | 'live' | 'dynamic';
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  count?: number;
}
