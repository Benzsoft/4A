import React from 'react';
import { Line } from 'lucide-react';
import { StudyInsight } from '../../types';

interface AnalyticsChartProps {
  insights: StudyInsight[];
}

export function AnalyticsChart({ insights }: AnalyticsChartProps) {
  const weeklyData = insights.reduce((acc, insight) => {
    const week = new Date(insight.study_date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit' 
    });
    
    acc[week] = (acc[week] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Study Activity
      </h3>
      <div className="h-48 flex items-end space-x-2">
        {Object.entries(weeklyData).map(([date, count]) => (
          <div key={date} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-indigo-600 rounded-t-lg transition-all duration-500"
              style={{ height: `${(count / Math.max(...Object.values(weeklyData))) * 100}%` }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 rotate-45">
              {date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}