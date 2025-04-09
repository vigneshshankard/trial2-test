import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { 
  BarChart3, PieChart, LineChart, Clock, Calendar, 
  TrendingUp, Target, History, BookOpen, Award, 
  Filter, ChevronDown, ArrowUpRight, Download, Settings,
  Info, CheckCircle2, XCircle, HelpCircle, Activity
} from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';

// Types
interface StudyStats {
  totalHours: number;
  weeklyHours: number[];
  subjectDistribution: { subject: string; hours: number; color: string }[];
  completionRate: number;
  streak: number;
  averageDailyHours: number;
  testScores: { test: string; score: number; date: string }[];
  weeklyProgress: { week: string; planned: number; completed: number }[];
  subjectPerformance: { subject: string; score: number; target: number; color: string }[];
}

interface Milestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  type: string;
}

const mockStats: StudyStats = {
  totalHours: 342,
  weeklyHours: [28, 32, 25, 30, 34, 31, 26],
  subjectDistribution: [
    { subject: 'Indian Polity', hours: 86, color: '#4F46E5' },
    { subject: 'History', hours: 62, color: '#EC4899' },
    { subject: 'Geography', hours: 58, color: '#10B981' },
    { subject: 'Economics', hours: 45, color: '#F59E0B' },
    { subject: 'Science & Tech', hours: 38, color: '#6366F1' },
    { subject: 'Environment', hours: 32, color: '#84CC16' },
    { subject: 'Current Affairs', hours: 21, color: '#EF4444' },
  ],
  completionRate: 0.78,
  streak: 14,
  averageDailyHours: 4.2,
  testScores: [
    { test: 'Mock Test 1', score: 68, date: '2025-02-15' },
    { test: 'Mock Test 2', score: 72, date: '2025-02-28' },
    { test: 'Mock Test 3', score: 75, date: '2025-03-10' },
    { test: 'Mock Test 4', score: 81, date: '2025-03-25' },
    { test: 'Mock Test 5', score: 79, date: '2025-04-05' }
  ],
  weeklyProgress: [
    { week: 'Week 1', planned: 30, completed: 28 },
    { week: 'Week 2', planned: 32, completed: 32 },
    { week: 'Week 3', planned: 30, completed: 25 },
    { week: 'Week 4', planned: 30, completed: 30 },
    { week: 'Week 5', planned: 32, completed: 34 },
    { week: 'Week 6', planned: 32, completed: 31 },
    { week: 'Week 7', planned: 28, completed: 26 }
  ],
  subjectPerformance: [
    { subject: 'Indian Polity', score: 82, target: 85, color: '#4F46E5' },
    { subject: 'History', score: 78, target: 80, color: '#EC4899' },
    { subject: 'Geography', score: 75, target: 80, color: '#10B981' },
    { subject: 'Economics', score: 80, target: 75, color: '#F59E0B' },
    { subject: 'Science & Tech', score: 68, target: 75, color: '#6366F1' },
    { subject: 'Environment', score: 72, target: 70, color: '#84CC16' },
    { subject: 'Current Affairs', score: 85, target: 80, color: '#EF4444' }
  ]
};

const mockMilestones: Milestone[] = [
  { 
    id: 'm1', 
    title: 'Complete Indian Polity Module 1', 
    date: '2025-03-15', 
    completed: true,
    type: 'module'
  },
  { 
    id: 'm2', 
    title: 'Mock Test 1', 
    date: '2025-02-15', 
    completed: true,
    type: 'test'
  },
  { 
    id: 'm3', 
    title: 'Complete Modern History Module', 
    date: '2025-03-25', 
    completed: true,
    type: 'module'
  },
  { 
    id: 'm4', 
    title: 'Mock Test 2', 
    date: '2025-02-28', 
    completed: true,
    type: 'test'
  },
  { 
    id: 'm5', 
    title: 'Complete Economics Basics', 
    date: '2025-04-01', 
    completed: true,
    type: 'module'
  },
  { 
    id: 'm6', 
    title: 'Mock Test 3', 
    date: '2025-03-10', 
    completed: true,
    type: 'test'
  },
  { 
    id: 'm7', 
    title: 'Complete Geography Module 1', 
    date: '2025-04-10', 
    completed: false,
    type: 'module'
  },
  { 
    id: 'm8', 
    title: 'Mock Test 4', 
    date: '2025-03-25', 
    completed: true,
    type: 'test'
  },
  { 
    id: 'm9', 
    title: 'Complete Science & Tech Module 1', 
    date: '2025-04-15', 
    completed: false,
    type: 'module'
  },
  { 
    id: 'm10', 
    title: 'Mock Test 5', 
    date: '2025-04-05', 
    completed: true,
    type: 'test'
  }
];

const AnalyticsPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<StudyStats | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [showStats, setShowStats] = useState<'overview' | 'progress' | 'performance'>('overview');
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('userToken');
    
    if (!token) {
      router.push('/login?redirect=/analytics');
      return;
    }
    
    // Fetch data
    fetchAnalyticsData();
  }, [router]);
  
  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, these would be API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats(mockStats);
      setMilestones(mockMilestones);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setIsLoading(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Function to determine if a milestone is upcoming, completed or overdue
  const getMilestoneStatus = (milestone: Milestone) => {
    if (milestone.completed) return 'completed';
    
    const today = new Date();
    const milestoneDate = new Date(milestone.date);
    
    return today > milestoneDate ? 'overdue' : 'upcoming';
  };
  
  // Sort milestones by date (ascending)
  const sortedMilestones = [...milestones].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const completedMilestones = milestones.filter(m => m.completed);
  const completionPercentage = milestones.length > 0 
    ? (completedMilestones.length / milestones.length) * 100 
    : 0;
    
  return (
    <Layout userRole="free">
      <Head>
        <title>Analytics & Progress | UPSCMONK</title>
      </Head>
      
      <div className="bg-neutral-50 min-h-screen pb-12">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 py-8">
          <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">Analytics & Progress</h1>
                <p className="text-neutral-600 mt-1">
                  Track your study performance, test scores, and milestone achievements
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center rounded-md border border-neutral-200">
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      timeRange === 'week' 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-neutral-600 hover:bg-neutral-50'
                    } rounded-l-md`}
                    onClick={() => setTimeRange('week')}
                  >
                    Week
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      timeRange === 'month' 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-neutral-600 hover:bg-neutral-50'
                    }`}
                    onClick={() => setTimeRange('month')}
                  >
                    Month
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      timeRange === 'quarter' 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-neutral-600 hover:bg-neutral-50'
                    }`}
                    onClick={() => setTimeRange('quarter')}
                  >
                    Quarter
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      timeRange === 'year' 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-neutral-600 hover:bg-neutral-50'
                    } rounded-r-md`}
                    onClick={() => setTimeRange('year')}
                  >
                    Year
                  </button>
                </div>
                
                <Button
                  variant="outline"
                  leftIcon={<Filter size={16} />}
                >
                  Filter
                </Button>
                
                <Button
                  variant="outline"
                  leftIcon={<Download size={16} />}
                >
                  Export
                </Button>
              </div>
            </div>
            
            <div className="mt-6 border-t border-neutral-200 pt-4">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    showStats === 'overview' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                  onClick={() => setShowStats('overview')}
                >
                  Overview
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    showStats === 'progress' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                  onClick={() => setShowStats('progress')}
                >
                  Study Progress
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    showStats === 'performance' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                  onClick={() => setShowStats('performance')}
                >
                  Test Performance
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container py-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded w-2/3 mb-4"></div>
                  <div className="h-12 bg-neutral-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full"></div>
                </div>
              ))}
              <div className="md:col-span-2 lg:col-span-4 bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="h-6 bg-neutral-200 rounded w-1/4 mb-8"></div>
                <div className="h-64 bg-neutral-200 rounded w-full"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Study Hours */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center text-neutral-500 font-medium">
                      <Clock size={18} className="mr-2" /> 
                      Total Study Hours
                    </div>
                    <Info size={18} className="text-neutral-400" />
                  </div>
                  <div className="flex items-baseline">
                    <h3 className="text-3xl font-bold">{stats?.totalHours}</h3>
                    <span className="ml-2 text-green-600 text-sm font-medium flex items-center">
                      <ArrowUpRight size={16} /> 
                      8%
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">vs. previous {timeRange}</p>
                </div>
                
                {/* Completion Rate */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center text-neutral-500 font-medium">
                      <Target size={18} className="mr-2" /> 
                      Completion Rate
                    </div>
                    <Info size={18} className="text-neutral-400" />
                  </div>
                  <div className="flex items-baseline">
                    <h3 className="text-3xl font-bold">{(stats?.completionRate * 100).toFixed(0)}%</h3>
                    <span className="ml-2 text-green-600 text-sm font-medium flex items-center">
                      <ArrowUpRight size={16} /> 
                      5%
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">of planned study time</p>
                </div>
                
                {/* Current Streak */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center text-neutral-500 font-medium">
                      <Activity size={18} className="mr-2" /> 
                      Current Streak
                    </div>
                    <Info size={18} className="text-neutral-400" />
                  </div>
                  <div className="flex items-baseline">
                    <h3 className="text-3xl font-bold">{stats?.streak}</h3>
                    <span className="ml-2 text-neutral-600 text-sm font-medium">days</span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">consecutive study days</p>
                </div>
                
                {/* Latest Test Score */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center text-neutral-500 font-medium">
                      <Award size={18} className="mr-2" /> 
                      Latest Test Score
                    </div>
                    <Info size={18} className="text-neutral-400" />
                  </div>
                  <div className="flex items-baseline">
                    <h3 className="text-3xl font-bold">{stats?.testScores[stats.testScores.length - 1].score}</h3>
                    <span className="ml-2 text-sm font-medium">/ 100</span>
                    <span className="ml-2 text-green-600 text-sm font-medium flex items-center">
                      <ArrowUpRight size={16} /> 
                      2%
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">
                    {stats?.testScores[stats.testScores.length - 1].test}
                  </p>
                </div>
              </div>
              
              {showStats === 'overview' && (
                <>
                  {/* Main Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Weekly Hours Chart */}
                    <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
                      <h3 className="text-lg font-bold mb-1">Weekly Study Hours</h3>
                      <p className="text-sm text-neutral-500 mb-6">Your study time distribution over the past 7 weeks</p>
                      
                      <div className="h-80">
                        {/* Mock Chart Representation - replace with actual chart component */}
                        <div className="h-full flex items-end justify-between border-l border-b border-neutral-200 relative">
                          {stats?.weeklyProgress.map((week, i) => (
                            <div key={i} className="flex flex-col items-center w-1/7">
                              <div className="relative w-16 mb-1">
                                <div 
                                  className="w-6 bg-neutral-200 absolute bottom-0 left-1"
                                  style={{ height: `${(week.planned / 35) * 100}%` }}
                                ></div>
                                <div 
                                  className="w-6 bg-primary absolute bottom-0 left-7"
                                  style={{ height: `${(week.completed / 35) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-neutral-500 mt-2">{week.week}</span>
                            </div>
                          ))}
                          
                          {/* Y-axis labels */}
                          <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-neutral-500 -translate-x-6">
                            <span>35h</span>
                            <span>30h</span>
                            <span>25h</span>
                            <span>20h</span>
                            <span>15h</span>
                            <span>10h</span>
                            <span>5h</span>
                            <span>0h</span>
                          </div>
                        </div>
                        
                        {/* Legend */}
                        <div className="flex items-center justify-center gap-6 mt-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-neutral-200 mr-2"></div>
                            <span className="text-sm text-neutral-600">Planned</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-primary mr-2"></div>
                            <span className="text-sm text-neutral-600">Completed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Subject Distribution */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-bold mb-1">Subject Distribution</h3>
                      <p className="text-sm text-neutral-500 mb-6">Hours spent on each subject</p>
                      
                      <div className="space-y-4 mt-4">
                        {stats?.subjectDistribution.map((subject, i) => (
                          <div key={i}>
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2" 
                                  style={{ backgroundColor: subject.color }}
                                ></div>
                                <span className="text-sm">{subject.subject}</span>
                              </div>
                              <span className="text-sm font-medium">{subject.hours}h</span>
                            </div>
                            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full" 
                                style={{ 
                                  backgroundColor: subject.color,
                                  width: `${(subject.hours / stats.totalHours) * 100}%`
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Milestones Section */}
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex flex-wrap justify-between items-center mb-6">
                      <div>
                        <h3 className="text-lg font-bold">Study Milestones</h3>
                        <p className="text-sm text-neutral-500">
                          Your progress towards key study milestones
                        </p>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="bg-neutral-100 rounded-full h-2 w-40 mr-3">
                          <div 
                            className="bg-primary rounded-full h-2"
                            style={{ width: `${completionPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{completionPercentage.toFixed(0)}% complete</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sortedMilestones.slice(0, 6).map((milestone) => {
                        const status = getMilestoneStatus(milestone);
                        return (
                          <div 
                            key={milestone.id} 
                            className={`flex items-center p-4 rounded-lg ${
                              status === 'completed' 
                                ? 'bg-green-50' 
                                : status === 'overdue' 
                                  ? 'bg-red-50' 
                                  : 'bg-neutral-50'
                            }`}
                          >
                            <div 
                              className={`p-2 rounded-full mr-4 ${
                                status === 'completed' 
                                  ? 'bg-green-100 text-green-600' 
                                  : status === 'overdue' 
                                    ? 'bg-red-100 text-red-600' 
                                    : 'bg-neutral-100 text-neutral-600'
                              }`}
                            >
                              {milestone.type === 'test' ? <Award size={20} /> : <BookOpen size={20} />}
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium text-neutral-800">{milestone.title}</h4>
                              <div className="flex items-center mt-1">
                                <Calendar size={14} className="text-neutral-500 mr-1" />
                                <span className="text-xs text-neutral-500">
                                  {formatDate(milestone.date)}
                                </span>
                              </div>
                            </div>
                            <div>
                              {status === 'completed' ? (
                                <CheckCircle2 className="text-green-500" size={20} />
                              ) : status === 'overdue' ? (
                                <XCircle className="text-red-500" size={20} />
                              ) : (
                                <Clock className="text-neutral-400" size={20} />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <Button variant="outline">View All Milestones</Button>
                    </div>
                  </div>
                </>
              )}
              
              {showStats === 'progress' && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h3 className="text-lg font-bold mb-6">Detailed Study Progress</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="border border-neutral-200 rounded-lg p-5">
                      <h4 className="text-sm font-medium text-neutral-500 mb-3">Average Daily Hours</h4>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">{stats?.averageDailyHours}</span>
                        <span className="text-neutral-600 ml-1">hours</span>
                      </div>
                      <div className="h-32 mt-4 border-neutral-100 border-b">
                        {/* Mock mini bar chart */}
                        <div className="h-full flex items-end justify-between">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                            <div key={i} className="w-8 mx-1">
                              <div 
                                className="w-full bg-primary-100"
                                style={{ 
                                  height: `${Math.random() * 80 + 20}%`,
                                  backgroundColor: i === 2 ? '#4F46E5' : '#E0E7FF' 
                                }}
                              ></div>
                              <div className="text-center text-xs text-neutral-500 mt-1">{day}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-neutral-200 rounded-lg p-5">
                      <h4 className="text-sm font-medium text-neutral-500 mb-3">Weekly Targets</h4>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">86%</span>
                        <span className="text-neutral-600 ml-1">achievement</span>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Target Hours</span>
                          <span className="font-medium">30h</span>
                        </div>
                        <div className="h-2 bg-neutral-100 rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: '100%' }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between text-sm mt-4 mb-1">
                          <span>Completed</span>
                          <span className="font-medium">26h</span>
                        </div>
                        <div className="h-2 bg-neutral-100 rounded-full">
                          <div 
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: '86%' }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between text-sm mt-4 mb-1">
                          <span>Focused Study</span>
                          <span className="font-medium">22h</span>
                        </div>
                        <div className="h-2 bg-neutral-100 rounded-full">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: '73%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-neutral-200 rounded-lg p-5">
                      <h4 className="text-sm font-medium text-neutral-500 mb-3">Productivity Score</h4>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">78</span>
                        <span className="text-neutral-600 ml-1">/ 100</span>
                        <span className="ml-2 text-green-600 text-xs">↑ 5 pts</span>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Focus</span>
                            <span>82/100</span>
                          </div>
                          <div className="h-1.5 bg-neutral-100 rounded-full">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: '82%' }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Consistency</span>
                            <span>75/100</span>
                          </div>
                          <div className="h-1.5 bg-neutral-100 rounded-full">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: '75%' }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Completion</span>
                            <span>78/100</span>
                          </div>
                          <div className="h-1.5 bg-neutral-100 rounded-full">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: '78%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 border-t border-neutral-100 pt-8">
                    <h3 className="text-lg font-bold mb-6">Subject-wise Progress</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-neutral-500 border-b border-neutral-200">
                            <th className="pb-3 font-medium">Subject</th>
                            <th className="pb-3 font-medium">Time Spent</th>
                            <th className="pb-3 font-medium">Target</th>
                            <th className="pb-3 font-medium">Completion</th>
                            <th className="pb-3 font-medium">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stats?.subjectDistribution.map((subject, i) => {
                            const performance = stats.subjectPerformance.find(
                              p => p.subject === subject.subject
                            );
                            return (
                              <tr key={i} className="border-b border-neutral-100">
                                <td className="py-4">
                                  <div className="flex items-center">
                                    <div 
                                      className="w-3 h-3 rounded-full mr-2" 
                                      style={{ backgroundColor: subject.color }}
                                    ></div>
                                    <span className="font-medium">{subject.subject}</span>
                                  </div>
                                </td>
                                <td className="py-4">{subject.hours} hours</td>
                                <td className="py-4">{subject.hours * 1.2 | 0} hours</td>
                                <td className="py-4">
                                  <div className="flex items-center">
                                    <div className="w-24 h-1.5 bg-neutral-100 rounded-full mr-2">
                                      <div 
                                        className="h-full bg-primary rounded-full"
                                        style={{ width: `${(subject.hours / (subject.hours * 1.2)) * 100}%` }}
                                      ></div>
                                    </div>
                                    <span>{((subject.hours / (subject.hours * 1.2)) * 100).toFixed(0)}%</span>
                                  </div>
                                </td>
                                <td className="py-4">
                                  {performance ? performance.score : '-'}/100
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              
              {showStats === 'performance' && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h3 className="text-lg font-bold mb-6">Test Performance Analytics</h3>
                  
                  <div className="mb-8">
                    <h4 className="text-md font-medium mb-4">Score Trends</h4>
                    <div className="h-80 border border-neutral-100 rounded-lg p-4">
                      {/* Mock Line Chart */}
                      <div className="h-full flex items-end justify-between border-l border-b border-neutral-200 relative">
                        {stats?.testScores.map((test, i) => (
                          <div key={i} className="h-full flex flex-col justify-end items-center w-1/5 relative">
                            <div className="absolute top-0 bottom-0 w-px bg-dashed-neutral-200" style={{left: '50%'}}></div>
                            <div 
                              className="w-3 h-3 rounded-full bg-primary z-10 mb-1"
                              style={{ marginBottom: `${test.score - 60}%` }}
                            ></div>
                            {i > 0 && (
                              <div 
                                className="absolute h-px bg-primary"
                                style={{ 
                                  width: `100%`, 
                                  bottom: `${stats.testScores[i-1].score - 60}%`,
                                  left: '-50%'
                                }}
                              ></div>
                            )}
                            <span className="text-xs text-neutral-500 mt-2">{test.test}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="text-md font-medium mb-4">Subject-wise Performance</h4>
                      <div className="space-y-4">
                        {stats?.subjectPerformance.map((subject, i) => (
                          <div key={i}>
                            <div className="flex justify-between mb-1">
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2" 
                                  style={{ backgroundColor: subject.color }}
                                ></div>
                                <span className="text-sm">{subject.subject}</span>
                              </div>
                              <div>
                                <span className="text-sm font-medium">{subject.score}/100</span>
                                <span className="text-xs text-neutral-500 ml-1">(Target: {subject.target})</span>
                              </div>
                            </div>
                            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${subject.score >= subject.target ? 'bg-green-500' : 'bg-amber-500'}`}
                                style={{ width: `${subject.score}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-md font-medium mb-4">Detailed Test Results</h4>
                      <div className="border border-neutral-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-neutral-50">
                            <tr className="text-left text-xs text-neutral-500">
                              <th className="py-3 px-4 font-medium">Test</th>
                              <th className="py-3 px-2 font-medium">Date</th>
                              <th className="py-3 px-2 font-medium text-right">Score</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {stats?.testScores.map((test, i) => (
                              <tr key={i} className="hover:bg-neutral-50">
                                <td className="py-3 px-4 font-medium">{test.test}</td>
                                <td className="py-3 px-2 text-sm">{formatDate(test.date)}</td>
                                <td className="py-3 px-2 text-right">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    test.score >= 80 ? 'bg-green-100 text-green-800' : 
                                    test.score >= 70 ? 'bg-blue-100 text-blue-800' :
                                    test.score >= 60 ? 'bg-amber-100 text-amber-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {test.score}/100
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <div className="flex items-start">
                      <HelpCircle size={20} className="text-primary mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-2">Performance Insights</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <div className="min-w-4 h-4 rounded-full bg-green-500 mt-1 mr-2"></div>
                            <span>Strong performance in Current Affairs (+5%) and Indian Polity (+3%) compared to previous tests.</span>
                          </li>
                          <li className="flex items-start">
                            <div className="min-w-4 h-4 rounded-full bg-amber-500 mt-1 mr-2"></div>
                            <span>Science & Technology scores are below target (-7%). Consider allocating more study time.</span>
                          </li>
                          <li className="flex items-start">
                            <div className="min-w-4 h-4 rounded-full bg-blue-500 mt-1 mr-2"></div>
                            <span>Overall score trend is positive with 13% improvement over the last 3 tests.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;