import React from 'react';
import { Calendar } from 'lucide-react';

const UpcomingExamAlerts: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Upcoming Exam Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example exam alert item */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold">Exam Name</h3>
            </div>
            <p className="text-gray-600">
              Date: April 15, 2025
            </p>
            <p className="text-gray-600">
              Registration Deadline: April 10, 2025
            </p>
          </div>
          {/* Add more items as needed */}
        </div>
      </div>
    </section>
  );
};

export default UpcomingExamAlerts;