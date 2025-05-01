
import { Wallpaper, Category } from '../types/wallpaper';

// Sample data for the app
const wallpapers: Wallpaper[] = [
  {
    id: '1',
    title: 'Mountain Fog',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=500&q=60',
    category: 'nature',
    tags: ['mountains', 'fog', 'landscape'],
    dimensions: { width: 7372, height: 4392 },
    dateAdded: '2025-04-28'
  },
  {
    id: '2',
    title: 'Ocean Wave',
    imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=500&q=60',
    category: 'nature',
    tags: ['ocean', 'wave', 'water'],
    dimensions: { width: 3945, height: 5909 },
    dateAdded: '2025-04-27'
  },
  {
    id: '3',
    title: 'Forest Mountains',
    imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=500&q=60',
    category: 'landscape',
    tags: ['trees', 'mountains', 'forest'],
    dimensions: { width: 5616, height: 3744 },
    dateAdded: '2025-04-26'
  },
  {
    id: '4',
    title: 'Lakeside View',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=60',
    category: 'landscape',
    tags: ['lake', 'trees', 'water'],
    dimensions: { width: 7360, height: 4912 },
    dateAdded: '2025-04-25'
  },
  {
    id: '5',
    title: 'Green Mountains',
    imageUrl: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=500&q=60',
    category: 'nature',
    tags: ['green', 'mountains', 'rocks'],
    dimensions: { width: 3456, height: 5184 },
    dateAdded: '2025-04-24'
  },
  {
    id: '6',
    title: 'Modern Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=500&q=60',
    category: 'architecture',
    tags: ['building', 'modern', 'design'],
    dimensions: { width: 3857, height: 2571 },
    dateAdded: '2025-04-23'
  },
  {
    id: '7',
    title: 'Desert Sunset',
    imageUrl: 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?auto=format&fit=crop&w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?auto=format&fit=crop&w=500&q=60',
    category: 'nature',
    tags: ['desert', 'sunset', 'landscape'],
    dimensions: { width: 4016, height: 6016 },
    dateAdded: '2025-04-22'
  },
  {
    id: '8',
    title: 'Abstract Art',
    imageUrl: 'https://images.unsplash.com/photo-1568244938214-fb59e1bb73fc?auto=format&fit=crop&w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1568244938214-fb59e1bb73fc?auto=format&fit=crop&w=500&q=60',
    category: 'abstract',
    tags: ['art', 'colors', 'abstract'],
    dimensions: { width: 4480, height: 6720 },
    dateAdded: '2025-04-21'
  },
  {
    id: '9',
    title: 'Night City',
    imageUrl: 'https://images.unsplash.com/photo-1519608425089-7f3bfa6f6bb8?auto=format&fit=crop&w=1080&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519608425089-7f3bfa6f6bb8?auto=format&fit=crop&w=500&q=60',
    category: 'city',
    tags: ['city', 'night', 'lights'],
    dimensions: { width: 4256, height: 2832 },
    dateAdded: '2025-04-20'
  }
];

const categories: Category[] = [
  { id: 'nature', name: 'Nature', imageUrl: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=500&q=60', count: 4 },
  { id: 'landscape', name: 'Landscapes', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=60', count: 2 },
  { id: 'architecture', name: 'Architecture', imageUrl: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=500&q=60', count: 1 },
  { id: 'abstract', name: 'Abstract', imageUrl: 'https://images.unsplash.com/photo-1568244938214-fb59e1bb73fc?auto=format&fit=crop&w=500&q=60', count: 1 },
  { id: 'city', name: 'City', imageUrl: 'https://images.unsplash.com/photo-1519608425089-7f3bfa6f6bb8?auto=format&fit=crop&w=500&q=60', count: 1 }
];

// Simulate fetching data with a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const wallpaperService = {
  getWallpapers: async (): Promise<Wallpaper[]> => {
    await delay(500);
    return [...wallpapers];
  },
  
  getWallpaperById: async (id: string): Promise<Wallpaper | undefined> => {
    await delay(300);
    return wallpapers.find(wallpaper => wallpaper.id === id);
  },
  
  getWallpapersByCategory: async (categoryId: string): Promise<Wallpaper[]> => {
    await delay(500);
    return wallpapers.filter(wallpaper => wallpaper.category === categoryId);
  },
  
  searchWallpapers: async (searchTerm: string): Promise<Wallpaper[]> => {
    await delay(500);
    const term = searchTerm.toLowerCase();
    return wallpapers.filter(wallpaper => 
      wallpaper.title.toLowerCase().includes(term) || 
      wallpaper.tags.some(tag => tag.toLowerCase().includes(term))
    );
  },
  
  getCategories: async (): Promise<Category[]> => {
    await delay(300);
    return [...categories];
  },
  
  // Methods for managing favorites (using localStorage)
  getFavorites: async (): Promise<Wallpaper[]> => {
    try {
      const favIds = JSON.parse(localStorage.getItem('favorites') || '[]') as string[];
      await delay(300);
      return wallpapers.filter(w => favIds.includes(w.id)).map(w => ({...w, isFavorite: true}));
    } catch (error) {
      console.error("Error getting favorites:", error);
      return [];
    }
  },
  
  toggleFavorite: async (wallpaperId: string): Promise<boolean> => {
    try {
      const favIds = JSON.parse(localStorage.getItem('favorites') || '[]') as string[];
      let isFavorite = false;
      
      if (favIds.includes(wallpaperId)) {
        // Remove from favorites
        const newFavs = favIds.filter(id => id !== wallpaperId);
        localStorage.setItem('favorites', JSON.stringify(newFavs));
        isFavorite = false;
      } else {
        // Add to favorites
        favIds.push(wallpaperId);
        localStorage.setItem('favorites', JSON.stringify(favIds));
        isFavorite = true;
      }
      
      await delay(100);
      return isFavorite;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      return false;
    }
  },
  
  isFavorite: (wallpaperId: string): boolean => {
    try {
      const favIds = JSON.parse(localStorage.getItem('favorites') || '[]') as string[];
      return favIds.includes(wallpaperId);
    } catch {
      return false;
    }
  }
};
