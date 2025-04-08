import React from 'react';
import { Newspaper } from 'lucide-react';

const LatestCurrentAffairs: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Latest Current Affairs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example current affairs item */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Newspaper className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold">Headline 1</h3>
            </div>
            <p className="text-gray-600">
              Brief description of the current affair topic. This is a placeholder for actual content.
            </p>
          </div>
          {/* Add more items as needed */}
        </div>
      </div>
    </section>
  );
};

export default LatestCurrentAffairs;