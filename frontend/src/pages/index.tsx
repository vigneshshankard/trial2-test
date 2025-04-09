import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import KeyFeaturesSection from '../components/home/KeyFeaturesSection';
import CurrentAffairsPreview from '../components/home/CurrentAffairsPreview';
import MockTestPreviewSection from '../components/home/MockTestPreviewSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import UpcomingExamsSection from '../components/home/UpcomingExamsSection';
import CtaSection from '../components/home/CtaSection';

const HomePage: React.FC = () => {
  // In a real app, we would determine the user role from auth context
  const userRole = 'visitor';
  
  return (
    <Layout userRole={userRole}>
      <Head>
        <title>UPSCMONK - Your Ultimate UPSC Preparation Hub</title>
        <meta name="description" content="UPSCMONK delivers personalized study plans, comprehensive study materials, and an engaged community to help you achieve your UPSC dreams." />
      </Head>
      
      <HeroSection />
      <KeyFeaturesSection />
      <CurrentAffairsPreview />
      <MockTestPreviewSection />
      <TestimonialsSection />
      <UpcomingExamsSection />
      <CtaSection />
    </Layout>
  );
};

export default HomePage;