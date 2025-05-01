import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Wallpaper } from '../types/wallpaper';
import { toast } from '../components/ui/use-toast';

interface WallpaperContextType {
  downloadWallpaper: (wallpaper: Wallpaper) => void;
  applyWallpaper: (wallpaper: Wallpaper) => void;
  shareWallpaper: (wallpaper: Wallpaper) => void;
  setActiveWallpaper: (wallpaper: Wallpaper) => void;
  toggleFavorite: (wallpaperId: string) => void;
  isFavorite: (wallpaperId: string) => boolean;
}

const WallpaperContext = createContext<WallpaperContextType | undefined>(undefined);

export const WallpaperProvider = ({ children }: { children: ReactNode }) => {
  const [activeWallpaper, setActiveWallpaper] = useState<Wallpaper | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const downloadWallpaper = (wallpaper: Wallpaper) => {
    // In a real app, we'd implement actual download functionality
    // For now, just show a toast message
    toast({
      title: "Download started",
      description: `Downloading ${wallpaper.title}...`,
      duration: 3000,
    });
    console.log('Downloading wallpaper:', wallpaper);
  };

  const applyWallpaper = (wallpaper: Wallpaper) => {
    // In a real app, this would use Capacitor to set the device wallpaper
    toast({
      title: "Wallpaper applied",
      description: `${wallpaper.title} has been set as your wallpaper.`,
      duration: 3000,
    });
    console.log('Applying wallpaper:', wallpaper);
  };

  const shareWallpaper = (wallpaper: Wallpaper) => {
    // In a real app, this would use the native share functionality
    toast({
      title: "Share",
      description: `Sharing ${wallpaper.title}...`,
      duration: 3000,
    });
    console.log('Sharing wallpaper:', wallpaper);
  };

  const handleSetActiveWallpaper = (wallpaper: Wallpaper) => {
    setActiveWallpaper(wallpaper);
  };

  const toggleFavorite = (wallpaperId: string) => {
    setFavorites(current => 
      current.includes(wallpaperId)
        ? current.filter(id => id !== wallpaperId)
        : [...current, wallpaperId]
    );
  };

  const isFavorite = (wallpaperId: string): boolean => {
    return favorites.includes(wallpaperId);
  };

  const value = {
    downloadWallpaper,
    applyWallpaper,
    shareWallpaper,
    setActiveWallpaper: handleSetActiveWallpaper,
    toggleFavorite,
    isFavorite
  };

  return (
    <WallpaperContext.Provider value={value}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = () => {
  const context = useContext(WallpaperContext);
  if (context === undefined) {
    throw new Error('useWallpaper must be used within a WallpaperProvider');
  }
  return context;
};
