import React from 'react';
import { BibleStudy } from '../../../types';
import { Trophy, Flame, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface GlobalProgressProps {
  study: BibleStudy;
}

export function GlobalProgress({ study }: GlobalProgressProps) {
  const progress = (study.progress.completed / 30) * 100;
  const lastStudyDate = new Date(study.progress.lastStudyDate);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Global Progress
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(progress)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <Flame className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Streak</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {study.progress.streak} days
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last Study</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatDistanceToNow(lastStudyDate, { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}