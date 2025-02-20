import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import clsx from 'clsx';

interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious: boolean;
  disableNext: boolean;
}

export function AudioControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  disablePrevious,
  disableNext
}: AudioControlsProps) {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onPrevious}
        disabled={disablePrevious}
        className={clsx(
          "p-2 rounded-full",
          "hover:bg-gray-100 dark:hover:bg-gray-700",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        <SkipBack className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>

      <button
        onClick={onPlayPause}
        className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white" />
        )}
      </button>

      <button
        onClick={onNext}
        disabled={disableNext}
        className={clsx(
          "p-2 rounded-full",
          "hover:bg-gray-100 dark:hover:bg-gray-700",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        <SkipForward className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
}