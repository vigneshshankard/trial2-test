import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Award, Calendar, Target, Zap, 
  BookOpen, Trophy, Clock, CheckCircle, 
  ChevronRight, Lock
} from 'lucide-react';

import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useGamification } from '../../context/GamificationContext';

// Display badges in categories
const badgeCategories = [
  {
    id: 'learning',
    name: 'Learning Journey',
    icon: BookOpen,
    color: 'bg-primary-100 text-primary-600',
  },
  {
    id: 'consistency',
    name: 'Consistency',
    icon: Calendar,
    color: 'bg-accent-100 text-accent-600',
  },
  {
    id: 'milestones',
    name: 'Milestones',
    icon: Trophy,
    color: 'bg-success-100 text-success-600',
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: Target,
    color: 'bg-error-100 text-error-600',
  },
];

// Mock data for achievements (would come from API in real app)
const mockLockedAchievements = [
  {
    id: 'first_perfect_score',
    name: 'Perfect Score',
    description: 'Get 100% on any mock test',
    category: 'performance',
    icon: Target,
    progress: 0,
    requirement: 100,
    locked: true
  },
  {
    id: '30_day_streak',
    name: 'Monthly Master',
    description: 'Maintain a 30-day study streak',
    category: 'consistency',
    icon: Calendar,
    progress: 0,
    requirement: 30,
    locked: true
  },
  {
    id: '1000_points',
    name: 'Point Collector',
    description: 'Earn 1,000 total XP points',
    category: 'milestones',
    icon: Zap,
    progress: 0,
    requirement: 1000,
    locked: true
  },
  {
    id: 'complete_syllabus',
    name: 'Syllabus Champion',
    description: 'Complete all topics in at least one subject',
    category: 'learning',
    icon: CheckCircle,
    progress: 0,
    requirement: 100,
    locked: true
  },
];

const AchievementsPage: React.FC = () => {
  // In a real app, use the context for gamification data
  const { state } = useGamification();
  const [achievements, setAchievements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBadges: 0,
    badgesEarned: 0,
    percentComplete: 0,
  });
  
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setIsLoading(true);
        
        // Mock data - in real app, fetch from API
        // This combines earned badges from context with locked mock achievements
        const earned = state.badges.map(badge => ({
          ...badge,
          category: badge.name.includes('Streak') ? 'consistency' : 
                   badge.name.includes('Quiz') ? 'performance' :
                   badge.name.includes('Complete') ? 'learning' : 'milestones',
          locked: false,
          icon: badge.name.includes('Streak') ? Calendar : 
                badge.name.includes('Quiz') ? Target :
                badge.name.includes('Complete') ? BookOpen : Trophy,
        }));

        // Generate progress for locked achievements based on user state
        const lockedWithProgress = mockLockedAchievements.map(achievement => {
          let progress = 0;
          
          if (achievement.id === '30_day_streak') {
            progress = (state.streak / 30) * 100;
          }
          else if (achievement.id === '1000_points') {
            progress = (state.points / 1000) * 100;
          }
          
          return {
            ...achievement,
            progress: Math.min(Math.round(progress), 99) // Cap at 99% until unlocked
          };
        });
        
        const allAchievements = [...earned, ...lockedWithProgress];
        
        // Calculate stats
        const totalBadges = allAchievements.length;
        const badgesEarned = earned.length;
        const percentComplete = Math.round((badgesEarned / totalBadges) * 100);
        
        setAchievements(allAchievements);
        setStats({
          totalBadges,
          badgesEarned,
          percentComplete
        });
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAchievements();
  }, [state.badges, state.streak, state.points]);
  
  return (
    <DashboardLayout>
      <Head>
        <title>Achievements | UPSCMONK</title>
      </Head>
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Your Achievements</h1>
          <p className="text-neutral-500">Track your progress and collect badges as you study</p>
        </div>
        
        {/* Achievement Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Achievement Progress</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-neutral-500">
                  {stats.badgesEarned} of {stats.totalBadges} badges earned
                </span>
                <span className="text-sm font-medium text-primary">
                  {stats.percentComplete}% Complete
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-neutral-100 rounded-full h-2.5 mt-3">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${stats.percentComplete}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-primary-50 p-4 rounded-full">
              <Trophy size={40} className="text-primary" />
            </div>
          </div>
        </div>
        
        {/* Achievement Categories */}
        <div className="space-y-8">
          {badgeCategories.map(category => {
            const categoryAchievements = achievements.filter(
              achievement => achievement.category === category.id
            );
            
            if (categoryAchievements.length === 0) return null;
            
            return (
              <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className={`p-4 ${category.color} flex items-center`}>
                  <category.icon size={20} className="mr-2" />
                  <h2 className="font-semibold">{category.name}</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryAchievements.map(achievement => (
                      <div 
                        key={achievement.id} 
                        className={`border ${achievement.locked ? 'border-neutral-200' : 'border-accent-200'} rounded-lg p-4 relative`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-2 rounded-lg ${
                            achievement.locked 
                              ? 'bg-neutral-100 text-neutral-500' 
                              : 'bg-accent-100 text-accent-600'
                          }`}>
                            {achievement.locked ? (
                              <Lock size={18} />
                            ) : (
                              <achievement.icon size={18} />
                            )}
                          </div>
                          
                          {!achievement.locked && (
                            <span className="text-xs bg-accent-100 text-accent-600 px-2 py-1 rounded-full">
                              Earned
                            </span>
                          )}
                        </div>
                        
                        <h3 className={`font-semibold ${achievement.locked ? 'text-neutral-500' : ''}`}>
                          {achievement.name}
                        </h3>
                        
                        <p className="text-sm text-neutral-500 mt-1">
                          {achievement.description}
                        </p>
                        
                        {achievement.locked && achievement.progress > 0 && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-neutral-500 mb-1">
                              <span>Progress</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <div className="w-full bg-neutral-100 rounded-full h-1.5">
                              <div 
                                className="bg-neutral-300 h-1.5 rounded-full"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {achievement.dateEarned && (
                          <div className="text-xs text-neutral-500 mt-3 flex items-center">
                            <Clock size={12} className="mr-1" />
                            Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AchievementsPage;