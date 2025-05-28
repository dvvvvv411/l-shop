
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import TrustElements from '../components/TrustElements';
import StatsSection from '../components/StatsSection';
import ProductComparison from '../components/ProductComparison';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import DeliveryMap from '../components/DeliveryMap';
import TrustSection from '../components/TrustSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <TrustElements />
      <StatsSection />
      <ProductComparison />
      <WhyChooseUs />
      <HowItWorks />
      <FAQ />
      <DeliveryMap />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Index;
