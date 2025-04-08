import React from 'react';
import { Newspaper, ArrowRight } from 'lucide-react';
import Carousel from './Carousel';
import Button from './Button';

const KeyFeaturesCarousel: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why UPSCMonk?</h2>
        <Carousel className="mx-auto max-w-4xl">
          {/* Slide 1: Current Affairs */}
          <div className="bg-blue-50 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <Newspaper className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold">Daily Current Affairs</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Curated news digests</li>
                <li>✓ Topic-wise quizzes</li>
                <li>✓ PDF downloads</li>
              </ul>
              <Button variant="link" className="text-blue-600 pl-0">
                View Sample
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <img 
                src="/current-affairs-mockup.png" 
                alt="Current Affairs Preview" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default KeyFeaturesCarousel;