import React, { useState } from 'react';
import { Book, Volume2, Bookmark, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReadingContentProps {
  content: {
    reference: string;
    text: string;
    verses: { number: number; text: string }[];
  };
  onAnnotate: (verseNumber: number, type: 'highlight' | 'bookmark') => void;
}

export function ReadingContent({ content, onAnnotate }: ReadingContentProps) {
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement audio playback
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Book className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {content.reference}
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePlay}
            className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => {/* TODO: Implement sharing */}}
            className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        {content.verses.map((verse) => (
          <div
            key={verse.number}
            className={`p-2 rounded-lg transition-colors ${
              selectedVerse === verse.number
                ? 'bg-indigo-50 dark:bg-indigo-900/30'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
            onClick={() => setSelectedVerse(verse.number)}
          >
            <div className="flex items-start space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {verse.number}
              </span>
              <div className="flex-grow">
                <p>{verse.text}</p>
                {selectedVerse === verse.number && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <button
                      onClick={() => onAnnotate(verse.number, 'highlight')}
                      className="text-sm px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full"
                    >
                      Highlight
                    </button>
                    <button
                      onClick={() => onAnnotate(verse.number, 'bookmark')}
                      className="text-sm px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}