import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  BookOpen, Calendar, TrendingUp, Award, Clock, 
  Clipboard, Users, FileText, Target, Bell,
  ExternalLink, ArrowRight, ChevronRight, Check
} from 'lucide-react';
import Layout from '../../components/layout/Layout';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import DashboardGamificationCard from '../../components/gamification/DashboardGamificationCard';
import Leaderboard from '../../components/gamification/Leaderboard';
import { fetchMockDashboardData, getTimeOfDay, formatTime, activityTypeIcons, notificationTypeIcons } from '../../utils/dashboardUtils';
import { useGamification } from '../../context/GamificationContext';

// Types
interface StudyMetrics {
  hoursSpent: string;
  questionsAttempted: number;
  averageScore: string;
  testsTaken: number;
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
  description: string;
  time?: string;
  score?: number;
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
  time: string;
  read: boolean;
  type: 'exam' | 'system' | 'achievement' | 'update';
}

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const [metrics, setMetrics] = useState<StudyMetrics>({
    hoursSpent: '48h 30m',
    questionsAttempted: 1248,
    averageScore: '68%',
    testsTaken: 32,
  });
  
  const [upcomingExams, setUpcomingExams] = useState<UpcomingExam[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [recommendedContent, setRecommendedContent] = useState<RecommendedContent[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Mock user ID for demonstration purposes
  const currentUserId = "user123";

  // Add a simple activity tracker for gamification
  const trackUserActivity = async (action: string) => {
    console.log(`Tracked activity: ${action}`);
  };

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMockDashboardData();
        setUserName(data.userName);
        setMetrics(data.metrics);
        setUpcomingExams(data.upcomingExams);
        setRecentActivities(data.recentActivities);
        setRecommendedContent(data.recommendedContent);
        setNotifications(data.notifications);
        
        // Track dashboard visit for gamification
        trackUserActivity('visit_dashboard');
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard | UPSCMONK</title>
      </Head>
      <div className="bg-neutral-50 min-h-screen pb-12">
        {isLoading ? (
          <div className="container py-20">
            <div className="flex items-center justify-center">
              <div className="animate-pulse space-y-6 w-full max-w-4xl">
                <div className="h-10 bg-neutral-200 rounded-md w-3/4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 bg-neutral-200 rounded-xl"></div>
                  ))}
                </div>
                <div className="h-64 bg-neutral-200 rounded-xl"></div>
                <div className="h-48 bg-neutral-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-white border-b border-neutral-200 py-8">
              <div className="container">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">
                      Good {getTimeOfDay()}, {userName.split(' ')[0]}
                    </h1>
                    <p className="text-neutral-600 mt-1">
                      Here's an overview of your UPSC preparation journey
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Link href="/dashboard/study-planner">
                      <Button variant="outline" leftIcon={<Calendar size={18} />}>
                        Study Planner
                      </Button>
                    </Link>
                    <Link href="/exams/mock-tests">
                      <Button variant="primary" leftIcon={<Clipboard size={18} />}>
                        Take Test
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="container py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-neutral-500 text-sm font-medium">Study Hours</h3>
                    <Clock size={20} className="text-primary" />
                  </div>
                  <p className="text-3xl font-bold">{metrics.hoursSpent}</p>
                  <p className="text-sm text-success mt-1">+2 hours today</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-neutral-500 text-sm font-medium">Questions Attempted</h3>
                    <Clipboard size={20} className="text-accent" />
                  </div>
                  <p className="text-3xl font-bold">{metrics.questionsAttempted}</p>
                  <p className="text-sm text-success mt-1">+32 since yesterday</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-neutral-500 text-sm font-medium">Average Score</h3>
                    <Target size={20} className="text-success" />
                  </div>
                  <p className="text-3xl font-bold">{metrics.averageScore}</p>
                  <p className="text-sm text-success mt-1">+3% improvement</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-neutral-500 text-sm font-medium">Tests Taken</h3>
                    <BookOpen size={20} className="text-error" />
                  </div>
                  <p className="text-3xl font-bold">{metrics.testsTaken}</p>
                  <p className="text-sm text-success mt-1">+2 this week</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column - 2/3 width */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Upcoming Exams Section */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold flex items-center">
                        <Calendar className="mr-2" size={18} />
                        Upcoming Exams
                      </h2>
                      <Link href="/exams">
                        <Button variant="ghost" size="sm" rightIcon={<ChevronRight size={16} />}>
                          View All
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      {upcomingExams.map(exam => (
                        <div key={exam.id} className="border border-neutral-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{exam.name}</h3>
                            <div className="text-sm bg-primary-50 text-primary px-3 py-1 rounded-full font-medium">
                              {exam.daysLeft} days left
                            </div>
                          </div>
                          <p className="text-neutral-500 text-sm mt-1">{exam.date}</p>
                          
                          {exam.preparednessScore && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm text-neutral-600">Preparedness</p>
                                <p className="text-sm font-medium">{exam.preparednessScore}%</p>
                              </div>
                              <div className="h-2 bg-neutral-100 rounded-full">
                                <div 
                                  className="h-2 rounded-full bg-primary"
                                  style={{ width: `${exam.preparednessScore}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-4 flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              rightIcon={<ExternalLink size={14} />}
                              onClick={() => router.push(`/exams/${exam.id}`)}
                            >
                              Prepare
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recent Activity Section */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold flex items-center">
                        <Clock className="mr-2" size={18} />
                        Recent Activity
                      </h2>
                      <Link href="/history">
                        <Button variant="ghost" size="sm" rightIcon={<ChevronRight size={16} />}>
                          View History
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      {recentActivities.map(activity => (
                        <div key={activity.id} className="flex items-start gap-3 border-b border-neutral-100 pb-4">
                          <div className={`p-2 rounded-full ${
                            activity.type === 'mock_test' ? 'bg-accent-100 text-accent' :
                            activity.type === 'study_material' ? 'bg-primary-100 text-primary' :
                            'bg-success-100 text-success'
                          }`}>
                            {activityTypeIcons[activity.type]}
                          </div>
                          
                          <div>
                            <h3 className="font-medium">{activity.title}</h3>
                            <p className="text-sm text-neutral-500">{activity.description}</p>
                            <div className="text-xs text-neutral-400 mt-1">
                              {activity.time}
                            </div>
                          </div>
                          
                          {activity.score && (
                            <div className="ml-auto text-sm font-medium">
                              Score: <span className="text-success">{activity.score}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recommended Content */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold flex items-center">
                        <BookOpen className="mr-2" size={18} />
                        Recommended for You
                      </h2>
                      <Link href="/recommendations">
                        <Button variant="ghost" size="sm" rightIcon={<ChevronRight size={16} />}>
                          View All
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendedContent.map(content => (
                        <div key={content.id} className="border border-neutral-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            {content.type === 'mock_test' ? (
                              <Clipboard className="text-success" size={20} />
                            ) : content.type === 'study_material' ? (
                              <BookOpen className="text-primary" size={20} />
                            ) : (
                              <Calendar className="text-accent" size={20} />
                            )}
                            <span className="ml-2 text-xs uppercase font-semibold text-neutral-500">
                              {content.type === 'mock_test' ? 'Test' : 
                               content.type === 'study_material' ? 'Study Material' : 
                               'Current Affairs'}
                            </span>
                            
                            {content.difficulty && (
                              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium
                                ${content.difficulty === 'beginner' ? 'bg-success-100 text-success-800' :
                                  content.difficulty === 'intermediate' ? 'bg-primary-100 text-primary-800' :
                                  'bg-error-100 text-error-800'}`}
                              >
                                {content.difficulty}
                              </span>
                            )}
                          </div>
                          
                          <h3 className="font-bold mb-2">{content.title}</h3>
                          <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{content.description}</p>
                          
                          {content.estimatedTime && (
                            <div className="flex items-center text-xs text-neutral-500 mb-4">
                              <Clock size={14} />
                              <span className="ml-1">{formatTime(content.estimatedTime)}</span>
                            </div>
                          )}
                          
                          <Link 
                            href={`/${content.type === 'mock_test' ? 'exams/mock-tests' : 
                                  content.type === 'study_material' ? 'study-materials' : 
                                  'current-affairs'}/${content.id}`}
                          >
                            <Button variant="outline" size="sm" fullWidth rightIcon={<ArrowRight size={16} />}
                                onClick={() => trackUserActivity(`view_${content.type}`)}
                            >
                              {content.type === 'mock_test' ? 'Take Test' : 
                               content.type === 'study_material' ? 'Start Learning' : 
                               'Read Now'}
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right column - 1/3 width */}
                <div className="space-y-6">
                  {/* Gamification Card */}
                  <DashboardGamificationCard />
                  
                  {/* Leaderboard */}
                  <Leaderboard 
                    currentUserId={currentUserId}
                    timeframe="weekly"
                    limit={5}
                  />
                  
                  {/* Notifications */}
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-neutral-50 p-4 flex items-center justify-between border-b border-neutral-200">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 text-neutral-600 mr-2" />
                        <h3 className="font-semibold text-neutral-800">Notifications</h3>
                      </div>
                      <Link href="/notifications">
                        <Button variant="ghost" size="sm" rightIcon={<ChevronRight size={16} />}>
                          View All
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="divide-y divide-neutral-100 max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-4 ${notification.read ? '' : 'bg-neutral-50'}`}>
                          <div className="flex">
                            <div className={`p-2 rounded-full ${
                              notification.type === 'exam' ? 'bg-accent-100 text-accent' :
                              notification.type === 'achievement' ? 'bg-success-100 text-success' :
                              notification.type === 'system' ? 'bg-neutral-100 text-neutral-600' :
                              'bg-primary-100 text-primary'
                            } mr-3`}>
                              {notificationTypeIcons[notification.type]}
                            </div>
                            
                            <div>
                              <h4 className="font-medium text-sm">{notification.title}</h4>
                              <p className="text-sm text-neutral-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-neutral-400 mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;