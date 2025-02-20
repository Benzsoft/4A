import React, { useState } from 'react';
import { PenSquare, Calendar, Clock, Save, ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';
import { Prayer } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface PrayerJournalProps {
  prayers: Prayer[];
  onAddPrayer: (prayer: Omit<Prayer, 'id'>) => void;
  onEditPrayer: (id: string, content: string) => void;
  onDeletePrayer: (id: string) => void;
}

export function PrayerJournal({ prayers, onAddPrayer, onEditPrayer, onDeletePrayer }: PrayerJournalProps) {
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5));
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const datetime = new Date(`${date}T${time}`).toISOString();
    
    onAddPrayer({
      content,
      datetime,
      created_at: new Date().toISOString()
    });

    setContent('');
  };

  const handleEdit = (prayer: Prayer) => {
    setEditingId(prayer.id);
    setEditContent(prayer.content);
  };

  const handleSaveEdit = (id: string) => {
    onEditPrayer(id, editContent);
    setEditingId(null);
    setEditContent('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <PenSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Prayer Journal
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your prayer..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            rows={4}
          />
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Save Prayer</span>
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <AnimatePresence>
          {prayers.map((prayer) => (
            <motion.div
              key={prayer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-l-4 border-indigo-500 pl-4 py-2"
            >
              {editingId === prayer.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg resize-none"
                    rows={4}
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEdit(prayer.id)}
                      className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <p className={`text-gray-600 dark:text-gray-300 ${
                      expandedId !== prayer.id ? 'line-clamp-2' : ''
                    }`}>
                      {prayer.content}
                    </p>
                    <div className="flex items-center space-x-2 ml-2">
                      <button
                        onClick={() => handleEdit(prayer)}
                        className="p-1 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeletePrayer(prayer.id)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setExpandedId(expandedId === prayer.id ? null : prayer.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        {expandedId === prayer.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(prayer.datetime).toLocaleDateString()}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{new Date(prayer.datetime).toLocaleTimeString()}</span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}