import { useState } from 'react';
import { Verse } from '../types';
import { searchVerses } from '../services/bibleApi';

export function useVerses() {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchForVerses = async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const results = await searchVerses(query);
      setVerses(results);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch verses. Please try again.');
      }
      setVerses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const shareVerse = async (verse: Verse) => {
    const shareText = `${verse.reference}\n\n${verse.text}\n\n- Shared via Bible Me`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Bible Verse',
          text: shareText,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('Verse copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing verse:', err);
      alert('Failed to share verse');
    }
  };

  return {
    verses,
    isLoading,
    error,
    searchForVerses,
    shareVerse,
  };
}