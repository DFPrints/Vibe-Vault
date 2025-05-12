
import { AddWallpaperData } from '@/types/admin';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided in environment variables.');
}

// Ensure that the types for createClient are correctly inferred
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const addWallpaper = async (wallpaperData: AddWallpaperData): Promise<void> => {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error getting session:', sessionError);
      throw new Error('Could not retrieve session');
    }

    const session = sessionData?.session;

    if (!session) {
      console.error('No session found.');
      throw new Error('No session found');
    }

    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .select('id')
      .eq('user_id', session.user.id)
      .single();

    if (clientError) {
      console.error('Error fetching client:', clientError);
      throw new Error('Could not retrieve client');
    }

    const client = clientData;

    if (!client) {
      console.error('No client found for the user.');
      throw new Error('No client found for the user');
    }

    const { error } = await supabase
      .from('wallpapers')
      .insert([
        {
          ...wallpaperData,
          client_id: client.id,
        },
      ]);

    if (error) {
      console.error('Error inserting wallpaper:', error);
      throw new Error('Could not insert wallpaper');
    }

    // Fixed RPC call typing
    const { error: rpcError } = await supabase.rpc(
      'increment_category_count',
      { category_id: wallpaperData.category }
    );
    
    if (rpcError) {
      console.error('Error incrementing category count:', rpcError);
    }

  } catch (error) {
    console.error('Error in addWallpaper:', error);
    throw error;
  }
};

export const adminService = {
  addWallpaper,
};
