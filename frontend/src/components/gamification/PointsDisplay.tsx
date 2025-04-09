import React from 'react';
import { Zap } from 'lucide-react';

interface PointsDisplayProps {
  points: number;
}

const PointsDisplay: React.FC<PointsDisplayProps> = ({ points }) => {
  return (
    <div className="bg-primary-50 rounded-lg p-3 flex items-center justify-between">
      <div>
        <div className="text-xs text-neutral-600 mb-1">Total XP</div>
        <div className="text-lg font-bold text-primary-700">{points}</div>
      </div>
      <div className="bg-primary-100 p-2 rounded-full">
        <Zap size={20} className="text-primary" />
      </div>
    </div>
  );
};

export default PointsDisplay;