
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

export type ContentRating = 'everyone' | 'mature' | 'nsfw';

interface ContentRatingBadgeProps {
  rating: ContentRating;
  className?: string;
}

const ContentRatingBadge = ({ rating, className }: ContentRatingBadgeProps) => {
  const ratingConfig = {
    everyone: {
      icon: CheckCircle2,
      label: 'Everyone',
      className: 'bg-green-500/70 border-green-400/50 text-white'
    },
    mature: {
      icon: AlertCircle,
      label: 'Mature',
      className: 'bg-yellow-500/70 border-yellow-400/50 text-white'
    },
    nsfw: {
      icon: EyeOff,
      label: 'NSFW',
      className: 'bg-red-500/70 border-red-400/50 text-white'
    }
  };

  const config = ratingConfig[rating];
  const Icon = config.icon;

  return (
    <Badge className={cn(
      "flex items-center gap-1 py-1 backdrop-blur-md rounded-lg border-b border-l",
      config.className,
      className
    )}>
      <Icon size={12} />
      <span className="text-xs font-medium">{config.label}</span>
    </Badge>
  );
};

export default ContentRatingBadge;
