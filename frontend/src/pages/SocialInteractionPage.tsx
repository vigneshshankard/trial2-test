import React, { useEffect, useState, useContext } from 'react';
import { getPosts, createPost } from '../services/socialInteractionService';
import { AppContext } from '../App';

const SocialInteractionPage: React.FC = () => {
  const { user } = useContext(AppContext);
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) {
        setError('User not logged in.');
        return;
      }
      setError(null);
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        setError('Error fetching posts.');
      }
    };
    fetchPosts();
  }, [user]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role === 'visitor') {
      setError('Sign up or log in to create a post.');
      return;
    }
    setError(null);
    try {
      const post = await createPost({ content: newPost });
      setPosts([...posts, post]);
      setNewPost('');
    } catch (err) {
      setError('Error creating post.');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Social Interaction</h1>
        <p className="mt-4 text-red-500">Please sign up or log in to access social features.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Social Interaction</h1>
      {error && <p className="text-red-500">{error}</p>}
      {user.role !== 'visitor' && (
        <form onSubmit={handleCreatePost} className="mt-4">
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write a post..."
            className="border rounded p-2 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
            Post
          </button>
        </form>
      )}
      <ul className="mt-4">
        {posts.map((post, index) => (
          <li key={index}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default SocialInteractionPage;