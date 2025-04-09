import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Clock, ArrowRight, Tag, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

// This would come from an API in a real application
const mockCurrentAffairs = [
  {
    id: '1',
    date: '2025-04-09',
    title: 'Union Cabinet Approves National Logistics Policy',
    summary: 'The policy aims to reduce logistics cost from 14-18% of GDP to global best practices of 8% by 2030.',
    category: 'Economy',
    tags: ['Infrastructure', 'Logistics', 'Policy'],
    hasQuiz: true,
    isPremium: false,
  },
  {
    id: '2',
    date: '2025-04-08',
    title: 'Supreme Court Issues Guidelines on Environmental Clearances',
    summary: 'New guidelines mandate stricter environmental impact assessment for infrastructure projects near eco-sensitive zones.',
    category: 'Environment',
    tags: ['Supreme Court', 'EIA', 'Conservation'],
    hasQuiz: true,
    isPremium: false,
  },
  {
    id: '3',
    date: '2025-04-07',
    title: 'India Signs Strategic Partnership Agreement with Japan',
    summary: 'The agreement focuses on defense collaboration, technology transfer, and joint maritime exercises in the Indo-Pacific.',
    category: 'International Relations',
    tags: ['Indo-Pacific', 'Defense', 'Japan'],
    hasQuiz: false,
    isPremium: false,
  },
  {
    id: '4',
    date: '2025-04-06',
    title: 'New Research Shows Himalayan Glaciers Melting at Unprecedented Rate',
    summary: 'Scientists report accelerated glacier retreat, potentially affecting water security for millions across South Asia.',
    category: 'Environment',
    tags: ['Climate Change', 'Glaciers', 'Water Security'],
    hasQuiz: true,
    isPremium: false,
  },
  {
    id: '5',
    date: '2025-04-05',
    title: 'Finance Commission Recommends New Revenue Sharing Formula',
    summary: 'The 16th Finance Commission proposes changes to vertical and horizontal devolution criteria between center and states.',
    category: 'Economy',
    tags: ['Fiscal Federalism', 'Finance Commission', 'Revenue'],
    hasQuiz: false,
    isPremium: true,
  },
  {
    id: '6',
    date: '2025-04-04',
    title: 'National Education Policy Implementation Progress Report Released',
    summary: 'Report highlights achievements and challenges in implementing NEP 2020 across states and union territories.',
    category: 'Education',
    tags: ['NEP 2020', 'Education Reform', 'Implementation'],
    hasQuiz: true,
    isPremium: false,
  },
  {
    id: '7',
    date: '2025-04-03',
    title: 'India Successfully Tests Indigenous Anti-Satellite Missile System',
    summary: 'DRDO demonstrates capability to neutralize orbital threats, making India the fourth nation with proven ASAT technology.',
    category: 'Defense',
    tags: ['ASAT', 'Space Security', 'DRDO'],
    hasQuiz: true,
    isPremium: true,
  },
];

