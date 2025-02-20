import React from 'react';
import { Clock, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimeSelectionProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

export function TimeSelection({ selectedTime, onSelectTime }: TimeSelectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Choose Your Daily Reading Time
        </h3>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => onSelectTime(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300"
        >
          <Bell className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>You'll receive a notification 15 minutes before your reading time</span>
        </motion.div>
      </div>
    </div>
  );
}