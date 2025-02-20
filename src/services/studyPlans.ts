import { ReadingPlan, StudyPlan } from '../types/bibleStudy';
import bibleYearPlan from '../data/study-plans/bible-year.json';
import oldTestamentPlan from '../data/study-plans/old-testament.json';
import newTestamentPlan from '../data/study-plans/new-testament.json';

// Define available study plans
export const STUDY_PLANS: ReadingPlan[] = [
  {
    id: 'bible-year',
    name: 'Bible in a Year',
    duration: '12 months',
    description: 'Read through the entire Bible in one year with daily readings from both Old and New Testament',
    totalDays: 365,
    type: 'yearly'
  },
  {
    id: 'old-testament',
    name: 'Old Testament',
    duration: '7 months',
    description: 'Journey through the Old Testament with structured daily readings and historical context',
    totalDays: 210,
    type: 'old-testament'
  },
  {
    id: 'new-testament',
    name: 'New Testament',
    duration: '4 months',
    description: 'Study the life of Jesus and early church through New Testament readings',
    totalDays: 120,
    type: 'new-testament'
  }
];

// Get study plan content
export function getStudyPlan(planId: string): { lessons: any[] } {
  switch (planId) {
    case 'bible-year':
      return bibleYearPlan;
    case 'old-testament':
      return oldTestamentPlan;
    case 'new-testament':
      return newTestamentPlan;
    default:
      return { lessons: [] };
  }
}

// Update study progress
export function updateStudyProgress(plan: StudyPlan): StudyPlan {
  const now = new Date();
  const lastStudyDate = plan.progress.lastStudyDate ? new Date(plan.progress.lastStudyDate) : null;
  
  let streak = plan.progress.streak;
  if (!lastStudyDate || isConsecutiveDay(lastStudyDate, now)) {
    streak++;
  } else if (!isConsecutiveDay(lastStudyDate, now)) {
    streak = 1;
  }

  return {
    ...plan,
    progress: {
      ...plan.progress,
      completed: plan.progress.completed + 1,
      streak,
      lastStudyDate: now.toISOString(),
      totalTimeSpent: plan.progress.totalTimeSpent + 30,
      versesRead: plan.progress.versesRead + 1,
      notesCount: plan.progress.notesCount
    }
  };
}

function isConsecutiveDay(date1: Date, date2: Date): boolean {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}