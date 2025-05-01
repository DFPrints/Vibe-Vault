
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { wallpaperService } from '@/services/wallpaperService';
import { Input } from '@/components/ui/input';
import { SearchIcon, XIcon } from 'lucide-react';
import WallpaperCard from '@/components/WallpaperCard';
import { Skeleton } from '@/components/ui/skeleton';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const { data: searchResults, isPending } = useQuery({
    queryKey: ['search', debouncedTerm],
    queryFn: () => wallpaperService.searchWallpapers(debouncedTerm),
    enabled: debouncedTerm.length > 0
  });
  
  const clearSearch = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className="pb-20 pt-4 px-4">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      
      <div className="relative mb-6">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <SearchIcon size={18} />
        </div>
        
        <Input
          ref={inputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search wallpapers..."
          className="pl-10 pr-10 py-6"
        />
        
        {searchTerm && (
          <button 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={clearSearch}
          >
            <XIcon size={18} />
          </button>
        )}
      </div>
      
      {debouncedTerm ? (
        <>
          {isPending ? (
            <div className="masonry-grid">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className={`${index % 3 === 0 ? 'h-80' : 'h-52'} rounded-xl`} />
              ))}
            </div>
          ) : (
            <>
              {searchResults && searchResults.length > 0 ? (
                <div className="masonry-grid">
                  {searchResults.map((wallpaper, index) => (
                    <WallpaperCard 
                      key={wallpaper.id} 
                      wallpaper={wallpaper}
                      isTall={index % 3 === 0}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-xl font-medium mb-2">No results found</p>
                  <p className="text-muted-foreground">
                    Try searching for something else
                  </p>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
          <p>Search for wallpapers by name, category, or tags</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
