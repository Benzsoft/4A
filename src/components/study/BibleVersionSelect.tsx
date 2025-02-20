import React from 'react';
import { Book } from 'lucide-react';
import { BibleVersion } from '../../types/bibleStudy';
import { motion } from 'framer-motion';

const BIBLE_VERSIONS: BibleVersion[] = [
  { id: 'kjv', name: 'King James Version', abbreviation: 'KJV' },
  { id: 'niv', name: 'New International Version', abbreviation: 'NIV' },
  { id: 'esv', name: 'English Standard Version', abbreviation: 'ESV' }
];

interface BibleVersionSelectProps {
  selectedVersion: string;
  onSelectVersion: (version: BibleVersion) => void;
}

export function BibleVersionSelect({ selectedVersion, onSelectVersion }: BibleVersionSelectProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {BIBLE_VERSIONS.map((version) => (
        <motion.button
          key={version.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectVersion(version)}
          className={`p-4 rounded-lg text-left transition-colors ${
            selectedVersion === version.id
              ? 'bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-500'
              : 'bg-white dark:bg-gray-800 border-2 border-transparent'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Book className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {version.abbreviation}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {version.name}
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}