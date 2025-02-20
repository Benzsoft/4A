import { Verse } from '../../types';

export function formatVerseResponse(verse: string): Verse {
  const [reference, text] = verse.split(' - ').map(part => part.trim());
  return {
    reference,
    text: text.replace(/^"|"$/g, ''),
    translation: 'KJV'
  };
}

export function validateVerseFormat(verse: string): boolean {
  return verse.includes(' - ') && /^[\w\s]+ \d+:\d+ - .+$/.test(verse);
}