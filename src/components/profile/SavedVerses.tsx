import React from 'react';
import { Bookmark, Trash2 } from 'lucide-react';
import { SavedVerse } from '../../types';
import { ShareButton } from '../shared/ShareButton';
import { motion, AnimatePresence } from 'framer-motion';

interface SavedVersesProps {
  verses: SavedVerse[];
  onDelete: (verse: SavedVerse) => void;
}

export function SavedVerses({ verses, onDelete }: SavedVersesProps) {
  const getVerseKey = (verse: SavedVerse, index: number) => {
    return `${verse.reference}-${index}-${verse.saved_at}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-6">
        <Bookmark className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Saved Verses
        </h2>
      </div>
      
      {verses.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-center py-4">
          No verses saved yet. Visit the Find Verses page to discover and save your favorite verses.
        </p>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {verses.map((verse, index) => (
              <motion.div
                key={getVerseKey(verse, index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {verse.reference}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <ShareButton
                      title="Bible Verse"
                      text={`${verse.reference}\n\n${verse.text}\n\nShared via Bible Me`}
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                    <button
                      onClick={() => onDelete(verse)}
                      className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {verse.text}
                </p>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{verse.translation}</span>
                  <span>Saved on {new Date(verse.saved_at).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}