
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
  isFavorite?: boolean;
  dateAdded: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  count: number;
}
