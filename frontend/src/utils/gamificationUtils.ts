/**
 * Utility functions for the gamification system
 */

// Activity types that can earn points and achievements
export enum ActivityType {
  LOGIN = 'login',
  COMPLETE_QUIZ = 'complete_quiz',
  COMPLETE_MOCK_TEST = 'complete_mock_test',
  STUDY_SESSION = 'study_session',
  VIEW_CURRENT_AFFAIRS = 'view_current_affairs',
  COMMENT = 'post_comment',
  SHARE_NOTES = 'share_notes',
  ANSWER_QUESTION = 'answer_question',
  PERFECT_SCORE = 'perfect_score',
}

// Points awarded for different activities
export const ACTIVITY_POINTS: Record<ActivityType, number> = {
  [ActivityType.LOGIN]: 5,
  [ActivityType.COMPLETE_QUIZ]: 10,
  [ActivityType.COMPLETE_MOCK_TEST]: 25,
  [ActivityType.STUDY_SESSION]: 15,
  [ActivityType.VIEW_CURRENT_AFFAIRS]: 5,
  [ActivityType.COMMENT]: 3,
  [ActivityType.SHARE_NOTES]: 10,
  [ActivityType.ANSWER_QUESTION]: 8,
  [ActivityType.PERFECT_SCORE]: 50,
};

// Calculate user level based on points
export const calculateLevel = (points: number): { level: number; progress: number; nextLevelPoints: number } => {
  // Implement a level progression algorithm
  // For example: Level 1: 0-100 points, Level 2: 101-250 points, Level 3: 251-450 points, etc.
  const levels = [
    { threshold: 0, level: 1, nextLevelPoints: 100 },
    { threshold: 100, level: 2, nextLevelPoints: 250 },
    { threshold: 250, level: 3, nextLevelPoints: 450 },
    { threshold: 450, level: 4, nextLevelPoints: 700 },
    { threshold: 700, level: 5, nextLevelPoints: 1000 },
    { threshold: 1000, level: 6, nextLevelPoints: 1350 },
    { threshold: 1350, level: 7, nextLevelPoints: 1750 },
    { threshold: 1750, level: 8, nextLevelPoints: 2200 },
    { threshold: 2200, level: 9, nextLevelPoints: 2700 },
    { threshold: 2700, level: 10, nextLevelPoints: Infinity },
  ];
  
  // Find the highest level the user has reached
  let userLevel = levels[0];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (points >= levels[i].threshold) {
      userLevel = levels[i];
      break;
    }
  }
  
  // Calculate progress to next level (as percentage)
  const nextLevelIndex = levels.findIndex(l => l.level === userLevel.level + 1);
  let progress = 100; // Default to 100% if at max level
  
  if (nextLevelIndex !== -1) {
    const nextLevel = levels[nextLevelIndex];
    const pointsForCurrentLevel = points - userLevel.threshold;
    const pointsRequiredForNextLevel = nextLevel.threshold - userLevel.threshold;
    progress = Math.round((pointsForCurrentLevel / pointsRequiredForNextLevel) * 100);
  }
  
  return {
    level: userLevel.level,
    progress,
    nextLevelPoints: nextLevelIndex !== -1 ? levels[nextLevelIndex].threshold : userLevel.nextLevelPoints
  };
};

// Track a user activity and return updated gamification data
export const trackActivity = async (userId: string, activity: ActivityType, additionalData?: any) => {
  try {
    const response = await fetch('/api/gamification/track-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        activity,
        points: ACTIVITY_POINTS[activity],
        additionalData
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to track activity');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error tracking activity:', error);
    return null;
  }
};

// Format points with proper suffix (e.g., 1K, 1M)
export const formatPoints = (points: number): string => {
  if (points < 1000) {
    return points.toString();
  } else if (points < 1000000) {
    return (points / 1000).toFixed(1) + 'K';
  } else {
    return (points / 1000000).toFixed(1) + 'M';
  }
};

// Get achievement type based on activity and count
export const getAchievementType = (activity: ActivityType, count: number) => {
  // Define milestones for achievements
  const achievementMilestones = {
    [ActivityType.LOGIN]: [5, 30, 100, 365], // 5-day streak, 30-day streak, etc.
    [ActivityType.COMPLETE_QUIZ]: [10, 50, 100, 500],
    [ActivityType.COMPLETE_MOCK_TEST]: [5, 25, 50, 100],
    [ActivityType.PERFECT_SCORE]: [1, 5, 10, 25],
    // ...other activities
  };
  
  // Find the appropriate achievement based on count
  const milestones = achievementMilestones[activity];
  if (milestones) {
    for (let i = milestones.length - 1; i >= 0; i--) {
      if (count >= milestones[i]) {
        return `${activity}_${milestones[i]}`;
      }
    }
  }
  
  return null;
};