
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { wallpaperService } from '@/services/wallpaperService';
import { useWallpaper } from '@/context/WallpaperContext';
import { ArrowLeftIcon, DownloadIcon, HeartIcon, ShareIcon, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const WallpaperDetailPage = () => {
  const { wallpaperId } = useParams<{ wallpaperId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { downloadWallpaper, applyWallpaper, shareWallpaper } = useWallpaper();
  
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFav, setIsFav] = useState(false);
  
  // Fetch wallpaper data
  const { data: wallpaper, isPending } = useQuery({
    queryKey: ['wallpaper', wallpaperId],
    queryFn: () => wallpaperService.getWallpaperById(wallpaperId!),
    enabled: !!wallpaperId,
    onSettled: (data) => {
      if (data) {
        setIsFav(data.isFavorite || wallpaperService.isFavorite(data.id));
      }
    }
  });
  
  // Handle favorite toggle
  const toggleFavorite = async () => {
    if (wallpaper) {
      const result = await wallpaperService.toggleFavorite(wallpaper.id);
      setIsFav(result);
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['wallpapers'] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header/Navigation */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 -ml-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40"
          >
            <ArrowLeftIcon size={20} />
          </button>
          
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40"
          >
            <HeartIcon 
              size={20} 
              className={cn(
                isFav ? "fill-red-500 text-red-500" : "text-white hover:text-red-500"
              )}
            />
          </button>
        </div>
      </div>
      
      {/* Image Display */}
      <div className="flex-1 flex items-center justify-center bg-black relative">
        {isPending || !wallpaper ? (
          <Skeleton className="w-full h-full absolute inset-0" />
        ) : (
          <>
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse-subtle">
                  <ImageIcon size={48} className="text-gray-700" />
                </div>
              </div>
            )}
            <img 
              src={wallpaper.imageUrl} 
              alt={wallpaper.title}
              className={cn(
                "max-h-full max-w-full object-contain transition-opacity duration-300",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsImageLoaded(true)}
            />
          </>
        )}
      </div>
      
      {/* Bottom Action Bar */}
      <div className="bg-gradient-to-t from-black/90 via-black/70 to-transparent py-4 px-6 pb-safe">
        {wallpaper && (
          <div className="mb-4">
            <h1 className="text-xl text-white font-medium">{wallpaper.title}</h1>
            <p className="text-white/70 text-sm">
              {`${wallpaper.dimensions.width} × ${wallpaper.dimensions.height}`}
            </p>
          </div>
        )}
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 border-white/20 bg-white/10 hover:bg-white/20 text-white"
            onClick={() => wallpaper && shareWallpaper(wallpaper)}
          >
            <ShareIcon size={18} className="mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1 border-white/20 bg-white/10 hover:bg-white/20 text-white"
            onClick={() => wallpaper && downloadWallpaper(wallpaper)}
          >
            <DownloadIcon size={18} className="mr-2" />
            Download
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-wallpaper-purple hover:bg-wallpaper-purple-dark text-white"
            onClick={() => wallpaper && applyWallpaper(wallpaper)}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WallpaperDetailPage;
