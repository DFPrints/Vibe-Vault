
import React from 'react';
import { ArrowLeftIcon, UserRound, Mail, Coins, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const user = {
    name: 'User',
    email: 'user@example.com',
    credits: 100,
    plan: 'Free',
    downloads: 15,
    favorites: 23
  };
  
  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b p-4">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="p-1 mr-2 rounded-full hover:bg-muted"
          >
            <ArrowLeftIcon size={20} />
          </button>
          <h1 className="text-xl font-bold">Profile</h1>
        </div>
      </header>
      
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Avatar className="h-20 w-20 mr-4">
            <AvatarFallback className="text-3xl bg-wallpaper-purple text-white">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex items-center mt-1">
              <span className="text-sm bg-muted px-2 py-0.5 rounded-full">
                {user.plan} Plan
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="text-muted-foreground text-sm">Credits</div>
            <div className="text-2xl font-bold flex items-center">
              <Coins size={18} className="text-amber-500 mr-1" /> 
              {user.credits}
            </div>
            <Button size="sm" variant="outline" className="w-full mt-2" asChild>
              <Link to="/credits">Buy Credits</Link>
            </Button>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="text-muted-foreground text-sm">Downloads</div>
            <div className="text-2xl font-bold">{user.downloads}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {user.plan === 'Free' ? '5/5 this month' : 'Unlimited'}
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link to="/profile/edit">
              <UserRound size={18} className="mr-2" />
              Edit Profile
            </Link>
          </Button>
          
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link to="/pricing">
              <CreditCard size={18} className="mr-2" />
              Subscription Plan
            </Link>
          </Button>
          
          <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
            <Mail size={18} className="mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
