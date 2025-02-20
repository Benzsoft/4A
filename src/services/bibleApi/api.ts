import axios from 'axios';
import { Verse } from '../../types';
import { BibleBook, BibleChapter } from './types';
import { apiCache } from './cache';
import { 
  isChapterCached, 
  getCachedChapter, 
  cacheChapter, 
  filterVersesByQuery 
} from './utils';

const BASE_URL = 'https://cdn.jsdelivr.net/gh/wldeh/bible-api';
const DEFAULT_VERSION = 'en-kjv';

async function fetchBooks(): Promise<BibleBook[]> {
  if (apiCache.books) {
    return apiCache.books;
  }

  try {
    const response = await axios.get(`${BASE_URL}/bibles/${DEFAULT_VERSION}/books.json`);
    const books = response.data.map((name: string) => ({
      name,
      chapters: Array.from({ length: 50 }, (_, i) => i + 1)
    }));
    
    apiCache.books = books;
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

async function fetchChapter(book: string, chapter: string): Promise<BibleChapter | null> {
  if (isChapterCached(book, chapter)) {
    return getCachedChapter(book, chapter)!;
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/bibles/${DEFAULT_VERSION}/books/${book.toLowerCase()}/chapters/${chapter}.json`
    );
    
    const chapterData = response.data;
    cacheChapter(book, chapter, chapterData);
    return chapterData;
  } catch (error) {
    console.error(`Error fetching chapter ${chapter} of ${book}:`, error);
    return null;
  }
}

export async function searchVerses(query: string): Promise<Verse[]> {
  try {
    const books = await fetchBooks();
    const searchResults: Verse[] = [];
    
    for (const book of books.slice(0, 10)) {
      if (searchResults.length >= 7) break;
      
      for (const chapter of book.chapters.slice(0, 3)) {
        if (searchResults.length >= 7) break;
        
        const chapterData = await fetchChapter(book.name, chapter.toString());
        if (!chapterData) continue;
        
        const matches = filterVersesByQuery(chapterData, query);
        const verses = matches.map(([verse, text]) => ({
          reference: `${book.name} ${chapter}:${verse}`,
          text,
          translation: 'KJV'
        }));
        
        searchResults.push(...verses);
      }
    }

    const finalResults = searchResults.slice(0, 7);
    if (finalResults.length === 0) {
      throw new Error('No verses found for your query');
    }

    return finalResults;
  } catch (error) {
    console.error('Error searching verses:', error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('No verses found for your query');
    }
    throw new Error('Failed to fetch verses. Please try again.');
  }
}