import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/social';

export const createPost = async (postData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const sendFriendRequest = async (requestData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/friend-requests`, requestData);
    return response.data;
  } catch (error) {
    console.error('Error sending friend request:', error);
    throw error;
  }
};