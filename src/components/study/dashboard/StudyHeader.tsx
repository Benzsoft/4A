import React from 'react';
import { Clock, Calendar } from 'lucide-react';

interface StudyHeaderProps {
  title: string;
  currentDay: number;
  totalDays: number;
  readingTime: string;
}

export function StudyHeader({ title, currentDay, totalDays, readingTime }: StudyHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Day {currentDay} of {totalDays}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{readingTime}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-300">Progress</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {Math.round((currentDay / totalDays) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}