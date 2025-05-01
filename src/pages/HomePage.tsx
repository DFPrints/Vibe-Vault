
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { wallpaperService } from '@/services/wallpaperService';
import WallpaperCard from '@/components/WallpaperCard';
import { Skeleton } from '@/components/ui/skeleton';
import CategoryCard from '@/components/CategoryCard';

const HomePage = () => {
  const { data: wallpapers, isPending: isWallpapersPending } = useQuery({
    queryKey: ['wallpapers'],
    queryFn: wallpaperService.getWallpapers
  });
  
  const { data: categories, isPending: isCategoriesPending } = useQuery({
    queryKey: ['categories'],
    queryFn: wallpaperService.getCategories
  });
  
  return (
    <div className="pb-20 pt-4 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">WallHub</h1>
        <p className="text-muted-foreground">Find your perfect wallpaper</p>
      </div>
      
      {/* Categories Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Categories</h2>
          <Link to="/categories" className="text-sm text-wallpaper-purple hover:underline">
            View all
          </Link>
        </div>
        
        {isCategoriesPending ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {categories?.slice(0, 4).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>
      
      {/* Featured Wallpapers */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Latest Wallpapers</h2>
        </div>
        
        {isWallpapersPending ? (
          <div className="masonry-grid">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className={`${index % 3 === 0 ? 'h-80' : 'h-52'} rounded-xl`} />
            ))}
          </div>
        ) : (
          <div className="masonry-grid">
            {wallpapers?.map((wallpaper, index) => (
              <WallpaperCard 
                key={wallpaper.id} 
                wallpaper={wallpaper} 
                isTall={index % 3 === 0} 
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
