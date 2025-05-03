
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { wallpaperService } from '@/services/wallpaperService';
import { toast } from 'sonner';
import { ArrowLeft, Share2, Download, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useWallpaper } from '@/context/WallpaperContext';
import ImageBanner from '@/components/ImageBanner';

const WallpaperDetailPage = () => {
  const { wallpaperId } = useParams<{ wallpaperId: string }>();
  const navigate = useNavigate();
  const { setActiveWallpaper, toggleFavorite, isFavorite } = useWallpaper();
  
  const { data: wallpaper, isLoading } = useQuery({
    queryKey: ['wallpaper', wallpaperId],
    queryFn: () => wallpaperService.getWallpaperById(wallpaperId || ''),
    enabled: !!wallpaperId
  });
  
  useEffect(() => {
    if (wallpaper) {
      setActiveWallpaper(wallpaper);
    }
  }, [wallpaper, setActiveWallpaper]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-black">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (!wallpaper) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <p>Wallpaper not found</p>
        <Button variant="ghost" onClick={() => navigate('/')}>
          Return home
        </Button>
      </div>
    );
  }

  // Determine if a wallpaper should have a banner
  const showBanner = () => {
    if (wallpaper.date_added && isNew(wallpaper.date_added)) {
      return 'new';
    }
    if (wallpaper.views && wallpaper.views > 100) {
      return 'popular';
    }
    if (wallpaper.featured) {
      return 'featured';
    }
    return null;
  };
  
  // Check if wallpaper was added within the last 7 days
  const isNew = (dateString: string) => {
    const wallpaperDate = new Date(dateString);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return wallpaperDate > sevenDaysAgo;
  };
  
  const bannerType = showBanner();

  const handleDownload = () => {
    // In a real app, this would handle download functionality
    // For now, we'll just show a toast
    toast.success('Wallpaper saved to your device');
  };

  const handleShare = () => {
    // In a real app, this would open share functionality
    // For now, we'll just show a toast
    toast.success('Share options opened');
  };

  const handleToggleFavorite = () => {
    toggleFavorite(wallpaper.id);
    toast.success(isFavorite(wallpaper.id) ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="absolute top-0 left-0 w-full z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
        <Button
          variant="ghost"
          className="text-white rounded-full bg-black/30 hover:bg-black/50"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </Button>
      </div>
      
      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        {bannerType && <ImageBanner type={bannerType} className="m-4 rounded-sm" />}
        
        <img
          src={wallpaper.imageUrl}
          alt={wallpaper.title}
          className="object-contain w-full h-full"
        />
      </div>
      
      <div className="p-4 pt-2 bg-gradient-to-t from-black/80 to-transparent text-white">
        <h1 className="text-xl font-bold mb-1">{wallpaper.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {wallpaper.tags.map(tag => (
            <div key={tag} className="text-xs px-2 py-1 bg-white/20 rounded-full">
              #{tag}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-white/70">
            {wallpaper.dimensions.width} × {wallpaper.dimensions.height}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={handleShare}
            >
              <Share2 size={20} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={handleToggleFavorite}
            >
              <Heart 
                size={20} 
                className={isFavorite(wallpaper.id) ? "fill-red-500 text-red-500" : ""} 
              />
            </Button>
            <Button
              className="rounded-full"
              onClick={handleDownload}
            >
              <Download size={20} className="mr-2" />
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperDetailPage;
