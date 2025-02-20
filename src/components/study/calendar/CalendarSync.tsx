import React, { useState } from 'react';
import { Calendar, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CalendarSyncProps {
  readingTime: string;
  onSync: (provider: 'google' | 'apple') => Promise<void>;
}

export function CalendarSync({ readingTime, onSync }: CalendarSyncProps) {
  const [syncing, setSyncing] = useState<'google' | 'apple' | null>(null);
  const [synced, setSynced] = useState<'google' | 'apple' | null>(null);

  const handleSync = async (provider: 'google' | 'apple') => {
    try {
      setSyncing(provider);
      await onSync(provider);
      setSynced(provider);
      setTimeout(() => setSynced(null), 3000);
    } catch (error) {
      console.error('Calendar sync error:', error);
    } finally {
      setSyncing(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Sync with Calendar
        </h3>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Add your daily reading time ({readingTime}) to your calendar
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSync('google')}
          disabled={syncing === 'google'}
          className="flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
        >
          {syncing === 'google' ? (
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          ) : synced === 'google' ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <img src="/google-calendar.svg" alt="Google Calendar" className="w-5 h-5" />
          )}
          <span className="text-gray-900 dark:text-white">Google Calendar</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSync('apple')}
          disabled={syncing === 'apple'}
          className="flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
        >
          {syncing === 'apple' ? (
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          ) : synced === 'apple' ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <img src="/apple-calendar.svg" alt="Apple Calendar" className="w-5 h-5" />
          )}
          <span className="text-gray-900 dark:text-white">Apple Calendar</span>
        </motion.button>
      </div>
    </div>
  );
}