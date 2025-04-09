import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  Search, Calendar, Filter, ChevronDown, Download,
  Newspaper, FileText, Tag, ChevronRight, 
  BookmarkPlus, ExternalLink, Clock, AlertCircle,
  X, ArrowUpRight, Lock, ChevronUp
} from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';

// Types
interface CurrentAffair {
  id: string;
  title: string;
  summary: string;
  content?: string;
  date: string;
  source: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  readTime: number;
  isPremium: boolean;
}

interface ArticleFilter {
  category: string[];
  tags: string[];
  dateRange: {
    start: string;
    end: string;
  };
  searchQuery: string;
}

// Mock data - in a real app, this would come from an API
const mockCurrentAffairs: CurrentAffair[] = [
  {
    id: 'ca-1',
    title: "India's GDP Growth Forecast Revised to 7.2% for FY 2025-26",
    summary: "The World Bank has revised India's growth forecast upward citing strong domestic demand and robust manufacturing sector performance.",
    date: '2025-04-08',
    source: 'The Hindu',
    category: 'Economy',
    tags: ['GDP', 'World Bank', 'Economic Growth'],
    readTime: 4,
    isPremium: false
  },
  {
    id: 'ca-2',
    title: 'New Education Policy Implementation: States Report Card Released',
    summary: 'Ministry of Education has released a comprehensive analysis of NEP implementation across states showing varied adoption rates.',
    date: '2025-04-07',
    source: 'Indian Express',
    category: 'Education',
    tags: ['NEP', 'Education Reform', 'Policy Implementation'],
    readTime: 5,
    isPremium: false
  },
  {
    id: 'ca-3',
    title: 'Supreme Court Verdict on Electoral Bonds: Key Highlights',
    summary: 'The apex court delivered a landmark judgment on the electoral bonds scheme with far-reaching implications for political funding.',
    date: '2025-04-06',
    source: 'The Hindu',
    category: 'Polity',
    tags: ['Supreme Court', 'Electoral Reforms', 'Political Funding'],
    readTime: 6,
    isPremium: false
  },
  {
    id: 'ca-4',
    title: 'New Space Policy Approved by Cabinet: Private Sector Gets Major Boost',
    summary: 'The Union Cabinet has approved a comprehensive space policy allowing greater private sector participation in satellite launches and space exploration.',
    date: '2025-04-05',
    source: 'Economic Times',
    category: 'Science & Technology',
    tags: ['Space', 'ISRO', 'Private Sector'],
    readTime: 3,
    isPremium: false
  },
  {
    id: 'ca-5',
    title: 'Record Wheat Production Expected Despite Climate Challenges',
    summary: 'Agricultural Ministry forecasts record wheat output despite irregular rainfall patterns and temperature fluctuations in key growing regions.',
    date: '2025-04-04',
    source: 'Down To Earth',
    category: 'Agriculture',
    tags: ['Wheat', 'Food Security', 'Climate Impact'],
    readTime: 4,
    isPremium: false
  },
  {
    id: 'ca-6',
    title: 'Comprehensive Analysis: New Labor Codes and Their Implementation',
    summary: 'An in-depth look at the four labor codes and their staged implementation across states with expert analysis on potential impact.',
    date: '2025-04-03',
    source: 'The Hindu',
    category: 'Economy',
    tags: ['Labor Reform', 'Employment', 'Industrial Relations'],
    readTime: 7,
    isPremium: true
  },
  {
    id: 'ca-7',
    title: 'Finance Commission Recommends New Revenue Sharing Formula',
    summary: 'The 16th Finance Commission proposes changes to vertical and horizontal devolution criteria between center and states.',
    date: '2025-04-02',
    source: 'Financial Express',
    category: 'Economy',
    tags: ['Fiscal Federalism', 'Finance Commission', 'Revenue'],
    readTime: 5,
    isPremium: true
  },
  {
    id: 'ca-8',
    title: 'National Education Policy Implementation Progress Report Released',
    summary: 'Report highlights achievements and challenges in implementing NEP 2020 across states and union territories.',
    date: '2025-04-01',
    source: 'The Hindu',
    category: 'Education',
    tags: ['NEP 2020', 'Education Reform', 'Implementation'],
    readTime: 6,
    isPremium: false
  },
  {
    id: 'ca-9',
    title: 'India Successfully Tests Indigenous Anti-Satellite Missile System',
    summary: 'DRDO demonstrates capability to neutralize orbital threats, making India the fourth nation with proven ASAT technology.',
    date: '2025-03-30',
    source: 'The Hindu',
    category: 'Defense',
    tags: ['ASAT', 'Space Security', 'DRDO'],
    readTime: 4,
    isPremium: true
  },
  {
    id: 'ca-10',
    title: 'Supreme Court Issues Landmark Judgment on Water Disputes',
    summary: 'The judgment provides new framework for resolving inter-state river water disputes with emphasis on equitable distribution.',
    date: '2025-03-28',
    source: 'Indian Express',
    category: 'Polity',
    tags: ['Supreme Court', 'Water Resources', 'Interstate Disputes'],
    readTime: 5,
    isPremium: false
  }
];

