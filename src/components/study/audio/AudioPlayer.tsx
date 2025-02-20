import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, FastForward, Rewind } from 'lucide-react';
import { motion } from 'framer-motion';
import { getStorageItem, setStorageItem } from '../../../utils/storage';

interface AudioPlayerProps {
  text: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

interface AudioCache {
  text: string;
  timestamp: number;
}

const CACHE_KEY = 'audio_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function AudioPlayer({ text, onPlayStateChange }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      // Set default to first English voice, fallback to any voice
      const englishVoice = voices.find(voice => voice.lang.startsWith('en')) || voices[0];
      setSelectedVoice(englishVoice || null);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Check cache and initialize speech
  useEffect(() => {
    const cached = getStorageItem<AudioCache>(CACHE_KEY, { text: '', timestamp: 0 });
    const now = Date.now();

    // Clear expired cache
    if (now - cached.timestamp > CACHE_DURATION) {
      setStorageItem(CACHE_KEY, { text: '', timestamp: 0 });
    }

    // Initialize speech with cached settings if available
    if (cached.text === text && now - cached.timestamp < CACHE_DURATION) {
      initializeSpeech(text);
    }
  }, [text]);

  const initializeSpeech = (text: string) => {
    if (!speechRef.current) {
      speechRef.current = new SpeechSynthesisUtterance(text);
      speechRef.current.volume = volume;
      speechRef.current.rate = speed;
      if (selectedVoice) {
        speechRef.current.voice = selectedVoice;
      }
      speechRef.current.onend = () => {
        setIsPlaying(false);
        onPlayStateChange?.(false);
      };

      // Cache the text
      setStorageItem(CACHE_KEY, {
        text,
        timestamp: Date.now()
      });
    }
  };

  const togglePlay = () => {
    initializeSpeech(text);

    if (isPlaying) {
      window.speechSynthesis.cancel();
    } else if (speechRef.current) {
      window.speechSynthesis.speak(speechRef.current);
    }

    setIsPlaying(!isPlaying);
    onPlayStateChange?.(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (speechRef.current) {
      speechRef.current.volume = newVolume;
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (speechRef.current) {
      speechRef.current.rate = newSpeed;
    }
  };

  const handleVoiceChange = (voice: SpeechSynthesisVoice) => {
    setSelectedVoice(voice);
    if (speechRef.current) {
      speechRef.current.voice = voice;
      // Restart speech if playing
      if (isPlaying) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speechRef.current);
      }
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      handleVolumeChange(1);
    } else {
      handleVolumeChange(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Play className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-24 accent-indigo-600"
        />

        <div className="flex items-center space-x-2">
          <Rewind className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          <select
            value={speed}
            onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
            className="bg-transparent text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
          >
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
          <FastForward className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">Voice:</span>
        <select
          value={selectedVoice?.name || ''}
          onChange={(e) => {
            const voice = availableVoices.find(v => v.name === e.target.value);
            if (voice) handleVoiceChange(voice);
          }}
          className="flex-grow bg-transparent text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
        >
          {availableVoices.map(voice => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}