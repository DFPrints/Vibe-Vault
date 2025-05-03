
import React from 'react';
import { Banner } from 'lucide-react';
import { cn } from '@/lib/utils';

type BannerType = 'popular' | 'new' | 'featured';

interface ImageBannerProps {
  type: BannerType;
  className?: string;
}

const ImageBanner = ({ type, className }: ImageBannerProps) => {
  const baseClasses = "absolute top-0 left-0 z-30 px-2 py-1 text-xs font-medium flex items-center gap-1.5";
  
  const bannerConfig = {
    popular: {
      classes: "bg-orange-500 text-white",
      text: "Popular"
    },
    new: {
      classes: "bg-blue-500 text-white",
      text: "New"
    },
    featured: {
      classes: "bg-wallpaper-purple text-white",
      text: "Featured"
    }
  };

  const config = bannerConfig[type];

  return (
    <div className={cn(baseClasses, config.classes, className)}>
      <Banner size={14} />
      <span>{config.text}</span>
    </div>
  );
};

export default ImageBanner;
