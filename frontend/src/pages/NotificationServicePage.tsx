import React, { useEffect, useState, useContext } from 'react';
import { getNotifications, getPriorityNotifications } from '../services/notificationService';
import { AppContext } from '../App';

const NotificationServicePage: React.FC = () => {
  const { user } = useContext(AppContext);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [priorityNotifications, setPriorityNotifications] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) {
        setError('User not logged in.');
        return;
      }
      setError(null);
      try {
        const data = await getNotifications(user.id);
        setNotifications(data);

        if (user.role === 'subscriber') {
          const priorityData = await getPriorityNotifications();
          setPriorityNotifications(priorityData);
        }
      } catch (err) {
        setError('Error fetching notifications.');
      }
    };
    fetchNotifications();
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Notification Service</h1>
        <p className="mt-4 text-red-500">Please sign up or log in to access notifications.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Notification Service</h1>
      {error && <p className="text-red-500">{error}</p>}

      <h2 className="text-xl font-bold mt-4">Your Notifications</h2>
      <ul className="mt-2">
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>

      {user.role === 'subscriber' && (
        <>
          <h2 className="text-xl font-bold mt-4">Priority Notifications</h2>
          <ul className="mt-2">
            {priorityNotifications.map((notification, index) => (
              <li key={index}>{notification.message}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default NotificationServicePage;