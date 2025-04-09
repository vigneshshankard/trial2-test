import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GamificationProvider } from '../context/GamificationContext';
import AchievementToast from '../components/gamification/AchievementToast';

function MyApp({ Component, pageProps }: AppProps) {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [recentAchievement, setRecentAchievement] = useState<any>(null);
  const router = useRouter();
  
  // In a real app, this would come from auth context or similar
  useEffect(() => {
    // Simulate user authentication
    const checkAuth = async () => {
      // Mock implementation - in a real app would check auth state
      setUserId('user123');
    };
    
    checkAuth();
  }, []);
  
  return (
    <GamificationProvider userId={userId}>
      {/* Toast notification for achievements */}
      <AchievementToast 
        achievement={recentAchievement}
        onClose={() => setRecentAchievement(null)}
      />
      
      {/* Render the page component */}
      <Component {...pageProps} />
    </GamificationProvider>
  );
}

export default MyApp;