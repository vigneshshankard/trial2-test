import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isGroup: boolean;
}

const ChatSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'direct' | 'groups'>('direct');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for chats
  const directChats: Chat[] = [
    {
      id: '301',
      name: 'Ravi Kumar',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Could you share those Economy notes?',
      timestamp: '2025-04-09T10:15:00Z',
      unread: 2,
      isGroup: false
    },
    {
      id: '302',
      name: 'Deepa Joshi',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Yes, I'll be joining the study session!',
      timestamp: '2025-04-08T22:45:00Z',
      unread: 0,
      isGroup: false
    },
    {
      id: '303',
      name: 'Amit Shah',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Thanks for the help with that question!',
      timestamp: '2025-04-07T16:30:00Z',
      unread: 0,
      isGroup: false
    }
  ];
  
  const groupChats: Chat[] = [
    {
      id: 'g101',
      name: 'UPSC CSE 2026 Group',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Priya: When is the next mock test scheduled?',
      timestamp: '2025-04-09T09:45:00Z',
      unread: 5,
      isGroup: true
    },
    {
      id: 'g102',
      name: 'Economics Discussion',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Rahul: The budget analysis session is at 7 PM',
      timestamp: '2025-04-08T18:20:00Z',
      unread: 0,
      isGroup: true
    }
  ];

  const filteredChats = (activeTab === 'direct' ? directChats : groupChats).filter(
    chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openChat = (chatId: string, isGroup: boolean) => {
    console.log(`Opening ${isGroup ? 'group' : 'direct'} chat: ${chatId}`);
    // In a real implementation, this would open the chat or redirect to a chat page
  };

  const startNewChat = () => {
    console.log('Starting a new chat');
    // In a real implementation, this would open a modal or redirect to a new chat page
  };

  const createNewGroup = () => {
    console.log('Creating a new group');
    // In a real implementation, this would open a modal to create a new group
  };

  return (
    <div className="chat-section">
      {/* Chat Tabs */}
      <div className="flex border-b mb-3">
        <button
          onClick={() => setActiveTab('direct')}
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === 'direct'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Direct Messages
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === 'groups'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Group Chats
        </button>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        />
      </div>

      {/* Chat List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-4">
            {searchQuery ? 'No chats match your search.' : 'No chats available.'}
          </p>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => openChat(chat.id, chat.isGroup)}
              className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className={`w-10 h-10 ${chat.isGroup ? 'rounded-lg' : 'rounded-full'}`}
                />
                {chat.unread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {chat.unread}
                  </span>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(chat.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={startNewChat}
          className="flex-1 bg-primary text-white py-2 rounded-md text-sm hover:bg-primary-dark transition-colors"
        >
          New Message
        </button>
        <button
          onClick={createNewGroup}
          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default ChatSection;