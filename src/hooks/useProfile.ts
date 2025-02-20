import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../types';
import { getStorageItem, setStorageItem } from '../utils/storage';

const CACHE_KEY = 'user_profile';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function loadProfile() {
      try {
        // Check cache first
        const cached = getStorageItem<{data: UserProfile; timestamp: number} | null>(CACHE_KEY, null);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          setProfile(cached.data);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) throw error;

        // Cache the result
        setStorageItem(CACHE_KEY, {
          data,
          timestamp: Date.now()
        });

        setProfile(data);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [userId]);

  return { profile, loading, error, setProfile };
}