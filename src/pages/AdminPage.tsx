import React, { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { wallpaperService } from '@/services/wallpaperService';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Upload, PlusCircle, X, Smartphone, Monitor, Tablet, Tv } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AddWallpaperData } from '@/types/admin';

const uploadFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  tags: z.array(z.string()).min(1, { message: 'Add at least one tag' }),
  compatibleDevices: z.array(z.string()).min(1, { message: 'Select at least one compatible device' })
});

type UploadFormData = z.infer<typeof uploadFormSchema>;

const deviceOptions = [
  { value: 'smartphone', label: 'Smartphone', icon: Smartphone },
  { value: 'tablet', label: 'Tablet', icon: Tablet },
  { value: 'desktop', label: 'Desktop', icon: Monitor },
  { value: 'tv', label: 'TV', icon: Tv },
];

const AdminPage = () => {
  const { isAdmin, user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentTag, setCurrentTag] = useState('');
  const queryClient = useQueryClient();

  const form = useForm<UploadFormData>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: '',
      category: '',
      tags: [],
      compatibleDevices: []
    }
  });

  const { data: categories, isPending: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => wallpaperService.getCategories()
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleTagAdd = () => {
    if (currentTag.trim() && !form.getValues().tags.includes(currentTag.trim())) {
      form.setValue('tags', [...form.getValues().tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    form.setValue(
      'tags', 
      form.getValues().tags.filter(tag => tag !== tagToRemove)
    );
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const handleDeviceToggle = (device: string) => {
    const currentDevices = form.getValues().compatibleDevices;
    if (currentDevices.includes(device)) {
      form.setValue(
        'compatibleDevices', 
        currentDevices.filter(d => d !== device)
      );
    } else {
      form.setValue(
        'compatibleDevices', 
        [...currentDevices, device]
      );
    }
  };

  const onSubmit = async (data: UploadFormData) => {
    if (!selectedFile) {
      toast.error('Please select a wallpaper image');
      return;
    }
    
    setIsUploading(true);
    try {
      // Upload file to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `wallpapers/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('wallpapers')
        .upload(filePath, selectedFile);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('wallpapers')
        .getPublicUrl(filePath);
        
      const publicUrl = publicUrlData.publicUrl;
      
      // Create thumbnail (simplified version)
      const thumbnailUrl = publicUrl; // In a real app, you would generate a thumbnail
      
      // Get image dimensions
      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);
      await new Promise(resolve => {
        img.onload = resolve;
      });
      
      // Prepare wallpaper data
      const wallpaperData: AddWallpaperData = {
        title: data.title,
        image_url: publicUrl,
        thumbnail_url: thumbnailUrl,
        width: img.width,
        height: img.height,
        category: data.category,
        tags: data.tags,
        compatible_devices: data.compatibleDevices,
      };
      
      // Add wallpaper to database
      await wallpaperService.addWallpaper(wallpaperData);
      
      toast.success('Wallpaper uploaded successfully');
      // Reset form
      form.reset();
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['wallpapers'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An error occurred while uploading');
    } finally {
      setIsUploading(false);
    }
  };

  // Redirect if not admin
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  if (user && !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container py-8 pb-20">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Upload New Wallpaper</CardTitle>
          <CardDescription>Add a new wallpaper to the collection</CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Wallpaper Image</label>
                
                {!previewUrl ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors"
                  >
                    <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-base font-medium">Click to upload</p>
                    <p className="text-sm text-muted-foreground">PNG or JPG (max 10MB)</p>
                  </div>
                ) : (
                  <div className="relative">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-60 object-cover rounded-lg" 
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter wallpaper title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value} 
                      disabled={isCategoriesLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={handleTagKeyPress}
                        placeholder="Add tag and press Enter"
                      />
                      <Button 
                        type="button" 
                        variant="secondary"
                        onClick={handleTagAdd}
                      >
                        <PlusCircle className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.watch('tags').map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => handleTagRemove(tag)} 
                          />
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Compatible Devices */}
              <FormField
                control={form.control}
                name="compatibleDevices"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compatible Devices</FormLabel>
                    <FormDescription>
                      Select which devices this wallpaper is suitable for
                    </FormDescription>
                    
                    <div className="flex flex-wrap gap-3 mt-2">
                      {deviceOptions.map((device) => {
                        const isSelected = field.value.includes(device.value);
                        return (
                          <Button
                            key={device.value}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            onClick={() => handleDeviceToggle(device.value)}
                            className="flex items-center gap-2"
                          >
                            <device.icon className="h-4 w-4" />
                            {device.label}
                          </Button>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Wallpaper
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AdminPage;
