import React from 'react';
import { Trophy, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '../../../types/bibleStudy';

interface AchievementListProps {
  badges: Badge[];
}

export function AchievementList({ badges }: AchievementListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Trophy className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Achievements
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border-2 ${
              badge.unlockedAt
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                : 'border-gray-200 dark:border-gray-700 opacity-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              {badge.unlockedAt ? (
                <img src={badge.icon} alt={badge.name} className="w-8 h-8" />
              ) : (
                <Lock className="w-8 h-8 text-gray-400" />
              )}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {badge.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {badge.description}
                </p>
                {badge.unlockedAt && (
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                    Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}