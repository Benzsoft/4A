// Add these new types to the existing types
export interface BibleStudyProgress {
  completed: number;
  streak: number;
  lastStudyDate: string;
  totalTimeSpent: number;
  versesRead: number;
  notesCount: number;
}

// Update BibleStudy interface
export interface BibleStudy {
  book: string;
  startDate: string;
  preferredTime: string;
  currentDay: number;
  lessons: BibleStudyLesson[];
  progress: BibleStudyProgress;
}

// Update BibleStudyLesson interface
export interface BibleStudyLesson {
  day: number;
  title: string;
  scripture: string;
  content: string;
  keyThemes: string[];
  reflectionQuestions: string[];
  practicalApplication: string;
  userNotes?: string;
  completed: boolean;
  completedAt?: string;
}