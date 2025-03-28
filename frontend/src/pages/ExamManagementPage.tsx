import React, { useEffect, useState, useContext } from 'react';
import { getQuizzes, startMockTest } from '../services/examManagementService';
import { AppContext } from '../App';

const ExamManagementPage: React.FC = () => {
  const { user } = useContext(AppContext);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isTestActive, setIsTestActive] = useState(false);

  const handleStartTest = async (quizId: string) => {
    try {
      setIsTestActive(true);
      await startMockTest(quizId);
      alert('Mock test started. Navigation is disabled.');
    } catch (err) {
      alert('Failed to start the mock test.');
    }
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!user) {
        setError('User not logged in.');
        return;
      }
      setError(null);
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (err) {
        setError('Error fetching quizzes.');
      }
    };
    fetchQuizzes();
  }, [user]);

  useEffect(() => {
    if (isTestActive) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = 'Are you sure you want to leave? Your progress will be lost.';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isTestActive]);

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Exam Management</h1>
        <p className="mt-4 text-red-500">Please sign up or log in to access quizzes and mock tests.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Exam Management</h1>
      {error && <p className="text-red-500">{error}</p>}

      <h2 className="text-xl font-bold mt-4">Available Quizzes</h2>
      <ul className="mt-2">
        {quizzes.map((quiz, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{quiz.title}</span>
            <button
              className="ml-4 px-2 py-1 bg-green-500 text-white rounded"
              onClick={() => handleStartTest(quiz.id)}
              disabled={isTestActive}
            >
              Start Test
            </button>
          </li>
        ))}
      </ul>

      {user.role === 'subscriber' && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Premium Mock Tests</h2>
          <p>Access exclusive premium mock tests and advanced analytics.</p>
        </div>
      )}
    </div>
  );
};

export default ExamManagementPage;