import { AIService, AIModelResponse } from './types';
import { handleApiError } from '../../utils/api';

export abstract class BaseAIService implements AIService {
  protected async makeRequest(prompt: string): Promise<AIModelResponse> {
    try {
      const response = await this.execute(prompt);
      return { content: response };
    } catch (error) {
      const errorMessage = handleApiError(error);
      return { content: '', error: errorMessage };
    }
  }

  protected abstract execute(prompt: string): Promise<string>;

  abstract generateVerseOfDay(): Promise<string>;
  abstract generateVerses(query: string): Promise<string[]>;
  abstract generateTriviaQuestions(difficulty: string): Promise<string[]>;
  abstract generateStudyPlan(book: string): Promise<any>;
}