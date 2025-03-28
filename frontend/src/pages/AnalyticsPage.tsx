import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const AnalyticsPage: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/analytics');
        setPerformanceData(response.data);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
      }
    };
    fetchAnalytics();
  }, []);

  const chartData = {
    labels: performanceData.map((data) => data.date),
    datasets: [
      {
        label: 'Correct Answers',
        data: performanceData.map((data) => data.correctAnswers),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Performance Analytics</h1>
      <div className="mt-4">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default AnalyticsPage;