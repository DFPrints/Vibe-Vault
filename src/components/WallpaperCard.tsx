
import React from 'react';
import { Link } from 'react-router-dom';
import { Wallpaper } from '../types/wallpaper';
import { HeartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { wallpaperService } from '@/services/wallpaperService';
import { useQueryClient } from '@tanstack/react-query';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  isTall?: boolean;
}

const WallpaperCard = ({ wallpaper, isTall = false }: WallpaperCardProps) => {
  const queryClient = useQueryClient();
  const [isFav, setIsFav] = React.useState<boolean>(wallpaper.isFavorite || wallpaperService.isFavorite(wallpaper.id));
  
  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = await wallpaperService.toggleFavorite(wallpaper.id);
    setIsFav(result);
    
    // Invalidate relevant queries to refresh data
    queryClient.invalidateQueries({ queryKey: ['wallpapers'] });
    queryClient.invalidateQueries({ queryKey: ['favorites'] });
  };
  
  return (
    <div 
      className={cn(
        "relative group overflow-hidden rounded-xl bg-muted",
        isTall ? "masonry-item-tall" : ""
      )}
    >
      <Link to={`/wallpaper/${wallpaper.id}`} className="block w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
        
        <img 
          src={wallpaper.thumbnailUrl} 
          alt={wallpaper.title}
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <h3 className="text-sm font-medium truncate">{wallpaper.title}</h3>
        </div>
        
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 z-20 p-2 rounded-full bg-black/20 backdrop-blur-sm transform transition-all duration-200 ease-out"
        >
          <HeartIcon 
            size={18} 
            className={cn(
              "transition-colors", 
              isFav ? "fill-red-500 text-red-500" : "text-white hover:text-red-500"
            )} 
          />
        </button>
      </Link>
    </div>
  );
};

export default WallpaperCard;
