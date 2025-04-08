import React from 'react';
import { Lightning } from 'lucide-react';

const TestIcon: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Lightning className="w-12 h-12 text-blue-600" />
      <p className="ml-4 text-lg">If you see this icon, lucide-react is working correctly.</p>
    </div>
  );
};

export default TestIcon;