
import { wallpaperFetch } from './wallpaperFetchService';
import { categoryService } from './categoryService';
import { favoriteService } from './favoriteService';
import { adminService } from './adminService';

// Combine all services into a single wallpaperService export
export const wallpaperService = {
  // Wallpaper fetching operations
  getWallpapers: () => wallpaperFetch.getWallpapers(),
  getWallpaperById: (id: string) => wallpaperFetch.getWallpaperById(id),
  getWallpapersByCategory: (categoryId: string) => wallpaperFetch.getWallpapersByCategory(categoryId),
  searchWallpapers: (query: string) => wallpaperFetch.searchWallpapers(query),
  searchWallpapersByTag: (tag: string) => wallpaperFetch.searchWallpapersByTag(tag),
  
  // Category operations
  getCategories: categoryService.getCategories,
  
  // Favorite operations
  getFavorites: favoriteService.getFavorites,
  toggleFavorite: favoriteService.toggleFavorite,
  isFavorite: favoriteService.isFavorite,
  
  // Admin operations
  addWallpaper: adminService.addWallpaper,
  
  // Device specific operations
  getWallpapersForDeviceType: (deviceType: string) => {
    // This is a mock implementation; in a real app this would filter properly
    return wallpaperFetch.getWallpapers().then(wallpapers => 
      wallpapers.filter(w => !w.compatible_devices || w.compatible_devices.includes(deviceType as any))
    );
  },
  
  // Premium content operations 
  getPremiumWallpapers: () => {
    return wallpaperFetch.getWallpapers().then(wallpapers => 
      wallpapers.filter(w => w.premium)
    );
  }
};
