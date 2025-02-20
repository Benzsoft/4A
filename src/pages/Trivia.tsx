import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/auth/AuthModal';
import { DifficultySelector } from '../components/trivia/DifficultySelector';
import { Question } from '../components/trivia/Question';
import { Score } from '../components/trivia/Score';
import { useTrivia } from '../hooks/useTrivia';
import { Brain, GraduationCap, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const DIFFICULTY_IMAGES = {
  beginner: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  advanced: "https://images.unsplash.com/photo-1614728263952-84ea256f9679",
  scholar: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
};

export default function Trivia() {
  const {
    currentQuestion,
    currentQuestionIndex,
    score,
    timeLeft,
    selectedAnswer,
    isLoading,
    gameState,
    totalQuestions,
    difficulty,
    loadQuestions,
    handleAnswer,
    restart,
    saveScore,
  } = useTrivia();

  const { user } = useAuth();
  const [showAuth, setShowAuth] = React.useState(false);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Brain className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Sign in to Play Bible Trivia
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
          Test your biblical knowledge, track your progress, and compete with others!
        </p>
        <button
          onClick={() => setShowAuth(true)}
          className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
        >
          Sign In to Start
        </button>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Bible Trivia
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Test your knowledge with 10 challenging questions
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-center">
            <Brain className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4 mx-auto" />
            <p className="text-gray-600 dark:text-gray-300">Loading questions...</p>
          </div>
        </div>
      ) : gameState === 'selecting' ? (
        <>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Select your difficulty level:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['beginner', 'advanced', 'scholar'].map((level) => (
              <motion.div
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative h-96 cursor-pointer group"
                onClick={() => loadQuestions(level)}
              >
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <img
                    src={DIFFICULTY_IMAGES[level as keyof typeof DIFFICULTY_IMAGES]}
                    alt={level}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    {level === 'beginner' ? (
                      <BookOpen className="w-12 h-12" />
                    ) : level === 'advanced' ? (
                      <Brain className="w-12 h-12" />
                    ) : (
                      <GraduationCap className="w-12 h-12" />
                    )}
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2 capitalize">{level}</h3>
                  <p className="text-sm text-gray-200 text-center">
                    {level === 'beginner'
                      ? '30 seconds per question. Perfect for beginners!'
                      : level === 'advanced'
                      ? '20 seconds per question. For those who know their Bible well!'
                      : '10 seconds per question. For true Bible scholars!'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : gameState === 'playing' && currentQuestion ? (
        <>
          <div className="text-center mb-4 text-gray-600 dark:text-gray-300">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          <Question
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
            timeLeft={timeLeft}
          />
        </>
      ) : gameState === 'finished' ? (
        <Score
          score={score}
          total={totalQuestions}
          difficulty={difficulty}
          onRestart={restart}
          onSave={saveScore}
        />
      ) : null}
    </div>
  );
}