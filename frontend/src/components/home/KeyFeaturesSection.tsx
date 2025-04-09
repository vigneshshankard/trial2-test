import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { 
  Newspaper, 
  BookOpen, 
  TestTube, 
  Brain,
  Users,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';

const features = [
  {
    id: 1,
    name: 'Current Affairs',
    description: 'Daily updates and analysis of relevant news for UPSC preparation',
    icon: <Newspaper className="w-7 h-7 text-secondary" />,
    color: 'bg-secondary-50',
    benefits: [
      'Curated news digests with UPSC perspective',
      'Topic-wise categorization for easy revision',
      'Regular quizzes to test your knowledge',
      'Downloadable PDFs for offline study'
    ],
    image: '/current-affairs-preview.jpg',
    ctaLink: '/current-affairs',
    premium: false
  },
  {
    id: 2,
    name: 'Study Materials',
    description: 'Comprehensive, well-structured notes for all UPSC topics',
    icon: <BookOpen className="w-7 h-7 text-primary" />,
    color: 'bg-primary-50',
    benefits: [
      'Subject-wise categorized content',
      'Concise yet comprehensive notes',
      'Visual learning aids and diagrams',
      'Regular updates with latest exam pattern'
    ],
    image: '/study-materials-preview.jpg',
    ctaLink: '/study-materials',
    premium: false
  },
  {
    id: 3,
    name: 'Mock Tests',
    description: 'Simulate real exam conditions with our timed mock tests',
    icon: <TestTube className="w-7 h-7 text-error" />,
    color: 'bg-error-50',
    benefits: [
      'UPSC pattern questions with detailed solutions',
      'Performance analytics and improvement suggestions',
      'Regular updates with new question banks',
      'Compare your results with peer benchmarks'
    ],
    image: '/mock-tests-preview.jpg',
    ctaLink: '/mock-tests',
    premium: false
  },
  {
    id: 4,
    name: 'AI Study Planner',
    description: 'Personalized study plans adapted to your progress',
    icon: <Brain className="w-7 h-7 text-accent" />,
    color: 'bg-accent-50',
    benefits: [
      'Customized schedules based on your goals',
      'Adaptive plans that evolve with your progress',
      'Focus recommendations for weak areas',
      'Time management optimization'
    ],
    image: '/ai-planner-preview.jpg',
    ctaLink: '/study-planner',
    premium: true
  },
  {
    id: 5,
    name: 'Community Learning',
    description: 'Connect with fellow aspirants for collaborative preparation',
    icon: <Users className="w-7 h-7 text-success" />,
    color: 'bg-success-50',
    benefits: [
      'Discussion forums for doubt clearing',
      'Study groups for collaborative learning',
      'Direct chat with peers and mentors',
      'Share resources and insights'
    ],
    image: '/community-preview.jpg',
    ctaLink: '/community',
    premium: false
  }
];

const KeyFeaturesSection: React.FC = () => {
  const router = useRouter();
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const toggleFeature = (id: number) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">Why Choose UPSCMONK?</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Our platform is designed to provide everything UPSC aspirants need to succeed, 
            from daily current affairs to personalized study plans and a supportive community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              className="transition-all duration-300 h-full"
              variant={feature.premium ? 'premium' : 'default'}
              hover
              onClick={() => toggleFeature(feature.id)}
            >
              <CardHeader className={`rounded-t p-4 ${feature.color}`}>
                <div className="flex justify-between items-start">
                  {feature.icon}
                  {feature.premium && (
                    <span className="bg-accent text-neutral-900 px-2 py-0.5 rounded text-xs font-bold">
                      PREMIUM
                    </span>
                  )}
                </div>
                <CardTitle className="mt-3">{feature.name}</CardTitle>
                <CardDescription className="text-neutral-700">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-4">
                {expandedFeature === feature.id ? (
                  <div className="animate-fadeIn">
                    <ul className="mb-4 space-y-2">
                      {feature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-secondary mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    {feature.image && (
                      <div className="mt-4 rounded overflow-hidden bg-neutral-100 h-40 flex items-center justify-center text-sm text-neutral-500">
                        [Feature Preview Image]
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-neutral-500 flex items-center justify-between">
                    <span>Click to learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </CardContent>
              
              <CardFooter>
                <Button 
                  variant={feature.premium ? "accent" : "primary"}
                  rightIcon={<ArrowRight size={16} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(feature.ctaLink);
                  }}
                  fullWidth
                >
                  {expandedFeature === feature.id ? 'Explore Now' : 'Learn More'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="mb-4 text-lg font-medium">
            Ready to experience all these features and more?
          </p>
          <Button 
            variant="accent" 
            size="lg"
            onClick={() => router.push('/register')}
          >
            Start Your UPSC Journey Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;