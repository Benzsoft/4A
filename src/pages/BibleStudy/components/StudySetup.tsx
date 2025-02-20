import React, { useState } from 'react';
import { generateLessons } from '../../../services/bibleStudyApi';
import { BibleStudy } from '../../../types';
import { Book, Clock, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface StudySetupProps {
  onStartStudy: (study: BibleStudy) => void;
}

const bibleBooks = {
  'Old Testament': [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
    'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
    '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
    'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms',
    'Proverbs', 'Ecclesiastes', 'Song of Solomon',
    'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel',
    'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah',
    'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
    'Haggai', 'Zechariah', 'Malachi'
  ],
  'New Testament': [
    'Matthew', 'Mark', 'Luke', 'John', 'Acts',
    'Romans', '1 Corinthians', '2 Corinthians',
    'Galatians', 'Ephesians', 'Philippians', 'Colossians',
    '1 Thessalonians', '2 Thessalonians', '1 Timothy',
    '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
    'James', '1 Peter', '2 Peter', '1 John', '2 John',
    '3 John', 'Jude', 'Revelation'
  ]
};

export function StudySetup({ onStartStudy }: StudySetupProps) {
  const [selectedBook, setSelectedBook] = useState('');
  const [preferredTime, setPreferredTime] = useState('09:00');
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleStartStudy = async () => {
    if (!selectedBook || !preferredTime || !agreed) {
      toast.error('Please fill in all fields and agree to commit to the study.');
      return;
    }

    setIsLoading(true);
    try {
      const lessons = await generateLessons(selectedBook);
      const study: BibleStudy = {
        book: selectedBook,
        startDate: new Date().toISOString(),
        preferredTime,
        currentDay: 1,
        lessons,
      };
      
      onStartStudy(study);
      toast.success('Your Bible study plan has been created!');
    } catch (error) {
      console.error('Error starting study:', error);
      toast.error('Failed to create study plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="text-center mb-8">
        <Book className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Start Your 30-Day Bible Study
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Choose a book of the Bible and set your preferred study time
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select a Book
          </label>
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Choose a book...</option>
            <optgroup label="Old Testament">
              {bibleBooks['Old Testament'].map((book) => (
                <option key={book} value={book}>{book}</option>
              ))}
            </optgroup>
            <optgroup label="New Testament">
              {bibleBooks['New Testament'].map((book) => (
                <option key={book} value={book}>{book}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preferred Study Time
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="time"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex items-center h-5">
            <input
              id="agreement"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>
          <label htmlFor="agreement" className="text-sm text-gray-600 dark:text-gray-300">
            I commit to completing this 30-day study plan and understand I'll receive notifications
            20 minutes before my scheduled study time.
          </label>
        </div>

        <button
          onClick={handleStartStudy}
          disabled={isLoading || !selectedBook || !preferredTime || !agreed}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating Your Plan...</span>
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              <span>Start Bible Study</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}