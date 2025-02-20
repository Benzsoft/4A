import { useState, useEffect, useCallback } from 'react';
import { TriviaQuestion } from '../types';
import { fetchTriviaQuestions } from '../services/triviaApi';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export function useTrivia() {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [gameState, setGameState] = useState<'selecting' | 'playing' | 'finished'>('selecting');
  const [difficulty, setDifficulty] = useState<string>('');
  
  const { user } = useAuth();

  const loadQuestions = async (selectedDifficulty: string) => {
    setIsLoading(true);
    try {
      const questions = await fetchTriviaQuestions(selectedDifficulty);
      setQuestions(questions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setGameState('playing');
      setDifficulty(selectedDifficulty);
      setTimeLeft(selectedDifficulty === 'beginner' ? 30 : selectedDifficulty === 'advanced' ? 20 : 10);
    } catch (error) {
      console.error('Failed to load questions:', error);
      toast.error('Failed to load questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = useCallback((answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex]?.correctAnswer) {
      setScore((prev) => prev + 1);
      toast.success('Correct answer! 🎉');
    } else {
      toast.error('Wrong answer! Try again next time.');
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(difficulty === 'beginner' ? 30 : difficulty === 'advanced' ? 20 : 10);
      } else {
        setGameState('finished');
      }
    }, 2000);
  }, [currentQuestionIndex, questions, difficulty]);

  const saveScore = async () => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('trivia_scores')
        .eq('id', user.id)
        .single();

      const scores = profile?.trivia_scores || [];
      const newScore = {
        score,
        total: questions.length,
        difficulty,
        played_at: new Date().toISOString()
      };

      // Keep only top 3 scores
      const allScores = [...scores, newScore]
        .sort((a, b) => (b.score / b.total) - (a.score / a.total))
        .slice(0, 3);

      const { error } = await supabase
        .from('profiles')
        .update({ trivia_scores: allScores })
        .eq('id', user.id);

      if (error) throw error;
      
      toast.success('Score saved successfully!');
    } catch (error) {
      console.error('Error saving score:', error);
      toast.error('Failed to save score. Please try again.');
    }
  };

  const restart = useCallback(() => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setGameState('selecting');
    setDifficulty('');
  }, []);

  useEffect(() => {
    let timer: number;
    if (gameState === 'playing' && !selectedAnswer && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAnswer('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, selectedAnswer, timeLeft, handleAnswer]);

  return {
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    score,
    timeLeft,
    selectedAnswer,
    isLoading,
    gameState,
    totalQuestions: questions.length,
    difficulty,
    loadQuestions,
    handleAnswer,
    restart,
    saveScore,
  };
}