import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowRight, CheckCircle, Users, Book, Award } from 'lucide-react';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  const router = useRouter();

  // Add useEffect to handle client-side document manipulation
  useEffect(() => {
    // Create the keyframes animation for the blob effect
    const style = document.createElement('style');
    style.textContent = `
    @keyframes blob {
      0% {
        transform: scale(1);
      }
      33% {
        transform: scale(1.1) translate(50px, -20px);
      }
      66% {
        transform: scale(0.9) translate(-20px, 40px);
      }
      100% {
        transform: scale(1);
      }
    }
    .animate-blob {
      animation: blob 12s infinite alternate;
    }
    .animation-delay-2000 {
      animation-delay: -2s;
    }
    .animation-delay-4000 {
      animation-delay: -4s;
    }
    `;
    document.head.appendChild(style);

    // Clean up function to remove the style when component unmounts
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []); // Empty dependency array ensures this runs once after initial render

  return (
    <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-primary-600 to-primary">
      {/* Background abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] right-[20%] w-80 h-80 bg-accent-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
          {/* Left Column - Text Content */}
          <div className="w-full lg:w-1/2 text-white slide-up mb-12 lg:mb-0">
            <h1 className="text-white mb-6 font-serif leading-tight">
              Master UPSC with <span className="text-accent">AI-Powered</span> Learning
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-xl">
              UPSCMONK delivers personalized study plans, comprehensive materials, and an engaged community to help you achieve your UPSC dreams.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                variant="accent" 
                size="lg"
                rightIcon={<ArrowRight size={18} />}
                onClick={() => router.push('/mock-tests')}
              >
                Try Free Mock Test
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
                onClick={() => router.push('/study-materials')}
              >
                Explore Study Materials
              </Button>
            </div>
            
            {/* Social Proof */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">50,000+</div>
                <div className="text-sm text-white/70">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">92%</div>
                <div className="text-sm text-white/70">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">4.8/5</div>
                <div className="text-sm text-white/70">Student Rating</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-1.5">
                <CheckCircle size={16} className="text-accent" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={16} className="text-accent" />
                <span>Updated Daily</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle size={16} className="text-accent" />
                <span>Expert Faculty</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Interactive Element */}
          <div className="w-full lg:w-1/2 fade-in">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 bg-accent text-xs font-bold text-neutral-900 rounded-bl-lg">
                INTERACTIVE DEMO
              </div>
              
              <h3 className="text-xl text-white mb-4">Your UPSC Journey Starts Here</h3>
              
              {/* Interactive Journey Visualization */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center group-hover:bg-secondary transition">
                    <Book size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Personalized Study Plan</h4>
                    <p className="text-sm text-white/70">AI creates your perfect study schedule</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center group-hover:bg-accent transition">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Community Learning</h4>
                    <p className="text-sm text-white/70">Collaborate with peers and mentors</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center group-hover:bg-primary-400 transition">
                    <Award size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Track Your Progress</h4>
                    <p className="text-sm text-white/70">Analytics that help you improve</p>
                  </div>
                </div>

                {/* Testimonial Preview */}
                <div className="mt-6 bg-white/5 p-4 rounded-lg border border-white/10 relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    "
                  </div>
                  <p className="text-sm text-white/90 italic">
                    "UPSCMONK's study plan and community support helped me crack the exam in my first attempt."
                  </p>
                  <div className="text-right mt-2">
                    <p className="text-xs font-semibold text-accent">Priya S.</p>
                    <p className="text-xs text-white/70">AIR 45, 2024 Batch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-neutral-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,143.53,111.44,221.18,94.08Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;