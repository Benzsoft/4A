import React, { useState, useEffect } from 'react';
import { Book, Type, Search, Bookmark, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface BiblePreferences {
  version: string;
  fontSize: number;
  layout: 'single' | 'parallel';
  recentBooks: string[];
}

// Available Bible versions
const BIBLE_VERSIONS = [
  { id: 'kjv', name: 'King James Version (English)' },
  { id: 'Tagalog', name: 'Tagalog Bible (Modern)' },
  { id: 'x', name: 'Tagalog Bible (Classic)' }
];

const BOOKS = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
  'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms',
  'Proverbs', 'Ecclesiastes', 'Song of Solomon',
  'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel',
  'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah',
  'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
  'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts',
  'Romans', '1 Corinthians', '2 Corinthians',
  'Galatians', 'Ephesians', 'Philippians', 'Colossians',
  '1 Thessalonians', '2 Thessalonians', '1 Timothy',
  '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
  'James', '1 Peter', '2 Peter', '1 John', '2 John',
  '3 John', 'Jude', 'Revelation'
];

export default function Bible() {
  const [preferences, setPreferences] = useLocalStorage<BiblePreferences>('bible-preferences', {
    version: 'kjv',
    fontSize: 18,
    layout: 'single',
    recentBooks: []
  });

  const [selectedBook, setSelectedBook] = useState('John');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [chapters, setChapters] = useState<number[]>([]);
  const [verses, setVerses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Load Bible content
  useEffect(() => {
    const loadBibleContent = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // First check if the Bible version file exists
        const response = await fetch(`/bibles/${preferences.version}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load Bible version: ${preferences.version}`);
        }
        
        const data = await response.json();
        
        // Validate the data structure
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid Bible data format');
        }

        // Get available chapters for selected book
        const bookData = data[selectedBook];
        if (!bookData) {
          throw new Error(`Book "${selectedBook}" not found in this version`);
        }

        const bookChapters = Object.keys(bookData).map(Number).sort((a, b) => a - b);
        setChapters(bookChapters);

        // Get verses for selected chapter
        const chapterVerses = bookData[selectedChapter];
        if (!chapterVerses) {
          throw new Error(`Chapter ${selectedChapter} not found in ${selectedBook}`);
        }

        setVerses(Array.isArray(chapterVerses) ? chapterVerses : []);

        // Update recent books
        if (!preferences.recentBooks.includes(selectedBook)) {
          const updatedRecent = [selectedBook, ...preferences.recentBooks.slice(0, 4)];
          setPreferences({ ...preferences, recentBooks: updatedRecent });
        }
      } catch (error) {
        console.error('Error loading Bible content:', error);
        setError(error instanceof Error ? error.message : 'Failed to load Bible content');
        setVerses([]);
        setChapters([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBibleContent();
  }, [preferences.version, selectedBook, selectedChapter]);

  const handleVersionChange = (newVersion: string) => {
    setIsLoading(true);
    setError(null);
    setPreferences({ ...preferences, version: newVersion });
    setSelectedChapter(1);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const bookMatch = BOOKS.find(book => 
      book.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (bookMatch) {
      setSelectedBook(bookMatch);
      setSelectedChapter(1);
      setSearchQuery('');
    } else {
      toast.error('Book not found');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Version Selector - Primary Focus */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Select Bible Version
        </label>
        <select
          value={preferences.version}
          onChange={(e) => handleVersionChange(e.target.value)}
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-indigo-500 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
        >
          {BIBLE_VERSIONS.map(version => (
            <option key={version.id} value={version.id}>
              {version.name}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-200">
                {error}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Navigation Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Book Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Book
              </label>
              <div className="flex space-x-2">
                <select
                  value={selectedBook}
                  onChange={(e) => {
                    setSelectedBook(e.target.value);
                    setSelectedChapter(1);
                  }}
                  className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                >
                  {BOOKS.map(book => (
                    <option key={book} value={book}>{book}</option>
                  ))}
                </select>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search book..."
                    className="w-40 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <Search className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chapter Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Chapter
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedChapter(prev => Math.max(1, prev - 1))}
                  disabled={selectedChapter <= 1}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <select
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(Number(e.target.value))}
                  className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                >
                  {chapters.map((num) => (
                    <option key={num} value={num}>Chapter {num}</option>
                  ))}
                </select>
                <button
                  onClick={() => setSelectedChapter(prev => Math.min(prev + 1, chapters.length))}
                  disabled={selectedChapter >= chapters.length}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Font Size Control */}
          <div className="flex items-center justify-end space-x-4 mb-6">
            <span className="text-sm text-gray-600 dark:text-gray-300">Font Size:</span>
            <button
              onClick={() => setPreferences({ ...preferences, fontSize: Math.max(12, preferences.fontSize - 2) })}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Type className="w-4 h-4" />
            </button>
            <span className="text-gray-600 dark:text-gray-300">
              {preferences.fontSize}px
            </span>
            <button
              onClick={() => setPreferences({ ...preferences, fontSize: Math.min(24, preferences.fontSize + 2) })}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Type className="w-5 h-5" />
            </button>
          </div>

          {/* Bible Content */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {selectedBook} {selectedChapter}
              </h1>
              <div className="space-y-4">
                {verses.map((verse, index) => (
                  <div
                    key={index}
                    className="group relative hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mr-2">
                      {index + 1}
                    </span>
                    <span 
                      className="text-gray-900 dark:text-white"
                      style={{ fontSize: `${preferences.fontSize}px` }}
                    >
                      {verse}
                    </span>
                    <div className="absolute right-2 top-2 hidden group-hover:flex items-center space-x-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`${selectedBook} ${selectedChapter}:${index + 1} - ${verse}`);
                          toast.success('Verse copied to clipboard');
                        }}
                        className="p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toast.success('Verse bookmarked!')}
                        className="p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Navigation Footer */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setSelectedChapter(prev => Math.max(1, prev - 1))}
              disabled={selectedChapter <= 1}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous Chapter</span>
            </button>
            <button
              onClick={() => setSelectedChapter(prev => Math.min(prev + 1, chapters.length))}
              disabled={selectedChapter >= chapters.length}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <span>Next Chapter</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}