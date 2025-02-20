import { AIServiceFactory } from './factory';
import { BibleStudyLesson } from '../../types';

export async function getVerseOfDay(theme: string = 'faith'): Promise<string> {
  return AIServiceFactory.tryAll(
    service => service.generateVerseOfDay(theme),
    'Failed to generate verse of the day'
  );
}

export async function searchVerses(query: string): Promise<string[]> {
  return AIServiceFactory.tryAll(
    service => service.generateVerses(query),
    'Failed to generate verses'
  );
}

export async function getTriviaQuestions(difficulty: string): Promise<string[]> {
  return AIServiceFactory.tryAll(
    service => service.generateTriviaQuestions(difficulty),
    'Failed to generate trivia questions'
  );
}

export async function getBibleStudyPlan(book: string): Promise<BibleStudyLesson[]> {
  return AIServiceFactory.tryAll(
    service => service.generateStudyPlan(book),
    'Failed to generate study plan'
  );
}