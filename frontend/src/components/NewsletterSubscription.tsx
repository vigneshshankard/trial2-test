import React from 'react';

const NewsletterSubscription: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-8">
          Stay updated with the latest news, tips, and resources for your UPSC preparation.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSubscription;