import React, { useState } from 'react';
import { BibleStudyLesson } from '../../../types';
import { Book, PenSquare, PlayCircle, Share2 } from 'lucide-react';
import { ShareButton } from '../../../components/shared/ShareButton';
import toast from 'react-hot-toast';

interface LessonContentProps {
  lesson: BibleStudyLesson;
  onUpdateLesson: (lesson: BibleStudyLesson) => void;
}

export function LessonContent({ lesson, onUpdateLesson }: LessonContentProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLessonComplete = () => {
    onUpdateLesson({
      ...lesson,
      completed: true,
      completedAt: new Date().toISOString()
    });
    toast.success('Lesson marked as complete!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Day {lesson.day}: {lesson.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {lesson.scripture}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handlePlayAudio}
            className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-colors"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            <PlayCircle className="w-6 h-6" />
          </button>
          <ShareButton
            title={`Bible Study - Day ${lesson.day}`}
            text={`📖 Today's Study: ${lesson.title}\n\n${lesson.scripture}\n\n${lesson.content}`}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={`/audio/lessons/day-${lesson.day}.mp3`}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      <div className="space-y-6">
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Book className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Today's Reading
            </h3>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            {lesson.content}
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-2 mb-4">
            <PenSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Key Themes & Reflection
            </h3>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Key Themes
              </h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                {lesson.keyThemes?.map((theme, index) => (
                  <li key={index}>{theme}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Reflection Questions
              </h4>
              <ul className="list-decimal list-inside text-gray-600 dark:text-gray-300">
                {lesson.reflectionQuestions?.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center space-x-2 mb-4">
            <PenSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Practical Application
            </h3>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">
              {lesson.practicalApplication}
            </p>
          </div>
        </section>

        {!lesson.completed && (
          <button
            onClick={handleLessonComplete}
            className="w-full mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Complete Lesson
          </button>
        )}
      </div>
    </div>
  );
}