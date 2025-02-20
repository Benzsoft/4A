import { AIService } from './types';
import { BaseAIService } from './base';
import { PROMPTS } from './prompts';
import { BibleStudyLesson } from '../../types';

export class GPT4Service extends BaseAIService implements AIService {
  protected async execute(prompt: string): Promise<string> {
    // Fallback implementation using a mock response for now
    return `Genesis 1:1 - In the beginning God created the heaven and the earth.`;
  }

  async generateVerseOfDay(): Promise<string> {
    const { content, error } = await this.makeRequest(PROMPTS.VERSE_OF_DAY);
    if (error) throw new Error(error);
    return content;
  }

  async generateVerses(query: string): Promise<string[]> {
    const { content, error } = await this.makeRequest(
      `${PROMPTS.VERSE_SEARCH}\n\nQuery: ${query}`
    );
    if (error) throw new Error(error);
    return [content]; // Return mock verse for now
  }

  async generateTriviaQuestions(difficulty: string): Promise<string[]> {
    const { content, error } = await this.makeRequest(
      PROMPTS.TRIVIA(difficulty)
    );
    if (error) throw new Error(error);
    return content.split('\n\n').filter(q => q.includes('Q:'));
  }

  async generateStudyPlan(book: string): Promise<BibleStudyLesson[]> {
    const { content, error } = await this.makeRequest(
      `${PROMPTS.STUDY_PLAN}\n\nBook: ${book}`
    );
    if (error) throw new Error(error);
    return []; // Return empty array for now
  }
}