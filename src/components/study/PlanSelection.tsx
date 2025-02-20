import React from 'react';
import { Book, Clock, Calendar } from 'lucide-react';
import { STUDY_PLANS } from '../../services/studyPlans';
import clsx from 'clsx';

interface StudyPlanProps {
  selectedPlanId: string | null;
  onSelectPlan: (planId: string) => void;
}

export function PlanSelection({ selectedPlanId, onSelectPlan }: StudyPlanProps) {
  if (!STUDY_PLANS || STUDY_PLANS.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-300">No study plans available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {STUDY_PLANS.map((plan) => (
        <button
          key={plan.id}
          onClick={() => onSelectPlan(plan.id)}
          className={clsx(
            'p-6 rounded-lg text-left transition-all duration-300',
            'border-2',
            selectedPlanId === plan.id
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-900'
              : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <Book className={clsx(
              'w-8 h-8',
              selectedPlanId === plan.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'
            )} />
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">{plan.duration}</span>
            </div>
          </div>
          <h3 className={clsx(
            'text-lg font-semibold mb-2',
            selectedPlanId === plan.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'
          )}>
            {plan.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {plan.description}
          </p>
          <div className="flex items-center text-xs text-indigo-600 dark:text-indigo-400">
            <Clock className="w-4 h-4 mr-1" />
            <span>{plan.totalDays} days</span>
          </div>
        </button>
      ))}
    </div>
  );
}