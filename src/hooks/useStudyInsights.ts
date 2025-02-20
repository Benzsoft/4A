import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { StudyInsight } from '../types';
import toast from 'react-hot-toast';

export function useStudyInsights(userId: string | undefined) {
  const [insights, setInsights] = useState<StudyInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function loadInsights() {
      try {
        const { data, error } = await supabase
          .from('study_insights')
          .select('*')
          .eq('user_id', userId)
          .order('study_date', { ascending: false })
          .limit(30);

        if (error) throw error;
        setInsights(data || []);
      } catch (error) {
        console.error('Error loading study insights:', error);
        toast.error('Failed to load study insights');
      } finally {
        setLoading(false);
      }
    }

    loadInsights();
  }, [userId]);

  const recordInsight = async (data: Omit<StudyInsight, 'id' | 'user_id' | 'created_at'>) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('study_insights')
        .insert([{
          user_id: userId,
          ...data
        }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error recording study insight:', error);
      toast.error('Failed to record study insight');
    }
  };

  return { insights, loading, recordInsight };
}