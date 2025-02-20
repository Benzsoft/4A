import { BibleStudyLesson } from '../../../types';
import {
  generateLawLessons,
  generateHistoricalBooksLessons,
  generatePoetryLessons,
  generateMajorProphetsLessons,
  generateMinorProphetsLessons
} from './sections';

export function generateOldTestamentLessons(): BibleStudyLesson[] {
  return [
    ...generateLawLessons(), // Days 1-60
    ...generateHistoricalBooksLessons(), // Days 61-120
    ...generatePoetryLessons(), // Days 121-150
    ...generateMajorProphetsLessons(), // Days 151-180
    ...generateMinorProphetsLessons() // Days 181-210
  ];
}