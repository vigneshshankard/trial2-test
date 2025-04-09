import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface User {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
}

interface FriendRequest {
  id: string;
  user: User;
  timestamp: string;
}

interface FriendRequestsProps {
  requests: FriendRequest[];
}

const FriendRequests: React.FC<FriendRequestsProps> = ({ requests }) => {
  const handleAccept = async (requestId: string) => {
    try {
      // In a real implementation, this would be an API call
      // await fetch(`/api/social/friend-requests/${requestId}/accept`, {
      //   method: 'PATCH',
      // });
      
      console.log(`Accepted friend request: ${requestId}`);
      // You would then update the state or refetch the friend requests
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      // In a real implementation, this would be an API call
      // await fetch(`/api/social/friend-requests/${requestId}/reject`, {
      //   method: 'DELETE',
      // });
      
      console.log(`Rejected friend request: ${requestId}`);
      // You would then update the state or refetch the friend requests
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  if (requests.length === 0) {
    return <p className="text-gray-500 text-sm">No pending friend requests.</p>;
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div key={request.id} className="flex items-start p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <img 
            src={request.user.avatar} 
            alt={request.user.name} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-1">
            <div className="flex flex-col">
              <span className="font-medium">{request.user.name}</span>
              <span className="text-xs text-gray-500">
                {request.user.mutualFriends} mutual connection{request.user.mutualFriends !== 1 ? 's' : ''}
              </span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(request.timestamp), { addSuffix: true })}
              </span>
            </div>

            <div className="mt-2 flex space-x-2">
              <button 
                onClick={() => handleAccept(request.id)}
                className="px-3 py-1 bg-primary text-white text-xs rounded-md hover:bg-primary-600 transition-colors"
              >
                Accept
              </button>
              <button 
                onClick={() => handleReject(request.id)}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-md hover:bg-gray-300 transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {requests.length > 3 && (
        <button className="w-full text-center text-primary text-sm font-medium pt-2">
          View all requests
        </button>
      )}
    </div>
  );
};

export default FriendRequests;