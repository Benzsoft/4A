import { supabase } from '../lib/supabase';

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    
    if (error) {
      throw error;
    }
    
    console.log('Supabase connection successful!');
    return true;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
}