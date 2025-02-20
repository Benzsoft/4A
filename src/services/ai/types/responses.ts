export interface AIResponse<T> {
  data: T;
  source: string;
  error?: string;
}

export interface VerseResponse {
  reference: string;
  text: string;
}

export interface TriviaResponse {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface StudyLessonResponse {
  day: number;
  title: string;
  scripture: string;
  content: string;
  keyThemes: string[];
  reflectionQuestions: string[];
  practicalApplication: string;
}