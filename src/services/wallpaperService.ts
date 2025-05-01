
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
  { id: 'city', name: 'City', imageUrl: 'https://images.unsplash.com/photo-1519608425089-7f3bfa6f6bb8?auto=format&fit=crop&w=500&q=60', count: 1 },
  { id: 'minimalist', name: 'Minimalist', imageUrl: 'https://images.unsplash.com/photo-1516541328844-f17153bb1f85?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'space', name: 'Space', imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'animals', name: 'Animals', imageUrl: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'floral', name: 'Floral', imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'cars', name: 'Cars', imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'travel', name: 'Travel', imageUrl: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'food', name: 'Food', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'vintage', name: 'Vintage', imageUrl: 'https://images.unsplash.com/photo-1518473223332-335a9eff9eb8?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'dark', name: 'Dark', imageUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'neon', name: 'Neon', imageUrl: 'https://images.unsplash.com/photo-1520603825683-1e33f2c51c83?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'patterns', name: 'Patterns', imageUrl: 'https://images.unsplash.com/photo-1485627941502-d2e6429a8af0?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'geometric', name: 'Geometric', imageUrl: 'https://images.unsplash.com/photo-1507208773393-40d9fc670acf?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'sports', name: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'technology', name: 'Technology', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'fantasy', name: 'Fantasy', imageUrl: 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'cyberpunk', name: 'Cyberpunk', imageUrl: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'beach', name: 'Beach', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'snow', name: 'Snow', imageUrl: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'underwater', name: 'Underwater', imageUrl: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'texture', name: 'Texture', imageUrl: 'https://images.unsplash.com/photo-1459478309853-2c33a60058e7?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'anime', name: 'Anime', imageUrl: 'https://images.unsplash.com/photo-1560704426-93e67daa5a92?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'gaming', name: 'Gaming', imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'quotes', name: 'Quotes', imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'holidays', name: 'Holidays', imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'nature-dark', name: 'Dark Nature', imageUrl: 'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?auto=format&fit=crop&w=500&q=60', count: 0 },
  { id: 'retro', name: 'Retro', imageUrl: 'https://images.unsplash.com/photo-1513366884929-f0b3bedffd36?auto=format&fit=crop&w=500&q=60', count: 0 }
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
