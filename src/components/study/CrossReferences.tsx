import React from 'react';
import { ExternalLink } from 'lucide-react';

interface CrossReferencesProps {
  references: Array<{
    verse: string;
    text: string;
  }>;
}

export function CrossReferences({ references }: CrossReferencesProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
        Cross References
      </h4>
      <div className="space-y-3">
        {references.map((ref, index) => (
          <div key={index} className="flex items-start space-x-2">
            <ExternalLink className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {ref.verse}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {ref.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}