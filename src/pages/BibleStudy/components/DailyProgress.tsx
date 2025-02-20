import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import clsx from 'clsx';

interface DailyProgressProps {
  className?: string;
}

const activities = [
  { id: 1, time: '9:00 AM', title: 'Morning Reading', completed: true },
  { id: 2, time: '9:15 AM', title: 'Reflection', completed: true },
  { id: 3, time: '9:30 AM', title: 'Prayer Time', completed: false },
  { id: 4, time: '7:00 PM', title: 'Evening Study', completed: false },
  { id: 5, time: '7:30 PM', title: 'Group Discussion', completed: false }
];

export function DailyProgress({ className }: DailyProgressProps) {
  return (
    <div className={clsx('bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6', className)}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Today's Progress
      </h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={clsx(
              'flex items-center p-4 rounded-lg',
              activity.completed
                ? 'bg-green-50 dark:bg-green-900/30'
                : 'bg-gray-50 dark:bg-gray-700/30'
            )}
          >
            {activity.completed ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400" />
            )}
            <div className="ml-4 flex-grow">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {activity.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}