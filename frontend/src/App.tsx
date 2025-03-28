import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudyPlannerPage from './pages/StudyPlannerPage';
import UserManagementPage from './pages/UserManagementPage';
import ContentManagementPage from './pages/ContentManagementPage';
import ExamManagementPage from './pages/ExamManagementPage';
import SocialInteractionPage from './pages/SocialInteractionPage';
import NotificationServicePage from './pages/NotificationServicePage';

// Create a context for global state
export const AppContext = createContext<any>(null);

function App() {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/study-planner" element={<StudyPlannerPage />} />
          <Route path="/user-management" element={<UserManagementPage />} />
          <Route path="/content-management" element={<ContentManagementPage />} />
          <Route path="/exam-management" element={<ExamManagementPage />} />
          <Route path="/social-interaction" element={<SocialInteractionPage />} />
          <Route path="/notification-service" element={<NotificationServicePage />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
