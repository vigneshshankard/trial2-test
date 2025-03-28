import axios from 'axios';

const BASE_URL = 'http://localhost:5000/study-planner'; // Replace with the actual base URL of the study-planner microservice

export const getStudyPlans = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/plans`);
    return response.data;
  } catch (error) {
    console.error('Error fetching study plans:', error);
    throw error;
  }
};

export const createStudyPlan = async (planData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/plans`, planData);
    return response.data;
  } catch (error) {
    console.error('Error creating study plan:', error);
    throw error;
  }
};