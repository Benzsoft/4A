import React, { useState } from 'react';
import { Send } from 'lucide-react';

export function PrayerJournal() {
  const [prayer, setPrayer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle prayer submission
    setPrayer('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Prayer Journal
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={prayer}
          onChange={(e) => setPrayer(e.target.value)}
          placeholder="Write your prayer or reflection..."
          className="w-full h-40 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        />
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Send className="w-5 h-5" />
          <span>Save Prayer</span>
        </button>
      </form>
      <div className="mt-6">
        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
          Recent Prayers
        </h3>
        <div className="space-y-4">
          {/* Placeholder for recent prayers */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Thank you Lord for your guidance and protection...
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
              2 hours ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}