import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { 
  Trophy, Users, Clock, Calendar, Filter, 
  Search, ChevronDown, BookOpen, Target 
} from 'lucide-react';

import DashboardLayout from '../../components/layouts/DashboardLayout';
import Button from '../../components/ui/Button';

// Types
interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar?: string;
  rank: number;
  score: number;
  streak: number;
  level: number;
  badges: number;
}

interface LeaderboardFilter {
  timeframe: 'daily' | 'weekly' | 'monthly' | 'all-time';
  category: string;
}

// Category options for filtering
const categories = [
  { id: '', name: 'All Categories', icon: Trophy },
  { id: 'mock-tests', name: 'Mock Tests', icon: Target },
  { id: 'study-time', name: 'Study Time', icon: Clock },
  { id: 'learning', name: 'Learning Progress', icon: BookOpen },
];

// Time period options for filtering
const timeframes = [
  { id: 'daily', name: 'Today', icon: Clock },
  { id: 'weekly', name: 'This Week', icon: Calendar },
  { id: 'monthly', name: 'This Month', icon: Calendar },
  { id: 'all-time', name: 'All Time', icon: Trophy },
];

const LeaderboardPage: React.FC = () => {
  const router = useRouter();
  const [currentUserId] = useState('current-user'); // In real app, get from auth context
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<LeaderboardFilter>({
    timeframe: 'weekly',
    category: '',
  });

  // Fetch leaderboard data based on filters
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, we'd fetch from API with filters
        // const queryParams = new URLSearchParams();
        // queryParams.append('timeframe', filters.timeframe);
        // if (filters.category) queryParams.append('category', filters.category);
        
        // const response = await fetch(`/api/gamification/leaderboard?${queryParams.toString()}`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockData: LeaderboardEntry[] = Array(50).fill(null).map((_, index) => ({
          userId: index === 7 ? currentUserId : `user${index + 1}`,
          name: index === 7 ? 'You' : `User ${index + 1}`,
          avatar: index % 3 === 0 ? `/avatars/user${index + 1}.jpg` : '',
          rank: index + 1,
          score: Math.floor(3000 - (index * 25) + (Math.random() * 10)),
          streak: Math.floor(Math.random() * 30),
          level: Math.floor(Math.random() * 10) + 1,
          badges: Math.floor(Math.random() * 15),
        }));
        
        // Sort by score descending to ensure correct ranking
        mockData.sort((a, b) => b.score - a.score);
        
        // Update ranks after sorting
        mockData.forEach((entry, index) => {
          entry.rank = index + 1;
        });
        
        setEntries(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setIsLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [filters, currentUserId]);
  
  // Handle filter changes
  const handleTimeframeChange = (timeframe: string) => {
    setFilters(prev => ({
      ...prev,
      timeframe: timeframe as 'daily' | 'weekly' | 'monthly' | 'all-time'
    }));
  };
  
  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category
    }));
  };
  
  // Get style for rank badge based on position
  const getRankBadgeStyle = (rank: number) => {
    if (rank === 1) return 'bg-amber-100 text-amber-800 border border-amber-300';
    if (rank === 2) return 'bg-neutral-100 text-neutral-600 border border-neutral-300';
    if (rank === 3) return 'bg-orange-100 text-orange-800 border border-orange-300';
    return 'bg-neutral-100 text-neutral-600';
  };
  
  const isCurrentUser = (userId: string) => userId === currentUserId;
  
  // Find current user position to scroll to
  const currentUserIndex = entries.findIndex(entry => entry.userId === currentUserId);
  
  return (
    <DashboardLayout>
      <Head>
        <title>Leaderboard | UPSCMONK</title>
      </Head>
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Leaderboard</h1>
          <p className="text-neutral-500">
            See how you rank compared to other UPSC aspirants. Compete in different categories and time periods.
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            {/* Timeframe filter */}
            <div className="flex items-center space-x-4">
              {timeframes.map(item => (
                <button
                  key={item.id}
                  className={`px-4 py-2 rounded-full text-sm flex items-center ${
                    filters.timeframe === item.id
                      ? 'bg-primary text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                  onClick={() => handleTimeframeChange(item.id)}
                >
                  <item.icon className="h-4 w-4 mr-1" />
                  {item.name}
                </button>
              ))}
            </div>
            
            {/* Category filter */}
            <div className="relative">
              <div className="flex items-center">
                <Filter className="h-4 w-4 text-neutral-500 mr-2" />
                <select
                  value={filters.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="appearance-none bg-white text-sm rounded-full px-4 py-2 pr-8 border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header row */}
          <div className="bg-primary-50 p-4 grid grid-cols-12 gap-4 font-medium text-sm text-neutral-700">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-5">User</div>
            <div className="col-span-2 text-center">Level</div>
            <div className="col-span-2 text-center">Streak</div>
            <div className="col-span-2 text-center">Score</div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {entries.map((entry) => (
                <div
                  key={entry.userId}
                  id={isCurrentUser(entry.userId) ? 'current-user-row' : undefined}
                  className={`grid grid-cols-12 gap-4 p-4 items-center ${
                    isCurrentUser(entry.userId) 
                      ? 'bg-primary-50 border-l-4 border-primary'
                      : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="col-span-1 flex justify-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getRankBadgeStyle(entry.rank)}`}>
                      <span className="text-sm font-medium">{entry.rank}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-5 flex items-center">
                    {entry.avatar ? (
                      <img src={entry.avatar} alt={entry.name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-medium">
                        {entry.name[0]}
                      </div>
                    )}
                    <span className={`ml-3 ${isCurrentUser(entry.userId) ? 'font-bold' : ''}`}>
                      {entry.name}
                      {isCurrentUser(entry.userId) && (
                        <span className="text-xs text-neutral-500 font-normal ml-1">(You)</span>
                      )}
                    </span>
                  </div>
                  
                  <div className="col-span-2 text-center">
                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-primary-50 text-primary-700">
                      <span className="text-xs font-medium">Level {entry.level}</span>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-center">
                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-accent-50 text-accent-700">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="text-xs font-medium">{entry.streak} days</span>
                    </div>
                  </div>
                  
                  <div className="col-span-2 text-center font-semibold text-primary-700">
                    {entry.score} XP
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeaderboardPage;