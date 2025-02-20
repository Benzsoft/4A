import React from 'react';
import { PlayerHeader } from './PlayerHeader';
import { AudioControls } from './AudioControls';
import { AudioProgress } from './AudioProgress';
import { VolumeControl } from './VolumeControl';

interface MaximizedPlayerProps {
  title: string;
  isPlaying: boolean;
  currentTrackIndex: number;
  totalTracks: number;
  progress: number;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  onMinimize: () => void;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onVolumeChange: (value: number) => void;
  onMuteToggle: () => void;
  onProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function MaximizedPlayer({
  title,
  isPlaying,
  currentTrackIndex,
  totalTracks,
  progress,
  duration,
  currentTime,
  volume,
  isMuted,
  onMinimize,
  onPlayPause,
  onPrevious,
  onNext,
  onVolumeChange,
  onMuteToggle,
  onProgressClick
}: MaximizedPlayerProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-xl mx-auto">
      <PlayerHeader title={title} onMinimize={onMinimize} />

      <div className="space-y-3">
        <AudioProgress
          progress={progress}
          duration={duration}
          currentTime={currentTime}
          onProgressClick={onProgressClick}
        />

        <div className="flex items-center justify-between">
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={onVolumeChange}
            onMuteToggle={onMuteToggle}
          />

          <AudioControls
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            onPrevious={onPrevious}
            onNext={onNext}
            disablePrevious={currentTrackIndex === 0}
            disableNext={currentTrackIndex === totalTracks - 1}
          />

          <div className="w-[88px]" />
        </div>
      </div>
    </div>
  );
}