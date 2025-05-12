
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { wallpaperService } from '@/services/wallpaperService';
import { toast } from 'sonner';
import { ArrowLeft, Share2, Download, Heart, Tag, Monitor, Smartphone, Tablet, Tv, Info, Sparkles, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useWallpaper } from '@/context/WallpaperContext';
import ImageBanner from '@/components/ImageBanner';
import { Badge } from '@/components/ui/badge';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ContentRatingBadge from './ContentRatingBadge';
import { DeviceType } from '@/types/wallpaper';

// Map of common tag categories to colors
const tagColorMap: Record<string, string> = {
  // Nature
  nature: "bg-green-500",
  forest: "bg-green-500",
  plants: "bg-green-500",
  mountain: "bg-green-700",
  ocean: "bg-blue-500",
  beach: "bg-yellow-500",
  sky: "bg-blue-400",
  
  // Urban
  city: "bg-gray-500",
  architecture: "bg-slate-600",
  street: "bg-slate-500",
  
  // Abstract
  abstract: "bg-purple-500",
  pattern: "bg-indigo-500",
  minimal: "bg-gray-700",
  
  // Colors
  dark: "bg-gray-900",
  light: "bg-gray-300 text-gray-900",
  colorful: "bg-pink-500",
  
  // Mood
  calm: "bg-blue-300",
  vibrant: "bg-orange-500",
  
  // Seasons
  summer: "bg-yellow-600",
  winter: "bg-blue-200 text-blue-900",
  autumn: "bg-orange-600",
  spring: "bg-green-400",
  
  // Time
  night: "bg-indigo-900",
  day: "bg-sky-300 text-sky-900",
  sunset: "bg-orange-400"
};

// Function to get tag color
const getTagColor = (tag: string): string => {
  const cleanTag = tag.toLowerCase().trim();
  
  // Check for exact matches first
  if (tagColorMap[cleanTag]) {
    return tagColorMap[cleanTag];
  }
  
  // Check for partial matches
  for (const [key, value] of Object.entries(tagColorMap)) {
    if (cleanTag.includes(key) || key.includes(cleanTag)) {
      return value;
    }
  }
  
  // Default colors based on string hash for consistent coloring
  const hash = [...cleanTag].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = [
    "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500",
    "bg-pink-500", "bg-teal-500", "bg-red-500", "bg-indigo-500"
  ];
  
  return colors[hash % colors.length];
};

const DeviceIcon = ({ device }: { device: DeviceType }) => {
  switch (device) {
    case 'smartphone':
      return <Smartphone size={16} />;
    case 'tablet':
      return <Tablet size={16} />;
    case 'desktop':
      return <Monitor size={16} />;
    case 'tv':
      return <Tv size={16} />;
    default:
      return null;
  }
};

