
import { Wallpaper } from '@/types/wallpaper';
import { Link } from 'react-router-dom';
import { HeartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Monitor, Tablet, Tv } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

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
      
      {/* Resolution badge */}
      <div className="absolute top-2 left-2 z-20">
        <Badge variant="secondary" className="bg-black/60 hover:bg-black/70 text-white border-none">
          {resolution}
        </Badge>
      </div>
      
      {/* Device compatibility badges */}
      {wallpaper.compatible_devices && wallpaper.compatible_devices.length > 0 && (
        <div className="absolute top-2 right-2 z-20">
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
        </div>
      )}
      
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
