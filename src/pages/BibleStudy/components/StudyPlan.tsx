import React from 'react';
import { BookOpen, Heart, Brain } from 'lucide-react';
import clsx from 'clsx';

const plans = [
  {
    id: 'faith-courage',
    title: 'Faith and Courage',
    icon: BookOpen,
    description: 'Strengthen your faith through stories of courage in the Bible',
    duration: '30 days'
  },
  {
    id: 'love-relationships',
    title: 'Love and Relationships',
    icon: Heart,
    description: 'Explore biblical teachings on love, marriage, and relationships',
    duration: '21 days'
  },
  {
    id: 'wisdom-proverbs',
    title: 'Wisdom from Proverbs',
    icon: Brain,
    description: 'Daily wisdom and practical guidance from the book of Proverbs',
    duration: '28 days'
  }
];

interface StudyPlanProps {
  selectedPlan: string;
  onSelectPlan: (planId: string) => void;
}

export function StudyPlan({ selectedPlan, onSelectPlan }: StudyPlanProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Study Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <button
              key={plan.id}
              onClick={() => onSelectPlan(plan.id)}
              className={clsx(
                'p-4 rounded-lg text-left transition-all duration-300',
                'border-2',
                selectedPlan === plan.id
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
              )}
            >
              <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {plan.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {plan.description}
              </p>
              <span className="text-xs text-indigo-600 dark:text-indigo-400">
                {plan.duration}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}