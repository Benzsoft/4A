import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import clsx from 'clsx';

interface AudioTrack {
  id: string;
  title: string;
  url: string;
}

export function AudioPlayer() {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
        setProgress(0);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, tracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * audioRef.current.duration;
    
    audioRef.current.currentTime = time;
    setProgress(percent * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex]?.url}
        preload="metadata"
      />

      {tracks.length > 0 ? (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
              {tracks[currentTrackIndex]?.title || 'No track selected'}
            </h3>
          </div>

          <div className="space-y-4">
            <div
              ref={progressBarRef}
              className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
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
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24"
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePrevious}
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
                  onClick={togglePlay}
                  className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentTrackIndex === tracks.length - 1}
                  className={clsx(
                    "p-2 rounded-full",
                    "hover:bg-gray-100 dark:hover:bg-gray-700",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <SkipForward className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              <div className="w-[88px]" /> {/* Spacer to balance the volume controls */}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No audio files available
        </div>
      )}
    </div>
  );
}