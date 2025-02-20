export interface StudyLesson {
  day: number;
  title: string;
  scripture: string;
  content: string;
  keyThemes: string[];
  reflectionQuestions: string[];
  practicalApplication: string;
  completed: boolean;
  userNotes?: string;
  completedAt?: string | null;
}

export interface StudyPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  totalDays: number;
  currentDay: number;
  readingTime: string;
  startDate: string;
  lessons: StudyLesson[];
  progress: {
    completed: number;
    streak: number;
    lastStudyDate: string | null;
    totalTimeSpent: number;
    versesRead: number;
    notesCount: number;
  };
}

export interface ReadingPlan {
  id: string;
  name: string;
  duration: string;
  description: string;
  totalDays: number;
  type: 'yearly' | 'old-testament' | 'new-testament';
}