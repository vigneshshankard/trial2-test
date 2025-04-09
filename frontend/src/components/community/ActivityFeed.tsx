import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface User {
  name: string;
  avatar: string;
  role: 'free' | 'premium' | 'admin';
}

interface Activity {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  type: 'post' | 'question' | 'announcement' | 'group_activity' | 'note_share';
}

interface ActivityFeedProps {
  activities: Activity[];
  isLoading: boolean;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No activities to show. Connect with more friends to see their updates!
      </div>
    );
  }

  const getActivityTypeClass = (type: Activity['type']) => {
    switch (type) {
      case 'announcement':
        return 'border-l-4 border-red-500';
      case 'question':
        return 'border-l-4 border-yellow-500';
      case 'group_activity':
        return 'border-l-4 border-green-500';
      case 'note_share':
        return 'border-l-4 border-blue-500';
      default:
        return '';
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'announcement':
        return (
          <div className="absolute -left-2 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-xs text-white">!</span>
          </div>
        );
      case 'question':
        return (
          <div className="absolute -left-2 w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center">
            <span className="text-xs text-white">?</span>
          </div>
        );
      case 'group_activity':
        return (
          <div className="absolute -left-2 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-xs text-white">G</span>
          </div>
        );
      case 'note_share':
        return (
          <div className="absolute -left-2 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-xs text-white">N</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getRoleBadge = (role: User['role']) => {
    switch (role) {
      case 'premium':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full ml-2">Premium</span>;
      case 'admin':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full ml-2">Admin</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className={`bg-white border border-gray-200 rounded-lg p-4 relative ${getActivityTypeClass(activity.type)}`}
        >
          {getActivityIcon(activity.type)}
          <div className="flex items-start">
            <img 
              src={activity.user.avatar} 
              alt={activity.user.name} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1">
              <div className="flex items-center">
                <h4 className="font-semibold">{activity.user.name}</h4>
                {getRoleBadge(activity.user.role)}
                <span className="ml-auto text-sm text-gray-500">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{activity.content}</p>
              
              <div className="flex items-center mt-4 pt-3 border-t border-gray-100">
                <button className="flex items-center text-gray-500 hover:text-primary transition-colors mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>{activity.likes}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{activity.comments}</span>
                </button>
                <button className="ml-auto text-gray-500 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;