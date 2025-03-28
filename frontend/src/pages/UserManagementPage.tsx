import React, { useState, useContext } from 'react';
import { registerUser, loginUser } from '../services/userManagementService';
import { AppContext } from '../App';

const UserManagementPage: React.FC = () => {
  const { setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await registerUser(formData);
      setResponse(res);
    } catch (err) {
      setError('Error registering user.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await loginUser(formData);
      setUser(res.user); // Save user to global state
      setResponse(res);
    } catch (err) {
      setError('Error logging in user.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">User Management</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
      <form onSubmit={handleLogin} className="mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-bold">Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;