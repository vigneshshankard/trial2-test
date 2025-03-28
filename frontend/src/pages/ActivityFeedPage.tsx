import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivityFeedPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/social/posts');
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    try {
      const response = await axios.post('/api/social/posts', { content: newPost });
      setPosts([response.data, ...posts]);
      setNewPost('');
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Activity Feed</h1>
      <div className="mt-4">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Share something..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handlePostSubmit}
        >
          Post
        </button>
      </div>
      <div className="mt-6">
        {posts.map((post, index) => (
          <div key={index} className="p-4 border-b">
            <p>{post.content}</p>
            <div className="mt-2 text-sm text-gray-500">{post.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeedPage;