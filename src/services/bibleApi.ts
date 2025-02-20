import { searchVerses as aiSearchVerses } from './ai';
import { Verse } from '../types';
import toast from 'react-hot-toast';

const DEFAULT_VERSES = [
  { reference: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', translation: 'KJV' },
  { reference: 'Psalm 23:1', text: 'The Lord is my shepherd; I shall not want.', translation: 'KJV' },
  { reference: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.', translation: 'KJV' },
  { reference: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.', translation: 'KJV' },
  { reference: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', translation: 'KJV' }
];

export async function searchVerses(query: string): Promise<Verse[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    // Try AI search first
    const verses = await aiSearchVerses(query);
    
    if (verses && verses.length > 0) {
      return verses.map(verse => {
        const [reference, text] = verse.split(' - ').map(part => part.trim());
        return {
          reference,
          text: text.replace(/^"|"$/g, ''),
          translation: 'KJV'
        };
      });
    }

    // Fallback to default verses if AI fails
    const filteredVerses = DEFAULT_VERSES.filter(verse => 
      verse.text.toLowerCase().includes(query.toLowerCase()) || 
      verse.reference.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredVerses.length === 0) {
      toast.error('No verses found matching your search');
      return [];
    }

    return filteredVerses;
  } catch (error) {
    console.error('Error searching verses:', error);
    toast.error('Error searching verses. Using default results.');
    
    // Return filtered default verses as fallback
    return DEFAULT_VERSES.filter(verse => 
      verse.text.toLowerCase().includes(query.toLowerCase()) || 
      verse.reference.toLowerCase().includes(query.toLowerCase())
    );
  }
}