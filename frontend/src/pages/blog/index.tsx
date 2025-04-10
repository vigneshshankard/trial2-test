import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, ChevronRight, Tag, Clock } from 'lucide-react';
import Layout from '../../components/layout/Layout';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  slug: string;
}

const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');

  // Mock blog posts - in a real app, these would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'How to Prepare for UPSC Prelims in 3 Months',
          excerpt: 'A comprehensive guide for last-minute preparation that will help you crack the UPSC Prelims with focused strategy.',
          content: 'Full content here...',
          author: 'Dr. Rajesh Kumar',
          authorRole: 'UPSC Coach',
          date: 'April 5, 2025',
          readTime: '8 min read',
          image: 'https://source.unsplash.com/random/800x400/?study',
          tags: ['Strategy', 'Prelims', 'Quick Prep'],
          slug: 'how-to-prepare-for-upsc-prelims-in-3-months'
        },
        {
          id: '2',
          title: 'Most Important Topics for UPSC Mains 2025',
          excerpt: 'Analyze the trends and focus on these key topics that are likely to appear in the upcoming UPSC Mains examination.',
          content: 'Full content here...',
          author: 'Priya Singh',
          authorRole: 'IAS Officer',
          date: 'March 28, 2025',
          readTime: '12 min read',
          image: 'https://source.unsplash.com/random/800x400/?exam',
          tags: ['Mains', 'Topics', 'Analysis'],
          slug: 'most-important-topics-for-upsc-mains-2025'
        },
        {
          id: '3',
          title: 'Effective Note-Making Techniques for UPSC',
          excerpt: 'Learn how to make concise and effective notes that will help you revise efficiently before the exam.',
          content: 'Full content here...',
          author: 'Ankit Sharma',
          authorRole: 'Study Coach',
          date: 'March 15, 2025',
          readTime: '6 min read',
          image: 'https://source.unsplash.com/random/800x400/?notes',
          tags: ['Notes', 'Study Tips', 'Revision'],
          slug: 'effective-note-making-techniques-for-upsc'
        },
        {
          id: '4',
          title: 'Understanding International Relations for UPSC',
          excerpt: 'A deep dive into the current international scenario and how to approach IR questions in UPSC exams.',
          content: 'Full content here...',
          author: 'Dr. Meenakshi Gupta',
          authorRole: 'Foreign Policy Expert',
          date: 'March 10, 2025',
          readTime: '15 min read',
          image: 'https://source.unsplash.com/random/800x400/?international',
          tags: ['International Relations', 'Current Affairs', 'Foreign Policy'],
          slug: 'understanding-international-relations-for-upsc'
        },
        {
          id: '5',
          title: 'Top 10 Resources for Economy Preparation',
          excerpt: 'Discover the best books, websites, and resources to prepare the economics section thoroughly.',
          content: 'Full content here...',
          author: 'Vivek Mishra',
          authorRole: 'Economics Professor',
          date: 'February 25, 2025',
          readTime: '10 min read',
          image: 'https://source.unsplash.com/random/800x400/?economy',
          tags: ['Economy', 'Resources', 'Books'],
          slug: 'top-10-resources-for-economy-preparation'
        }
      ];
      
      setBlogPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Get all unique tags
  const allTags = ['all', ...new Set(blogPosts.flatMap(post => post.tags))];
  
  // Filter posts by tag
  const filteredPosts = filter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.tags.includes(filter));

  return (
    <Layout>
      <Head>
        <title>UPSC Preparation Blog | UPSCMONK</title>
        <meta name="description" content="Read our latest articles and insights on UPSC preparation, strategies, and current affairs analysis." />
      </Head>

      <div className="bg-neutral-50 min-h-screen pb-12">
        {/* Hero Section */}
        <div className="relative bg-primary-800 text-white">
          <div className="absolute inset-0 opacity-20" 
               style={{
                 backgroundImage: "url('https://source.unsplash.com/random/1920x500/?library,study')",
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
               }}
          />
          <div className="container relative z-10 py-16 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">UPSC Preparation Blog</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Expert insights, preparation strategies, and analysis to help you succeed in your UPSC journey
            </p>
          </div>
        </div>

        <div className="container py-8 px-4 sm:px-6 lg:px-8">
          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mb-8 items-center">
            <span className="font-medium text-neutral-700 mr-2">Filter by:</span>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`px-4 py-1 text-sm rounded-full transition-all ${
                  filter === tag 
                    ? 'bg-primary text-white' 
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }`}
                onClick={() => setFilter(tag)}
              >
                {tag === 'all' ? 'All' : tag}
              </button>
            ))}
          </div>

          {/* Blog Posts */}
          {isLoading ? (
            <div className="animate-pulse space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="h-64 bg-neutral-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-7 bg-neutral-200 rounded w-3/4"></div>
                    <div className="h-4 bg-neutral-200 rounded"></div>
                    <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
                    <div className="h-10 bg-neutral-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map(tag => (
                          <span key={tag} className="bg-primary-50 text-primary text-xs px-2 py-1 rounded-full">
                            <Tag size={12} className="inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h2>
                      <p className="text-neutral-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-neutral-500">
                          <Calendar size={14} className="mr-1" />
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <Clock size={14} className="mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="mt-4 text-primary flex items-center font-medium">
                        Read More
                        <ChevronRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Newsletter Subscription */}
          <div className="bg-primary-50 rounded-2xl p-6 md:p-8 mt-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-primary-800">Subscribe to our Newsletter</h2>
              <p className="text-neutral-700 mb-6">
                Get weekly UPSC prep tips, current affairs updates, and exam strategies delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-neutral-500 mt-3">
                By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;