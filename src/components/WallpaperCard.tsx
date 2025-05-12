
import React from 'react';
import { Link } from 'react-router-dom';
import { Wallpaper, DeviceType } from '../types/wallpaper';
import { HeartIcon, Smartphone, Tablet, Monitor, Tv, Sparkles, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { wallpaperService } from '@/services/wallpaperService';
import { useQueryClient } from '@tanstack/react-query';
import ImageBanner from './ImageBanner';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import ContentRatingBadge from './ContentRatingBadge';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  isTall?: boolean;
}

const DeviceIcon = ({ device }: { device: DeviceType }) => {
  switch (device) {
    case 'smartphone':
      return <Smartphone className="h-3 w-3" />;
    case 'tablet':
      return <Tablet className="h-3 w-3" />;
    case 'desktop':
      return <Monitor className="h-3 w-3" />;
    case 'tv':
      return <Tv className="h-3 w-3" />;
    default:
      return null;
  }
};

const WallpaperCard = ({ wallpaper, isTall = false }: WallpaperCardProps) => {
  const queryClient = useQueryClient();
  const [isFav, setIsFav] = React.useState<boolean>(wallpaper.isFavorite || wallpaperService.isFavorite(wallpaper.id));
  
  // Determine if a wallpaper should have a banner
  const showBanner = () => {
    if (wallpaper.dateAdded && isNew(wallpaper.dateAdded)) {
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
  
  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const result = await wallpaperService.toggleFavorite(wallpaper.id);
      setIsFav(result); // Now correctly using a boolean value
      
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['wallpapers'] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  
  // Format resolution string
  const resolution = `${wallpaper.dimensions.width}x${wallpaper.dimensions.height}`;
  
  return (
    <div 
      className={cn(
        "relative group overflow-hidden rounded-xl bg-muted",
        isTall ? "masonry-item-tall" : ""
      )}
    >
      <Link to={`/wallpaper/${wallpaper.id}`} className="block w-full h-full">
        {/* Banner indicator if applicable */}
        {bannerType && <ImageBanner type={bannerType} />}
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
        
        <img 
          src={wallpaper.thumbnailUrl} 
          alt={wallpaper.title}
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Top Left - Resolution */}
        <div className="absolute top-2 left-2 z-20">
          <Badge variant="secondary" className="bg-black/60 hover:bg-black/70 text-white border-none">
            {resolution}
          </Badge>
        </div>
        
        {/* Top Right - Device & Content Badges */}
        <div className="absolute top-2 right-2 z-20 flex flex-col gap-1 items-end">
          {/* Device compatibility */}
          {wallpaper.compatible_devices && wallpaper.compatible_devices.length > 0 && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Badge variant="secondary" className="flex gap-1 bg-black/60 hover:bg-black/70 text-white border-none">
                  {wallpaper.compatible_devices.slice(0, 2).map((device) => (
                    <DeviceIcon key={device} device={device} />
                  ))}
                  {wallpaper.compatible_devices.length > 2 && '+'}
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto p-2">
                <div className="flex gap-2">
                  {wallpaper.compatible_devices.map((device) => (
                    <Badge key={device} variant="outline" className="flex items-center gap-1">
                      <DeviceIcon device={device} />
                      {device.charAt(0).toUpperCase() + device.slice(1)}
                    </Badge>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
          
          {/* Content Rating Badge */}
          {wallpaper.content_rating && (
            <ContentRatingBadge rating={wallpaper.content_rating} />
          )}
          
          {/* Premium Badge */}
          {wallpaper.premium && (
            <Badge className="bg-indigo-500/70 border-indigo-400/50 text-white flex items-center gap-1 border-b border-l backdrop-blur-md">
              <Lock size={12} />
              <span className="text-xs">Premium</span>
            </Badge>
          )}
          
          {/* Special type badge */}
          {wallpaper.wallpaper_type && wallpaper.wallpaper_type !== 'static' && (
            <Badge className="bg-purple-500/70 border-purple-400/50 text-white flex items-center gap-1 border-b border-l backdrop-blur-md">
              <Sparkles size={12} />
              <span className="text-xs capitalize">{wallpaper.wallpaper_type}</span>
            </Badge>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-3 backdrop-blur-md bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <h3 className="text-sm font-medium truncate text-white">{wallpaper.title}</h3>
        </div>
        
        <button
          onClick={toggleFavorite}
          className="absolute top-16 right-2 z-20 p-2 rounded-full glass-dark transform transition-all duration-200 ease-out"
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
