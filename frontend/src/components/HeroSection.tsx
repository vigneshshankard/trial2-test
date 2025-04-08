import React from 'react';
import { Zap, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import Button from './Button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-800 to-blue-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-8">
          <Zap className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Your Ultimate UPSC Preparation Hub
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Free syllabus-aligned resources • AI-powered tools • 50,000+ aspirants
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg shadow-lg">
            Start Free Mock Test
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
          >
            Explore Study Materials
          </Button>
        </div>
        <div className="mt-12 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-300" />
            <span>No Signup Required</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-300" />
            <span>Updated Daily</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;