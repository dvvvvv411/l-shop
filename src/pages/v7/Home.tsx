
import React from 'react';
import V7Header from '@/components/v7/Header';
import V7PriceCalculator from '@/components/v7/PriceCalculator';
import V7StatsSection from '@/components/v7/StatsSection';
import V7WhyChooseUs from '@/components/v7/WhyChooseUs';
import V7TrustElements from '@/components/v7/TrustElements';
import V7Footer from '@/components/v7/Footer';

const V7Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <V7Header />
      <main>
        <V7PriceCalculator />
        <V7StatsSection />
        <V7WhyChooseUs />
        <V7TrustElements />
      </main>
      <V7Footer />
    </div>
  );
};

export default V7Home;
