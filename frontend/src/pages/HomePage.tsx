import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<string[]>([]);
  const [upcomingExams, setUpcomingExams] = useState<string[]>([]);

  useEffect(() => {
    // Fetch user data and stats
    axios.get('/api/user/dashboard')
      .then(response => {
        setUserData(response.data.user);
        setRecentActivity(response.data.recentActivity);
        setUpcomingExams(response.data.upcomingExams);
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      {userData ? (
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userData.name}!</h1>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Recent Activity</h2>
            <ul className="list-disc pl-5">
              {recentActivity.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">Upcoming Exams</h2>
            <ul className="list-disc pl-5">
              {upcomingExams.map((exam, index) => (
                <li key={index}>{exam}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold">Welcome to UPSCMONK</h1>
          <p className="mt-4">Your one-stop solution for UPSC preparation.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;