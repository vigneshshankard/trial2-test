import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark, ChevronRight, MessageSquare } from 'lucide-react';
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

const BlogPostPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      // In a real app, fetch from API based on slug
      setTimeout(() => {
        // Mock data - this would come from an API in a real implementation
        const mockPost: BlogPost = {
          id: '1',
          title: 'How to Prepare for UPSC Prelims in 3 Months',
          excerpt: 'A comprehensive guide for last-minute preparation that will help you crack the UPSC Prelims with focused strategy.',
          content: `
            <p class="mb-4">The Union Public Service Commission (UPSC) Civil Services Preliminary Examination is a crucial first step towards achieving your dream of becoming a civil servant. If you only have three months left for preparation, don't worry—with a focused strategy, you can still make significant progress.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Understanding the Exam Pattern</h2>
            <p class="mb-4">The Prelims consists of two papers: General Studies Paper I and CSAT (General Studies Paper II). Paper I tests your knowledge on a wide range of subjects including history, geography, polity, economics, science, and current affairs. CSAT is primarily a qualifying paper that tests your aptitude and comprehension skills.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Month 1: Building Foundation</h2>
            <p class="mb-4">Your first month should focus on covering the basics across all subjects. Start with NCERT textbooks for history, geography, polity, and economics. These provide foundational knowledge that's essential for the exam.</p>
            <ul class="list-disc pl-6 mb-4">
              <li class="mb-2">Dedicate 2-3 hours daily to static subjects</li>
              <li class="mb-2">Spend 1-2 hours on current affairs from the past year</li>
              <li class="mb-2">Practice 15-20 CSAT questions daily to build aptitude skills</li>
              <li class="mb-2">Take one mock test per week to assess your progress</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Month 2: Deepening Knowledge</h2>
            <p class="mb-4">The second month should be spent on deepening your understanding of complex topics and filling knowledge gaps identified during your first month.</p>
            <ul class="list-disc pl-6 mb-4">
              <li class="mb-2">Focus on subjects where you scored poorly in mock tests</li>
              <li class="mb-2">Start advanced reading on polity and economics</li>
              <li class="mb-2">Dedicate more time to current affairs (6-9 months coverage)</li>
              <li class="mb-2">Increase CSAT practice to 30 questions daily</li>
              <li class="mb-2">Take two mock tests per week</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Month 3: Revision and Practice</h2>
            <p class="mb-4">The final month should be dedicated to extensive revision and practice tests to improve your speed and accuracy.</p>
            <ul class="list-disc pl-6 mb-4">
              <li class="mb-2">Revise all subjects using your notes and summaries</li>
              <li class="mb-2">Practice previous years' question papers</li>
              <li class="mb-2">Take 3-4 full-length mock tests per week</li>
              <li class="mb-2">Analyze your performance in detail after each test</li>
              <li class="mb-2">Focus on your strengths in the final weeks</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Essential Resources</h2>
            <p class="mb-4">Here are some resources to help you maximize your preparation in this short period:</p>
            <ul class="list-disc pl-6 mb-4">
              <li class="mb-2">NCERT textbooks (Class 6-12): For foundational knowledge</li>
              <li class="mb-2">A good current affairs magazine or compilation</li>
              <li class="mb-2">Subject-specific standard reference books</li>
              <li class="mb-2">Previous years' question papers (at least last 5 years)</li>
              <li class="mb-2">Reliable online test series for practice</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Self-Care during Preparation</h2>
            <p class="mb-4">Intense preparation can be stressful. Remember to take care of yourself with these tips:</p>
            <ul class="list-disc pl-6 mb-4">
              <li class="mb-2">Get 7-8 hours of sleep daily</li>
              <li class="mb-2">Take short breaks every 45-50 minutes of study</li>
              <li class="mb-2">Include light physical activity in your routine</li>
              <li class="mb-2">Practice mindfulness or meditation to manage stress</li>
              <li class="mb-2">Maintain a balanced diet and stay hydrated</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Final Week Preparation</h2>
            <p class="mb-4">The week before the exam should be focused on consolidating your knowledge rather than learning new topics:</p>
            <ul class="list-disc pl-6 mb-4">
              <li class="mb-2">Review your notes and high-yield topics</li>
              <li class="mb-2">Practice time management with full-length papers</li>
              <li class="mb-2">Revise important current affairs</li>
              <li class="mb-2">Prepare your exam day checklist (admit card, ID proof, etc.)</li>
              <li class="mb-2">Avoid starting any new topics or resources</li>
            </ul>
            
            <p class="mb-4 mt-8">Remember, consistency is key in these three months. Stick to your schedule, stay focused, and believe in yourself. With dedication and smart preparation, you can certainly clear the Prelims even with just three months of preparation.</p>
            
            <p class="mt-8 text-neutral-600">Good luck with your preparation!</p>
          `,
          author: 'Dr. Rajesh Kumar',
          authorRole: 'UPSC Coach',
          date: 'April 5, 2025',
          readTime: '8 min read',
          image: 'https://source.unsplash.com/random/1200x600/?study',
          tags: ['Strategy', 'Prelims', 'Quick Prep'],
          slug: 'how-to-prepare-for-upsc-prelims-in-3-months'
        };
        
        setPost(mockPost);
        
        // Mock related posts
        setRelatedPosts([
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
          }
        ]);
        
        setIsLoading(false);
      }, 1000);
    }
  }, [slug]);

  if (isLoading || !post) {
    return (
      <Layout>
        <div className="container py-20">
          <div className="flex items-center justify-center">
            <div className="animate-pulse space-y-8 w-full max-w-4xl">
              <div className="h-10 bg-neutral-200 rounded-md w-3/4"></div>
              <div className="h-80 bg-neutral-200 rounded-xl w-full"></div>
              <div className="space-y-4">
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{post.title} | UPSCMONK Blog</title>
        <meta name="description" content={post.excerpt} />
        {/* Open Graph meta tags for better social sharing */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Head>

      <div className="bg-neutral-50 min-h-screen pb-12">
        {/* Back to blog link */}
        <div className="container pt-6">
          <Link href="/blog">
            <span className="inline-flex items-center text-primary hover:text-primary-700 font-medium">
              <ArrowLeft size={16} className="mr-2" />
              Back to all articles
            </span>
          </Link>
        </div>

        {/* Article header */}
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="bg-primary-50 text-primary text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
            
            <p className="text-xl text-neutral-700 mb-6">{post.excerpt}</p>
            
            <div className="flex items-center justify-between border-b border-neutral-200 pb-6 mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-neutral-300 rounded-full mr-4 overflow-hidden">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${post.author.replace(/\s+/g, '+')}&background=random`} 
                    alt={post.author} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-neutral-500">{post.authorRole}</p>
                </div>
              </div>
              
              <div className="flex items-center text-neutral-500 text-sm">
                <div className="flex items-center mr-4">
                  <Calendar size={14} className="mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature image */}
        <div className="container mb-8">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-xl overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Article content */}
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 md:p-10 shadow-sm">
              <article className="prose lg:prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>
              
              {/* Tags and share */}
              <div className="mt-10 pt-8 border-t border-neutral-200">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                  <div>
                    <p className="font-medium mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Link href={`/blog?tag=${tag}`} key={tag}>
                          <span className="bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-800 text-sm px-3 py-1 rounded-full">
                            {tag}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-2">Share this article:</p>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </button>
                      <button className="w-10 h-10 bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                      </button>
                      <button className="w-10 h-10 bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </button>
                      <button className="w-10 h-10 bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                      </button>
                      <button className="w-10 h-10 bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Author bio */}
            <div className="mt-8 bg-primary-50 rounded-xl p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 bg-neutral-300 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${post.author.replace(/\s+/g, '+')}&size=200&background=random`} 
                    alt={post.author} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{post.author}</h3>
                  <p className="text-primary-600 mb-3">{post.authorRole}</p>
                  <p className="text-neutral-700">
                    A passionate educator with over 15 years of experience in UPSC coaching. 
                    Specializes in crafting effective study strategies and simplifying complex topics 
                    for aspirants. Has mentored hundreds of successful candidates.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <button className="text-neutral-700 hover:text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </button>
                    <button className="text-neutral-700 hover:text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                    </button>
                    <button className="text-neutral-700 hover:text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Related articles */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.id}>
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2">{relatedPost.title}</h3>
                        <p className="text-neutral-600 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-neutral-500">
                            <Calendar size={14} className="mr-1" />
                            <span>{relatedPost.date}</span>
                          </div>
                          <div className="text-primary flex items-center font-medium">
                            Read More
                            <ChevronRight size={16} className="ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Comments section - simplified for this example */}
            <div className="mt-12 bg-white rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MessageSquare size={20} className="mr-2" />
                Comments (14)
              </h2>
              
              {/* Comment form */}
              <div className="mb-8">
                <textarea 
                  placeholder="Join the discussion..."
                  className="w-full p-4 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={4}
                />
                <div className="mt-4 flex justify-end">
                  <button className="bg-primary hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Post Comment
                  </button>
                </div>
              </div>
              
              {/* Comment display - simplified */}
              <div className="space-y-6">
                <p className="text-center text-neutral-500">
                  Login to see comments and join the discussion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPostPage;