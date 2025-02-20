import { BibleBook, BibleChapter } from '../types';

// Define available translations
export const BIBLE_TRANSLATIONS = [
  { id: 'kjv', name: 'King James Version', language: 'English' }
];

export async function loadBibleText(translation: string = 'kjv'): Promise<any> {
  try {
    const response = await fetch(`/bibles/${translation}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load Bible text: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading Bible text:', error);
    throw error;
  }
}

export function getBooks(bibleData: any): string[] {
  if (!bibleData) return [];
  return Object.keys(bibleData).sort();
}

export function getChapters(bibleData: any, book: string): number[] {
  if (!bibleData || !bibleData[book]) return [];
  return Object.keys(bibleData[book]).map(Number).sort((a, b) => a - b);
}

export function getVerses(bibleData: any, book: string, chapter: number): string[] {
  if (!bibleData || !bibleData[book] || !bibleData[book][chapter]) return [];
  return bibleData[book][chapter];
}

export function getChapterText(bibleData: any, book: string, chapter: number): string[] {
  try {
    return getVerses(bibleData, book, chapter);
  } catch (error) {
    console.error('Error getting chapter text:', error);
    return [];
  }
}