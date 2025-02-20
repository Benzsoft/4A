import React from 'react';
import { formatTime } from '../../utils/audioUtils';

interface AudioProgressProps {
  progress: number;
  duration: number;
  currentTime: number;
  onProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function AudioProgress({
  progress,
  duration,
  currentTime,
  onProgressClick
}: AudioProgressProps) {
  return (
    <div className="space-y-2">
      <div
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