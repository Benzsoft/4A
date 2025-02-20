import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PlanSelection } from '../../components/study/PlanSelection';
import { TimeSelection } from '../../components/study/TimeSelection';
import { ReadingPlan } from '../../types/bibleStudy';
import { motion } from 'framer-motion';
import { Book, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { STUDY_PLANS, getStudyPlan } from '../../services/studyPlans';

export default function BibleStudy() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<ReadingPlan | null>(null);
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [agreedToCommit, setAgreedToCommit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanSelect = (planId: string) => {
    const plan = STUDY_PLANS.find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
      setStep(2);
    }
  };

  const handleStartPlan = async () => {
    if (!selectedPlan || !agreedToCommit) {
      toast.error('Please select a plan and agree to commit to the study.');
      return;
    }

    setIsLoading(true);

    try {
      // Get the study plan content
      const planContent = getStudyPlan(selectedPlan.id);
      
      if (!planContent || !planContent.lessons || planContent.lessons.length === 0) {
        throw new Error('Study plan content not found');
      }

      const studyPlan = {
        plan_id: selectedPlan.id,
        name: selectedPlan.name,
        reading_time: selectedTime,
        start_date: new Date().toISOString(),
        current_day: 1,
        lessons: planContent.lessons.map(lesson => ({
          ...lesson,
          completed: false,
          userNotes: '',
          completedAt: null
        })),
        progress: {
          completed: 0,
          streak: 0,
          lastStudyDate: null,
          totalTimeSpent: 0,
          versesRead: 0,
          notesCount: 0
        }
      };

      const { error } = await supabase
        .from('profiles')
        .update({
          bible_study: studyPlan
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast.success('Bible study plan started successfully!');
      navigate('/study/dashboard');
    } catch (error) {
      console.error('Error starting study plan:', error);
      toast.error('Failed to start study plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Book className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Sign in to Start Bible Study
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
          Join us for a structured Bible study journey with personalized reading plans.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Start Your Bible Study Journey
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Choose your reading plan and customize your study experience
        </p>
      </div>

      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            1. Select Your Reading Plan
          </h2>
          <PlanSelection 
            selectedPlanId={selectedPlan?.id || null}
            onSelectPlan={handlePlanSelect} 
          />
        </motion.div>

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              2. Set Your Daily Reading Time
            </h2>
            <TimeSelection
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />

            <div className="flex items-start space-x-3 mt-8">
              <div className="flex items-center h-5">
                <input
                  id="commitment"
                  type="checkbox"
                  checked={agreedToCommit}
                  onChange={(e) => setAgreedToCommit(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>
              <label htmlFor="commitment" className="text-sm text-gray-600 dark:text-gray-300">
                I commit to completing this study plan and understand I'll receive notifications
                15 minutes before my scheduled reading time.
              </label>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleStartPlan}
                disabled={!agreedToCommit || isLoading}
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Starting Plan...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Start Your Bible Study Journey</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}