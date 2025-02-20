import React from 'react';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface StudyStreakProps {
  currentStreak: number;
  longestStreak: number;
}

export function StudyStreak({ currentStreak, longestStreak }: StudyStreakProps) {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
      <div className="flex items-center space-x-3 mb-4">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Flame className="w-8 h-8" />
        </motion.div>
        <h3 className="text-xl font-bold">Study Streak</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm opacity-90">Current Streak</p>
          <p className="text-3xl font-bold">{currentStreak}</p>
          <p className="text-sm opacity-90">days</p>
        </div>
        <div>
          <p className="text-sm opacity-90">Longest Streak</p>
          <p className="text-3xl font-bold">{longestStreak}</p>
          <p className="text-sm opacity-90">days</p>
        </div>
      </div>
    </div>
  );
}