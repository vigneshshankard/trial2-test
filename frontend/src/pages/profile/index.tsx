import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import { 
  Edit, 
  Lock, 
  Mail, 
  User, 
  Calendar, 
  Clock, 
  BookOpen, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  ChevronRight,
  Shield,
  Bookmark,
  FileText,
  AlertCircle,
  Settings,
  Pencil,
  Save,
  X as XIcon,
  LogOut
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  subscription: string;
  joinedDate: string;
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  targetExam?: string;
  targetYear?: string;
  previousAttempts?: number;
}

interface StudyProgress {
  totalStudyHours: number;
  weeklyStudyHours: number[];
  completedQuizzes: number;
  completedMockTests: number;
  averageScore: number;
  rankPercentile: number;
  studyStreak: number;
  strongestSubject: string;
  weakestSubject: string;
}

interface RecentActivity {
  id: string;
  type: 'quiz' | 'study_material' | 'mock_test' | 'current_affairs' | 'note';
  title: string;
  date: string;
  score?: number;
  totalScore?: number;
  timeSpent?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  progress: number;
}

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { tab = 'overview' } = router.query;
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [studyProgress, setStudyProgress] = useState<StudyProgress | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>((Array.isArray(tab) ? tab[0] : tab) || 'overview');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Activity color map
  const activityColorMap = {
    quiz: 'bg-blue-100 text-blue-800',
    study_material: 'bg-green-100 text-green-800',
    mock_test: 'bg-purple-100 text-purple-800',
    current_affairs: 'bg-amber-100 text-amber-800',
    note: 'bg-gray-100 text-gray-800'
  };

  // Activity icon map
  const activityIconMap = {
    quiz: FileText,
    study_material: BookOpen,
    mock_test: Award,
    current_affairs: Calendar,
    note: Pencil
  };

  useEffect(() => {
    // Simulate fetching user profile data
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock profile data
        const mockProfile: UserProfile = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'Free Tier',
          subscription: 'Free',
          joinedDate: 'January 15, 2023',
          bio: 'UPSC aspirant aiming for IAS. Passionate about public policy and governance.',
          location: 'New Delhi, India',
          phone: '+91 98765 43210',
          targetExam: 'UPSC Civil Services Exam',
          targetYear: '2025',
          previousAttempts: 1
        };
        
        // Mock study progress
        const mockProgress: StudyProgress = {
          totalStudyHours: 342,
          weeklyStudyHours: [8, 7, 9, 6, 8, 10, 5],
          completedQuizzes: 78,
          completedMockTests: 12,
          averageScore: 68.5,
          rankPercentile: 72,
          studyStreak: 14,
          strongestSubject: 'History',
          weakestSubject: 'Economy'
        };
        
        // Mock recent activities
        const mockActivities: RecentActivity[] = [
          {
            id: 'act1',
            type: 'mock_test',
            title: 'UPSC CSE Prelims Mock Test #5',
            date: '2025-04-08',
            score: 78,
            totalScore: 100,
            timeSpent: 120
          },
          {
            id: 'act2',
            type: 'study_material',
            title: 'Indian Polity by Laxmikanth - Chapter 7',
            date: '2025-04-07',
            timeSpent: 90
          },
          {
            id: 'act3',
            type: 'quiz',
            title: 'Geography Quick Quiz',
            date: '2025-04-07',
            score: 8,
            totalScore: 10,
            timeSpent: 15
          },
          {
            id: 'act4',
            type: 'current_affairs',
            title: 'April Week 1 Current Affairs',
            date: '2025-04-06',
            timeSpent: 45
          },
          {
            id: 'act5',
            type: 'note',
            title: 'Environmental Issues - Important Points',
            date: '2025-04-05'
          }
        ];
        
        // Mock achievements
        const mockAchievements: Achievement[] = [
          {
            id: 'ach1',
            title: 'Study Streak',
            description: 'Maintain a study streak of 14 days',
            icon: 'streak',
            earnedDate: '2025-04-05',
            progress: 100
          },
          {
            id: 'ach2',
            title: 'Quiz Master',
            description: 'Complete 50 quizzes with >70% score',
            icon: 'quiz',
            earnedDate: '2025-03-28',
            progress: 100
          },
          {
            id: 'ach3',
            title: 'Subject Expert',
            description: 'Score >80% in 5 tests of History',
            icon: 'expert',
            earnedDate: '2025-03-20',
            progress: 100
          },
          {
            id: 'ach4',
            title: 'Consistent Learner',
            description: 'Study for at least 7 days in a row',
            icon: 'learner',
            earnedDate: '2025-02-15',
            progress: 100
          },
          {
            id: 'ach5',
            title: 'Top Performer',
            description: 'Rank in top 10% in a national mock test',
            icon: 'performer',
            earnedDate: '',
            progress: 65
          }
        ];
        
        setUserProfile(mockProfile);
        setStudyProgress(mockProgress);
        setRecentActivities(mockActivities);
        setAchievements(mockAchievements);
        setEditedProfile(mockProfile);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);
  
  // Update active tab when query param changes
  useEffect(() => {
    if (tab && !Array.isArray(tab)) {
      setActiveTab(tab);
    }
  }, [tab]);
  
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    router.push(`/profile?tab=${newTab}`, undefined, { shallow: true });
  };
  
  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      setEditedProfile({...userProfile});
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => prev ? {...prev, [name]: value} : null);
  };
  
  const handleSaveProfile = async () => {
    if (!editedProfile) return;
    
    setIsSaving(true);
    try {
      // In a real app, this would be an API call to update the profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserProfile(editedProfile);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  const getPercentageClass = (percent: number) => {
    if (percent >= 80) return 'text-success';
    if (percent >= 60) return 'text-primary';
    if (percent >= 40) return 'text-warning';
    return 'text-error';
  };
  
  const renderOverviewTab = () => {
    if (!userProfile || !studyProgress) return null;
    
    return (
      <div className="space-y-8">
        {/* Progress stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Study Hours</p>
                <p className="text-2xl font-bold mt-1">{studyProgress.totalStudyHours}</p>
              </div>
              <div className="h-12 w-12 bg-primary-50 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 text-xs text-neutral-500">
              <span className="text-success font-medium">+{studyProgress.weeklyStudyHours.reduce((a, b) => a + b, 0)} hours</span> this week
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Quizzes Completed</p>
                <p className="text-2xl font-bold mt-1">{studyProgress.completedQuizzes}</p>
              </div>
              <div className="h-12 w-12 bg-secondary-50 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <div className="mt-4 text-xs text-neutral-500">
              Average score: <span className={`font-medium ${getPercentageClass(studyProgress.averageScore)}`}>{studyProgress.averageScore}%</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Mock Tests</p>
                <p className="text-2xl font-bold mt-1">{studyProgress.completedMockTests}</p>
              </div>
              <div className="h-12 w-12 bg-accent-50 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-accent" />
              </div>
            </div>
            <div className="mt-4 text-xs text-neutral-500">
              Rank: Top <span className="text-primary font-medium">{studyProgress.rankPercentile}%</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Study Streak</p>
                <p className="text-2xl font-bold mt-1">{studyProgress.studyStreak} days</p>
              </div>
              <div className="h-12 w-12 bg-warning-50 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-warning" />
              </div>
            </div>
            <div className="mt-4 text-xs text-neutral-500">
              Your longest streak ever!
            </div>
          </div>
        </div>
        
        {/* Performance insights */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-neutral-600 mb-2">Subject Performance</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Strongest: {studyProgress.strongestSubject}</span>
                    <span className="font-medium text-success">82%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Weakest: {studyProgress.weakestSubject}</span>
                    <span className="font-medium text-error">46%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-error h-2 rounded-full" style={{ width: '46%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-neutral-600 mb-2">Weekly Study Hours</h4>
              <div className="h-32 flex items-end justify-between">
                {studyProgress.weeklyStudyHours.map((hours, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="bg-primary w-8 rounded-t" 
                      style={{ height: `${(hours / 10) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1">{['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <Link href="/analytics" className="text-sm text-primary hover:text-primary-600 flex items-center">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`${activityColorMap[activity.type]} p-2 rounded-lg mr-3`}>
                      {React.createElement(activityIconMap[activity.type], { size: 18 })}
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-neutral-500 mt-1">
                        {formatDate(activity.date)}
                        {activity.timeSpent && ` • ${activity.timeSpent} min`}
                      </p>
                    </div>
                  </div>
                  {activity.score !== undefined && (
                    <div className="text-right">
                      <p className={`font-semibold ${getPercentageClass((activity.score / activity.totalScore!) * 100)}`}>
                        {activity.score}/{activity.totalScore}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">Score</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <Link href="/achievements" className="text-sm text-primary hover:text-primary-600 flex items-center">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`border rounded-lg p-4 ${achievement.progress === 100 ? 'border-accent' : 'border-neutral-200'}`}
              >
                <div className="flex items-start">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${achievement.progress === 100 ? 'bg-accent text-white' : 'bg-neutral-100'}`}>
                    <Award size={20} />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-xs text-neutral-500 mt-1">{achievement.description}</p>
                    
                    {achievement.progress === 100 ? (
                      <p className="text-xs text-accent mt-2">Earned on {formatDate(achievement.earnedDate)}</p>
                    ) : (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-neutral-500">Progress</span>
                          <span className="font-medium">{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-1">
                          <div className="bg-primary h-1 rounded-full" style={{ width: `${achievement.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderAccountTab = () => {
    if (!userProfile || !editedProfile) return null;
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Account Information</h3>
          <Button 
            variant={isEditMode ? "outline" : "primary"} 
            leftIcon={isEditMode ? <XIcon size={18} /> : <Edit size={18} />}
            onClick={handleEditToggle}
          >
            {isEditMode ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
        
        {isEditMode ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name
                </label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address
                </label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                  className="form-input w-full bg-neutral-50"
                  disabled
                />
                <p className="text-xs text-neutral-500 mt-1">Contact support to change email</p>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                  Phone Number
                </label>
                <input 
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editedProfile.phone || ''}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
                  Location
                </label>
                <input 
                  type="text"
                  id="location"
                  name="location"
                  value={editedProfile.location || ''}
                  onChange={handleInputChange}
                  className="form-input w-full"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-neutral-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={editedProfile.bio || ''}
                  onChange={handleInputChange}
                  className="form-input w-full"
                  placeholder="Write a short bio"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="targetExam" className="block text-sm font-medium text-neutral-700 mb-1">
                  Target Exam
                </label>
                <select
                  id="targetExam"
                  name="targetExam"
                  value={editedProfile.targetExam || ''}
                  onChange={handleInputChange}
                  className="form-input w-full"
                >
                  <option value="">Select an exam</option>
                  <option value="UPSC Civil Services Exam">UPSC Civil Services Exam</option>
                  <option value="UPSC Engineering Services Exam">UPSC Engineering Services Exam</option>
                  <option value="UPSC NDA Exam">UPSC NDA Exam</option>
                  <option value="UPSC CDS Exam">UPSC CDS Exam</option>
                  <option value="UPSC Combined Medical Services">UPSC Combined Medical Services</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="targetYear" className="block text-sm font-medium text-neutral-700 mb-1">
                    Target Year
                  </label>
                  <select
                    id="targetYear"
                    name="targetYear"
                    value={editedProfile.targetYear || ''}
                    onChange={handleInputChange}
                    className="form-input w-full"
                  >
                    <option value="">Select year</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="previousAttempts" className="block text-sm font-medium text-neutral-700 mb-1">
                    Previous Attempts
                  </label>
                  <select
                    id="previousAttempts"
                    name="previousAttempts"
                    value={editedProfile.previousAttempts?.toString() || '0'}
                    onChange={handleInputChange}
                    className="form-input w-full"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="border-t border-neutral-200 pt-4 flex justify-end">
              <Button 
                variant="primary" 
                leftIcon={<Save size={18} />}
                onClick={handleSaveProfile}
                isLoading={isSaving}
              >
                {isSaving ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Full Name</h4>
                  <p className="mt-1">{userProfile.name}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Email</h4>
                  <div className="mt-1 flex items-center">
                    <Mail size={16} className="text-neutral-400 mr-2" />
                    <p>{userProfile.email}</p>
                  </div>
                </div>
                
                {userProfile.phone && (
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500">Phone</h4>
                    <p className="mt-1">{userProfile.phone}</p>
                  </div>
                )}
                
                {userProfile.location && (
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500">Location</h4>
                    <p className="mt-1">{userProfile.location}</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Account Type</h4>
                  <div className="mt-1 flex items-center">
                    <Shield size={16} className="text-neutral-400 mr-2" />
                    <p>{userProfile.role}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Joined</h4>
                  <p className="mt-1">{userProfile.joinedDate}</p>
                </div>
                
                {userProfile.targetExam && (
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500">Target Exam</h4>
                    <p className="mt-1">{userProfile.targetExam} ({userProfile.targetYear})</p>
                  </div>
                )}
                
                {userProfile.previousAttempts !== undefined && (
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500">Previous Attempts</h4>
                    <p className="mt-1">{userProfile.previousAttempts}</p>
                  </div>
                )}
              </div>
            </div>
            
            {userProfile.bio && (
              <div>
                <h4 className="text-sm font-medium text-neutral-500">Bio</h4>
                <p className="mt-1 text-neutral-700">{userProfile.bio}</p>
              </div>
            )}
            
            <div className="border-t border-neutral-200 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Subscription Plan</h4>
                  <p className="font-medium mt-1">{userProfile.subscription}</p>
                </div>
                
                {userProfile.subscription === 'Free' && (
                  <Link href="/pricing">
                    <Button variant="accent">Upgrade to Premium</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  const renderSettingsTab = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">Settings</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-base font-medium mb-3">Email Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Study Reminders</p>
                  <p className="text-sm text-neutral-500">Daily reminders for your study plan</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Exam Notifications</p>
                  <p className="text-sm text-neutral-500">Updates about upcoming exams and deadlines</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Current Affairs Daily</p>
                  <p className="text-sm text-neutral-500">Daily current affairs updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Communications</p>
                  <p className="text-sm text-neutral-500">Offers, discounts and promotional content</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 pt-6">
            <h4 className="text-base font-medium mb-3">Privacy Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Profile in Leaderboard</p>
                  <p className="text-sm text-neutral-500">Allow others to see your test results and rankings</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Activity Visibility</p>
                  <p className="text-sm text-neutral-500">Allow others to see your recent activity</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 pt-6">
            <h4 className="text-base font-medium mb-3">Security</h4>
            <Button variant="outline" leftIcon={<Lock size={16} />}>
              Change Password
            </Button>
          </div>
          
          <div className="border-t border-neutral-200 pt-6">
            <h4 className="text-base font-medium text-error mb-3">Danger Zone</h4>
            <Button variant="outline" className="text-error border-error hover:bg-error-50" leftIcon={<LogOut size={16} />}>
              Log Out From All Devices
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Layout userRole="free">
        <Head>
          <title>Profile | UPSCMONK</title>
        </Head>
        <div className="container py-20 text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
          <p>Loading profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout userRole="free">
      <Head>
        <title>Profile | UPSCMONK</title>
      </Head>
      <div className="bg-neutral-100 min-h-[80vh] py-10">
        <div className="container">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                {userProfile?.avatar ? (
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile?.name} 
                    className="h-24 w-24 rounded-full object-cover border-4 border-white shadow"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center text-3xl font-semibold border-4 border-white shadow">
                    {userProfile?.name?.charAt(0)}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{userProfile?.name}</h1>
                <p className="text-neutral-500">{userProfile?.role}</p>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {userProfile?.subscription === 'Premium' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
                      <Crown size={12} className="mr-1" /> Premium
                    </span>
                  )}
                  
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {userProfile?.targetExam || 'UPSC Aspirant'}
                  </span>
                  
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle size={12} className="mr-1" /> {studyProgress?.studyStreak || 0} Day Streak
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="mb-6 border-b border-neutral-200 flex overflow-x-auto">
            <button
              onClick={() => handleTabChange('overview')}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'overview' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-neutral-600 hover:text-primary'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleTabChange('account')}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'account' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-neutral-600 hover:text-primary'
              }`}
            >
              Account
            </button>
            <button
              onClick={() => handleTabChange('settings')}
              className={`px-4 py-3 font-medium text-sm whitespace-nowrap ${
                activeTab === 'settings' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-neutral-600 hover:text-primary'
              }`}
            >
              Settings
            </button>
          </div>
          
          {/* Tab Content */}
          <div>
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'account' && renderAccountTab()}
            {activeTab === 'settings' && renderSettingsTab()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;