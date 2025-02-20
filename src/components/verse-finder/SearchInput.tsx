import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function SearchInput({ value, onChange, onSearch, isLoading }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative max-w-2xl mx-auto">
        <div
          className={clsx(
            'relative flex items-center transition-all duration-300',
            isFocused ? 'transform scale-105' : ''
          )}
        >
          <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="How are you feeling today? Or search any biblical topic..."
            className="w-full pl-12 pr-24 py-4 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!value.trim() || isLoading}
            className="absolute right-2 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span>Search</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}