import { useState, useEffect } from 'react';
import { AudioTrack } from '../types';

export function useAudioTracks() {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);

  useEffect(() => {
    // Dynamically load audio files from the public/audio directory
    const loadAudioFiles = async () => {
      try {
        // This will match all .mp3 files in the public/audio directory
        const audioFiles = import.meta.glob('/public/audio/*.mp3');
        const trackList: AudioTrack[] = [];
        
        for (const path in audioFiles) {
          const fileName = path.split('/').pop() || '';
          const title = fileName
            .replace('.mp3', '')
            .replace(/_/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          trackList.push({
            id: fileName,
            title,
            path: path.replace('/public', '')
          });
        }

        setTracks(trackList.sort((a, b) => a.title.localeCompare(b.title)));
      } catch (error) {
        console.error('Error loading audio files:', error);
      }
    };

    loadAudioFiles();
  }, []);

  return tracks;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}