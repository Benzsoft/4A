import { Verse } from '../../types';

export interface BibleSearchOptions {
  query: string;
  translation?: string;
  limit?: number;
}

export interface BibleSearchResult {
  verses: Verse[];
  total: number;
}