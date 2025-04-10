import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showComparisonDetails, setShowComparisonDetails] = useState(false);
  
  // Pricing details with different rates for monthly and yearly billing
  const pricingData = {
    free: {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      features: [
        { name: "Current Affairs (7-day feed)", included: true },
        { name: "Basic Study Materials", included: true },
        { name: "Limited Quizzes & Mock Tests", included: true },
        { name: "Basic Analytics", included: true },
        { name: "Social Networking Features", included: true },
        { name: "Basic Study Planner", included: true },
        { name: "Activity Feed & Community", included: true },
        { name: "Premium Study Materials", included: false },
        { name: "Premium Mock Tests", included: false },
        { name: "Advanced Analytics", included: false },
        { name: "Mentor Q&A Sessions", included: false },
        { name: "Adaptive Study Planner", included: false },
        { name: "Priority Notifications", included: false }
      ]
    },
    premium: {
      name: "Premium",
      price: { monthly: 999, yearly: 9990 },
      features: [
        { name: "Current Affairs (Full Access)", included: true },
        { name: "All Study Materials", included: true },
        { name: "Unlimited Quizzes & Mock Tests", included: true },
        { name: "Advanced Analytics", included: true },
        { name: "Social Networking Features", included: true },
        { name: "Adaptive Study Planner", included: true },
        { name: "Activity Feed & Community", included: true },
        { name: "Premium Study Materials", included: true },
        { name: "Premium Mock Tests", included: true },
        { name: "Peer Benchmarking", included: true },
        { name: "Mentor Q&A Sessions", included: true },
        { name: "Personalized Feedback", included: true },
        { name: "Priority Notifications", included: true }
      ],
      savings: {
        monthly: 0,
        yearly: 1998 // Savings when billed yearly (999 * 12 - 9990)
      }
    }
  };

  return (
    <Layout>
      <Head>
        <title>Pricing Plans | UPSCMONK</title>
        <meta name="description" content="Choose the UPSCMONK plan that's right for your UPSC preparation journey. Free and premium options available." />
      </Head>
      
      <div className="bg-neutral-50 min-h-screen pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white">
          <div className="container py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Choose the Plan That Fits Your Goals</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Join thousands of UPSC aspirants who've transformed their preparation journey with UPSCMONK
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="container px-4 sm:px-6 lg:px-8 py-12">
          {/* Billing Toggle */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-xl shadow-sm p-2 flex justify-center">
              <div className="flex items-center space-x-2 p-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                    billingCycle === 'monthly'
                      ? 'bg-primary text-white'
                      : 'bg-transparent text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                    billingCycle === 'yearly'
                      ? 'bg-primary text-white'
                      : 'bg-transparent text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  Annual Billing
                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                    Save 17%
                  </span>
                </button>
              </div>
            </div>
            {billingCycle === 'yearly' && (
              <p className="text-center mt-3 text-sm text-neutral-600">
                Annual billing saves you ₹{pricingData.premium.savings.yearly} per year
              </p>
            )}
          </div>
          
          {/* Pricing Cards */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col border border-neutral-200">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-2xl font-bold">{pricingData.free.name}</h2>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹{pricingData.free.price[billingCycle]}</span>
                  <span className="text-neutral-500 ml-2">forever</span>
                </div>
                <p className="mt-2 text-neutral-600">
                  Great for getting started with UPSC preparation
                </p>
              </div>
              
              <div className="p-6 flex-grow">
                <h3 className="font-semibold mb-4">Included features:</h3>
                <ul className="space-y-3">
                  {pricingData.free.features.slice(0, 7).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-success mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-neutral-300 mr-2 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-neutral-800' : 'text-neutral-400'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6">
                <Link href="/signup">
                  <button className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 py-3 px-4 rounded-lg font-medium transition-colors">
                    Sign Up Free
                  </button>
                </Link>
                <p className="text-xs text-neutral-500 text-center mt-2">
                  No credit card required
                </p>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col border-2 border-primary relative">
              <div className="absolute top-4 right-4">
                <span className="bg-primary-100 text-primary text-xs px-3 py-1 rounded-full font-medium">
                  Most Popular
                </span>
              </div>
              
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-2xl font-bold text-primary">{pricingData.premium.name}</h2>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹{pricingData.premium.price[billingCycle]}</span>
                  <span className="text-neutral-500 ml-2">
                    {billingCycle === 'monthly' ? '/month' : '/year'}
                  </span>
                </div>
                <p className="mt-2 text-neutral-600">
                  Everything you need for comprehensive preparation
                </p>
              </div>
              
              <div className="p-6 flex-grow">
                <h3 className="font-semibold mb-4">Everything in Free, plus:</h3>
                <ul className="space-y-3">
                  {pricingData.premium.features.slice(0, 13).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-success mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-neutral-300 mr-2 flex-shrink-0" />
                      )}
                      <span>{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6">
                <Link href="/signup?plan=premium">
                  <button className="w-full bg-primary hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                    Get Premium
                  </button>
                </Link>
                <p className="text-xs text-neutral-500 text-center mt-2">
                  7-day money back guarantee
                </p>
              </div>
            </div>
          </div>

          {/* Feature Comparison Button */}
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <button 
              onClick={() => setShowComparisonDetails(!showComparisonDetails)}
              className="inline-flex items-center font-medium text-primary hover:text-primary-700 transition-colors"
            >
              {showComparisonDetails ? 'Hide' : 'Show'} detailed feature comparison
              <HelpCircle size={16} className="ml-1" />
            </button>
          </div>
          
          {/* Detailed Comparison Table */}
          {showComparisonDetails && (
            <div className="max-w-5xl mx-auto mt-8 overflow-hidden">
              <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-neutral-50">
                      <th className="py-4 px-6 text-left text-neutral-800 font-semibold">Features</th>
                      <th className="py-4 px-6 text-center text-neutral-800 font-semibold">Free</th>
                      <th className="py-4 px-6 text-center text-primary font-semibold">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-neutral-200">
                      <td className="py-3 px-6 text-neutral-700 font-medium">Current Affairs</td>
                      <td className="py-3 px-6 text-center">Limited (7-day feed)</td>
                      <td className="py-3 px-6 text-center">Full Access</td>
                    </tr>
                    <tr className="border-t border-neutral-200 bg-neutral-50">
                      <td className="py-3 px-6 text-neutral-700 font-medium">Study Materials</td>
                      <td className="py-3 px-6 text-center">Basic</td>
                      <td className="py-3 px-6 text-center">Premium + Advanced</td>
                    </tr>
                    <tr className="border-t border-neutral-200">
                      <td className="py-3 px-6 text-neutral-700 font-medium">Mock Tests</td>
                      <td className="py-3 px-6 text-center">Basic (Limited)</td>
                      <td className="py-3 px-6 text-center">All Tests + Advanced Analytics</td>
                    </tr>
                    <tr className="border-t border-neutral-200 bg-neutral-50">
                      <td className="py-3 px-6 text-neutral-700 font-medium">Analytics</td>
                      <td className="py-3 px-6 text-center">Basic Progress Tracking</td>
                      <td className="py-3 px-6 text-center">Advanced + Peer Benchmarking</td>
                    </tr>
                    <tr className="border-t border-neutral-200">
                      <td className="py-3 px-6 text-neutral-700 font-medium">Study Planner</td>
                      <td className="py-3 px-6 text-center">Basic</td>
                      <td className="py-3 px-6 text-center">Adaptive + Personalized</td>
                    </tr>
                    <tr className="border-t border-neutral-200 bg-neutral-50">
                      <td className="py-3 px-6 text-neutral-700 font-medium">Mentor Access</td>
                      <td className="py-3 px-6 text-center">
                        <X className="h-5 w-5 text-neutral-400 mx-auto" />
                      </td>
                      <td className="py-3 px-6 text-center">
                        <Check className="h-5 w-5 text-success mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-t border-neutral-200">
                      <td className="py-3 px-6 text-neutral-700 font-medium">Community Features</td>
                      <td className="py-3 px-6 text-center">Basic Access</td>
                      <td className="py-3 px-6 text-center">Full Access + Groups</td>
                    </tr>
                    <tr className="border-t border-neutral-200 bg-neutral-50">
                      <td className="py-3 px-6 text-neutral-700 font-medium">Notifications</td>
                      <td className="py-3 px-6 text-center">Standard</td>
                      <td className="py-3 px-6 text-center">Priority</td>
                    </tr>
                    <tr className="border-t border-neutral-200">
                      <td className="py-3 px-6 text-neutral-700 font-medium">Update Frequency</td>
                      <td className="py-3 px-6 text-center">Weekly</td>
                      <td className="py-3 px-6 text-center">Daily</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-lg mb-2">What's the difference between Free and Premium plans?</h3>
                <p className="text-neutral-700">
                  The Free plan gives you access to basic features including limited current affairs, basic study materials, and 
                  simple mock tests. The Premium plan unlocks the full UPSCMONK experience with complete current affairs, all study 
                  materials, advanced analytics, mentor Q&A sessions, and personalized study planning.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-lg mb-2">Can I cancel or switch plans anytime?</h3>
                <p className="text-neutral-700">
                  Yes, you can upgrade, downgrade, or cancel your subscription at any time. If you cancel a premium subscription, 
                  you'll continue to have access to premium features until the end of your current billing period. We also offer a 
                  7-day money-back guarantee for new premium subscriptions.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-lg mb-2">How does the 7-day money-back guarantee work?</h3>
                <p className="text-neutral-700">
                  If you're not satisfied with your premium subscription within the first 7 days, you can request a full refund 
                  by contacting our support team. No questions asked! This gives you time to explore all the premium features 
                  risk-free.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-lg mb-2">How often is new content added?</h3>
                <p className="text-neutral-700">
                  For Premium subscribers, we add new study materials, mock tests, and current affairs daily. Free users receive 
                  weekly updates with limited access to new content. Our team of UPSC experts ensures all content is relevant, 
                  accurate, and aligned with the latest exam patterns.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-lg mb-2">Do you offer special discounts for groups?</h3>
                <p className="text-neutral-700">
                  Yes, we offer special pricing for study groups and coaching institutes. Please contact our sales team at 
                  sales@upscmonk.com for more information on group discounts and enterprise plans.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mt-20 bg-primary-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="px-6 py-12 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your UPSC preparation?</h2>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of successful aspirants who have achieved their goals with UPSCMONK. Start your journey today.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <button className="whitespace-nowrap bg-white text-primary hover:bg-neutral-100 px-8 py-3 rounded-lg font-medium transition-colors">
                    Get Started for Free
                  </button>
                </Link>
                <Link href="/signup?plan=premium">
                  <button className="whitespace-nowrap bg-primary-700 hover:bg-primary-600 text-white border border-primary-600 px-8 py-3 rounded-lg font-medium transition-colors flex items-center">
                    Try Premium
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                </Link>
              </div>
              
              <p className="mt-6 text-sm opacity-80">
                No credit card required for free signup. Premium comes with a 7-day money-back guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;