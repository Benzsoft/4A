import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertCircle } from 'lucide-react';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          {error.message}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export function ErrorBoundaryProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}