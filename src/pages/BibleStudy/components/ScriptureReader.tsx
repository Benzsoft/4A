import React, { useState } from 'react';
import { Book, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface ScriptureReaderProps {
  reference: string;
}

export function ScriptureReader({ reference }: ScriptureReaderProps) {
  const [fontSize, setFontSize] = useState('medium');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Book className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Scripture Reading
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFontSize('small')}
            className={clsx(
              'p-2 rounded-lg',
              fontSize === 'small' ? 'bg-indigo-100 dark:bg-indigo-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            A
          </button>
          <button
            onClick={() => setFontSize('medium')}
            className={clsx(
              'p-2 rounded-lg text-lg',
              fontSize === 'medium' ? 'bg-indigo-100 dark:bg-indigo-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            A
          </button>
          <button
            onClick={() => setFontSize('large')}
            className={clsx(
              'p-2 rounded-lg text-xl',
              fontSize === 'large' ? 'bg-indigo-100 dark:bg-indigo-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            A
          </button>
        </div>
      </div>

      <div className="relative">
        <button className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div 
          className={clsx(
            'px-12 py-4 text-gray-700 dark:text-gray-300',
            fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-xl' : 'text-base'
          )}
        >
          {reference}
        </div>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}