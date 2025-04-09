import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastActive: string | null;
}

interface OnlineFriendsProps {
  friends: Friend[];
}

const OnlineFriends: React.FC<OnlineFriendsProps> = ({ friends }) => {
  const onlineFriends = friends.filter(friend => friend.isOnline);
  const offlineFriends = friends.filter(friend => !friend.isOnline);
  
  const startChat = (friendId: string, friendName: string) => {
    console.log(`Starting chat with ${friendName} (${friendId})`);
    // In a real implementation, this would open a chat or redirect to a chat page
    // history.push(`/community/chat/${friendId}`);
  };

  if (friends.length === 0) {
    return <p className="text-gray-500 text-sm">No friends yet. Send some friend requests!</p>;
  }

  return (
    <div className="space-y-2">
      {/* Online Friends Section */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-600 mb-2">Online Now ({onlineFriends.length})</h4>
        {onlineFriends.length === 0 ? (
          <p className="text-gray-500 text-xs">None of your friends are online right now.</p>
        ) : (
          <div className="space-y-2">
            {onlineFriends.map((friend) => (
              <div 
                key={friend.id} 
                onClick={() => startChat(friend.id, friend.name)}
                className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <div className="relative">
                  <img 
                    src={friend.avatar} 
                    alt={friend.name} 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{friend.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recently Active Friends Section */}
      <div>
        <h4 className="text-sm font-semibold text-gray-600 mb-2">Recently Active ({offlineFriends.length})</h4>
        {offlineFriends.length === 0 ? (
          <p className="text-gray-500 text-xs">No recent activity from your friends.</p>
        ) : (
          <div className="space-y-2">
            {offlineFriends.map((friend) => (
              <div 
                key={friend.id}
                onClick={() => startChat(friend.id, friend.name)}
                className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <div className="relative">
                  <img 
                    src={friend.avatar} 
                    alt={friend.name} 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 border-2 border-white rounded-full"></span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{friend.name}</p>
                  {friend.lastActive && (
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(friend.lastActive), { addSuffix: true })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {friends.length > 5 && (
        <button className="w-full text-center text-primary text-sm font-medium pt-2">
          See all friends
        </button>
      )}
    </div>
  );
};

export default OnlineFriends;