import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span>Made with the  </span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            <span> of God by</span>
            <a
              href="https://github.com/Benzsoft/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              Rubbens
            </a>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 Copyrighted
          </div>
        </div>
      </div>
    </footer>
  );
}