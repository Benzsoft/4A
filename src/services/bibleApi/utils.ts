import { BibleBook, BibleChapter } from './types';
import { apiCache } from './cache';

export function getCacheKey(book: string, chapter: string): string {
  return `${book.toLowerCase()}-${chapter}`;
}

export function isChapterCached(book: string, chapter: string): boolean {
  return !!apiCache.chapters[getCacheKey(book, chapter)];
}

export function getCachedChapter(book: string, chapter: string): BibleChapter | undefined {
  return apiCache.chapters[getCacheKey(book, chapter)];
}

export function cacheChapter(book: string, chapter: string, data: BibleChapter): void {
  apiCache.chapters[getCacheKey(book, chapter)] = data;
}

export function filterVersesByQuery(chapter: BibleChapter, query: string): Array<[string, string]> {
  return Object.entries(chapter).filter(([_, text]) => 
    text.toLowerCase().includes(query.toLowerCase())
  );
}