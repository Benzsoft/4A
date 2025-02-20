import React, { useState, useEffect } from 'react';
import { getVerseOfDay } from '../../services/ai';
import { Quote } from 'lucide-react';
import { DateTime } from './DateTime';
import { ShareButton } from '../shared/ShareButton';
import toast from 'react-hot-toast';

// Default verse as fallback
const DEFAULT_VERSE = {
  reference: 'Philippians 4:13',
  text: 'I can do all things through Christ which strengtheneth me.'
};

// Cache key for localStorage
const CACHE_KEY = 'verse_of_day';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedVerse {
  verse: {
    reference: string;
    text: string;
  };
  timestamp: number;
}

export function VerseOfDay() {
  const [verse, setVerse] = useState<{ reference: string; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { verse, timestamp }: CachedVerse = JSON.parse(cached);
          const now = Date.now();
          
          // If cache is still valid (less than 24 hours old)
          if (now - timestamp < CACHE_DURATION) {
            setVerse(verse);
            setIsLoading(false);
            return;
          }
        }
        
        // Cache expired or doesn't exist, fetch new verse
        const response = await getVerseOfDay();
        if (!response) throw new Error('No verse received');

        const [reference, text] = response.split(' - ').map(part => part.trim());
        const newVerse = { 
          reference, 
          text: text.replace(/^"|"$/g, '')
        };

        // Cache the new verse with timestamp
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          verse: newVerse,
          timestamp: Date.now()
        }));

        setVerse(newVerse);
      } catch (err) {
        console.error('Error fetching verse of the day:', err);
        setError('Unable to load verse of the day');
        // Use default verse as fallback
        setVerse(DEFAULT_VERSE);
        toast.error('Using default verse due to service error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerse();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8 animate-pulse">
        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error && !verse) {
    return (
      <div className="w-full max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
        <div className="text-center text-gray-600 dark:text-gray-300">
          {error}
        </div>
      </div>
    );
  }

  if (!verse) return null;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
      <div className="flex justify-between items-start mb-2">
        <DateTime />
        <div className="flex items-center space-x-4">
          <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
            Verse of the Day
          </div>
          <ShareButton
            title="Bible Me - Verse of the Day"
            text={`📖 Verse of the Day:\n\n"${verse.text}"\n\n- ${verse.reference}`}
          />
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Quote className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
        <div>
          <p className="text-base text-gray-700 dark:text-gray-300 italic mb-2">
            "{verse.text}"
          </p>
          <p className="text-right text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
            - {verse.reference}
          </p>
        </div>
      </div>
    </div>
  );
}