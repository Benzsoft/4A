import { AIService } from './types';
import { ENABLED_SERVICES, DEFAULT_SERVICE } from './config';

export async function tryServices<T>(
  services: AIService[],
  operation: (service: AIService) => Promise<T>,
  errorMessage: string
): Promise<T> {
  const errors: Error[] = [];

  for (const service of services) {
    try {
      return await operation(service);
    } catch (error) {
      console.error(`AI service failed:`, error);
      errors.push(error as Error);
      continue;
    }
  }

  const errorDetails = errors.map(e => e.message).join('; ');
  throw new Error(`${errorMessage}. Details: ${errorDetails}`);
}

export function validateVerseFormat(verse: string): boolean {
  return verse.includes(' - ') && /^[\w\s]+ \d+:\d+ - .+$/.test(verse);
}

export function parseVerseResponse(content: string): string[] {
  return content
    .split('\n')
    .filter(line => line.trim() && validateVerseFormat(line))
    .map(line => line.trim());
}