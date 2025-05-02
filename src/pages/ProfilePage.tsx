
import React from 'react';
import { ArrowLeftIcon, UserRound, Mail, Settings, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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
              {profile?.username?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{profile?.username || 'User'}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
            <div className="flex items-center mt-1">
              <span className="text-sm bg-muted px-2 py-0.5 rounded-full">
                {profile?.is_admin ? 'Admin' : 'User'}
              </span>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start" disabled>
            <UserRound size={18} className="mr-2" />
            Edit Profile
          </Button>
          
          {profile?.is_admin && (
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin">
                <Settings size={18} className="mr-2" />
                Admin Dashboard
              </Link>
            </Button>
          )}
          
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link to="/favorites">
              Favorites
            </Link>
          </Button>
          
          <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleSignOut}>
            <Mail size={18} className="mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
