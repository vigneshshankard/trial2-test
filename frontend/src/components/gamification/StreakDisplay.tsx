import React from 'react';
import { Calendar } from 'lucide-react';

interface StreakDisplayProps {
  streak: number;
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ streak }) => {
  return (
    <div className="bg-accent-50 rounded-lg p-3 flex items-center justify-between">
      <div>
        <div className="text-xs text-neutral-600 mb-1">Daily Streak</div>
        <div className="text-lg font-bold text-accent-700">{streak} days</div>
      </div>
      <div className="bg-accent-100 p-2 rounded-full">
        <Calendar size={20} className="text-accent" />
      </div>
    </div>
  );
};

export default StreakDisplay;