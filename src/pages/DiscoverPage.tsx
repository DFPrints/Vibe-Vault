
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { wallpaperService } from '@/services/wallpaperService';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WallpaperCard from '@/components/WallpaperCard';
import { DeviceType } from '@/types/wallpaper';
import { Sparkles, Crown } from 'lucide-react';

const DiscoverPage = () => {
  const [activeTab, setActiveTab] = useState<'trending' | 'premium' | 'device'>('trending');
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('smartphone');
  
  const { data: wallpapers, isPending: isWallpapersPending } = useQuery({
    queryKey: ['discover', activeTab, selectedDevice],
    queryFn: () => {
      if (activeTab === 'trending') {
        return wallpaperService.getWallpapers();
      } else if (activeTab === 'premium') {
        return wallpaperService.getPremiumWallpapers();
      } else {
        return wallpaperService.getWallpapersForDeviceType(selectedDevice);
      }
    }
  });
  
  const deviceOptions: { value: DeviceType; label: string }[] = [
    { value: 'smartphone', label: 'Smartphone' },
    { value: 'tablet', label: 'Tablet' },
    { value: 'desktop', label: 'Desktop' },
    { value: 'tv', label: 'TV' }
  ];
  
  return (
    <div className="pb-20 pt-4 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-wallpaper-purple" size={24} />
        <h1 className="text-2xl font-bold">Discover</h1>
      </div>
      
      <Tabs defaultValue="trending" className="w-full" onValueChange={(val: any) => setActiveTab(val)}>
        <TabsList className="grid grid-cols-3 mb-6 glass-card">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="device">By Device</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending" className="mt-0">
          <h2 className="text-lg font-medium mb-4">Trending Wallpapers</h2>
          
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
        </TabsContent>
        
        <TabsContent value="premium" className="mt-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium flex items-center">
              <Crown size={18} className="mr-2 text-yellow-500" /> Premium Wallpapers
            </h2>
          </div>
          
          {isWallpapersPending ? (
            <div className="masonry-grid">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className={`${index % 3 === 0 ? 'h-80' : 'h-52'} rounded-xl`} />
              ))}
            </div>
          ) : (
            <>
              {(wallpapers?.length || 0) > 0 ? (
                <div className="masonry-grid">
                  {wallpapers?.map((wallpaper, index) => (
                    <WallpaperCard
                      key={wallpaper.id}
                      wallpaper={{...wallpaper, premium: true}}
                      isTall={index % 3 === 0}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Premium collection coming soon</p>
                </div>
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="device" className="mt-0">
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">Device Wallpapers</h2>
            <div className="flex gap-2 mb-4 overflow-auto pb-2">
              {deviceOptions.map(device => (
                <button
                  key={device.value}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    selectedDevice === device.value 
                      ? 'bg-wallpaper-purple text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                  onClick={() => setSelectedDevice(device.value)}
                >
                  {device.label}
                </button>
              ))}
            </div>
          </div>
          
          {isWallpapersPending ? (
            <div className="masonry-grid">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className={`${index % 3 === 0 ? 'h-80' : 'h-52'} rounded-xl`} />
              ))}
            </div>
          ) : (
            <>
              {(wallpapers?.length || 0) > 0 ? (
                <div className="masonry-grid">
                  {wallpapers?.map((wallpaper, index) => (
                    <WallpaperCard
                      key={wallpaper.id}
                      wallpaper={wallpaper}
                      isTall={index % 3 === 0}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No wallpapers found for {selectedDevice}</p>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiscoverPage;
