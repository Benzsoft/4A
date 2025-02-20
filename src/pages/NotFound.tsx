import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <FileQuestion className="w-24 h-24 text-indigo-600 dark:text-indigo-400 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}