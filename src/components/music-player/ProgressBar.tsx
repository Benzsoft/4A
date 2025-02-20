import React, { forwardRef } from 'react';
import { formatTime } from '../../utils/audioUtils';

interface ProgressBarProps {
  progress: number;
  currentTime: number;
  duration: number;
  onProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ progress, currentTime, duration, onProgressClick }, ref) => {
    return (
      <div className="space-y-2">
        <div
          ref={ref}
          className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
          onClick={onProgressClick}
        >
          <div
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';