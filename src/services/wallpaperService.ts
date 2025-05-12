
import { wallpaperFetchService } from './wallpaperFetchService';
import { categoryService } from './categoryService';
import { favoriteService } from './favoriteService';
import { adminService } from './adminService';

// Combine all services into a single wallpaperService export
export const wallpaperService = {
  // Wallpaper fetching operations
  getWallpapers: () => wallpaperFetchService.getWallpapers(),
  getWallpaperById: (id: string) => wallpaperFetchService.getWallpaperById(id),
  getWallpapersByCategory: (categoryId: string) => wallpaperFetchService.getWallpapersByCategory(categoryId),
  searchWallpapers: (query: string) => wallpaperFetchService.searchWallpapers(query),
  searchWallpapersByTag: (tag: string) => wallpaperFetchService.searchWallpapersByTag(tag),
  
  // Category operations
  getCategories: categoryService.getCategories,
  
  // Favorite operations
  getFavorites: favoriteService.getFavorites,
  toggleFavorite: favoriteService.toggleFavorite,
  isFavorite: favoriteService.isFavorite,
  
  // Admin operations
  addWallpaper: adminService.addWallpaper
};