// Generate more mock data to simulate archive
for (let i = 11; i <= 40; i++) {
  const date = new Date(2025, 2, 28 - (i - 10));
  const isPremium = Math.random() > 0.7;
  mockCurrentAffairs.push({
    id: `ca-${i}`,
    title: `Sample Current Affair Title #${i}`,
    summary: `This is a sample summary for article ${i} that would contain relevant information about this current affair.`,
    date: date.toISOString().split('T')[0],
    source: ['The Hindu', 'Indian Express', 'Economic Times', 'Down To Earth', 'Mint'][Math.floor(Math.random() * 5)],
    category: ['Economy', 'Polity', 'Environment', 'Science & Technology', 'International Relations'][Math.floor(Math.random() * 5)],
    tags: ['UPSC', 'Current Affairs', `Tag ${i}`],
    readTime: Math.floor(Math.random() * 8) + 3,
    isPremium
  });
}

const CurrentAffairsPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffair[]>([]);
  const [visibleAffairs, setVisibleAffairs] = useState<CurrentAffair[]>([]);
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ArticleFilter>({
    category: [],
    tags: [],
    dateRange: { start: '', end: '' },
    searchQuery: ''
  });
  
  // For visitor restriction - tracking limit date (30 days ago)
  const [limitDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  });

  // Categories and tags from available articles
  const availableCategories = Array.from(new Set(mockCurrentAffairs.map(a => a.category))).sort();
  const availableTags = Array.from(new Set(mockCurrentAffairs.flatMap(a => a.tags))).sort();

  useEffect(() => {
    // Check if user is authenticated (would use auth context in a real app)
    const token = localStorage.getItem('userToken');
    const isAuth = !!token;
    setIsAuthenticated(isAuth);
    
    // Simulate fetching data from API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sort by date, newest first
        const sortedAffairs = [...mockCurrentAffairs].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setCurrentAffairs(sortedAffairs);
        
        // Apply visitor restrictions if not authenticated
        if (!isAuth) {
          const thirtyDaysAgo = limitDate;
          const filteredAffairs = sortedAffairs.filter(article => {
            const articleDate = new Date(article.date);
            return articleDate >= thirtyDaysAgo;
          }).slice(0, 30);
          
          setVisibleAffairs(filteredAffairs);
        } else {
          setVisibleAffairs(sortedAffairs);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching current affairs:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [limitDate]);
  
  // Apply filters function
  const applyFilters = () => {
    let filtered = [...currentAffairs];
    
    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(article => 
        filters.category.includes(article.category)
      );
    }
    
    // Apply tag filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(article =>
        article.tags.some(tag => filters.tags.includes(tag))
      );
    }
    
    // Apply date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : new Date(0);
      const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : new Date();
      
      filtered = filtered.filter(article => {
        const articleDate = new Date(article.date);
        return articleDate >= startDate && articleDate <= endDate;
      });
    }
    
    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.summary.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply visitor restrictions if not authenticated
    if (!isAuthenticated) {
      const thirtyDaysAgo = limitDate;
      filtered = filtered.filter(article => {
        const articleDate = new Date(article.date);
        return articleDate >= thirtyDaysAgo;
      }).slice(0, 30);
    }
    
    setVisibleAffairs(filtered);
    setExpandedArticleId(null);
  };
  
  // Toggle filter selection
  const toggleFilter = (type: 'category' | 'tag', value: string) => {
    setFilters(prev => {
      if (type === 'category') {
        const updatedCategories = prev.category.includes(value)
          ? prev.category.filter(c => c !== value)
          : [...prev.category, value];
        
        return { ...prev, category: updatedCategories };
      } else {
        const updatedTags = prev.tags.includes(value)
          ? prev.tags.filter(t => t !== value)
          : [...prev.tags, value];
        
        return { ...prev, tags: updatedTags };
      }
    });
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: [],
      tags: [],
      dateRange: { start: '', end: '' },
      searchQuery: ''
    });
    
    // Reapply visitor restrictions
    if (!isAuthenticated) {
      const thirtyDaysAgo = limitDate;
      const filtered = currentAffairs.filter(article => {
        const articleDate = new Date(article.date);
        return articleDate >= thirtyDaysAgo;
      }).slice(0, 30);
      
      setVisibleAffairs(filtered);
    } else {
      setVisibleAffairs(currentAffairs);
    }
  };
  
  // Toggle article expansion
  const toggleArticleExpand = (id: string) => {
    setExpandedArticleId(expandedArticleId === id ? null : id);
  };
  
  // Handle bookmark (would save to user's account in a real app)
  const handleBookmark = (id: string) => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/current-affairs');
      return;
    }
    
    alert(`Article ${id} bookmarked!`);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Group articles by date
  const groupArticlesByDate = () => {
    const grouped: Record<string, CurrentAffair[]> = {};
    
    visibleAffairs.forEach(article => {
      const date = article.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(article);
    });
    
    return grouped;
  };
  
  // Apply filters when filters change
  useEffect(() => {
    applyFilters();
  }, [filters, isAuthenticated]);

  return (
    <Layout userRole={isAuthenticated ? "free" : "visitor"}>
      <Head>
        <title>Current Affairs | UPSCMONK</title>
      </Head>
      
      <div className="bg-neutral-50 min-h-screen pb-12">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container py-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">Current Affairs</h1>
              <p className="text-neutral-600">
                Stay updated with UPSC-relevant news and analysis
              </p>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container py-8">
          {/* Search and filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search current affairs..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                />
              </div>
              <button 
                className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                <span className="text-sm font-medium">Filters</span>
                <ChevronDown 
                  size={16} 
                  className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>
            
            {/* Expandable filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Category filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Categories</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {availableCategories.map(category => (
                        <label key={category} className="flex items-center hover:bg-neutral-50 p-1 rounded">
                          <input
                            type="checkbox"
                            className="rounded text-primary focus:ring-primary"
                            checked={filters.category.includes(category)}
                            onChange={() => toggleFilter('category', category)}
                          />
                          <span className="ml-2 text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-2">
                      {availableTags.map(tag => (
                        <button
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            filters.tags.includes(tag)
                              ? 'bg-primary text-white'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                          onClick={() => toggleFilter('tag', tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Date range filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Date Range</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-neutral-600 block mb-1">From</label>
                        <input
                          type="date"
                          className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
                          value={filters.dateRange.start}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, start: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-neutral-600 block mb-1">To</label>
                        <input
                          type="date"
                          className="w-full border border-neutral-300 rounded-lg p-2 text-sm"
                          value={filters.dateRange.end}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, end: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-end">
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
          
          {/* Articles timeline */}
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                  <div className="h-6 bg-neutral-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                    <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {visibleAffairs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <Search className="mx-auto h-12 w-12 text-neutral-300 mb-2" />
                  <h3 className="text-lg font-medium text-neutral-800 mb-1">No matching articles found</h3>
                  <p className="text-neutral-600 mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset all filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Timeline */}
                  {Object.entries(groupArticlesByDate()).map(([date, articles]) => (
                    <div key={date} className="relative">
                      <div className="sticky top-0 z-10 bg-neutral-50 py-2">
                        <div className="ml-6 text-sm font-medium text-neutral-500 flex items-center">
                          <Calendar size={16} className="mr-2" />
                          {formatDate(date)}
                          <span className="ml-2 bg-neutral-200 text-neutral-600 text-xs px-2 py-0.5 rounded-full">
                            {articles.length} {articles.length === 1 ? 'article' : 'articles'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-2 ml-6 space-y-4">
                        {articles.map(article => (
                          <div 
                            key={article.id} 
                            className={`bg-white rounded-lg shadow-sm overflow-hidden border-l-4 ${
                              article.isPremium ? 'border-amber-400' : 'border-primary'
                            }`}
                          >
                            <div className="p-6">
                              <div className="flex items-start justify-between">
                                <h3 className="font-bold text-lg mb-2 flex-1">{article.title}</h3>
                                <div className="ml-4 flex flex-shrink-0 space-x-2">
                                  <button
                                    onClick={() => handleBookmark(article.id)}
                                    className="text-neutral-400 hover:text-primary p-1 rounded-full hover:bg-neutral-50"
                                    title="Save for later"
                                  >
                                    <BookmarkPlus size={18} />
                                  </button>
                                  <button
                                    onClick={() => toggleArticleExpand(article.id)}
                                    className={`text-neutral-400 hover:text-primary p-1 rounded-full hover:bg-neutral-50 ${
                                      expandedArticleId === article.id ? 'bg-neutral-50' : ''
                                    }`}
                                    title={expandedArticleId === article.id ? "Show less" : "Expand"}
                                  >
                                    {expandedArticleId === article.id ? (
                                      <ChevronUp size={18} />
                                    ) : (
                                      <ChevronDown size={18} />
                                    )}
                                  </button>
                                </div>
                              </div>
                              
                              {article.isPremium && (
                                <div className="inline-block bg-amber-50 text-amber-700 text-xs font-medium px-2 py-1 rounded mb-2">
                                  <Lock size={12} className="inline-block mr-1" />
                                  Premium
                                </div>
                              )}
                              
                              <p className="text-neutral-600 text-sm mb-4">{article.summary}</p>
                              
                              <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="bg-primary-50 text-primary text-xs font-medium px-2 py-1 rounded-full">
                                  {article.category}
                                </span>
                                
                                {article.tags.slice(0, 3).map(tag => (
                                  <span key={tag} className="bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded-full">
                                    {tag}
                                  </span>
                                ))}
                                
                                {article.tags.length > 3 && (
                                  <span className="text-neutral-500 text-xs">
                                    +{article.tags.length - 3} more
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex justify-between items-center text-xs text-neutral-500">
                                <div className="flex items-center gap-1">
                                  <Newspaper size={14} />
                                  <span>{article.source}</span>
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  <Clock size={14} />
                                  <span>{article.readTime} min read</span>
                                </div>
                              </div>
                              
                              {/* Expanded content */}
                              {expandedArticleId === article.id && (
                                <div className="mt-6 pt-6 border-t border-neutral-100">
                                  {article.isPremium && !isAuthenticated ? (
                                    <div className="bg-neutral-50 p-5 rounded-lg text-center">
                                      <AlertCircle className="mx-auto mb-3 text-primary" size={24} />
                                      <h4 className="font-medium mb-2">Premium Content</h4>
                                      <p className="text-sm text-neutral-600 mb-4">
                                        Sign in to access premium articles and detailed analysis
                                      </p>
                                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <Link href="/login">
                                          <Button variant="primary" size="sm">
                                            Sign In
                                          </Button>
                                        </Link>
                                        <Link href="/pricing">
                                          <Button variant="outline" size="sm">
                                            View Plans
                                          </Button>
                                        </Link>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-neutral-700">
                                      <p className="mb-4">
                                        {article.content || `Detailed content for article "${article.title}" would appear here. This would include the full article text, any related images, charts or infographics, and links to related content.`}
                                      </p>
                                      
                                      <div className="mb-4">
                                        <h4 className="font-medium mb-2">UPSC Relevance</h4>
                                        <ul className="list-disc ml-5 space-y-1 text-sm">
                                          <li>Important for both Prelims and Mains examination</li>
                                          <li>Connects with GS Paper {Math.floor(Math.random() * 3) + 1} topics</li>
                                          <li>Provides contemporary examples for answers</li>
                                        </ul>
                                      </div>
                                      
                                      <div className="flex justify-end">
                                        <Link href={`/current-affairs/${article.id}`}>
                                          <Button 
                                            variant="outline" 
                                            size="sm"
                                            rightIcon={<ArrowUpRight size={16} />}
                                          >
                                            Read Full Analysis
                                          </Button>
                                        </Link>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Visitor restriction notice */}
                  {!isAuthenticated && (
                    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                      <div className="max-w-xl mx-auto">
                        <Lock className="mx-auto h-10 w-10 text-primary mb-3" />
                        <h3 className="text-lg font-bold mb-2">Access Limited</h3>
                        <p className="text-neutral-600 mb-4">
                          Visitors can only access current affairs from the last 30 days (max 30 articles). 
                          Sign in to access our complete archive of UPSC-relevant current affairs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Link href="/signup">
                            <Button variant="primary">Create Account</Button>
                          </Link>
                          <Link href="/login">
                            <Button variant="outline">Sign In</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CurrentAffairsPage;