
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/v6/Footer';
import HeroSection from '@/components/v6/HeroSection';
import StatsSection from '@/components/v6/StatsSection';
import PriceCalculator from '@/components/v6/PriceCalculator';
import WhyChooseUs from '@/components/v6/WhyChooseUs';
import ProductInfo from '@/components/v6/ProductInfo';
import TrustElements from '@/components/v6/TrustElements';
import CustomerReviews from '@/components/v6/CustomerReviews';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Home = () => {
  useDomainFavicon();
  useDomainPageMeta('home');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <StatsSection />
      <PriceCalculator />
      <WhyChooseUs />
      <ProductInfo />
      <TrustElements />
      <CustomerReviews />
      <Footer />
    </div>
  );
};

export default Home;
