
import React from 'react';
import { Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

type BannerType = 'popular' | 'new' | 'featured';

interface ImageBannerProps {
  type: BannerType;
  className?: string;
}

const ImageBanner = ({ type, className }: ImageBannerProps) => {
  const baseClasses = "absolute top-0 right-0 z-30 px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 backdrop-blur-md rounded-bl-lg border-b border-l";
  
  const bannerConfig = {
    popular: {
      classes: "bg-orange-500/70 border-orange-400/50 text-white",
      text: "Popular"
    },
    new: {
      classes: "bg-blue-500/70 border-blue-400/50 text-white",
      text: "New"
    },
    featured: {
      classes: "bg-purple-500/70 border-purple-400/50 text-white",
      text: "Featured"
    }
  };

  const config = bannerConfig[type];

  return (
    <div className={cn(baseClasses, config.classes, className)}>
      <Tag size={14} />
      <span>{config.text}</span>
    </div>
  );
};

export default ImageBanner;
