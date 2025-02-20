import { VerseResponse } from '../types/responses';

export function validateVerseFormat(verse: string): boolean {
  return Boolean(
    verse && 
    verse.includes(' - ') && 
    /^[\w\s]+ \d+:\d+ - .+$/.test(verse.trim())
  );
}

export function parseVerseResponse(content: string): VerseResponse {
  const [reference, text] = content.split(' - ').map(part => part.trim());
  return { 
    reference, 
    text: text.replace(/^"|"$/g, '').replace(/\\"/g, '"')
  };
}