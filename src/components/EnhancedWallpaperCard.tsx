
import { Wallpaper } from '@/types/wallpaper';
import { Link } from 'react-router-dom';
import { HeartIcon, Sparkles, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Monitor, Tablet, Tv } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import ImageBanner from './ImageBanner';
import ContentRatingBadge from './ContentRatingBadge';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  isTall?: boolean;
}

const DeviceIcon = ({ device }: { device: string }) => {
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

const EnhancedWallpaperCard = ({ wallpaper, isTall = false }: WallpaperCardProps) => {
  const { width, height } = wallpaper.dimensions;
  const resolution = `${width}x${height}`;
  
  // Determine if a wallpaper should have a banner based on properties
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
  
  return (
    <Link
      to={`/wallpaper/${wallpaper.id}`}
      className={cn(
        "relative rounded-xl overflow-hidden block group",
        isTall ? "masonry-item-tall" : ""
      )}
    >
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors z-10"></div>
      
      <img
        src={wallpaper.thumbnailUrl}
        alt={wallpaper.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      
      {/* Banner indicator if applicable */}
      {bannerType && <ImageBanner type={bannerType} />}
      
      {/* Top Left Area - Resolution */}
      <div className="absolute top-2 left-2 z-20">
        <Badge variant="secondary" className="bg-black/60 hover:bg-black/70 text-white border-none">
          {resolution}
        </Badge>
      </div>
      
      {/* Top Right Area - Device compatibility */}
      <div className="absolute top-2 right-2 z-20 flex flex-col gap-1 items-end">
        {/* Device compatibility badges */}
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
      
      {/* Favorite icon */}
      {wallpaper.isFavorite && (
        <div className="absolute bottom-2 right-2 z-20">
          <HeartIcon size={20} className="fill-red-500 text-red-500" />
        </div>
      )}
      
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-20">
        <h3 className="text-white font-medium truncate">{wallpaper.title}</h3>
      </div>
    </Link>
  );
};

export default EnhancedWallpaperCard;
