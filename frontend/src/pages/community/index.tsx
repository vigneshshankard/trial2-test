import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import ActivityFeed from '../../components/community/ActivityFeed';
import FriendRequests from '../../components/community/FriendRequests';
import ChatSection from '../../components/community/ChatSection';
import OnlineFriends from '../../components/community/OnlineFriends';

const CommunityPage: React.FC = () => {
  const [userRole, setUserRole] = useState<'visitor' | 'free' | 'premium' | 'admin'>('free');
  const [activities, setActivities] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, these would be API calls
        // Fetch activities
        // const activitiesResponse = await fetch('/api/social/activities');
        // const activitiesData = await activitiesResponse.json();
        // setActivities(activitiesData);

        // Fetch friend requests
        // const requestsResponse = await fetch('/api/social/friend-requests');
        // const requestsData = await requestsResponse.json();
        // setFriendRequests(requestsData);

        // Fetch friends list
        // const friendsResponse = await fetch('/api/social/friends');
        // const friendsData = await friendsResponse.json();
        // setFriends(friendsData);

        // For demo purposes, we'll use dummy data
        setActivities(dummyActivities);
        setFriendRequests(dummyFriendRequests);
        setFriends(dummyFriends);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout userRole={userRole}>
      <Head>
        <title>UPSCMONK - Community</title>
        <meta name="description" content="Connect with fellow UPSC aspirants" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Community</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Summary & Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                  <img 
                    src="https://via.placeholder.com/150" 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <h2 className="text-lg font-semibold">John Doe</h2>
                <p className="text-gray-600 text-sm">UPSC Aspirant</p>
                <div className="mt-3 text-sm text-gray-500">
                  <p>48 connections</p>
                  <p>12 study groups</p>
                </div>
              </div>
            </div>

            {/* Friend Requests Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="text-lg font-semibold mb-3">Friend Requests</h3>
              <FriendRequests requests={friendRequests} />
            </div>

            {/* Online Friends Section */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-3">Online Friends</h3>
              <OnlineFriends friends={friends} />
            </div>
          </div>

          {/* Middle Section - Activity Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="mb-4">
                <div className="flex items-center border border-gray-300 rounded-lg p-3">
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    className="w-full focus:outline-none"
                  />
                  <button className="bg-primary text-white px-4 py-1 rounded-md ml-2">
                    Post
                  </button>
                </div>
              </div>
              
              <ActivityFeed activities={activities} isLoading={isLoading} />
            </div>
          </div>

          {/* Right Sidebar - Chat & Groups */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-3">Chats</h3>
              <ChatSection />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Dummy data for development
const dummyActivities = [
  {
    id: '1',
    user: {
      name: 'Priya Sharma',
      avatar: 'https://via.placeholder.com/40',
      role: 'premium'
    },
    content: 'Just finished my mock test on Indian Polity. Scored 85%! The questions on constitutional amendments were tricky.',
    timestamp: '2025-04-09T10:30:00Z',
    likes: 24,
    comments: 8,
    type: 'post'
  },
  {
    id: '2',
    user: {
      name: 'Rahul Kumar',
      avatar: 'https://via.placeholder.com/40',
      role: 'free'
    },
    content: 'Can someone recommend good study material for Environment & Ecology? Preparing for UPSC CSE 2026.',
    timestamp: '2025-04-09T09:15:00Z',
    likes: 7,
    comments: 12,
    type: 'question'
  },
  {
    id: '3',
    user: {
      name: 'Admin UPSCMONK',
      avatar: 'https://via.placeholder.com/40',
      role: 'admin'
    },
    content: 'New current affairs digest for April 2025 is now available! Download it from the Current Affairs section.',
    timestamp: '2025-04-08T16:45:00Z',
    likes: 56,
    comments: 3,
    type: 'announcement'
  },
  {
    id: '4',
    user: {
      name: 'Anjali Patel',
      avatar: 'https://via.placeholder.com/40',
      role: 'premium'
    },
    content: 'Just joined the "Economics Discussion" group. Looking forward to discussing monetary policy with everyone!',
    timestamp: '2025-04-08T14:20:00Z',
    likes: 15,
    comments: 2,
    type: 'group_activity'
  },
  {
    id: '5',
    user: {
      name: 'Vikram Singh',
      avatar: 'https://via.placeholder.com/40',
      role: 'premium'
    },
    content: 'Shared a new note: "Quick Analysis of Union Budget 2025-26" - check it out for key highlights relevant to UPSC.',
    timestamp: '2025-04-07T11:05:00Z',
    likes: 31,
    comments: 9,
    type: 'note_share'
  }
];

const dummyFriendRequests = [
  {
    id: '1',
    user: {
      id: '101',
      name: 'Meera Reddy',
      avatar: 'https://via.placeholder.com/40',
      mutualFriends: 3
    },
    timestamp: '2025-04-08T09:23:00Z'
  },
  {
    id: '2',
    user: {
      id: '102',
      name: 'Arjun Nair',
      avatar: 'https://via.placeholder.com/40',
      mutualFriends: 5
    },
    timestamp: '2025-04-07T14:12:00Z'
  },
  {
    id: '3',
    user: {
      id: '103',
      name: 'Sanya Gupta',
      avatar: 'https://via.placeholder.com/40',
      mutualFriends: 1
    },
    timestamp: '2025-04-06T18:45:00Z'
  }
];

const dummyFriends = [
  {
    id: '201',
    name: 'Ravi Kumar',
    avatar: 'https://via.placeholder.com/40',
    isOnline: true,
    lastActive: null
  },
  {
    id: '202',
    name: 'Deepa Joshi',
    avatar: 'https://via.placeholder.com/40',
    isOnline: true,
    lastActive: null
  },
  {
    id: '203',
    name: 'Amit Shah',
    avatar: 'https://via.placeholder.com/40',
    isOnline: false,
    lastActive: '2025-04-09T08:15:00Z'
  },
  {
    id: '204',
    name: 'Priyanka Chopra',
    avatar: 'https://via.placeholder.com/40',
    isOnline: false,
    lastActive: '2025-04-09T09:30:00Z'
  },
  {
    id: '205',
    name: 'Rohan Mehta',
    avatar: 'https://via.placeholder.com/40',
    isOnline: true,
    lastActive: null
  }
];

export default CommunityPage;