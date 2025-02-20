import React from 'react';
import { BibleStudy } from '../../../types';
import { CheckCircle2, Circle } from 'lucide-react';
import clsx from 'clsx';

interface StudyProgressProps {
  study: BibleStudy;
}

export function StudyProgress({ study }: StudyProgressProps) {
  const progress = (study.currentDay / 30) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Study Progress
      </h2>
      
      <div className="mb-4">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {study.currentDay} of 30 days completed
        </p>
      </div>

      <div className="space-y-3">
        {study.lessons.slice(Math.max(0, study.currentDay - 3), study.currentDay + 2).map((lesson, index) => (
          <div
            key={lesson.day}
            className={clsx(
              'flex items-center p-3 rounded-lg',
              lesson.completed
                ? 'bg-green-50 dark:bg-green-900/30'
                : lesson.day === study.currentDay
                ? 'bg-indigo-50 dark:bg-indigo-900/30'
                : 'bg-gray-50 dark:bg-gray-800'
            )}
          >
            {lesson.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">
              Day {lesson.day}: {lesson.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}