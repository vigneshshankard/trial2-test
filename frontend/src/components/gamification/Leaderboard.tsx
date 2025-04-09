import React, { useState, useEffect } from 'react';
import { Trophy, ChevronDown, Clock, Users, Award } from 'lucide-react';
import Button from '../ui/Button';

interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar?: string;
  rank: number;
  score: number;
}

interface LeaderboardProps {
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'all-time';
  category?: string;
  limit?: number;
  currentUserId?: string;
  showFilters?: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  timeframe = 'weekly',
  category = '',
  limit = 10,
  currentUserId = '',
  showFilters = true,
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTimeframe, setActiveTimeframe] = useState(timeframe);
  const [activeCategory, setActiveCategory] = useState(category);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, we'd fetch from the API with the current filters
        const queryParams = new URLSearchParams();
        if (activeTimeframe) queryParams.append('timeframe', activeTimeframe);
        if (activeCategory) queryParams.append('category', activeCategory);
        queryParams.append('limit', limit.toString());
        
        // Mock API response with dummy data
        // const response = await fetch(`/api/gamification/leaderboard?${queryParams.toString()}`);
        // const data = await response.json();
        
        // Simulate API response with mock data
        const mockData: LeaderboardEntry[] = [
          { userId: 'user1', name: 'Rahul Shah', avatar: '/avatars/user1.jpg', rank: 1, score: 2450 },
          { userId: 'user2', name: 'Priya Desai', avatar: '/avatars/user2.jpg', rank: 2, score: 2380 },
          { userId: 'user3', name: 'Amit Kumar', avatar: '/avatars/user3.jpg', rank: 3, score: 2210 },
          { userId: 'user4', name: 'Sneha Gupta', avatar: '', rank: 4, score: 2150 },
          { userId: 'user5', name: 'Vikram Singh', avatar: '/avatars/user5.jpg', rank: 5, score: 2020 },
          { userId: currentUserId, name: 'You', avatar: '/avatars/user6.jpg', rank: 8, score: 1840 },
          { userId: 'user7', name: 'Ananya Patel', avatar: '', rank: 6, score: 1980 },
          { userId: 'user8', name: 'Rajesh Khanna', avatar: '/avatars/user8.jpg', rank: 7, score: 1920 },
          { userId: 'user9', name: 'Neha Sharma', avatar: '/avatars/user9.jpg', rank: 9, score: 1780 },
          { userId: 'user10', name: 'Karan Malhotra', avatar: '', rank: 10, score: 1710 },
        ];
        
        setEntries(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setIsLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, [activeTimeframe, activeCategory, limit, currentUserId]);
  
  const handleTimeframeChange = (newTimeframe: string) => {
    setActiveTimeframe(newTimeframe as 'daily' | 'weekly' | 'monthly' | 'all-time');
  };
  
  const handleCategoryChange = (newCategory: string) => {
    setActiveCategory(newCategory);
  };
  
  const getRankBadgeStyle = (rank: number) => {
    if (rank === 1) return 'bg-amber-100 text-amber-800 border border-amber-300';
    if (rank === 2) return 'bg-neutral-100 text-neutral-600 border border-neutral-300';
    if (rank === 3) return 'bg-orange-100 text-orange-800 border border-orange-300';
    return 'bg-neutral-100 text-neutral-600';
  };
  
  const isCurrentUser = (userId: string) => userId === currentUserId;
  
  const timeframeOptions = [
    { value: 'daily', label: 'Today', icon: Clock },
    { value: 'weekly', label: 'This Week', icon: Users },
    { value: 'monthly', label: 'This Month', icon: Calendar },
    { value: 'all-time', label: 'All Time', icon: Trophy },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-primary-50 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Trophy className="h-5 w-5 text-primary mr-2" />
          <h3 className="font-semibold text-neutral-800">Leaderboard</h3>
        </div>
        
        {showFilters && (
          <div className="flex space-x-2">
            <div className="relative">
              <select
                value={activeTimeframe}
                onChange={(e) => handleTimeframeChange(e.target.value)}
                className="appearance-none bg-white text-sm rounded-full px-3 py-1 pr-8 border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {timeframeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.userId}
                className={`flex items-center p-2 rounded-lg ${
                  isCurrentUser(entry.userId) 
                    ? 'bg-primary-50 border border-primary-100' 
                    : 'hover:bg-neutral-50'
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getRankBadgeStyle(entry.rank)}`}>
                  <span className="text-sm font-medium">{entry.rank}</span>
                </div>
                
                <div className="flex items-center ml-3 flex-1">
                  {entry.avatar ? (
                    <img src={entry.avatar} alt={entry.name} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-medium text-sm">
                      {entry.name[0]}
                    </div>
                  )}
                  <span className={`ml-2 text-sm ${isCurrentUser(entry.userId) ? 'font-bold' : 'font-medium'}`}>
                    {entry.name}
                    {isCurrentUser(entry.userId) && (
                      <span className="text-xs text-neutral-500 font-normal ml-1">(You)</span>
                    )}
                  </span>
                </div>
                
                <div className="text-sm font-semibold">
                  {entry.score} XP
                </div>
              </div>
            ))}
            
            <div className="pt-2 text-center">
              <Button 
                variant="outline" 
                size="sm"
                className="text-primary" 
                rightIcon={<ChevronDown size={16} />}
              >
                View Full Leaderboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;