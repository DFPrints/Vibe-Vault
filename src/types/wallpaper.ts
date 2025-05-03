
export interface Wallpaper {
  id: string;
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  dimensions: {
    width: number;
    height: number;
  };
  compatible_devices?: string[];
  similar_wallpapers?: string[];
  isFavorite?: boolean;
  dateAdded: string;
  views?: number;
  featured?: boolean;
  date_added?: string; // For backwards compatibility with API responses
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  count: number;
}

export interface Profile {
  id: string;
  username: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}
