
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HomeIcon, ImageIcon, SearchIcon, HeartIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { to: '/', icon: HomeIcon, label: 'Home' },
    { to: '/categories', icon: ImageIcon, label: 'Categories' },
    { to: '/search', icon: SearchIcon, label: 'Search' },
    { to: '/favorites', icon: HeartIcon, label: 'Favorites' },
    { to: '/discover', icon: Sparkles, label: 'Discover' }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 px-2 pb-safe backdrop-blur-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = 
            (item.to === '/' && currentPath === '/') || 
            (item.to !== '/' && currentPath.startsWith(item.to));
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg w-1/5 tap-highlight-none",
                isActive 
                  ? "text-wallpaper-purple" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon size={20} className={cn(isActive && "fill-wallpaper-purple/20")} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
