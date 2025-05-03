
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { wallpaperService } from '@/services/wallpaperService';
import { toast } from 'sonner';
import { ArrowLeft, Share2, Download, Heart, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useWallpaper } from '@/context/WallpaperContext';
import ImageBanner from '@/components/ImageBanner';
import { Badge } from '@/components/ui/badge';

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
