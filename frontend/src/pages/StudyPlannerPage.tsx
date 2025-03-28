import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const StudyPlannerPage: React.FC = () => {
  const { user } = useContext(UserContext); // Access user role from context
  const [formData, setFormData] = useState({
    targetExamDate: '',
    preferredSubjects: '',
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/study-planner/plans', {
        targetExamDate: formData.targetExamDate,
        preferredSubjects: formData.preferredSubjects.split(',').map((s) => s.trim()),
      });
      setResponse(res.data);
    } catch (error) {
      console.error('Error creating study plan:', error);
    }
  };

  if (user.role === 'visitor') {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">AI Study Planner</h1>
        <p className="mt-4 text-red-500">Please sign up or log in to access the study planner.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">AI Study Planner</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium">Target Exam Date</label>
          <input
            type="date"
            name="targetExamDate"
            value={formData.targetExamDate}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Preferred Subjects (comma-separated)</label>
          <input
            type="text"
            name="preferredSubjects"
            value={formData.preferredSubjects}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        {user.role === 'subscriber' && (
          <div className="mb-4">
            <label className="block text-sm font-medium">Advanced Options</label>
            <input
              type="text"
              name="advancedOptions"
              placeholder="Enter advanced preferences"
              className="border rounded p-2 w-full"
            />
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Generate Plan
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-bold">Generated Plan</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default StudyPlannerPage;