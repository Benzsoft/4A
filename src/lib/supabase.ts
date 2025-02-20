import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env';
import { Profile, SavedVerse, TriviaScore, Prayer, BibleStudy } from '../types';
import toast from 'react-hot-toast';

export const supabase = createClient(
  'https://yrsqnrmucttlsnvcxwqu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlyc3Fucm11Y3R0bHNudmN4d3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5MTExNzYsImV4cCI6MjA0ODQ4NzE3Nn0.FjUgqrM0bnVA4Iqj1c6XZvq6ONuMlxxSgkTZTiKmwFU',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

export type { Profile };

export async function createProfile(user_id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('profiles')
      .insert([{
        id: user_id,
        saved_verses: [],
        trivia_scores: [],
        prayers: [],
        bible_study: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);

    if (error) throw error;
  } catch (error) {
    console.error('Error creating profile:', error);
    toast.error('Failed to create profile');
    throw error;
  }
}

export async function getProfile(user_id: string): Promise<Profile> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user_id)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Profile not found');

    return data as Profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    toast.error('Failed to fetch profile');
    throw error;
  }
}

export async function updateProfile(
  user_id: string,
  updates: Partial<{
    username?: string;
    avatar_url?: string;
    saved_verses?: SavedVerse[];
    trivia_scores?: TriviaScore[];
    prayers?: Prayer[];
    bible_study?: BibleStudy | null;
  }>
): Promise<Profile> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', user_id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Profile not found');

    return data as Profile;
  } catch (error) {
    console.error('Error updating profile:', error);
    toast.error('Failed to update profile');
    throw error;
  }
}

export async function checkProfileExists(user_id: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user_id)
      .single();

    if (error) throw error;
    return !!data;
  } catch (error) {
    return false;
  }
}