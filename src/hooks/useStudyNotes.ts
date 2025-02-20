import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { StudyNote } from '../types';
import toast from 'react-hot-toast';

export function useStudyNotes(userId: string | undefined, lessonDay: number) {
  const [note, setNote] = useState<StudyNote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function loadNote() {
      try {
        const { data, error } = await supabase
          .from('study_notes')
          .select('*')
          .eq('user_id', userId)
          .eq('lesson_day', lessonDay)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        setNote(data);
      } catch (error) {
        console.error('Error loading study note:', error);
        toast.error('Failed to load study note');
      } finally {
        setLoading(false);
      }
    }

    loadNote();
  }, [userId, lessonDay]);

  const saveNote = async (content: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('study_notes')
        .upsert({
          user_id: userId,
          lesson_day: lessonDay,
          content,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      toast.success('Note saved successfully');
    } catch (error) {
      console.error('Error saving study note:', error);
      toast.error('Failed to save note');
    }
  };

  return { note, loading, saveNote };
}