import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  Search, Filter, ChevronDown, Clock, BarChart2, 
  Calendar, Tag, Award, Users, Book, Star,
  CheckCircle, AlertCircle, Lock, PieChart, ListFilter
} from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';

// Types
interface MockTest {
  id: string;
  title: string;
  description: string;
  type: 'prelims' | 'mains' | 'sectional' | 'subject';
  category: string;
  topics: string[];
  duration: number; // in minutes
  questions: number;
  isPremium: boolean;
  attempted?: number;
  averageScore?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  date: string;
  isNew?: boolean;
}

interface TestCategory {
  id: string;
  name: string;
  count: number;
}

// Mock data
const testCategories: TestCategory[] = [
  { id: 'all-india', name: 'All India Test Series', count: 24 },
  { id: 'subject-wise', name: 'Subject-wise Tests', count: 86 },
  { id: 'sectional', name: 'Sectional Tests', count: 118 },
  { id: 'essay', name: 'Essay Tests', count: 12 },
  { id: 'previous-year', name: 'Previous Year Papers', count: 42 },
  { id: 'daily-quiz', name: 'Daily Quiz', count: 365 }
];

const mockTests: MockTest[] = [
  {
    id: 'mt1',
    title: 'UPSC CSE Prelims Full Mock Test 2025 - 1',
    description: 'Full-length mock test with UPSC pattern questions covering all GS Paper I topics with detailed explanations.',
    type: 'prelims',
    category: 'All India Test Series',
    topics: ['General Studies', 'Current Affairs', 'History', 'Geography'],
    duration: 120,
    questions: 100,
    difficulty: 'medium',
    isPremium: false,
    attempted: 4582,
    averageScore: 63.2,
    date: '2025-03-20'
  },
  {
    id: 'mt2',
    title: 'Indian History & Culture Sectional Test',
    description: 'Focused test covering ancient, medieval, and modern Indian history with art, culture, and heritage questions.',
    type: 'sectional',
    category: 'Subject-wise Tests',
    topics: ['Ancient History', 'Medieval History', 'Modern History', 'Art & Culture'],
    duration: 60,
    questions: 50,
    difficulty: 'medium',
    isPremium: false,
    attempted: 3245,
    averageScore: 58.7,
    date: '2025-03-18'
  },
  {
    id: 'mt3',
    title: 'Environment & Ecology Full Test',
    description: 'Comprehensive test covering all aspects of environment, climate change, biodiversity and related policies.',
    type: 'subject',
    category: 'Subject-wise Tests',
    topics: ['Environment', 'Ecology', 'Climate Change', 'Biodiversity'],
    duration: 45,
    questions: 35,
    difficulty: 'medium',
    isPremium: false,
    attempted: 2850,
    averageScore: 61.5,
    date: '2025-03-15'
  },
  {
    id: 'mt4',
    title: 'UPSC CSE Prelims Full Mock Test 2025 - 2',
    description: 'Second full-length mock test with UPSC pattern questions focusing on current affairs and static portions.',
    type: 'prelims',
    category: 'All India Test Series',
    topics: ['General Studies', 'Current Affairs', 'Economy', 'Science & Tech'],
    duration: 120,
    questions: 100,
    difficulty: 'hard',
    isPremium: true,
    attempted: 2140,
    averageScore: 56.8,
    date: '2025-03-25',
    isNew: true
  },
  {
    id: 'mt5',
    title: 'Indian Economy Sectional Test',
    description: 'Focused test on Indian Economy covering economic reforms, banking, fiscal policy, and international trade.',
    type: 'sectional',
    category: 'Subject-wise Tests',
    topics: ['Economic Reforms', 'Banking', 'Fiscal Policy', 'International Trade'],
    duration: 45,
    questions: 40,
    difficulty: 'hard',
    isPremium: true,
    attempted: 1985,
    averageScore: 54.2,
    date: '2025-03-22'
  },
  {
    id: 'mt6',
    title: 'UPSC CSE Mains GS-I Practice Test',
    description: 'Practice test for GS Paper I with long and medium answer questions on history, geography, society, and arts.',
    type: 'mains',
    category: 'All India Test Series',
    topics: ['Indian Heritage', 'World History', 'Indian Society', 'Physical Geography'],
    duration: 180,
    questions: 20,
    difficulty: 'hard',
    isPremium: true,
    attempted: 1245,
    averageScore: 52.6,
    date: '2025-03-28',
    isNew: true
  }
];

// User's statistics (for demo purposes)
const userStats = {
  testsCompleted: 34,
  averageScore: 62.8,
  strongestSubject: 'History',
  weakestSubject: 'Economy',
  totalQuestionsSolved: 2430,
  topPercentile: 15
};

const MockTestsPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'difficulty'>('newest');

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch data from an API here
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Check if user is premium (from context/API in real app)
        const userToken = localStorage.getItem('userToken');
        setIsPremiumUser(!!userToken && Math.random() > 0.5); // Random for demo
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching mock tests:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Get all unique test types and difficulty levels
  const testTypes = Array.from(new Set(mockTests.map(test => test.type)));
  const difficultyLevels = Array.from(new Set(mockTests.map(test => test.difficulty)));
  
  // Filter tests based on search, category, type, and difficulty
  const getFilteredTests = () => {
    return mockTests.filter(test => {
      // Apply search filter
      if (searchQuery && !test.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !test.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !test.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }
      
      // Apply category filter
      if (activeCategory && test.category !== activeCategory) {
        return false;
      }
      
      // Apply type filter
      if (activeType && test.type !== activeType) {
        return false;
      }
      
      // Apply difficulty filter
      if (activeDifficulty && test.difficulty !== activeDifficulty) {
        return false;
      }
      
      return true;
    });
  };
  
  // Sort filtered tests
  const getSortedTests = () => {
    const filtered = getFilteredTests();
    
    switch (sortBy) {
      case 'popular':
        return [...filtered].sort((a, b) => 
          (b.attempted || 0) - (a.attempted || 0)
        );
      case 'difficulty':
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        return [...filtered].sort((a, b) => 
          difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]
        );
      case 'newest':
      default:
        return [...filtered].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
  };
  
  // Handle test start
  const handleStartTest = (test: MockTest) => {
    if (test.isPremium && !isPremiumUser) {
      router.push('/pricing?redirect=/mock-tests');
      return;
    }
    
    // In a real app, this would redirect to the test page
    router.push(`/mock-tests/${test.id}`);
  };
  
  // Get label for test types
  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'prelims': 'Prelims',
      'mains': 'Mains',
      'sectional': 'Sectional',
      'subject': 'Subject-wise'
    };
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  return (
    <Layout userRole="free">
      <Head>
        <title>Mock Tests | UPSCMONK</title>
        <meta name="description" content="Practice with our comprehensive mock tests designed to simulate UPSC exam conditions." />
      </Head>
      
      <div className="bg-neutral-50 min-h-screen pb-12">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 py-8">
          <div className="container">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">Mock Tests</h1>
              <p className="text-neutral-600">
                Simulate real exam conditions with UPSC pattern questions and detailed analysis
              </p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container py-8">
          {/* Dashboard and Stats */}
          {!isLoading && (
            <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <BarChart2 className="text-primary" size={18} />
                  Your Test Performance
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
                <div className="p-5 text-center">
                  <div className="text-2xl font-bold text-primary">{userStats.testsCompleted}</div>
                  <div className="text-sm text-neutral-600">Tests Completed</div>
                </div>
                <div className="p-5 text-center">
                  <div className="text-2xl font-bold text-primary">{userStats.averageScore}%</div>
                  <div className="text-sm text-neutral-600">Average Score</div>
                </div>
                <div className="p-5 text-center">
                  <div className="text-2xl font-bold text-primary">{userStats.topPercentile}%</div>
                  <div className="text-sm text-neutral-600">Top Percentile</div>
                </div>
                <div className="p-5 text-center">
                  <div className="text-2xl font-bold text-primary">{userStats.totalQuestionsSolved}</div>
                  <div className="text-sm text-neutral-600">Questions Solved</div>
                </div>
                <div className="p-5">
                  <div className="text-sm text-neutral-600 mb-1">Subject Performance</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Strongest: {userStats.strongestSubject}
                    </span>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                      Weakest: {userStats.weakestSubject}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-neutral-50 text-center">
                <Link href="/dashboard/analytics">
                  <Button variant="outline" size="sm" rightIcon={<ChevronDown size={16} />}>
                    View Detailed Analytics
                  </Button>
                </Link>
              </div>
            </div>
          )}
          
          {/* Search and filters */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search for mock tests..."
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    leftIcon={<Filter size={18} />}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    Filters
                    <ChevronDown size={16} className={`ml-1 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </Button>
                  
                  <div className="relative">
                    <Button 
                      variant="outline"
                      leftIcon={<ListFilter size={18} />}
                      onClick={() => {}}
                      rightIcon={<ChevronDown size={16} />}
                    >
                      {sortBy === 'newest' ? 'Newest First' : 
                       sortBy === 'popular' ? 'Most Popular' : 
                       'By Difficulty'}
                    </Button>
                    
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-neutral-200 hidden">
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setSortBy('newest')}
                      >
                        Newest First
                      </button>
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setSortBy('popular')}
                      >
                        Most Popular
                      </button>
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setSortBy('difficulty')}
                      >
                        By Difficulty
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expandable filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Category filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Categories</h3>
                      <div className="space-y-2">
                        {testCategories.map(category => (
                          <button
                            key={category.id}
                            className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-md text-sm ${
                              activeCategory === category.name
                                ? 'bg-primary-50 text-primary font-medium'
                                : 'hover:bg-neutral-100 text-neutral-700'
                            }`}
                            onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
                          >
                            <span>{category.name}</span>
                            <span className="text-xs text-neutral-500">{category.count}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Type filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Test Type</h3>
                      <div className="space-y-2">
                        {testTypes.map(type => (
                          <label key={type} className="flex items-center">
                            <input
                              type="radio"
                              name="type"
                              className="rounded-full text-primary focus:ring-primary"
                              checked={activeType === type}
                              onChange={() => setActiveType(activeType === type ? null : type)}
                            />
                            <span className="ml-2 text-sm">{getTypeLabel(type)}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Difficulty filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Difficulty Level</h3>
                      <div className="space-y-2">
                        {difficultyLevels.map(difficulty => (
                          <label key={difficulty} className="flex items-center">
                            <input
                              type="radio"
                              name="difficulty"
                              className="rounded-full text-primary focus:ring-primary"
                              checked={activeDifficulty === difficulty}
                              onChange={() => setActiveDifficulty(activeDifficulty === difficulty ? null : difficulty)}
                            />
                            <span className="ml-2 text-sm capitalize">{difficulty}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button
                      className="text-sm text-neutral-600 hover:text-neutral-800 mr-4"
                      onClick={() => {
                        setActiveCategory(null);
                        setActiveType(null);
                        setActiveDifficulty(null);
                        setSearchQuery('');
                      }}
                    >
                      Reset filters
                    </button>
                    
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => setShowFilters(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Test Categories quick nav */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 py-2">
              <Button
                variant={activeCategory === null ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(null)}
              >
                All Categories
              </Button>
              
              {testCategories.slice(0, 5).map(category => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.name ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Mock Tests List */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="h-6 bg-neutral-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-2/3 mb-4"></div>
                    <div className="flex justify-between mb-2">
                      <div className="h-5 bg-neutral-200 rounded w-1/4"></div>
                      <div className="h-5 bg-neutral-200 rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="bg-neutral-100 h-12"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {getSortedTests().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getSortedTests().map((test) => (
                    <div key={test.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {test.isNew && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                              NEW
                            </span>
                          )}
                          
                          {test.isPremium && (
                            <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
                              Premium
                            </span>
                          )}
                          
                          <span className={`
                            text-xs font-medium px-2 py-1 rounded
                            ${test.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
                              test.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'}
                          `}>
                            {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                          </span>
                          
                          <span className="bg-primary-50 text-primary text-xs font-medium px-2 py-1 rounded">
                            {getTypeLabel(test.type)}
                          </span>
                        </div>
                        
                        <h3 className="font-bold text-lg mb-2">{test.title}</h3>
                        
                        <p className="text-neutral-600 text-sm mb-3">
                          {test.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-neutral-500">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{test.duration} mins</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Book size={14} />
                            <span>{test.questions} questions</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{test.attempted?.toLocaleString()} attempts</span>
                          </div>
                          
                          {test.averageScore && (
                            <div className="flex items-center gap-1">
                              <Award size={14} />
                              <span>Avg. Score: {test.averageScore}%</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          {test.topics.slice(0, 3).map(topic => (
                            <span key={topic} className="bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded-full">
                              {topic}
                            </span>
                          ))}
                          
                          {test.topics.length > 3 && (
                            <span className="text-neutral-500 text-xs">
                              +{test.topics.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="bg-neutral-50 px-6 py-3 flex justify-between items-center">
                        <div className="text-sm text-neutral-600">
                          {test.category}
                        </div>
                        
                        <div>
                          <Button
                            variant={test.isPremium ? "accent" : "primary"}
                            size="sm"
                            leftIcon={test.isPremium && !isPremiumUser ? <Lock size={16} /> : undefined}
                            onClick={() => handleStartTest(test)}
                            disabled={test.isPremium && !isPremiumUser}
                          >
                            {test.isPremium && !isPremiumUser ? 'Premium Test' : 'Start Test'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <Search className="mx-auto h-12 w-12 text-neutral-300 mb-2" />
                  <h3 className="text-lg font-medium text-neutral-800 mb-1">No matching tests found</h3>
                  <p className="text-neutral-600 mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button variant="outline" onClick={() => {
                    setActiveCategory(null);
                    setActiveType(null);
                    setActiveDifficulty(null);
                    setSearchQuery('');
                  }}>
                    Reset all filters
                  </Button>
                </div>
              )}
            </>
          )}
          
          {/* Pagination */}
          {getSortedTests().length > 0 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="primary" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <span className="px-2">...</span>
                <Button variant="outline" size="sm">
                  12
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
          
          {/* Premium Promo */}
          {!isPremiumUser && (
            <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Unlock Premium Mock Tests</h3>
                  <p className="mb-4">
                    Get access to over 200+ premium mock tests, previous year papers with detailed solutions, and personalized performance analytics.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-white/20 rounded-full">
                        <CheckCircle size={16} className="text-white" />
                      </div>
                      <span className="text-sm">UPSC pattern questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-white/20 rounded-full">
                        <PieChart size={16} className="text-white" />
                      </div>
                      <span className="text-sm">Detailed analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-white/20 rounded-full">
                        <Users size={16} className="text-white" />
                      </div>
                      <span className="text-sm">Peer comparison</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Button 
                    variant="accent" 
                    size="lg"
                    onClick={() => router.push('/pricing')}
                  >
                    Upgrade to Premium
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MockTestsPage;