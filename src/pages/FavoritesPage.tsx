
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { wallpaperService } from '@/services/wallpaperService';
import WallpaperCard from '@/components/WallpaperCard';
import { Skeleton } from '@/components/ui/skeleton';
import { HeartIcon } from 'lucide-react';

const FavoritesPage = () => {
  const { data: favorites, isPending } = useQuery({
    queryKey: ['favorites'],
    queryFn: wallpaperService.getFavorites
  });
  
  return (
    <div className="pb-20 pt-4 px-4">
      <h1 className="text-2xl font-bold mb-6">Favorites</h1>
      
      {isPending ? (
        <div className="masonry-grid">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className={`${index % 3 === 0 ? 'h-80' : 'h-52'} rounded-xl`} />
          ))}
        </div>
      ) : (
        <>
          {favorites && favorites.length > 0 ? (
            <div className="masonry-grid">
              {favorites.map((wallpaper, index) => (
                <WallpaperCard 
                  key={wallpaper.id} 
                  wallpaper={wallpaper}
                  isTall={index % 3 === 0}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <HeartIcon size={32} className="text-muted-foreground" />
              </div>
              <p className="text-xl font-medium mb-2">No favorites yet</p>
              <p className="text-muted-foreground">
                Tap the heart icon on any wallpaper to add it to your favorites
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
