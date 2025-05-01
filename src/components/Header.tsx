
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown,
  UserRound,
  Coins
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { wallpaperService } from '@/services/wallpaperService';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

const Header = () => {
  const location = useLocation();
  const { data: categories, isPending } = useQuery({
    queryKey: ['categories'],
    queryFn: wallpaperService.getCategories
  });

  // Mock user data - would come from auth context in a real app
  const user = {
    name: 'User',
    credits: 100,
    isPremium: false
  };
  
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {location.pathname === '/categories' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-2">
                  <span className="mr-1">Categories</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                {isPending ? (
                  <DropdownMenuItem disabled>Loading categories...</DropdownMenuItem>
                ) : (
                  categories?.map(category => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link to={`/category/${category.id}`}>{category.name}</Link>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {/* Credits display */}
          <div className="flex items-center bg-muted/50 px-3 py-1 rounded-full">
            <Coins size={16} className="text-amber-500 mr-1" />
            <span className="text-sm font-medium">{user.credits}</span>
          </div>
          
          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full w-9 h-9 p-0">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-wallpaper-purple text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start p-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">Free Plan</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/credits" className="cursor-pointer">Buy Credits</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/pricing" className="cursor-pointer">Upgrade Plan</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-500 focus:text-red-500"
                onClick={() => toast.success("Logged out successfully")}
              >
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
