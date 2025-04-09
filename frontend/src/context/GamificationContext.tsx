import React, { createContext, useState, useContext, useEffect } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  dateEarned: Date;
}

interface GamificationState {
  points: number;
  level: number;
  streak: number;
  badges: Badge[];
  recentBadge: Badge | null;
  progress: number;
  nextLevelPoints: number;
}

interface GamificationContextType {
  state: GamificationState;
  trackActivity: (action: string) => Promise<void>;
  hideAchievementNotification: () => void;
}

const defaultState: GamificationState = {
  points: 0,
  level: 1,
  streak: 0,
  badges: [],
  recentBadge: null,
  progress: 0,
  nextLevelPoints: 100
};

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode; userId?: string }> = ({ children, userId }) => {
  const [state, setState] = useState<GamificationState>(defaultState);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial gamification data
  useEffect(() => {
    if (!userId) return;
    
    const fetchGamificationData = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, use Promise.all for parallel requests
        const pointsResponse = await fetch(`/api/gamification/points/${userId}`);
        const streakResponse = await fetch(`/api/gamification/streak/${userId}`);
        const levelResponse = await fetch(`/api/gamification/level/${userId}`);
        const badgesResponse = await fetch(`/api/gamification/achievements/${userId}`);
        
        if (pointsResponse.ok && streakResponse.ok && levelResponse.ok && badgesResponse.ok) {
          const points = await pointsResponse.json();
          const streak = await streakResponse.json();
          const level = await levelResponse.json();
          const badges = await badgesResponse.json();
          
          setState({
            points: points.totalPoints || 0,
            level: level.level || 1,
            streak: streak.currentStreak || 0,
            badges: badges || [],
            recentBadge: null,
            progress: level.progress || 0,
            nextLevelPoints: level.nextLevelPoints || 100
          });
        }
      } catch (error) {
        console.error("Failed to fetch gamification data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGamificationData();
  }, [userId]);
  
  // Track user activity and update state accordingly
  const trackActivity = async (action: string) => {
    if (!userId) return;
    
    try {
      const response = await fetch('/api/gamification/track-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, action }),
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Update state with new data
        setState(prevState => ({
          ...prevState,
          points: data.totalPoints,
          level: data.level,
          streak: data.streakInfo?.currentStreak || prevState.streak,
          progress: data.progress || prevState.progress,
          nextLevelPoints: data.nextLevelPoints,
          recentBadge: data.newBadges?.length > 0 ? data.newBadges[0] : null,
          badges: data.newBadges?.length > 0 
            ? [...prevState.badges, ...data.newBadges]
            : prevState.badges
        }));
        
        // Here you could also trigger gamification animations or notifications
      }
    } catch (error) {
      console.error("Failed to track activity:", error);
    }
  };
  
  // Hide achievement notification
  const hideAchievementNotification = () => {
    setState(prevState => ({
      ...prevState,
      recentBadge: null
    }));
  };
  
  return (
    <GamificationContext.Provider value={{ 
      state, 
      trackActivity,
      hideAchievementNotification
    }}>
      {children}
    </GamificationContext.Provider>
  );
};

// Custom hook to use the gamification context
export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};