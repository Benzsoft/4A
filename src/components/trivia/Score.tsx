import React from 'react';
import { Trophy } from 'lucide-react';
import { ShareButton } from '../shared/ShareButton';

interface ScoreProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export function Score({ score, total, onRestart }: ScoreProps) {
  const percentage = (score / total) * 100;
  const getMessage = () => {
    if (percentage === 100) return 'Perfect Score! You\'re a Bible Scholar! 🎉';
    if (percentage >= 80) return 'Excellent Knowledge! 🌟';
    if (percentage >= 60) return 'Good Job! Keep Learning! 📚';
    return 'Keep Studying! You\'ll Do Better Next Time! 💪';
  };

  return (
    <div className="text-center">
      <div className="mb-8">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
          Quiz Complete!
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
          You scored {score} out of {total} ({percentage}%)
        </p>
        <p className="text-lg text-indigo-600 dark:text-indigo-400 mt-2">
          {getMessage()}
        </p>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Play Again
        </button>
        <ShareButton
          title="Bible Me - Trivia Score"
          text={`🎯 I just scored ${score}/${total} (${percentage}%) on Bible Me Trivia! Can you beat my score? 📖✨`}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        />
      </div>
    </div>
  );
}