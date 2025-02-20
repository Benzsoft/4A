import React, { useState } from 'react';
import { useAudioTracks } from '../utils/audioUtils';
import { useAudioPlayer } from './audio/useAudioPlayer';
import { MinimizedPlayer } from './audio/MinimizedPlayer';
import { MaximizedPlayer } from './audio/MaximizedPlayer';

export function MusicPlayer() {
  const tracks = useAudioTracks();
  const [isMinimized, setIsMinimized] = useState(false);
  
  const {
    audioRef,
    currentTrackIndex,
    isPlaying,
    volume,
    isMuted,
    progress,
    duration,
    setCurrentTrackIndex,
    setIsPlaying,
    setVolume,
    setIsMuted,
    handleProgressClick
  } = useAudioPlayer(tracks);

  if (!tracks.length) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex]?.path}
        preload="metadata"
      />
      
      {isMinimized ? (
        <MinimizedPlayer onMaximize={() => setIsMinimized(false)} />
      ) : (
        <div className="max-w-xl mx-auto"> {/* Changed from max-w-2xl to max-w-xl */}
          <MaximizedPlayer
            title={tracks[currentTrackIndex]?.title}
            isPlaying={isPlaying}
            currentTrackIndex={currentTrackIndex}
            totalTracks={tracks.length}
            progress={progress}
            duration={duration}
            currentTime={audioRef.current?.currentTime || 0}
            volume={volume}
            isMuted={isMuted}
            onMinimize={() => setIsMinimized(true)}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onPrevious={() => currentTrackIndex > 0 && setCurrentTrackIndex(prev => prev - 1)}
            onNext={() => currentTrackIndex < tracks.length - 1 && setCurrentTrackIndex(prev => prev + 1)}
            onVolumeChange={setVolume}
            onMuteToggle={() => setIsMuted(!isMuted)}
            onProgressClick={handleProgressClick}
          />
        </div>
      )}
    </>
  );
}