// Group current affairs by date
const groupByDate = (items) => {
  const grouped = {};
  
  items.forEach(item => {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'short', 
      day: 'numeric' 
    });
    
    if (!grouped[formattedDate]) {
      grouped[formattedDate] = [];
    }
    
    grouped[formattedDate].push(item);
  });
  
  return grouped;
};

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const CurrentAffairsPreview: React.FC = () => {
  const router = useRouter();
  const [expandedDays, setExpandedDays] = useState<string[]>(['2025-04-09']);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const groupedAffairs = groupByDate(mockCurrentAffairs);
  
  const toggleDay = (date: string) => {
    if (expandedDays.includes(date)) {
      setExpandedDays(expandedDays.filter(d => d !== date));
    } else {
      setExpandedDays([...expandedDays, date]);
    }
  };
  
  const categories = [...new Set(mockCurrentAffairs.map(item => item.category))];
  
  const filteredAffairs = selectedCategory 
    ? mockCurrentAffairs.filter(item => item.category === selectedCategory)
    : mockCurrentAffairs;
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
          <div>
            <h2 className="mb-4">Stay Updated with Current Affairs</h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Our team of experts curates daily news relevant to UPSC, complete with analysis and quizzes to test your understanding.
            </p>
          </div>
          
          <div className="mt-6 lg:mt-0 flex flex-wrap gap-2">
            <Button 
              variant={selectedCategory === null ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            
            {categories.map(category => (
              <Button 
                key={category}
                variant={selectedCategory === category ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline View */}
          <div className="lg:col-span-2">
            <div className="relative pl-8 border-l-2 border-secondary-100 space-y-6">
              {Object.keys(groupByDate(filteredAffairs)).map((date) => {
                const dayItems = groupByDate(filteredAffairs)[date];
                const firstItem = dayItems[0];
                const isExpanded = expandedDays.includes(firstItem.date);
                
                return (
                  <div key={date} className="relative">
                    <div className="absolute -left-[41px] w-20">
                      <div className="bg-secondary text-white text-xs font-bold rounded py-1 px-2 text-center">
                        {formatDate(firstItem.date)}
                      </div>
                    </div>
                    
                    <div className="absolute -left-[17px] w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
                      <Calendar size={16} className="text-secondary" />
                    </div>
                    
                    <Card className="ml-2">
                      <div 
                        className="p-4 cursor-pointer flex justify-between items-center"
                        onClick={() => toggleDay(firstItem.date)}
                      >
                        <div>
                          <h4 className="font-medium text-lg">{date}</h4>
                          <p className="text-sm text-neutral-500">
                            {dayItems.length} {dayItems.length === 1 ? 'article' : 'articles'}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          {isExpanded ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </Button>
                      </div>
                      
                      {isExpanded && (
                        <div className="border-t border-neutral-100">
                          {dayItems.map((item) => (
                            <div 
                              key={item.id} 
                              className="p-4 border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50 transition"
                            >
                              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                                <Tag size={14} className="text-secondary" />
                                <span className="bg-secondary-50 text-secondary px-2 py-0.5 rounded">
                                  {item.category}
                                </span>
                                {item.hasQuiz && (
                                  <span className="bg-accent-50 text-accent-700 px-2 py-0.5 rounded">
                                    Quiz Available
                                  </span>
                                )}
                                {item.isPremium && (
                                  <span className="bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded flex items-center">
                                    <span className="w-2 h-2 bg-accent rounded-full mr-1"></span>
                                    Premium
                                  </span>
                                )}
                              </div>
                              
                              <h4 className="font-medium mb-2 line-clamp-2">{item.title}</h4>
                              
                              <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                                {item.summary}
                              </p>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex flex-wrap gap-1">
                                  {item.tags.slice(0, 2).map((tag, index) => (
                                    <span 
                                      key={index}
                                      className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                  {item.tags.length > 2 && (
                                    <span className="text-xs text-neutral-500">
                                      +{item.tags.length - 2}
                                    </span>
                                  )}
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="xs"
                                  rightIcon={<ArrowRight size={14} />}
                                  onClick={() => router.push(`/current-affairs/${item.id}`)}
                                >
                                  Read more
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  </div>
                );
              })}
              
              <div className="h-24 relative">
                <div className="h-full w-full flex items-end justify-center pb-6">
                  <div className="text-neutral-400 flex items-center gap-2">
                    <Clock size={14} />
                    <span className="text-sm">Available for last 7 days only</span>
                  </div>
                </div>
                
                <div className="absolute left-0 bottom-0 h-12 w-[2px] bg-gradient-to-b from-secondary-100 to-white"></div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card variant="feature">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Why Current Affairs Matter</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-secondary-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="text-secondary font-bold text-xs">1</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Prelims Focus:</span> 15-20% questions directly from recent events
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-secondary-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="text-secondary font-bold text-xs">2</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Mains Edge:</span> Contemporary examples strengthen your answers
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-secondary-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="text-secondary font-bold text-xs">3</span>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Interview Prep:</span> Shows awareness of current national and global issues
                    </p>
                  </li>
                </ul>
                
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <h4 className="font-medium mb-3">Premium Benefits:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-accent-50 flex-shrink-0 flex items-center justify-center">
                        <span className="text-accent text-xs">✓</span>
                      </div>
                      Daily Analysis Videos
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-accent-50 flex-shrink-0 flex items-center justify-center">
                        <span className="text-accent text-xs">✓</span>
                      </div>
                      Weekly PDF Compilations
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-accent-50 flex-shrink-0 flex items-center justify-center">
                        <span className="text-accent text-xs">✓</span>
                      </div>
                      Full Archive Access
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <h3 className="font-medium mb-4">Daily Quiz</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Test your knowledge on the latest current affairs with our daily quiz.
                </p>
                <Button 
                  variant="primary" 
                  fullWidth
                  onClick={() => router.push('/daily-quiz')}
                >
                  Take Today's Quiz
                </Button>
              </div>
            </Card>
            
            <div className="text-center">
              <Button 
                variant="accent"
                rightIcon={<ArrowRight size={18} />}
                onClick={() => router.push('/current-affairs')}
              >
                View All Current Affairs
              </Button>
              <p className="mt-3 text-sm text-neutral-500">
                Sign in to access full current affairs database
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentAffairsPreview;