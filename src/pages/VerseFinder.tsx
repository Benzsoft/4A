import React, { useState } from 'react';
import { SearchInput } from '../components/verse-finder/SearchInput';
import { VerseResults } from '../components/verse-finder/VerseResults';
import { useVerses } from '../hooks/useVerses';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/auth/AuthModal';
import { Verse } from '../types';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function VerseFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const { verses, isLoading, error, searchForVerses } = useVerses();
  const { user } = useAuth();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    await searchForVerses(searchQuery.trim());
  };

  const handleSaveVerse = async (verse: Verse) => {
    if (!user) {
      setShowAuth(true);
      return;
    }

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('saved_verses')
        .eq('id', user.id)
        .single();

      const savedVerses = profile?.saved_verses || [];
      
      if (savedVerses.some(v => v.reference === verse.reference)) {
        toast.error('This verse is already saved');
        return;
      }

      if (savedVerses.length >= 10) {
        toast.error('You can only save up to 10 verses. Please remove some to save more.');
        return;
      }

      const newVerse = {
        ...verse,
        saved_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .update({
          saved_verses: [...savedVerses, newVerse]
        })
        .eq('id', user.id);

      if (error) throw error;
      
      toast.success('Verse saved successfully!');
    } catch (error) {
      console.error('Error saving verse:', error);
      toast.error('Failed to save verse. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Find Verses
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Search for Bible verses by entering your current situation, mood, or any biblical topic
        </p>
      </div>

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {error && (
        <div className="text-red-500 dark:text-red-400 text-center mt-4">
          {error}
        </div>
      )}

      <VerseResults
        verses={verses}
        isLoading={isLoading}
        onSave={handleSaveVerse}
      />

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}