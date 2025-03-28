import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FriendRequestsPage: React.FC = () => {
  const [friendRequests, setFriendRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get('/api/social/friend-requests');
        setFriendRequests(response.data);
      } catch (err) {
        console.error('Error fetching friend requests:', err);
      }
    };
    fetchFriendRequests();
  }, []);

  const handleAccept = async (requestId: string) => {
    try {
      await axios.post(`/api/social/friend-requests/${requestId}/accept`);
      setFriendRequests(friendRequests.filter((req) => req._id !== requestId));
    } catch (err) {
      console.error('Error accepting friend request:', err);
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await axios.post(`/api/social/friend-requests/${requestId}/reject`);
      setFriendRequests(friendRequests.filter((req) => req._id !== requestId));
    } catch (err) {
      console.error('Error rejecting friend request:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Friend Requests</h1>
      <div className="mt-4">
        {friendRequests.length === 0 ? (
          <p>No friend requests at the moment.</p>
        ) : (
          <ul>
            {friendRequests.map((request) => (
              <li key={request._id} className="flex justify-between items-center border-b py-2">
                <span>{request.senderName}</span>
                <div>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                    onClick={() => handleAccept(request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => handleReject(request._id)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FriendRequestsPage;