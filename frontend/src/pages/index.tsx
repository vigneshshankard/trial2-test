import React from 'react';
import HeroSection from '../components/HeroSection';
import KeyFeaturesCarousel from '../components/KeyFeaturesCarousel';
import FreeMockTestCTA from '../components/FreeMockTestCTA';
import LatestCurrentAffairs from '../components/LatestCurrentAffairs';
import UpcomingExamAlerts from '../components/UpcomingExamAlerts';
import NewsletterSubscription from '../components/NewsletterSubscription';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <KeyFeaturesCarousel />
      <FreeMockTestCTA />
      <LatestCurrentAffairs />
      <UpcomingExamAlerts />
      <NewsletterSubscription />
      <Footer />
    </>
  );
};

export default HomePage;