import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { 
  Search, Filter, BookOpen, Download, FileText, 
  ChevronDown, Tag, ChevronRight, Star, BookmarkPlus,
  Clock, PenLine, ListFilter, Bookmark, Eye, BarChart2
} from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';

// Types
interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'notes' | 'mindmap' | 'quiz';
  subject: string;
  topics: string[];
  format: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  readTime?: string;
  downloadCount?: number;
  imageUrl?: string;
  author?: string;
  fileSize?: string;
  rating?: number;
  reviewCount?: number;
}

interface Subject {
  id: string;
  name: string;
  iconName: string;
  count: number;
}

// Mock data
const subjects: Subject[] = [
  { id: 'history', name: 'History', iconName: 'history', count: 128 },
  { id: 'geography', name: 'Geography', iconName: 'globe', count: 95 },
  { id: 'polity', name: 'Indian Polity', iconName: 'landmark', count: 87 },
  { id: 'economy', name: 'Economy', iconName: 'trending-up', count: 72 },
  { id: 'science', name: 'Science & Technology', iconName: 'zap', count: 64 },
  { id: 'environment', name: 'Environment', iconName: 'leaf', count: 58 },
  { id: 'international', name: 'International Relations', iconName: 'globe', count: 43 },
  { id: 'society', name: 'Society & Social Justice', iconName: 'users', count: 39 }
];

const studyMaterials: StudyMaterial[] = [
  {
    id: 'sm1',
    title: 'Complete Indian History Notes with Timeline',
    description: 'Comprehensive notes covering ancient, medieval, and modern Indian history with timeline charts and important dates.',
    type: 'notes',
    subject: 'History',
    topics: ['Ancient India', 'Medieval India', 'Modern India', 'Indian Freedom Struggle'],
    format: 'PDF',
    isPremium: false,
    createdAt: '2025-01-15',
    updatedAt: '2025-03-20',
    readTime: '120 mins',
    downloadCount: 3450,
    rating: 4.8,
    reviewCount: 342,
    fileSize: '15.4 MB'
  },
  {
    id: 'sm2',
    title: 'Constitutional Framework and Features',
    description: 'Detailed explanation of the Indian Constitution, its key features, amendments, and comparison with constitutions worldwide.',
    type: 'document',
    subject: 'Indian Polity',
    topics: ['Indian Constitution', 'Fundamental Rights', 'DPSP', 'Constitutional Amendments'],
    format: 'PDF',
    isPremium: false,
    createdAt: '2025-02-05',
    updatedAt: '2025-03-12',
    readTime: '90 mins',
    downloadCount: 2870,
    rating: 4.7,
    reviewCount: 215,
    fileSize: '12.6 MB'
  },
  {
    id: 'sm3',
    title: 'Geographical Regions of India with Maps',
    description: 'A detailed study of the physical, economic, and demographic geography of India with high-quality maps and infographics.',
    type: 'document',
    subject: 'Geography',
    topics: ['Physical Geography', 'Economic Geography', 'Demographics', 'Climate'],
    format: 'PDF',
    isPremium: true,
    createdAt: '2025-01-28',
    updatedAt: '2025-03-15',
    readTime: '105 mins',
    downloadCount: 1842,
    rating: 4.9,
    reviewCount: 178,
    fileSize: '28.2 MB'
  },
  {
    id: 'sm4',
    title: 'Indian Economy: Key Concepts and Current Trends',
    description: 'Everything you need to know about the Indian Economy, from basic concepts to recent developments and budget analysis.',
    type: 'notes',
    subject: 'Economy',
    topics: ['Economic Reforms', 'Banking', 'Budget', 'International Trade'],
    format: 'PDF',
    isPremium: false,
    createdAt: '2025-02-18',
    updatedAt: '2025-04-01',
    readTime: '85 mins',
    downloadCount: 2240,
    rating: 4.6,
    reviewCount: 195,
    fileSize: '10.8 MB'
  },
  {
    id: 'sm5',
    title: 'Environment and Ecology Masterclass',
    description: 'A complete guide to environmental issues, conservation strategies, international conventions, and policies with case studies.',
    type: 'document',
    subject: 'Environment',
    topics: ['Biodiversity', 'Climate Change', 'Environmental Laws', 'Sustainability'],
    format: 'PDF',
    isPremium: true,
    createdAt: '2025-01-10',
    updatedAt: '2025-03-28',
    readTime: '110 mins',
    downloadCount: 1690,
    rating: 4.8,
    reviewCount: 142,
    fileSize: '18.4 MB'
  },
  {
    id: 'sm6',
    title: 'Science & Technology: Current Developments',
    description: 'Latest developments in science and technology with special focus on space technology, biotechnology, and IT innovations.',
    type: 'notes',
    subject: 'Science & Technology',
    topics: ['Space Technology', 'Biotechnology', 'IT', 'Defense Technology'],
    format: 'PDF',
    isPremium: false,
    createdAt: '2025-03-05',
    updatedAt: '2025-04-02',
    readTime: '75 mins',
    downloadCount: 1950,
    rating: 4.5,
    reviewCount: 128,
    fileSize: '9.7 MB'
  }
];

const StudyMaterialsPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [activeFormat, setActiveFormat] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'rating'>('popular');
  
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
        console.error('Error fetching study materials:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Get all unique formats and types
  const formats = Array.from(new Set(studyMaterials.map(item => item.format)));
  const types = Array.from(new Set(studyMaterials.map(item => item.type)));
  
  // Filter materials based on search, subject, format, and type
  const getFilteredMaterials = () => {
    return studyMaterials.filter(material => {
      // Apply search filter
      if (searchQuery && !material.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !material.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !material.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }
      
      // Apply subject filter
      if (activeSubject && material.subject.toLowerCase() !== activeSubject.toLowerCase()) {
        return false;
      }
      
      // Apply format filter
      if (activeFormat && material.format !== activeFormat) {
        return false;
      }
      
      // Apply type filter
      if (activeType && material.type !== activeType) {
        return false;
      }
      
      return true;
    });
  };
  
  // Sort filtered materials
  const getSortedMaterials = () => {
    const filtered = getFilteredMaterials();
    
    switch (sortBy) {
      case 'newest':
        return [...filtered].sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      case 'rating':
        return [...filtered].sort((a, b) => 
          (b.rating || 0) - (a.rating || 0)
        );
      case 'popular':
      default:
        return [...filtered].sort((a, b) => 
          (b.downloadCount || 0) - (a.downloadCount || 0)
        );
    }
  };
  
  // Handle bookmark
  const handleBookmark = (id: string) => {
    alert(`Material bookmarked: ${id}`);
  };
  
  // Handle download
  const handleDownload = (material: StudyMaterial) => {
    if (material.isPremium && !isPremiumUser) {
      router.push('/pricing?redirect=/study-materials');
      return;
    }
    
    // In a real app, this would initiate a download
    alert(`Downloading: ${material.title}`);
  };
  
  return (
    <Layout userRole="free">
      <Head>
        <title>Study Materials | UPSCMONK</title>
        <meta name="description" content="Access comprehensive UPSC study materials including notes, documents, and more." />
      </Head>
      
      <div className="bg-neutral-50 min-h-screen pb-12">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 py-8">
          <div className="container">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">Study Materials</h1>
              <p className="text-neutral-600">
                Comprehensive, well-structured notes and resources for all UPSC topics
              </p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container py-8">
          {/* Search and filters */}
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search for study materials..."
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
                      {sortBy === 'popular' ? 'Most Popular' : 
                       sortBy === 'newest' ? 'Newest First' : 
                       'Highest Rated'}
                    </Button>
                    
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-neutral-200 hidden">
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setSortBy('popular')}
                      >
                        Most Popular
                      </button>
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setSortBy('newest')}
                      >
                        Newest First
                      </button>
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setSortBy('rating')}
                      >
                        Highest Rated
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expandable filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Subject filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Subjects</h3>
                      <div className="space-y-2">
                        {subjects.map(subject => (
                          <button
                            key={subject.id}
                            className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-md text-sm ${
                              activeSubject === subject.id
                                ? 'bg-primary-50 text-primary font-medium'
                                : 'hover:bg-neutral-100 text-neutral-700'
                            }`}
                            onClick={() => setActiveSubject(activeSubject === subject.id ? null : subject.id)}
                          >
                            <span>{subject.name}</span>
                            <span className="text-xs text-neutral-500">{subject.count}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Format filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Format</h3>
                      <div className="space-y-2">
                        {formats.map(format => (
                          <label key={format} className="flex items-center">
                            <input
                              type="radio"
                              name="format"
                              className="rounded-full text-primary focus:ring-primary"
                              checked={activeFormat === format}
                              onChange={() => setActiveFormat(activeFormat === format ? null : format)}
                            />
                            <span className="ml-2 text-sm">{format}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Type filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Type</h3>
                      <div className="space-y-2">
                        {types.map(type => (
                          <label key={type} className="flex items-center">
                            <input
                              type="radio"
                              name="type"
                              className="rounded-full text-primary focus:ring-primary"
                              checked={activeType === type}
                              onChange={() => setActiveType(activeType === type ? null : type)}
                            />
                            <span className="ml-2 text-sm capitalize">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button
                      className="text-sm text-neutral-600 hover:text-neutral-800 mr-4"
                      onClick={() => {
                        setActiveSubject(null);
                        setActiveFormat(null);
                        setActiveType(null);
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
          
          {/* Subject quick nav */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 py-2">
              <Button
                variant={activeSubject === null ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setActiveSubject(null)}
              >
                All Subjects
              </Button>
              
              {subjects.slice(0, 6).map(subject => (
                <Button
                  key={subject.id}
                  variant={activeSubject === subject.id ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setActiveSubject(activeSubject === subject.id ? null : subject.id)}
                >
                  {subject.name}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Study Materials List */}
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
              {getSortedMaterials().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getSortedMaterials().map((material) => (
                    <div key={material.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="p-6">
                        {material.isPremium && (
                          <div className="float-right ml-2 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
                            Premium
                          </div>
                        )}
                        
                        <h3 className="font-bold text-lg mb-2">{material.title}</h3>
                        
                        <p className="text-neutral-600 text-sm mb-3">
                          {material.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="bg-primary-50 text-primary text-xs font-medium px-2 py-1 rounded-full">
                            {material.subject}
                          </span>
                          
                          {material.topics.slice(0, 2).map(topic => (
                            <span key={topic} className="bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded-full">
                              {topic}
                            </span>
                          ))}
                          
                          {material.topics.length > 2 && (
                            <span className="text-neutral-500 text-xs">
                              +{material.topics.length - 2} more
                            </span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-neutral-500">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <FileText size={14} />
                              <span>{material.format}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{material.readTime}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Star className="text-amber-400" size={14} />
                            <span>{material.rating} ({material.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="bg-neutral-50 px-6 py-3 flex justify-between items-center">
                        <div className="text-sm text-neutral-600">
                          {material.downloadCount?.toLocaleString()} downloads
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 rounded-full hover:bg-neutral-100"
                            onClick={() => handleBookmark(material.id)}
                            title="Save for later"
                          >
                            <BookmarkPlus size={18} className="text-neutral-500" />
                          </button>
                          
                          <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<Download size={16} />}
                            onClick={() => handleDownload(material)}
                            disabled={material.isPremium && !isPremiumUser}
                          >
                            {material.isPremium && !isPremiumUser ? 'Premium' : 'Download'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <Search className="mx-auto h-12 w-12 text-neutral-300 mb-2" />
                  <h3 className="text-lg font-medium text-neutral-800 mb-1">No matching study materials found</h3>
                  <p className="text-neutral-600 mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button variant="outline" onClick={() => {
                    setActiveSubject(null);
                    setActiveFormat(null);
                    setActiveType(null);
                    setSearchQuery('');
                  }}>
                    Reset all filters
                  </Button>
                </div>
              )}
            </>
          )}
          
          {/* Pagination */}
          {getSortedMaterials().length > 0 && (
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
                  8
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
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Unlock Premium Study Materials</h3>
                  <p className="mb-4">
                    Get access to over 5,000+ premium study materials, revision notes, and specialized resources for all UPSC subjects.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-white/20 rounded-full">
                        <BookOpen size={16} className="text-white" />
                      </div>
                      <span className="text-sm">5,000+ resources</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-white/20 rounded-full">
                        <PenLine size={16} className="text-white" />
                      </div>
                      <span className="text-sm">Expert notes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-white/20 rounded-full">
                        <BarChart2 size={16} className="text-white" />
                      </div>
                      <span className="text-sm">Performance analytics</span>
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

export default StudyMaterialsPage;