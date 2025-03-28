import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/content';

export const getStudyMaterials = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/study-materials`);
    return response.data;
  } catch (error) {
    console.error('Error fetching study materials:', error);
    throw error;
  }
};

export const getCurrentAffairs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/current-affairs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current affairs:', error);
    throw error;
  }
};