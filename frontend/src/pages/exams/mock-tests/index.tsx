import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { 
  Clock, Search, Filter, Clipboard, Award, CheckCircle, 
  Star, AlertCircle, ChevronDown, ArrowRight, ListFilter
} from 'lucide-react';
import Layout from '../../../components/layout/Layout';
import Button from '../../../components/ui/Button';

// Types
interface MockTest {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  attempts: number;
  avgScore: number;
  isPremium: boolean;
  isRecommended?: boolean;
  type: 'full-length' | 'sectional' | 'topic-wise' | 'previous-year';
  topics?: string[];
  lastAttemptDate?: string;
  lastScore?: number;
  isPaused?: boolean;
}

// Mock data for tests
const mockTestsData: MockTest[] = [
  {
    id: 'test-1',
    title: 'UPSC Prelims 2024 - Full Mock 1',
    description: 'Comprehensive mock test covering all subjects based on latest pattern',
    questions: 100,
    duration: 120,
    difficulty: 'medium',
    attempts: 4250,
    avgScore: 68,
    isPremium: false,
    type: 'full-length'
  },
  {
    id: 'test-2',
    title: 'Indian Polity Sectional Test',
    description: 'Focus on Constitutional Framework and Amendments',
    questions: 50,
    duration: 60,
    difficulty: 'medium',
    attempts: 3180,
    avgScore: 72,
    isPremium: false,
    type: 'sectional',
    topics: ['Polity', 'Constitution']
  },
  {
    id: 'test-3',
    title: 'Economic Survey & Budget Analysis',
    description: 'Questions based on the latest Economic Survey and Union Budget',
    questions: 30,
    duration: 45,
    difficulty: 'hard',
    attempts: 1820,
    avgScore: 61,
    isPremium: true,
    isRecommended: true,
    type: 'topic-wise',
    topics: ['Economy', 'Budget']
  },
  {
    id: 'test-4',
    title: 'UPSC Prelims 2023 - Original Paper',
    description: 'Previous year questions from 2023 prelims exam',
    questions: 100,
    duration: 120,
    difficulty: 'hard',
    attempts: 5610,
    avgScore: 59,
    isPremium: false,
    type: 'previous-year'
  },
  {
    id: 'test-5',
    title: 'Geography & Environment',
    description: 'Focus on Physical Geography and Environmental Conservation',
    questions: 40,
    duration: 50,
    difficulty: 'easy',
    attempts: 2980,
    avgScore: 76,
    isPremium: false,
    type: 'sectional',
    topics: ['Geography', 'Environment'],
    lastAttemptDate: 'April 2, 2025',
    lastScore: 82
  },
  {
    id: 'test-6',
    title: 'UPSC Prelims 2024 - Full Mock 2',
    description: 'Advanced difficulty full mock with comprehensive coverage',
    questions: 100,
    duration: 120,
    difficulty: 'hard',
    attempts: 3150,
    avgScore: 58,
    isPremium: true,
    type: 'full-length'
  },
  {
    id: 'test-7',
    title: 'Science & Technology Quiz',
    description: 'Latest developments in science, tech and IT',
    questions: 35,
    duration: 40,
    difficulty: 'medium',
    attempts: 2340,
    avgScore: 68,
    isPremium: false,
    type: 'topic-wise',
    topics: ['Science', 'Technology', 'IT'],
    isPaused: true
  },
  {
    id: 'test-8',
    title: 'Current Affairs (Jan-Mar 2025)',
    description: 'Questions based on major events from Q1 2025',
    questions: 50,
    duration: 60,
    difficulty: 'medium',
    attempts: 1870,
    avgScore: 71,
    isPremium: true,
    type: 'topic-wise',
    topics: ['Current Affairs']
  },
  {
    id: 'test-9',
    title: 'UPSC Prelims 2022 - Original Paper',
    description: 'Previous year questions from 2022 prelims exam',
    questions: 100,
    duration: 120,
    difficulty: 'medium',
    attempts: 4890,
    avgScore: 64,
    isPremium: false,
    type: 'previous-year'
  }
];

const MockTestsPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filteredTests, setFilteredTests] = useState<MockTest[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filter states
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [durationFilter, setDurationFilter] = useState<string[]>([]);
  const [topicsFilter, setTopicsFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Premium status (would come from auth context in a real app)
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchMockTests = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
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
    
    fetchMockTests();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...mockTestsData];
    
    // Apply tab filter
    if (activeTab !== 'all') {
      result = result.filter(test => test.type === activeTab);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(test => 
        test.title.toLowerCase().includes(query) || 
        test.description.toLowerCase().includes(query) ||
        (test.topics && test.topics.some(topic => topic.toLowerCase().includes(query)))
      );
    }
    
    // Apply difficulty filter
    if (difficultyFilter.length > 0) {
      result = result.filter(test => difficultyFilter.includes(test.difficulty));
    }
    
    // Apply duration filter
    if (durationFilter.length > 0) {
      result = result.filter(test => {
        if (durationFilter.includes('short') && test.duration <= 45) return true;
        if (durationFilter.includes('medium') && test.duration > 45 && test.duration < 90) return true;
        if (durationFilter.includes('long') && test.duration >= 90) return true;
        return false;
      });
    }
    
    // Apply topics filter
    if (topicsFilter.length > 0) {
      result = result.filter(test => 
        test.topics && test.topics.some(topic => topicsFilter.includes(topic))
      );
    }
    
    setFilteredTests(result);
  }, [activeTab, searchQuery, difficultyFilter, durationFilter, topicsFilter]);
  
  // Toggle filter selection
  const toggleFilter = (filterType: string, value: string) => {
    let newFilter: string[] = [];
    
    switch (filterType) {
      case 'difficulty':
        newFilter = difficultyFilter.includes(value) 
          ? difficultyFilter.filter(item => item !== value) 
          : [...difficultyFilter, value];
        setDifficultyFilter(newFilter);
        break;
        
      case 'duration':
        newFilter = durationFilter.includes(value) 
          ? durationFilter.filter(item => item !== value) 
          : [...durationFilter, value];
        setDurationFilter(newFilter);
        break;
        
      case 'topics':
        newFilter = topicsFilter.includes(value) 
          ? topicsFilter.filter(item => item !== value) 
          : [...topicsFilter, value];
        setTopicsFilter(newFilter);
        break;
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setDifficultyFilter([]);
    setDurationFilter([]);
    setTopicsFilter([]);
    setSearchQuery('');
  };
  
  const handleStartTest = (test: MockTest) => {
    if (test.isPremium && !isPremiumUser) {
      // Show upgrade modal or redirect to pricing
      router.push('/pricing?redirect=/exams/mock-tests/' + test.id);
      return;
    }
    
    if (test.isPaused) {
      router.push(`/exams/mock-tests/${test.id}/resume`);
    } else {
      router.push(`/exams/mock-tests/${test.id}/start`);
    }
  };

  // Get all unique topics from the tests
  const allTopics = Array.from(
    new Set(
      mockTestsData
        .filter(test => test.topics)
        .flatMap(test => test.topics || [])
    )
  ).sort();
  
  // Format duration to human-readable format
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };
  
  return (
    <Layout userRole="premium">
      <Head>
        <title>Mock Tests | UPSCMONK</title>
      </Head>
      
      <div className="bg-neutral-50 min-h-screen pb-12">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 py-8">
          <div className="container">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">Mock Tests</h1>
              <p className="text-neutral-600">
                Prepare for your exams with our comprehensive collection of mock tests
              </p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container py-8">
          {/* Tabs and search */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="p-1 border-b border-neutral-200">
              <div className="flex flex-wrap">
                <button
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'all' ? 
                    'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                  onClick={() => setActiveTab('all')}
                >
                  All Tests
                </button>
                <button
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'full-length' ? 
                    'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                  onClick={() => setActiveTab('full-length')}
                >
                  Full-Length Mocks
                </button>
                <button
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'sectional' ? 
                    'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                  onClick={() => setActiveTab('sectional')}
                >
                  Sectional Tests
                </button>
                <button
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'topic-wise' ? 
                    'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                  onClick={() => setActiveTab('topic-wise')}
                >
                  Topic-Wise Tests
                </button>
                <button
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'previous-year' ? 
                    'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                  onClick={() => setActiveTab('previous-year')}
                >
                  Previous Year Papers
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-grow">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search tests by name, topic or keyword..."
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-100"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={18} />
                  <span className="text-sm font-medium">Filters</span>
                  <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {/* Expandable filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Difficulty filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        Difficulty
                      </h3>
                      <div className="space-y-2">
                        {['easy', 'medium', 'hard'].map(difficulty => (
                          <label key={difficulty} className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded text-primary focus:ring-primary"
                              checked={difficultyFilter.includes(difficulty)}
                              onChange={() => toggleFilter('difficulty', difficulty)}
                            />
                            <span className="ml-2 text-sm capitalize">{difficulty}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Duration filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Clock size={16} className="mr-1" />
                        Duration
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded text-primary focus:ring-primary"
                            checked={durationFilter.includes('short')}
                            onChange={() => toggleFilter('duration', 'short')}
                          />
                          <span className="ml-2 text-sm">Short (&lt;45 min)</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded text-primary focus:ring-primary"
                            checked={durationFilter.includes('medium')}
                            onChange={() => toggleFilter('duration', 'medium')}
                          />
                          <span className="ml-2 text-sm">Medium (45-90 min)</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded text-primary focus:ring-primary"
                            checked={durationFilter.includes('long')}
                            onChange={() => toggleFilter('duration', 'long')}
                          />
                          <span className="ml-2 text-sm">Long (90+ min)</span>
                        </label>
                      </div>
                    </div>
                    
                    {/* Topics filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <ListFilter size={16} className="mr-1" />
                        Topics
                      </h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                        {allTopics.map(topic => (
                          <label key={topic} className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded text-primary focus:ring-primary"
                              checked={topicsFilter.includes(topic)}
                              onChange={() => toggleFilter('topics', topic)}
                            />
                            <span className="ml-2 text-sm">{topic}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button
                      className="text-sm text-neutral-600 hover:text-neutral-800 mr-4"
                      onClick={resetFilters}
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
          
          {/* Tests grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between mb-4">
                    <div className="h-8 bg-neutral-200 rounded w-1/3"></div>
                    <div className="h-8 bg-neutral-200 rounded w-1/3"></div>
                  </div>
                  <div className="h-10 bg-neutral-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : filteredTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map(test => (
                <div 
                  key={test.id} 
                  className={`bg-white rounded-xl shadow-sm p-6 border ${
                    test.isRecommended ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  {test.isRecommended && (
                    <div className="flex items-center text-primary mb-2">
                      <Star size={16} className="fill-primary" />
                      <span className="text-xs font-medium ml-1">Recommended for you</span>
                    </div>
                  )}
                  
                  {test.isPremium && (
                    <div className="float-right ml-2 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
                      Premium
                    </div>
                  )}
                  
                  <h3 className="font-bold text-lg mb-1">{test.title}</h3>
                  <p className="text-neutral-600 text-sm mb-4">{test.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-sm">
                      <span className="text-neutral-500 block">Questions</span>
                      <span className="font-medium">{test.questions}</span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-neutral-500 block">Duration</span>
                      <span className="font-medium">{formatDuration(test.duration)}</span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-neutral-500 block">Difficulty</span>
                      <span className={`font-medium capitalize ${
                        test.difficulty === 'easy' ? 'text-success' :
                        test.difficulty === 'medium' ? 'text-amber-600' :
                        'text-error'
                      }`}>
                        {test.difficulty}
                      </span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-neutral-500 block">Avg. Score</span>
                      <span className="font-medium">{test.avgScore}%</span>
                    </div>
                  </div>
                  
                  {test.lastAttemptDate && (
                    <div className="bg-neutral-50 p-3 rounded-lg mb-4">
                      <div className="flex items-center text-sm">
                        <CheckCircle size={16} className="text-success" />
                        <div className="ml-2">
                          <span className="font-medium">Last attempt: {test.lastScore}%</span>
                          <span className="text-neutral-500 block text-xs">
                            {test.lastAttemptDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Button
                    variant={test.isPaused ? "accent" : "primary"}
                    fullWidth
                    rightIcon={<ArrowRight size={16} />}
                    onClick={() => handleStartTest(test)}
                    disabled={test.isPremium && !isPremiumUser}
                  >
                    {test.isPaused ? 'Resume Test' : 'Start Test'}
                  </Button>
                  
                  {test.isPremium && !isPremiumUser && (
                    <p className="text-center text-xs text-neutral-500 mt-2">
                      Upgrade to access premium tests
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Clipboard className="mx-auto h-12 w-12 text-neutral-300 mb-2" />
              <h3 className="text-lg font-medium text-neutral-800 mb-1">No matching tests found</h3>
              <p className="text-neutral-600 mb-4">
                Try adjusting your filters or search criteria
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Reset all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MockTestsPage;