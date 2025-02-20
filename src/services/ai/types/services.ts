import { VerseResponse, TriviaResponse, StudyLessonResponse } from './responses';

export interface AIService {
  readonly name: string;
  generateVerseOfDay(): Promise<VerseResponse>;
  generateVerses(query: string): Promise<VerseResponse[]>;
  generateTriviaQuestions(difficulty: string): Promise<TriviaResponse[]>;
  generateStudyPlan(book: string): Promise<StudyLessonResponse[]>;
}

export interface AIServiceConfig {
  enabled: boolean;
  apiKey: string;
  model: string;
}