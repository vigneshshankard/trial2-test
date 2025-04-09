import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import AnimateOnScroll from '../ui/AnimateOnScroll';
import Button from '../ui/Button';

// Sample testimonial data - in a production app, this would come from an API
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'IAS Officer, AIR 45 (2024)',
    image: '/testimonials/priya-sharma.jpg', // Placeholder paths
    quote: 'UPSCMONK's personalized study plan and daily current affairs updates were game-changers for my preparation. I could focus on studying instead of curating materials from different sources.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'IPS Officer, AIR 112 (2024)',
    image: '/testimonials/rahul-verma.jpg',
    quote: 'The mock tests on UPSCMONK closely resembled the actual UPSC pattern, which helped me tremendously with time management and accuracy. The detailed analytics after each test guided my revision strategy.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Aisha Khan',
    role: 'IFS Officer, AIR 87 (2024)',
    image: '/testimonials/aisha-khan.jpg',
    quote: 'As someone preparing while working full-time, the structured approach and mobile accessibility of UPSCMONK made all the difference. The community support from fellow aspirants kept me motivated throughout my journey.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Vikram Mehta',
    role: 'IRS Officer, AIR 156 (2023)',
    image: '/testimonials/vikram-mehta.jpg',
    quote: 'After two unsuccessful attempts, switching to UPSCMONK helped me identify and work on my weak areas. The mentorship program gave me personalized guidance that books alone couldn't provide.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Deepa Nair',
    role: 'IAS Officer, AIR 63 (2023)',
    image: '/testimonials/deepa-nair.jpg',
    quote: 'The comprehensive nature of UPSCMONK's study material saved me countless hours of research. The current affairs section is exceptionally well-curated with UPSC-specific perspectives on each topic.',
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };
  
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-primary rounded-full"></div>
        <div className="absolute -bottom-[15%] -left-[10%] w-[600px] h-[600px] bg-secondary rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll animation="fadeIn">
          <div className="text-center mb-16">
            <h2 className="mb-4">Success Stories</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Hear from candidates who transformed their UPSC preparation journey with UPSCMONK's comprehensive platform and achieved their dreams.
            </p>
          </div>
        </AnimateOnScroll>
        
        <div className="relative">
          {/* Testimonial Carousel */}
          <div className="relative overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-primary-50 to-white p-6 md:p-10 rounded-xl shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Quote section */}
                  <div className="md:col-span-2">
                    <div className="mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star 
                          key={i}
                          size={20} 
                          fill="#FFB400"
                          color="#FFB400"
                          className="inline-block mr-1"
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-xl md:text-2xl font-serif italic text-neutral-700 mb-8 relative">
                      <span className="text-5xl text-primary absolute -top-6 -left-2 opacity-20">"</span>
                      {testimonials[currentIndex].quote}
                      <span className="text-5xl text-primary absolute -bottom-8 -right-2 opacity-20">"</span>
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          {/* In a real app, this would be an actual image */}
                          <span className="font-bold text-primary">
                            {testimonials[currentIndex].name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-primary">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {testimonials[currentIndex].role}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image/Stats section */}
                  <div className="hidden md:block bg-white p-6 rounded-lg shadow-md">
                    <h4 className="font-bold text-lg mb-4 text-primary">UPSCMONK Impact</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-neutral-600 mb-1">Success Rate</div>
                        <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full bg-success rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <div className="text-xs text-right mt-1">92% above average</div>
                      </div>
                      <div>
                        <div className="text-sm text-neutral-600 mb-1">Score Improvement</div>
                        <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full bg-secondary rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <div className="text-xs text-right mt-1">+35% average improvement</div>
                      </div>
                      <div>
                        <div className="text-sm text-neutral-600 mb-1">User Satisfaction</div>
                        <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: '96%' }}></div>
                        </div>
                        <div className="text-xs text-right mt-1">4.8/5 average rating</div>
                      </div>
                      <div className="pt-4 mt-4 border-t border-neutral-100">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary-600">500+</div>
                          <div className="text-sm text-neutral-600">Successful selections in 2024</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <button 
              className="absolute top-1/2 -translate-y-1/2 left-2 md:left-6 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="absolute top-1/2 -translate-y-1/2 right-2 md:right-6 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-neutral-200'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <AnimateOnScroll animation="slideUp" delay={0.2}>
          <div className="mt-16 text-center">
            <p className="text-lg font-medium mb-4">Ready to start your success story?</p>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => window.location.href = '/register'}
            >
              Join UPSCMONK Today
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default TestimonialsSection;