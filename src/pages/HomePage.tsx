
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { wallpaperService } from '@/services/wallpaperService';
import EnhancedWallpaperCard from '@/components/EnhancedWallpaperCard';
import { Skeleton } from '@/components/ui/skeleton';
import CategoryCard from '@/components/CategoryCard';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { SearchIcon, XIcon } from 'lucide-react';

const HomePage = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: wallpapers, isPending: isWallpapersPending } = useQuery({
    queryKey: ['wallpapers'],
    queryFn: wallpaperService.getWallpapers
  });
  
  const { data: categories, isPending: isCategoriesPending } = useQuery({
    queryKey: ['categories'],
    queryFn: wallpaperService.getCategories
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };
  
  return (
    <div className="pb-20 pt-4 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Vibe Vault</h1>
        <p className="text-muted-foreground">Find your perfect wallpaper</p>
      </div>
      
      {/* Search Bar - Moved to the top */}
      <div className="relative mb-6">
        <form onSubmit={handleSearch}>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <SearchIcon size={18} />
          </div>
          
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search wallpapers..."
            className="pl-10 pr-10 py-6 glass-card"
          />
          
          {searchTerm && (
            <button 
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              onClick={clearSearch}
            >
              <XIcon size={18} />
            </button>
          )}
        </form>
      </div>
      
      {/* Admin Action */}
      {isAdmin && (
        <div className="mb-6">
          <Link
            to="/admin"
            className="block w-full frosted font-medium text-wallpaper-purple py-3 rounded-lg text-center hover:bg-wallpaper-purple/10 transition-colors"
          >
            Upload New Wallpapers
          </Link>
        </div>
      )}
      
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
            {categories && categories.slice(0, 4).map((category) => (
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
            {wallpapers && wallpapers.map((wallpaper, index) => (
              <EnhancedWallpaperCard 
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
