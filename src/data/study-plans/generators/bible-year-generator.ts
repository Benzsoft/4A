import { BibleStudyLesson } from '../../../types';
import { 
  generatePentateuchLessons,
  generateHistoricalLessons,
  generateWisdomLessons,
  generatePropheticLessons,
  generateGospelLessons,
  generateActsEpistlesLessons,
  generateRevelationLessons
} from './sections';

export function generateBibleYearLessons(): BibleStudyLesson[] {
  const lessons: BibleStudyLesson[] = [
    ...generatePentateuchLessons(),
    ...generateHistoricalLessons(),
    ...generateWisdomLessons(),
    ...generatePropheticLessons(),
    ...generateGospelLessons(),
    ...generateActsEpistlesLessons(),
    ...generateRevelationLessons()
  ];

  return lessons;
}