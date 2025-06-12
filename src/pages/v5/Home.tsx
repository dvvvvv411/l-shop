
import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
import HeroSection from '@/components/v5/HeroSection';
import PriceCalculator from '@/components/v5/PriceCalculator';
import TrustElements from '@/components/v5/TrustElements';
import WhyChooseUs from '@/components/v5/WhyChooseUs';
import CustomerReviews from '@/components/v5/CustomerReviews';
import StatsSection from '@/components/v5/StatsSection';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Home = () => {
  useDomainFavicon();
  useDomainPageMeta('home');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <PriceCalculator />
        <TrustElements />
        <WhyChooseUs />
        <StatsSection />
        <CustomerReviews />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
