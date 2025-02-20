import React, { useState } from 'react';
import { StudyLesson } from '../../../types/bibleStudy';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface LessonGridProps {
  lessons: StudyLesson[];
  currentDay: number;
  onComplete: (day: number) => void;
}

export function LessonGrid({ lessons, currentDay, onComplete }: LessonGridProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const toggleLesson = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lessons.map((lesson) => (
        <div
          key={lesson.day}
          className={clsx(
            'border-2 rounded-lg transition-all',
            lesson.completed 
              ? 'border-green-500 bg-green-50 dark:bg-green-900/30' 
              : lesson.day === currentDay
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
              : 'border-gray-200 dark:border-gray-700'
          )}
        >
          <button
            onClick={() => toggleLesson(lesson.day)}
            className="w-full p-4 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {lesson.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Day {lesson.day}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {lesson.title}
                  </p>
                </div>
              </div>
              {expandedDay === lesson.day ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
          </button>

          <AnimatePresence>
            {expandedDay === lesson.day && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {lesson.scripture}
                  </p>
                  <div className="prose dark:prose-invert max-w-none text-sm">
                    {lesson.content}
                  </div>
                  {!lesson.completed && lesson.day === currentDay && (
                    <button
                      onClick={() => onComplete(lesson.day)}
                      className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Complete Lesson
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}