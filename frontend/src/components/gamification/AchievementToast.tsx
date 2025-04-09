import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award } from 'lucide-react';

interface AchievementToastProps {
  achievement: {
    name: string;
    description: string;
    icon?: string;
  } | null;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const AchievementToast: React.FC<AchievementToastProps> = ({
  achievement,
  onClose,
  autoClose = true,
  autoCloseTime = 5000
}) => {
  useEffect(() => {
    if (achievement && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [achievement, autoClose, autoCloseTime, onClose]);
  
  if (!achievement) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg overflow-hidden max-w-sm flex items-start"
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-accent p-4 flex items-center justify-center">
          <Award className="h-8 w-8 text-white" />
        </div>
        <div className="p-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-sm text-accent mb-1">Achievement Unlocked!</h3>
              <h4 className="font-medium">{achievement.name}</h4>
              <p className="text-sm text-neutral-600 mt-1">{achievement.description}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 p-1"
            >
              &times;
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-100">
            <div className="text-xs text-accent-600">+50 XP</div>
            <a href="/achievements" className="text-xs text-primary hover:underline">
              View All Achievements
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementToast;