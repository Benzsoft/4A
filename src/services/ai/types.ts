export interface AIModelResponse {
  content: string;
  error?: string;
}

export interface AIService {
  generateVerseOfDay(): Promise<string>;
  generateVerses(query: string): Promise<string[]>;
  generateTriviaQuestions(difficulty: string): Promise<string[]>;
  generateStudyPlan(book: string): Promise<any>;
}