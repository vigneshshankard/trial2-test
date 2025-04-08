import React from 'react';
import { Zap, FileQuestion, Clock, Star } from 'lucide-react';
import Button from './Button';

const FreeMockTestCTA: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <Zap className="w-12 h-12 mx-auto text-yellow-500 mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold mb-4">Try Our Free Prelims Mock Test</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <FileQuestion className="w-5 h-5 text-blue-600" />
              <span>20 Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>30 Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-600" />
              <span>Instant Results</span>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 px-12 py-6 text-lg">
            Start Free Test Now
          </Button>
          <p className="mt-4 text-sm text-gray-600">
            No registration required. Results available post-signup.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FreeMockTestCTA;