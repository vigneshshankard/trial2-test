import { sendNotification, getNotifications } from './notificationService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Notification Service', () => {
  it('should send a notification', async () => {
    const mockResponse = { message: 'Notification sent successfully' };
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await sendNotification({ userId: '123', message: 'Test notification', type: 'email' });
    expect(result).toEqual(mockResponse);
    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:5000/api/notifications/send', {
      userId: '123',
      message: 'Test notification',
      type: 'email'
    });
  });

  it('should fetch notifications', async () => {
    const mockResponse = [{ id: '1', message: 'Test notification' }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getNotifications('123');
    expect(result).toEqual(mockResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5000/api/notifications/123');
  });
});