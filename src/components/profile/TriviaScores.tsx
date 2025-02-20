import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { TriviaScore } from '../../types';

interface TriviaScoresProps {
  scores: TriviaScore[];
}

export function TriviaScores({ scores }: TriviaScoresProps) {
  const icons = [
    <Trophy className="w-8 h-8 text-yellow-500" />,
    <Medal className="w-8 h-8 text-gray-400" />,
    <Award className="w-8 h-8 text-amber-600" />
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Top Trivia Scores
        </h2>
      </div>

      {scores.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-center py-4">
          No trivia scores yet. Play some Bible trivia to see your top scores here!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scores.map((score, index) => (
            <div
              key={score.played_at}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center"
            >
              <div className="mb-3">{icons[index]}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {Math.round((score.score / score.total) * 100)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {score.score} out of {score.total}
              </div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-1">
                {score.difficulty}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(score.played_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}