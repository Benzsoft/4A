import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useStudyPlan } from '../../hooks/useStudyPlan';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { StudyHeader } from '../../components/study/dashboard/StudyHeader';
import { LessonGrid } from '../../components/study/dashboard/LessonGrid';
import toast from 'react-hot-toast';

export default function StudyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { plan, loading, error, completeLesson } = useStudyPlan(user?.id);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    toast.error(error);
    navigate('/study');
    return null;
  }

  if (!plan || !plan.lessons) {
    navigate('/study');
    return null;
  }

  const handleCompleteLesson = async (day: number) => {
    const success = await completeLesson(day);
    if (success) {
      toast.success('Lesson completed!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <StudyHeader 
        title={plan.name}
        currentDay={plan.current_day}
        totalDays={plan.lessons.length}
        readingTime={plan.reading_time}
      />

      <div className="mt-8">
        <LessonGrid
          lessons={plan.lessons}
          currentDay={plan.current_day}
          onComplete={handleCompleteLesson}
        />
      </div>
    </div>
  );
}