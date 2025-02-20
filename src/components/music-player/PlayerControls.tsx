import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import clsx from 'clsx';

interface PlayerControlsProps {
  isPlaying: boolean;
  currentTrackIndex: number;
  totalTracks: number;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function PlayerControls({
  isPlaying,
  currentTrackIndex,
  totalTracks,
  onPlayPause,
  onPrevious,
  onNext
}: PlayerControlsProps) {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onPrevious}
        disabled={currentTrackIndex === 0}
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
        disabled={currentTrackIndex === totalTracks - 1}
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