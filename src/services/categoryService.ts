
import { supabase } from '@/integrations/supabase/client';
import { Category } from '../types/wallpaper';
import { mapCategory } from './mappers';

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
    
    return data.map(mapCategory);
  }
};
