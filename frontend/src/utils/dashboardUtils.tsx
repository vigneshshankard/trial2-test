import React, { JSX } from 'react';
import { 
  BookOpen, Calendar, FileText, Bell, Star, Info, Award, Clipboard
} from 'lucide-react';

// Types for dashboard data
interface StudyMetrics {
  hoursSpent: number;
  questionsAttempted: number;
  questionsCorrect: number;
  topicsCompleted: number;
  currentStreak: number;
  rank: number;
  totalUsers: number;
}

interface UpcomingExam {
  id: string;
  name: string;
  date: string;
  daysLeft: number;
  preparednessScore?: number;
}

interface RecentActivity {
  id: string;
  type: 'mock_test' | 'study_material' | 'note' | 'current_affairs';
  title: string;
  date: string;
  score?: number;
  totalQuestions?: number;
  progress?: number;
}

interface RecommendedContent {
  id: string;
  type: 'mock_test' | 'study_material' | 'current_affairs';
  title: string;
  description: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'exam' | 'system' | 'achievement' | 'update';
}

interface DashboardData {
  metrics: StudyMetrics;
  upcomingExams: UpcomingExam[];
  recentActivities: RecentActivity[];
  recommendedContent: RecommendedContent[];
  notifications: Notification[];
}

/**
 * Mocks API call to fetch dashboard data
 * This would be replaced with actual API calls in production
 */
export const fetchMockDashboardData = async (): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    metrics: {
      hoursSpent: 42,
      questionsAttempted: 378,
      questionsCorrect: 302,
      topicsCompleted: 15,
      currentStreak: 7,
      rank: 156,
      totalUsers: 5243
    },
    upcomingExams: [
      {
        id: "upsc-prelims-2025",
        name: "UPSC Prelims 2025",
        date: "May 31, 2025",
        daysLeft: 52,
        preparednessScore: 68
      },
      {
        id: "upsc-mains-2025",
        name: "UPSC Mains 2025",
        date: "September 15, 2025",
        daysLeft: 159,
        preparednessScore: 42
      }
    ],
    recentActivities: [
      {
        id: "mt-1234",
        type: "mock_test" as const,
        title: "UPSC Prelims Full Mock Test",
        date: "2 hours ago",
        score: 76,
        totalQuestions: 100
      },
      {
        id: "sm-5678",
        type: "study_material" as const,
        title: "Indian Polity: Constitutional Framework",
        date: "Yesterday",
        progress: 64
      },
      {
        id: "ca-9012",
        type: "current_affairs" as const,
        title: "April 2025 Current Affairs Compilation",
        date: "3 days ago",
        progress: 32
      },
      {
        id: "note-3456",
        type: "note" as const,
        title: "Environment and Ecology Notes",
        date: "5 days ago"
      }
    ],
    recommendedContent: [
      {
        id: "mt-7890",
        type: "mock_test" as const,
        title: "Topic-wise Test: Modern Indian History",
        description: "Test your knowledge on key events and personalities of Modern Indian History with this focused test.",
        difficulty: "intermediate" as const,
        estimatedTime: 60
      },
      {
        id: "sm-1234",
        type: "study_material" as const,
        title: "International Relations: India and Its Neighbors",
        description: "Comprehensive study material on India's foreign policy and relations with neighboring countries.",
        difficulty: "advanced" as const,
        estimatedTime: 120
      },
      {
        id: "ca-5678",
        type: "current_affairs" as const,
        title: "Latest Policy Initiatives and Schemes",
        description: "Stay updated with the latest government schemes and policy initiatives relevant for UPSC.",
        estimatedTime: 45
      }
    ],
    notifications: [
      {
        id: "notif-1",
        type: "exam" as const,
        title: "New Mock Test Available",
        message: "A new prelims mock test has been added to help you prepare for the upcoming exam.",
        date: "2h ago",
        isRead: false
      },
      {
        id: "notif-2",
        type: "achievement" as const,
        title: "Streak Milestone Reached!",
        message: "Congratulations! You've maintained a study streak for 7 consecutive days.",
        date: "1d ago",
        isRead: true
      },
      {
        id: "notif-3",
        type: "system" as const,
        title: "Profile Updated",
        message: "Your profile has been successfully updated with your preferred exam focus areas.",
        date: "2d ago",
        isRead: true
      }
    ]
  };
};

/**
 * Returns the time of day greeting (Morning, Afternoon, Evening)
 */
export const getTimeOfDay = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';
  return 'Evening';
};

/**
 * Formats time in minutes to a readable format
 */
export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min${minutes === 1 ? '' : 's'}`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} hour${hours === 1 ? '' : 's'}`;
    } else {
      return `${hours} hour${hours === 1 ? '' : 's'} ${remainingMinutes} min${remainingMinutes === 1 ? '' : 's'}`;
    }
  }
};

/**
 * Icons for different activity types
 */
export const activityTypeIcons: Record<string, JSX.Element> = {
  mock_test: <Clipboard size={18} className="text-success" />,
  study_material: <BookOpen size={18} className="text-primary" />,
  current_affairs: <Calendar size={18} className="text-accent" />,
  note: <FileText size={18} className="text-secondary" />
};

/**
 * Icons for different notification types
 */
export const notificationTypeIcons: Record<string, JSX.Element> = {
  exam: <Calendar size={18} className="text-primary" />,
  system: <Info size={18} className="text-secondary" />,
  achievement: <Award size={18} className="text-success" />,
  update: <Bell size={18} className="text-accent" />
};