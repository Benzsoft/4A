import React from 'react';
import { MinimizeIcon } from 'lucide-react';

interface PlayerHeaderProps {
  title: string;
  onMinimize: () => void;
}

export function PlayerHeader({ title, onMinimize }: PlayerHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <button
          onClick={onMinimize}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <MinimizeIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <div className="text-center">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
    </>
  );
}