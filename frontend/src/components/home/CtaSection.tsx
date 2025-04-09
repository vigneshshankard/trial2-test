import React from 'react';
import { useRouter } from 'next/router';
import { ArrowRight, Award, Users, BookOpen } from 'lucide-react';
import Button from '../ui/Button';

const CtaSection: React.FC = () => {
  const router = useRouter();
  
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-white mb-6">Start Your UPSC Journey Today</h2>
            <p className="text-lg text-white/80 mb-8">
              Join thousands of successful aspirants who've transformed their UPSC preparation with our comprehensive platform.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-full bg-white/10">
                  <Award size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">Proven Results</h4>
                  <p className="text-white/70">
                    Our students consistently rank in the top percentiles, with over 500 selections in 2024 alone.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-full bg-white/10">
                  <Users size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">Supportive Community</h4>
                  <p className="text-white/70">
                    Connect with peers and mentors who share your goals and challenges.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-full bg-white/10">
                  <BookOpen size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-medium">Comprehensive Resources</h4>
                  <p className="text-white/70">
                    Everything you need in one place - from study materials to mock tests and current affairs.
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
              onClick={() => router.push('/register')}
            >
              Register for Free
            </Button>
            <p className="text-sm text-white/60 mt-2">
              No credit card required. Get started in less than 2 minutes.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white">Choose Your Plan</h3>
              <p className="text-white/70">
                Select the option that best fits your preparation needs
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Free Plan</h4>
                  <span className="text-accent">₹0/month</span>
                </div>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span>
                    <span>Basic study materials</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span>
                    <span>Daily current affairs</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span>
                    <span>Limited mock tests</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-white text-white hover:bg-white/10"
                  onClick={() => router.push('/register')}
                >
                  Sign Up
                </Button>
              </div>
              
              <div className="bg-accent/20 p-4 rounded-lg border border-accent/30 hover:bg-accent/30 transition cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-medium flex items-center">
                      Premium Plan 
                      <span className="ml-2 bg-accent text-xs text-primary-900 px-2 py-0.5 rounded-full">
                        RECOMMENDED
                      </span>
                    </h4>
                  </div>
                  <span className="text-accent">₹999/month</span>
                </div>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span>
                    <span>All free features</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span>
                    <span>Premium study materials</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span>
                    <span>Unlimited mock tests</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span>
                    <span>AI study planner</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-accent mr-2">✓</span>
                    <span>Mentor sessions</span>
                  </li>
                </ul>
                <Button 
                  variant="accent" 
                  className="w-full"
                  onClick={() => router.push('/register?plan=premium')}
                >
                  Start 7-day Free Trial
                </Button>
              </div>
            </div>
            
            <p className="text-center text-xs text-white/60 mt-4">
              Upgrade, downgrade, or cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;