import React from 'react';
import { Music } from 'lucide-react';

interface MinimizedPlayerProps {
  onMaximize: () => void;
}

export function MinimizedPlayer({ onMaximize }: MinimizedPlayerProps) {
  return (
    <div className="fixed bottom-36 right-4 z-50">
      <button 
        onClick={onMaximize}
        className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors shadow-lg"
      >
        <Music className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}