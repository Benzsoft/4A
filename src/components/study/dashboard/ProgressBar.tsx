import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  total: number;
}

export function ProgressBar({ progress, total }: ProgressBarProps) {
  const percentage = (progress / total) * 100;

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="h-full bg-indigo-600 rounded-full"
      />
    </div>
  );
}