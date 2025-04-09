import React from 'react';

interface LevelProgressBarProps {
  progress: number; // 0-100
}

const LevelProgressBar: React.FC<LevelProgressBarProps> = ({ progress }) => {
  // Ensure progress is within 0-100 range
  const normalizedProgress = Math.max(0, Math.min(100, progress));
  
  return (
    <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-primary to-primary-400 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${normalizedProgress}%` }}
      />
    </div>
  );
};

export default LevelProgressBar;