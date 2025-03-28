import { registerUser, loginUser, getUserProfile } from './userManagementService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('User Management Service', () => {
  it('should register a user', async () => {
    const mockResponse = { message: 'User registered successfully' };
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await registerUser({ email: 'test@example.com', password: 'password123' });
    expect(result).toEqual(mockResponse);
    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:5000/api/users/register', {
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('should log in a user', async () => {
    const mockResponse = { token: 'test-token', user: { id: '123', email: 'test@example.com' } };
    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await loginUser({ email: 'test@example.com', password: 'password123' });
    expect(result).toEqual(mockResponse);
    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:5000/api/users/login', {
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('should fetch user profile', async () => {
    const mockResponse = { id: '123', email: 'test@example.com' };
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getUserProfile('test-token');
    expect(result).toEqual(mockResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5000/api/users/profile', {
      headers: { Authorization: 'Bearer test-token' }
    });
  });
});