import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GroupChatPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [groupDetails, setGroupDetails] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`/api/social/groups/${groupId}`);
        setGroupDetails(response.data);
      } catch (err) {
        console.error('Error fetching group details:', err);
      }
    };
    fetchGroupDetails();
  }, [groupId]);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(`/api/social/groups/${groupId}/messages`, { content: newMessage });
      setGroupDetails({
        ...groupDetails,
        messages: [...groupDetails.messages, response.data],
      });
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (!groupDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{groupDetails.name}</h1>
      <p className="text-gray-600">{groupDetails.description}</p>
      <div className="mt-4 border p-4 h-96 overflow-y-scroll">
        {groupDetails.messages.map((message: any, index: number) => (
          <div key={index} className="mb-2">
            <strong>{message.sender.name}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-grow p-2 border rounded"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChatPage;