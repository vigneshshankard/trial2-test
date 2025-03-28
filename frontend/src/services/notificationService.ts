import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/notifications';

export const sendNotification = async (notificationData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/send`, notificationData);
    return response.data;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

export const getNotifications = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};