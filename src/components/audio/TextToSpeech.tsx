import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

interface TextToSpeechProps {
  text: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export function TextToSpeech({ text, onPlayStateChange }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  React.useEffect(() => {
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

  const togglePlay = () => {
    if (!utteranceRef.current) {
      utteranceRef.current = new SpeechSynthesisUtterance(text);
      utteranceRef.current.volume = volume;
      if (selectedVoice) {
        utteranceRef.current.voice = selectedVoice;
      }
      utteranceRef.current.onend = () => {
        setIsPlaying(false);
        onPlayStateChange?.(false);
      };
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
    } else if (utteranceRef.current) {
      window.speechSynthesis.speak(utteranceRef.current);
    }

    setIsPlaying(!isPlaying);
    onPlayStateChange?.(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (utteranceRef.current) {
      utteranceRef.current.volume = newVolume;
    }
  };

  const handleVoiceChange = (voice: SpeechSynthesisVoice) => {
    setSelectedVoice(voice);
    if (utteranceRef.current) {
      utteranceRef.current.voice = voice;
      if (isPlaying) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utteranceRef.current);
      }
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
      <button
        onClick={togglePlay}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Play className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleVolumeChange(isMuted ? 1 : 0)}
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
      </div>

      <select
        value={selectedVoice?.name || ''}
        onChange={(e) => {
          const voice = availableVoices.find(v => v.name === e.target.value);
          if (voice) handleVoiceChange(voice);
        }}
        className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
      >
        {availableVoices.map(voice => (
          <option key={voice.name} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
    </div>
  );
}