import React from 'react';
import { BibleStudy } from '../../../types';
import { ScriptureReader } from './ScriptureReader';
import { LessonContent } from './LessonContent';
import { StudyNotes } from './StudyNotes';
import { StudyProgress } from './StudyProgress';
import { GlobalProgress } from './GlobalProgress';
import { format } from 'date-fns';
import { useStudyInsights } from '../../../hooks/useStudyInsights';
import { useAuth } from '../../../contexts/AuthContext';

interface StudyDashboardProps {
  study: BibleStudy;
  onUpdateStudy: (study: BibleStudy) => void;
}

export function StudyDashboard({ study, onUpdateStudy }: StudyDashboardProps) {
  const { user } = useAuth();
  const { recordInsight } = useStudyInsights(user?.id);
  const currentLesson = study.lessons[study.currentDay - 1];

  const handleLessonComplete = async () => {
    // Record study insight
    await recordInsight({
      study_date: new Date().toISOString(),
      study_duration: '00:30:00', // 30 minutes
      verses_read: 1,
      notes_taken: !!currentLesson.userNotes
    });

    // Update study progress
    const updatedStudy = {
      ...study,
      progress: {
        ...study.progress,
        completed: study.progress.completed + 1,
        streak: study.progress.streak + 1,
        lastStudyDate: new Date().toISOString(),
        totalTimeSpent: study.progress.totalTimeSpent + 30,
        versesRead: study.progress.versesRead + 1,
        notesCount: study.progress.notesCount + (currentLesson.userNotes ? 1 : 0)
      }
    };

    onUpdateStudy(updatedStudy);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {study.book} Study Plan
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Day {study.currentDay} of 30 - {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-indigo-600 dark:text-indigo-400">
            Next session: {format(new Date(`2024-01-01T${study.preferredTime}`), 'h:mm a')}
          </p>
        </div>
      </header>

      <GlobalProgress study={study} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ScriptureReader reference={currentLesson.scripture} />
          <LessonContent 
            lesson={currentLesson} 
            onComplete={handleLessonComplete}
            onUpdateLesson={(updatedLesson) => {
              const updatedLessons = [...study.lessons];
              updatedLessons[study.currentDay - 1] = updatedLesson;
              onUpdateStudy({ ...study, lessons: updatedLessons });
            }}
          />
        </div>
        <div className="space-y-6">
          <StudyProgress study={study} />
          <StudyNotes
            notes={currentLesson.userNotes}
            onSave={(notes) => {
              const updatedLessons = [...study.lessons];
              updatedLessons[study.currentDay - 1] = {
                ...currentLesson,
                userNotes: notes
              };
              onUpdateStudy({ ...study, lessons: updatedLessons });
            }}
          />
        </div>
      </div>
    </div>
  );
}