import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIService } from './types/services';
import { PROMPTS } from './prompts';
import { config } from '../../config/env';
import { validateVerseFormat, parseVerseResponse } from './utils/validation';

export class GeminiService implements AIService {
  readonly name = 'gemini';
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(config.geminiApiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  private async generateContent(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        throw new Error('Empty response from Gemini API');
      }
      
      return text;
    } catch (error: any) {
      console.error('Gemini API error:', error);
      throw new Error(`Gemini API request failed: ${error.message}`);
    }
  }

  async generateVerseOfDay(theme: string = 'faith') {
    try {
      const content = await this.generateContent(PROMPTS.VERSE_OF_DAY(theme));
      const lines = content.split('\n').filter(line => validateVerseFormat(line));
      
      if (lines.length === 0) {
        throw new Error('No valid verse format received');
      }

      return lines[0];
    } catch (error) {
      console.error('Error generating verse of day:', error);
      throw error;
    }
  }

  async generateVerses(query: string) {
    try {
      const content = await this.generateContent(
        `${PROMPTS.VERSE_SEARCH}\n\nQuery: ${query}`
      );
      
      const verses = content
        .split('\n')
        .filter(line => validateVerseFormat(line));

      if (verses.length === 0) {
        throw new Error('No verses found for query');
      }

      return verses;
    } catch (error) {
      console.error('Error generating verses:', error);
      throw error;
    }
  }

  async generateTriviaQuestions(difficulty: string) {
    try {
      const content = await this.generateContent(PROMPTS.TRIVIA(difficulty));
      const questions = content.split('\n\n').filter(q => 
        q.includes('Q:') && 
        q.includes('A)') && 
        q.includes('B)') && 
        q.includes('C)') && 
        q.includes('D)') && 
        q.includes('Correct:')
      );

      if (questions.length < 10) {
        throw new Error('Not enough valid questions generated');
      }

      return questions.slice(0, 10);
    } catch (error) {
      console.error('Error generating trivia questions:', error);
      throw error;
    }
  }

  async generateStudyPlan(book: string) {
    try {
      const content = await this.generateContent(
        `${PROMPTS.STUDY_PLAN}\n\nBook: ${book}`
      );
      
      const plan = JSON.parse(content);
      if (!Array.isArray(plan) || plan.length === 0) {
        throw new Error('Invalid study plan format received');
      }

      return plan;
    } catch (error) {
      console.error('Error generating study plan:', error);
      throw error;
    }
  }
}