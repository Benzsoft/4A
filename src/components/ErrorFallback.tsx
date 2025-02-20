import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { AlertCircle } from 'lucide-react';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {error.message}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}