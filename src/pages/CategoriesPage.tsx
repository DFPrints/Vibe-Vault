
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { wallpaperService } from '@/services/wallpaperService';
import CategoryCard from '@/components/CategoryCard';
import { Skeleton } from '@/components/ui/skeleton';

const CategoriesPage = () => {
  const { data: categories, isPending } = useQuery({
    queryKey: ['categories'],
    queryFn: wallpaperService.getCategories
  });
  
  return (
    <div className="pb-20 pt-4 px-4">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      
      {isPending ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {categories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
