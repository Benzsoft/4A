import React, { useState, useEffect } from 'react';
import { Book, Calendar, Award, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface StudyPlan {
  id: string;
  name: string;
  duration: string;
  totalDays: number;
  currentDay: number;
  progress: number;
  startDate: string;
}

export function BibleStudyPlan() {
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const plans = [
    {
      id: 'bible-year',
      name: 'Bible in a Year',
      duration: '365 days',
      totalDays: 365,
      description: 'Read through the entire Bible in one year'
    },
    {
      id: 'old-testament',
      name: 'Old Testament',
      duration: '270 days',
      totalDays: 270,
      description: 'Journey through the Old Testament'
    },
    {
      id: 'new-testament',
      name: 'New Testament',
      duration: '120 days',
      totalDays: 120,
      description: 'Study the life of Jesus and early church'
    }
  ];

  useEffect(() => {
    if (user) {
      loadUserPlan();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const loadUserPlan = async () => {
    try {
      const { data, error } = await supabase
        .from('study_plans')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setSelectedPlan(data);
    } catch (error) {
      console.error('Error loading study plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPlan = async (plan: typeof plans[0]) => {
    if (!user) {
      toast.error('Please sign in to start a study plan');
      return;
    }

    try {
      const newPlan = {
        user_id: user.id,
        plan_id: plan.id,
        name: plan.name,
        duration: plan.duration,
        total_days: plan.totalDays,
        current_day: 1,
        progress: 0,
        start_date: new Date().toISOString()
      };

      const { error } = await supabase
        .from('study_plans')
        .insert([newPlan]);

      if (error) throw error;

      setSelectedPlan(newPlan);
      toast.success('Study plan started!');
    } catch (error) {
      console.error('Error starting plan:', error);
      toast.error('Failed to start study plan');
    }
  };

  const handleResetPlan = async () => {
    if (!user || !selectedPlan) return;

    try {
      const { error } = await supabase
        .from('study_plans')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setSelectedPlan(null);
      toast.success('Plan reset successfully');
    } catch (error) {
      console.error('Error resetting plan:', error);
      toast.error('Failed to reset plan');
    }
  };

  const handleShareProgress = async () => {
    if (!selectedPlan) return;

    try {
      await navigator.share({
        title: 'My Bible Study Progress',
        text: `I'm ${selectedPlan.progress}% through my ${selectedPlan.name} study plan! 📖✝️`,
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing progress:', error);
      toast.error('Failed to share progress');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {selectedPlan ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Book className="w-6 h-6" />
                <span>{selectedPlan.name}</span>
              </div>
              <Button variant="outline" onClick={handleResetPlan}>
                Reset Plan
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Progress</span>
                  <span>{selectedPlan.progress}%</span>
                </div>
                <Progress value={selectedPlan.progress} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Started</p>
                    <p>{new Date(selectedPlan.startDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Current Day</p>
                    <p>{selectedPlan.currentDay} of {selectedPlan.totalDays}</p>
                  </div>
                </div>

                <Button onClick={handleShareProgress}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Progress
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {plan.description}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Duration: {plan.duration}
                </p>
                <Button 
                  className="w-full"
                  onClick={() => handleSelectPlan(plan)}
                >
                  Start Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}