const WallpaperDetailPage = () => {
  const { wallpaperId } = useParams<{ wallpaperId: string }>();
  const navigate = useNavigate();
  const { setActiveWallpaper, toggleFavorite, isFavorite } = useWallpaper();
  const [isDownloading, setIsDownloading] = useState(false);
  
  const { data: wallpaper, isLoading } = useQuery({
    queryKey: ['wallpaper', wallpaperId],
    queryFn: () => wallpaperService.getWallpaperById(wallpaperId || ''),
    enabled: !!wallpaperId
  });
  
  // Get device specific wallpapers (this would be implemented in a real app)
  const { data: similarWallpapers } = useQuery({
    queryKey: ['similar', wallpaperId],
    queryFn: () => wallpaperService.searchWallpapers(''), // In a real app, this would fetch similar wallpapers
    enabled: !!wallpaper,
    staleTime: 5 * 60 * 1000 // 5 minutes
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
    if (wallpaper?.dateAdded && isNew(wallpaper.dateAdded)) {
      return 'new';
    }
    if (wallpaper?.views && wallpaper.views > 100) {
      return 'popular';
    }
    if (wallpaper?.featured) {
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
    if (wallpaper.premium) {
      toast.error('This is a premium wallpaper. Please upgrade to download.');
      return;
    }
    
    // In a real app, this would handle download functionality
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      toast.success('Wallpaper saved to your device');
    }, 1500);
  };

  const handleShare = () => {
    // In a real app, this would open share functionality
    // For now, we'll just show a toast
    if (navigator.share) {
      navigator.share({
        title: wallpaper.title,
        text: `Check out this wallpaper: ${wallpaper.title}`,
        url: window.location.href,
      }).catch(() => {
        toast.success('Share options opened');
      });
    } else {
      toast.success('Share options opened');
    }
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
          className="text-white rounded-full bg-black/30 hover:bg-black/50 backdropFilter-blur"
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
        
        {/* Content rating badge (top right) */}
        {wallpaper.content_rating && (
          <div className="absolute top-4 right-4 z-20">
            <ContentRatingBadge rating={wallpaper.content_rating} />
          </div>
        )}
        
        {/* Premium badge if applicable */}
        {wallpaper.premium && (
          <div className="absolute top-16 right-4 z-20">
            <Badge className="bg-indigo-500/70 border-indigo-400/50 text-white flex items-center gap-1 py-1 border-b border-l backdrop-blur-md">
              <Lock size={12} />
              <span>Premium</span>
            </Badge>
          </div>
        )}
        
        {/* Special type badge if applicable */}
        {wallpaper.wallpaper_type && wallpaper.wallpaper_type !== 'static' && (
          <div className="absolute top-28 right-4 z-20">
            <Badge className="bg-purple-500/70 border-purple-400/50 text-white flex items-center gap-1 py-1 border-b border-l backdrop-blur-md">
              <Sparkles size={12} />
              <span className="capitalize">{wallpaper.wallpaper_type}</span>
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4 pt-2 backdrop-blur-md bg-black/80 text-white">
        <h1 className="text-xl font-bold mb-1">{wallpaper.title}</h1>
        
        {wallpaper.author && (
          <p className="text-sm text-white/70 mb-2">by {wallpaper.author}</p>
        )}
        
        {/* Compatible devices */}
        {wallpaper.compatible_devices && wallpaper.compatible_devices.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {wallpaper.compatible_devices.map(device => (
              <Badge key={device} className="bg-black/40 text-white border flex items-center gap-1">
                <DeviceIcon device={device} />
                <span className="capitalize">{device}</span>
              </Badge>
            ))}
          </div>
        )}
        
        {/* Improved tag display */}
        <div className="flex flex-wrap gap-2 mb-4 max-w-full">
          {wallpaper.tags.map(tag => (
            <Badge 
              key={tag} 
              className={`${getTagColor(tag)} border-none text-white text-xs flex items-center gap-1`}
            >
              <Tag size={12} />
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-white/70">
            {wallpaper.dimensions.width} × {wallpaper.dimensions.height}
          </div>
          
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full frosted"
                >
                  <Info size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-xl max-h-[85vh]">
                <SheetHeader>
                  <SheetTitle>Wallpaper Details</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <h3 className="font-semibold text-lg">{wallpaper.title}</h3>
                  
                  {wallpaper.description && (
                    <p className="mt-2 text-muted-foreground">{wallpaper.description}</p>
                  )}
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-medium">Resolution</p>
                      <p className="text-sm text-muted-foreground">{wallpaper.dimensions.width} × {wallpaper.dimensions.height}</p>
                    </div>
                    
                    {wallpaper.download_count !== undefined && (
                      <div>
                        <p className="text-sm font-medium">Downloads</p>
                        <p className="text-sm text-muted-foreground">{wallpaper.download_count.toLocaleString()}</p>
                      </div>
                    )}
                    
                    {wallpaper.views !== undefined && (
                      <div>
                        <p className="text-sm font-medium">Views</p>
                        <p className="text-sm text-muted-foreground">{wallpaper.views.toLocaleString()}</p>
                      </div>
                    )}
                    
                    {wallpaper.dateAdded && (
                      <div>
                        <p className="text-sm font-medium">Added</p>
                        <p className="text-sm text-muted-foreground">{new Date(wallpaper.dateAdded).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Color palette if available */}
                  {wallpaper.color_palette && wallpaper.color_palette.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Color Palette</p>
                      <div className="flex gap-2">
                        {wallpaper.color_palette.map((color, idx) => (
                          <div 
                            key={idx} 
                            className="w-8 h-8 rounded-full" 
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Similar wallpapers */}
                  {similarWallpapers && similarWallpapers.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm font-medium mb-2">Similar Wallpapers</p>
                      <div className="grid grid-cols-3 gap-2">
                        {similarWallpapers.slice(0, 3).map((similar) => (
                          <div key={similar.id} className="relative rounded-lg overflow-hidden aspect-[3/4]">
                            <img 
                              src={similar.thumbnailUrl} 
                              alt={similar.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full frosted"
              onClick={handleShare}
            >
              <Share2 size={20} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full frosted"
              onClick={handleToggleFavorite}
            >
              <Heart 
                size={20} 
                className={isFavorite(wallpaper.id) ? "fill-red-500 text-red-500" : ""} 
              />
            </Button>
            <Button
              disabled={isDownloading}
              className="rounded-full frosted bg-wallpaper-purple hover:bg-wallpaper-purple/90"
              onClick={handleDownload}
            >
              <Download size={20} className="mr-2" />
              {isDownloading ? "Downloading..." : "Apply"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperDetailPage;
