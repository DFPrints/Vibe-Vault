
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { wallpaperService } from '@/services/wallpaperService';
import WallpaperCard from '@/components/WallpaperCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeftIcon } from 'lucide-react';

const CategoryDetailPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const { data: category } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      const allCategories = await wallpaperService.getCategories();
      return allCategories.find(c => c.id === categoryId);
    },
    enabled: !!categoryId
  });
  
  const { data: wallpapers, isPending } = useQuery({
    queryKey: ['wallpapers', 'category', categoryId],
    queryFn: () => wallpaperService.getWallpapersByCategory(categoryId!),
    enabled: !!categoryId
  });
  
  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 rounded-full hover:bg-muted"
        >
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold ml-2">{category?.name || 'Category'}</h1>
      </div>
      
      {isPending ? (
        <div className="masonry-grid">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className={`${index % 3 === 0 ? 'h-80' : 'h-52'} rounded-xl`} />
          ))}
        </div>
      ) : (
        <>
          {wallpapers && wallpapers.length > 0 ? (
            <div className="masonry-grid">
              {wallpapers.map((wallpaper, index) => (
                <WallpaperCard 
                  key={wallpaper.id} 
                  wallpaper={wallpaper}
                  isTall={index % 3 === 0}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground mb-2">No wallpapers found in this category</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryDetailPage;
