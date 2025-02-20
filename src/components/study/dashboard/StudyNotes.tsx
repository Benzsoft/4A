import React, { useState } from 'react';
import { PenSquare, Save } from 'lucide-react';
import { motion } from 'framer-motion';

interface StudyNotesProps {
  notes: string;
  onSave: (notes: string) => void;
}

export function StudyNotes({ notes: initialNotes, onSave }: StudyNotesProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(notes);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <PenSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Study Notes
          </h3>
        </div>
        {isEditing && (
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Write your study notes here..."
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 cursor-text overflow-y-auto"
        >
          {notes || 'Click to add notes...'}
        </div>
      )}
    </motion.div>
  );
}