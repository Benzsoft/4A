import MistralClient from '@mistralai/mistralai';
import { BibleStudyLesson } from '../types';
import { config } from '../config/env';

const client = new MistralClient(config.mistralApiKey);

export async function generateVerseOfDay(): Promise<string> {
  try {
    const response = await client.chat({
      model: 'mistral-tiny',
      messages: [
        {
          role: 'system',
          content: 'You are a Bible expert. Generate an inspiring verse of the day in the exact format "Book Chapter:Verse - Verse text" without any additional text or explanation.'
        },
        {
          role: 'user',
          content: 'Generate a verse of the day.'
        }
      ]
    });

    const content = response.choices[0].message.content.trim();
    if (!content || !content.includes(' - ')) {
      throw new Error('Invalid verse format received');
    }

    return content;
  } catch (error) {
    console.error('Error generating verse of the day:', error);
    throw new Error('Failed to generate verse of the day');
  }
}

export async function generateVerses(query: string): Promise<string[]> {
  try {
    const response = await client.chat({
      model: 'mistral-tiny',
      messages: [
        {
          role: 'system',
          content: 'You are a Bible expert. Return exactly 7 relevant Bible verses in the format "Book Chapter:Verse - Verse text". Do not include any introductory text or numbering.'
        },
        {
          role: 'user',
          content: `Find 7 Bible verses about: ${query}`
        }
      ]
    });

    const verses = response.choices[0].message.content
      .split('\n')
      .filter(line => line.trim() && line.includes(' - '))
      .slice(0, 7);

    if (verses.length === 0) {
      throw new Error('No valid verses found');
    }

    return verses;
  } catch (error) {
    console.error('Error generating verses:', error);
    throw new Error('Failed to generate verses');
  }
}

export async function generateTriviaQuestions(difficulty: string): Promise<string[]> {
  try {
    const response = await client.chat({
      model: 'mistral-tiny',
      messages: [
        {
          role: 'system',
          content: `You are a Bible trivia expert. Generate 10 ${difficulty} level Bible trivia questions. Format each question exactly as follows:
Q: [Question text]
A) [Option 1]
B) [Option 2]
C) [Option 3]
D) [Option 4]
Correct: [A/B/C/D]`
        },
        {
          role: 'user',
          content: `Generate 10 ${difficulty} level Bible trivia questions with exactly 4 options each and mark the correct answer with A, B, C, or D.`
        }
      ]
    });

    const questions = response.choices[0].message.content
      .split('\n\n')
      .filter(q => q.trim() && q.includes('Q:') && q.includes('Correct:'));

    if (questions.length === 0) {
      throw new Error('No valid questions generated');
    }

    return questions;
  } catch (error) {
    console.error('Error generating trivia questions:', error);
    throw new Error('Failed to generate trivia questions');
  }
}

export async function generateStudyPlan(book: string): Promise<BibleStudyLesson[]> {
  try {
    const response = await client.chat({
      model: 'mistral-tiny',
      messages: [
        {
          role: 'system',
          content: 'You are a Bible study expert. Create detailed study plans.'
        },
        {
          role: 'user',
          content: `Create a 30-day study plan for the book of ${book}. Include for each day: title, scripture reference, content (200 words), reflection question, and prayer focus. Format as JSON array.`
        }
      ]
    });

    const lessons = JSON.parse(response.choices[0].message.content);
    if (!Array.isArray(lessons) || lessons.length === 0) {
      throw new Error('Invalid study plan format received');
    }

    return lessons.map((lesson: any, index: number) => ({
      ...lesson,
      day: index + 1,
      completed: false,
      userNotes: '',
      prayerRequests: []
    }));
  } catch (error) {
    console.error('Error generating study plan:', error);
    throw new Error('Failed to generate study plan');
  }
}