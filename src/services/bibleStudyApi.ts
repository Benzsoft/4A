import { BibleStudyLesson } from '../types';
import { getBibleStudyPlan } from './ai';

export async function generateLessons(book: string): Promise<BibleStudyLesson[]> {
  try {
    // Create default lessons if AI fails
    const defaultLessons = Array.from({ length: 30 }, (_, index) => ({
      day: index + 1,
      title: `Day ${index + 1}: Introduction to ${book}`,
      scripture: `${book} 1:1`,
      content: 'Content will be available soon.',
      keyThemes: ['Faith', 'Understanding'],
      reflectionQuestions: ['What does this passage teach us?'],
      practicalApplication: 'Apply these teachings to your daily life.',
      completed: false,
      userNotes: '',
      completedAt: null
    }));

    // Try to get AI-generated lessons
    const aiLessons = await getBibleStudyPlan(book);
    
    // Merge AI lessons with defaults for any missing properties
    return aiLessons.map((lesson, index) => ({
      ...defaultLessons[index],
      ...lesson
    }));
  } catch (error) {
    console.error('Error generating study plan:', error);
    throw new Error('Failed to generate study plan. Please try again.');
  }
}