import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { StudyPlan } from '../types/bibleStudy';
import { updateStudyProgress } from '../services/studyPlans';
import toast from 'react-hot-toast';

export function useStudyPlan(userId: string | undefined) {
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    loadStudyPlan();
  }, [userId]);

  const loadStudyPlan = async () => {
    try {
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('bible_study')
        .eq('id', userId)
        .single();

      if (fetchError) throw fetchError;

      if (!profile?.bible_study) {
        setError('No active study plan found');
        return;
      }

      setPlan(profile.bible_study);
    } catch (err) {
      console.error('Error loading study plan:', err);
      setError('Failed to load study plan');
    } finally {
      setLoading(false);
    }
  };

  const updatePlan = async (updatedPlan: StudyPlan) => {
    if (!userId) return false;

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ bible_study: updatedPlan })
        .eq('id', userId);

      if (updateError) throw updateError;

      setPlan(updatedPlan);
      return true;
    } catch (err) {
      console.error('Error updating study plan:', err);
      toast.error('Failed to update study plan');
      return false;
    }
  };

  const completeLesson = async (lessonDay: number) => {
    if (!plan || !userId) return false;

    try {
      const updatedLessons = [...plan.lessons];
      updatedLessons[lessonDay - 1] = {
        ...updatedLessons[lessonDay - 1],
        completed: true,
        completedAt: new Date().toISOString()
      };

      const updatedPlan = updateStudyProgress({
        ...plan,
        lessons: updatedLessons
      });

      return await updatePlan(updatedPlan);
    } catch (err) {
      console.error('Error completing lesson:', err);
      toast.error('Failed to complete lesson');
      return false;
    }
  };

  return {
    plan,
    loading,
    error,
    updatePlan,
    completeLesson,
    reload: loadStudyPlan
  };
}