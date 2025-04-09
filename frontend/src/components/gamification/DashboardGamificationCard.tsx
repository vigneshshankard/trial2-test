import React from 'react';
import Link from 'next/link';
import { Trophy, Award, Calendar, Zap, ArrowRight } from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';
import LevelProgressBar from './LevelProgressBar';
import Button from '../ui/Button';

interface DashboardGamificationCardProps {
  className?: string;
}

const DashboardGamificationCard: React.FC<DashboardGamificationCardProps> = ({ className = '' }) => {
  // In a real app, use the gamification context
  // const { state } = useGamification();
  
  // Mock data for demonstration
  const gamificationState = {
    level: 4,
    points: 750,
    nextLevelPoints: 900,
    streak: 12,
    progress: 75,
    recentBadges: [
      { id: '1', name: '5-Day Streak', description: 'Login for 5 consecutive days', dateEarned: new Date() },
      { id: '2', name: 'Quiz Master', description: 'Score 100% on 3 quizzes', dateEarned: new Date() }
    ]
  };
  
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center">
          <Trophy className="h-5 w-5 mr-2" />
          <h3 className="font-semibold">Your Progress</h3>
        </div>
        <Link href="/achievements" className="text-white text-sm hover:underline flex items-center">
          View All
          <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Level and XP */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <div className="bg-primary-100 text-primary-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                {gamificationState.level}
              </div>
              <span className="text-sm font-medium">Level {gamificationState.level}</span>
            </div>
            <span className="text-xs text-neutral-500">
              {gamificationState.points} / {gamificationState.nextLevelPoints} XP
            </span>
          </div>
          <LevelProgressBar progress={gamificationState.progress} />
        </div>
        
        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-primary-50 rounded-lg p-3 flex items-center justify-between">
            <div>
              <div className="text-xs text-neutral-600">XP Points</div>
              <div className="font-bold text-primary-700">{gamificationState.points}</div>
            </div>
            <div className="bg-primary-100 p-1.5 rounded-full">
              <Zap size={16} className="text-primary" />
            </div>
          </div>
          
          <div className="bg-accent-50 rounded-lg p-3 flex items-center justify-between">
            <div>
              <div className="text-xs text-neutral-600">Day Streak</div>
              <div className="font-bold text-accent-700">{gamificationState.streak}</div>
            </div>
            <div className="bg-accent-100 p-1.5 rounded-full">
              <Calendar size={16} className="text-accent" />
            </div>
          </div>
        </div>
        
        {/* Recent badges */}
        {gamificationState.recentBadges.length > 0 && (
          <div>
            <h4 className="text-xs uppercase font-semibold text-neutral-500 mb-2">Recent Achievements</h4>
            <div className="space-y-2">
              {gamificationState.recentBadges.map(badge => (
                <div 
                  key={badge.id} 
                  className="flex items-center p-2 bg-neutral-50 rounded-lg"
                  title={badge.description}
                >
                  <div className="bg-accent-100 p-1.5 rounded-full mr-3">
                    <Award size={14} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{badge.name}</div>
                    <div className="text-xs text-neutral-500">
                      {new Date(badge.dateEarned).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="mt-4 flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
            onClick={() => window.location.href = '/achievements'}
          >
            Achievements
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => window.location.href = '/leaderboard'}
          >
            Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardGamificationCard;