
import { wallpaperFetchService } from './wallpaperFetchService';
import { categoryService } from './categoryService';
import { favoriteService } from './favoriteService';
import { adminService } from './adminService';

// Combine all services into a single wallpaperService export
export const wallpaperService = {
  // Wallpaper fetching operations
  getWallpapers: wallpaperFetchService.getWallpapers,
  getWallpaperById: wallpaperFetchService.getWallpaperById,
  getWallpapersByCategory: wallpaperFetchService.getWallpapersByCategory,
  searchWallpapers: wallpaperFetchService.searchWallpapers,
  searchWallpapersByTag: wallpaperFetchService.searchWallpapersByTag,
  
  // Category operations
  getCategories: categoryService.getCategories,
  
  // Favorite operations
  getFavorites: favoriteService.getFavorites,
  toggleFavorite: favoriteService.toggleFavorite,
  isFavorite: favoriteService.isFavorite,
  
  // Admin operations
  addWallpaper: adminService.addWallpaper
};
