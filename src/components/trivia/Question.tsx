import React from 'react';
import { TriviaQuestion } from '../../types';
import clsx from 'clsx';
import { Check, X } from 'lucide-react';

interface QuestionProps {
  question: TriviaQuestion;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
  timeLeft: number;
}

export function Question({ question, selectedAnswer, onAnswer, timeLeft }: QuestionProps) {
  const letters = ['A', 'B', 'C', 'D'];
  const isAnswered = selectedAnswer !== null;

  const handleAnswer = (answer: string) => {
    if (!isAnswered) {
      onAnswer(answer);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Time left: {timeLeft}s
          </span>
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {question.difficulty.toUpperCase()}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {question.question}
        </h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isCorrect = option === question.correctAnswer;
          const isSelected = option === selectedAnswer;
          
          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={clsx(
                'w-full p-4 text-left rounded-lg transition-all relative',
                'border-2 flex items-center',
                isAnswered
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                    : isSelected
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                    : 'border-gray-200 dark:border-gray-700 opacity-50'
                  : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
              )}
            >
              <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3 font-medium">
                {letters[index]}
              </span>
              <span className="flex-grow">{option}</span>
              {isAnswered && (isCorrect || isSelected) && (
                <span className="flex items-center ml-2">
                  {isCorrect ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className={clsx(
          'mt-4 p-4 rounded-lg text-center font-medium',
          selectedAnswer === question.correctAnswer
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
        )}>
          {selectedAnswer === question.correctAnswer
            ? 'Correct! Well done! 🎉'
            : `Incorrect. The correct answer was: ${question.correctAnswer}`}
        </div>
      )}
    </div>
  );
}