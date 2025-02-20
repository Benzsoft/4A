import { BibleStudyLesson } from '../../../types';
import { 
  generateGospelsActsLessons,
  generatePaulineEpistlesLessons,
  generateGeneralEpistlesLessons,
  generateRevelationLessons
} from './sections';

export function generateNewTestamentLessons(): BibleStudyLesson[] {
  return [
    ...generateGospelsActsLessons(), // Days 1-40
    ...generatePaulineEpistlesLessons(), // Days 41-80
    ...generateGeneralEpistlesLessons(), // Days 81-110
    ...generateRevelationLessons() // Days 111-120
  ];
}