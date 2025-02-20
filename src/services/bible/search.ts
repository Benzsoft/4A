import { Verse } from '../../types';
import { BibleSearchOptions, BibleSearchResult } from './types';

const DEFAULT_VERSES = [
  { reference: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', translation: 'KJV' },
  { reference: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.', translation: 'KJV' },
  { reference: 'Psalm 23:1', text: 'The Lord is my shepherd; I shall not want.', translation: 'KJV' },
  { reference: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', translation: 'KJV' },
  { reference: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.', translation: 'KJV' },
  { reference: 'Proverbs 3:5-6', text: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', translation: 'KJV' },
  { reference: 'Isaiah 40:31', text: 'But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.', translation: 'KJV' }
];

export async function searchVerses(options: BibleSearchOptions): Promise<BibleSearchResult> {
  try {
    // For now, return default verses filtered by query
    const query = options.query.toLowerCase();
    const verses = DEFAULT_VERSES.filter(verse => 
      verse.text.toLowerCase().includes(query) || 
      verse.reference.toLowerCase().includes(query)
    );
    
    return {
      verses: verses.slice(0, options.limit || 7),
      total: verses.length
    };
  } catch (error) {
    console.error('Error searching verses:', error);
    throw new Error('Failed to fetch verses. Please try again.');
  }
}