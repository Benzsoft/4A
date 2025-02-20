import React, { useState } from 'react';
import { Highlight } from 'lucide-react';

interface HighlightableTextProps {
  text: string;
  onHighlight: (highlight: string) => void;
}

export function HighlightableText({ text, onHighlight }: HighlightableTextProps) {
  const [selectedText, setSelectedText] = useState('');

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString());
    }
  };

  return (
    <div className="relative group">
      <div 
        onMouseUp={handleTextSelection}
        className="prose dark:prose-invert max-w-none"
      >
        {text}
      </div>
      {selectedText && (
        <button
          onClick={() => onHighlight(selectedText)}
          className="absolute top-0 right-0 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Highlight className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
        </button>
      )}
    </div>
  );
}