import React from 'react';
import clsx from 'clsx';

interface DifficultySelectorProps {
  selectedDifficulty: string;
  onSelect: (difficulty: string) => void;
}

const difficulties = [
  { id: 'beginner', label: 'Beginner', time: 30 },
  { id: 'advanced', label: 'Advanced', time: 20 },
  { id: 'scholar', label: 'Scholar', time: 10 }
];

export function DifficultySelector({ selectedDifficulty, onSelect }: DifficultySelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
      {difficulties.map(({ id, label, time }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={clsx(
            'p-4 rounded-lg transition-all',
            'border-2',
            selectedDifficulty === id
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900'
              : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
          )}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {label}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {time} seconds per question
          </p>
        </button>
      ))}
    </div>
  );
}