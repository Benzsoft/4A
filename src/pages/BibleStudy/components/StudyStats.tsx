import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

interface StudyStatsProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

export function StudyStats({ icon, title, value, trend, trendUp }: StudyStatsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          {icon}
        </div>
        <div className={clsx(
          'flex items-center text-sm',
          trendUp ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'
        )}>
          {trendUp ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
        </div>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </h3>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {trend}
        </p>
      </div>
    </div>
  );
}