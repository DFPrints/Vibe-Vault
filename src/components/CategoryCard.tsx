
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types/wallpaper';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      to={`/category/${category.id}`} 
      className="block relative h-32 rounded-xl overflow-hidden group"
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10"></div>
      <img 
        src={category.imageUrl} 
        alt={category.name} 
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white">
        <h3 className="text-lg font-medium">{category.name}</h3>
        <p className="text-sm text-white/80">{category.count} wallpapers</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
