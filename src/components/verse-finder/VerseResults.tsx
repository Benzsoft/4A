import React from 'react';
import { VerseCard } from './VerseCard';
import { Verse } from '../../types';
import { Loader2 } from 'lucide-react';

interface VerseResultsProps {
  verses: Verse[];
  isLoading: boolean;
  onSave: (verse: Verse) => void;
}

export function VerseResults({ verses, isLoading, onSave }: VerseResultsProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (verses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600 dark:text-gray-400">
        No verses found. Try a different search term.
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6 animate-fade-in">
      {verses.map((verse, index) => (
        <VerseCard
          key={`${verse.reference}-${index}`}
          verse={verse}
          onSave={onSave}
        />
      ))}
    </div>
  );
}