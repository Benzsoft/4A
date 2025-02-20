import React from 'react';
import { Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AchievementPopupProps {
  title: string;
  description: string;
  onClose: () => void;
}

export function AchievementPopup({ title, description, onClose }: AchievementPopupProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm"
      >
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
            <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Achievement Unlocked!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}