import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap, Calendar, Trophy, ChevronDown, ChevronUp, X } from 'lucide-react';
import PointsDisplay from './PointsDisplay';
import StreakDisplay from './StreakDisplay';
import LevelProgressBar from './LevelProgressBar';

interface GamificationWidgetProps {
  userId: string;
  isMinimized?: boolean;
}

const GamificationWidget: React.FC<GamificationWidgetProps> = ({ userId, isMinimized = false }) => {
  const [minimized, setMinimized] = useState(isMinimized);
  const [userData, setUserData] = useState({
    points: 0,
    level: 1,
    streak: 0,
    badges: [],
    nextLevelPoints: 100,
    progress: 0,
    recentAchievement: null
  });
  
  useEffect(() => {
    // Fetch user gamification data when component mounts
    const fetchGamificationData = async () => {
      try {
        // In a real implementation, these would be parallel fetches with Promise.all
        const pointsResponse = await fetch(`/api/gamification/points/${userId}`);
        const streakResponse = await fetch(`/api/gamification/streak/${userId}`);
        const levelResponse = await fetch(`/api/gamification/level/${userId}`);
        const achievementsResponse = await fetch(`/api/gamification/achievements/${userId}`);
        
        if (pointsResponse.ok && streakResponse.ok && levelResponse.ok && achievementsResponse.ok) {
          const points = await pointsResponse.json();
          const streak = await streakResponse.json();
          const level = await levelResponse.json();
          const achievements = await achievementsResponse.json();
          
          // Find the most recent achievement if any
          const sortedAchievements = [...achievements].sort((a, b) => 
            new Date(b.dateEarned).getTime() - new Date(a.dateEarned).getTime()
          );
          
          const recentAchievement = sortedAchievements.length > 0 ? sortedAchievements[0] : null;
          
          setUserData({
            points: points.totalPoints || 0,
            level: level.level || 1,
            streak: streak.currentStreak || 0,
            badges: achievements || [],
            nextLevelPoints: level.nextLevelPoints || 100,
            progress: level.progress || 0,
            recentAchievement
          });
        }
      } catch (error) {
        console.error("Error fetching gamification data:", error);
      }
    };
    
    fetchGamificationData();
  }, [userId]);
  
  const toggleMinimized = () => {
    setMinimized(!minimized);
  };
  
  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-30 flex flex-col items-end"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Achievement notification popup - will show briefly when a user gets a new achievement */}
      <AnimatePresence>
        {userData.recentAchievement && !minimized && (
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-4 mb-3 flex items-center max-w-xs"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Award className="text-accent h-10 w-10 mr-3" />
            <div>
              <p className="font-bold text-sm">New Achievement!</p>
              <p className="text-xs text-neutral-600">{userData.recentAchievement.name}</p>
            </div>
            <button 
              onClick={() => setUserData({...userData, recentAchievement: null})}
              className="ml-2 text-neutral-400 hover:text-neutral-600"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main gamification widget */}
      <motion.div 
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header bar - always visible */}
        <div 
          className="bg-gradient-to-r from-primary to-primary-600 px-4 py-3 flex justify-between items-center cursor-pointer text-white"
          onClick={toggleMinimized}
        >
          <div className="flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            <span className="font-medium">Your Progress</span>
          </div>
          {minimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {/* Expanded content */}
        <AnimatePresence>
          {!minimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-4">
                {/* Level information */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Level {userData.level}</span>
                    <span className="text-xs text-neutral-500">{userData.points} / {userData.nextLevelPoints} XP</span>
                  </div>
                  <LevelProgressBar progress={userData.progress} />
                </div>
                
                {/* Points and streak displays */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <PointsDisplay points={userData.points} />
                  <StreakDisplay streak={userData.streak} />
                </div>
                
                {/* Recent badges section */}
                {userData.badges && userData.badges.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase font-semibold text-neutral-500 mb-2">Recent Achievements</h4>
                    <div className="flex flex-wrap gap-2">
                      {userData.badges.slice(0, 3).map(badge => (
                        <div 
                          key={badge.name}
                          className="bg-neutral-100 rounded-full px-3 py-1 flex items-center text-xs"
                          title={badge.description}
                        >
                          <Award size={12} className="text-accent mr-1" />
                          {badge.name}
                        </div>
                      ))}
                      {userData.badges.length > 3 && (
                        <div className="bg-neutral-100 rounded-full px-3 py-1 flex items-center text-xs">
                          +{userData.badges.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Footer with link to full achievements page */}
                <div className="mt-4 pt-3 border-t border-neutral-100 text-center">
                  <a 
                    href="/achievements" 
                    className="text-primary text-sm font-medium hover:text-primary-600 inline-flex items-center"
                  >
                    View All Achievements
                    <ChevronDown className="h-4 w-4 ml-1 rotate-270" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default GamificationWidget;