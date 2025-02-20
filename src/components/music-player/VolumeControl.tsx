import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (value: number) => void;
  onMuteToggle: () => void;
}

export function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle
}: VolumeControlProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onMuteToggle}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={isMuted ? 0 : volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-24"
      />
    </div>
  );
}