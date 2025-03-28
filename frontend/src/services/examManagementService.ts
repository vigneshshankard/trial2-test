import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/exams';

export const getQuizzes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/quizzes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
};

export const getQuizById = async (quizId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz by ID:', error);
    throw error;
  }
};

export const createQuiz = async (quizData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/quizzes`, quizData);
    return response.data;
  } catch (error) {
    console.error('Error creating quiz:', error);
    throw error;
  }
};