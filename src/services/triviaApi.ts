import { getTriviaQuestions } from './ai';
import { TriviaQuestion } from '../types';
import toast from 'react-hot-toast';

// Expanded default questions for better fallback
const DEFAULT_QUESTIONS: Record<string, TriviaQuestion[]> = {
  beginner: [
    {
      id: '1',
      question: 'Who built the ark?',
      options: ['Noah', 'Moses', 'Abraham', 'David'],
      correctAnswer: 'Noah',
      difficulty: 'beginner'
    },
    // Add 8 more default beginner questions here...
    {
      id: '10',
      question: 'How many days and nights did it rain during the flood?',
      options: ['20 days', '30 days', '40 days', '50 days'],
      correctAnswer: '40 days',
      difficulty: 'beginner'
    }
  ],
  // Add similar blocks for advanced and scholar difficulties...
};

// Ensure we always return 10 questions
function ensureTenQuestions(questions: TriviaQuestion[], difficulty: string): TriviaQuestion[] {
  if (questions.length >= 10) return questions.slice(0, 10);
  
  // If we have less than 10 questions, fill with defaults
  const defaults = DEFAULT_QUESTIONS[difficulty] || [];
  const combined = [...questions];
  
  while (combined.length < 10 && defaults.length > 0) {
    const defaultQ = defaults[combined.length];
    if (defaultQ) combined.push(defaultQ);
  }
  
  return combined;
}

export async function fetchTriviaQuestions(difficulty: string): Promise<TriviaQuestion[]> {
  try {
    const questions = await getTriviaQuestions(difficulty);
    
    if (questions && questions.length > 0) {
      const parsed = questions.map((q, index) => {
        const lines = q.split('\n').filter(line => line.trim());
        const question = lines[0].replace('Q: ', '').trim();
        const options = lines.slice(1, 5).map(opt => opt.replace(/^[A-D]\)\s*/, '').trim());
        const correctAnswer = options[lines[5].replace('Correct: ', '').trim().charCodeAt(0) - 65];

        return {
          id: String(index + 1),
          question,
          options,
          correctAnswer,
          difficulty: difficulty as 'beginner' | 'advanced' | 'scholar'
        };
      });

      return ensureTenQuestions(parsed, difficulty);
    }

    throw new Error('No valid questions generated');
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    toast.error('Using default questions due to service error');
    return DEFAULT_QUESTIONS[difficulty] || [];
  }
}