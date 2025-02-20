import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BibleStudy } from '../types';
import { getStorageItem, setStorageItem } from '../utils/storage';

const CACHE_KEY = 'bible_study';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useBibleStudy(userId: string | undefined) {
  const [study, setStudy] = useState<BibleStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function loadStudy() {
      try {
        // Check cache first
        const cached = getStorageItem<{data: BibleStudy; timestamp: number} | null>(CACHE_KEY, null);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          setStudy(cached.data);
          setLoading(false);
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('bible_study')
          .eq('id', userId)
          .single();

        // Cache the result
        if (profile?.bible_study) {
          setStorageItem(CACHE_KEY, {
            data: profile.bible_study,
            timestamp: Date.now()
          });
        }

        setStudy(profile?.bible_study || null);
      } catch (err) {
        console.error('Error loading Bible study:', err);
        setError('Failed to load Bible study');
      } finally {
        setLoading(false);
      }
    }

    loadStudy();
  }, [userId]);

  return { study, loading, error, setStudy };
}