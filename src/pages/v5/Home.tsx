
import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
import PriceCalculator from '@/components/v5/PriceCalculator';
import StatsSection from '@/components/v5/StatsSection';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';

const Home = () => {
  useDomainFavicon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Gasolio da riscaldamento <br />
              <span className="bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                consegnato a casa
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Prezzi trasparenti, consegna rapida e servizio clienti professionale. 
              Il tuo gasolio da riscaldamento in tutta Italia.
            </p>
          </div>
          
          <div id="calculator">
            <PriceCalculator />
          </div>
        </div>
      </section>

      <StatsSection />
      
      <Footer />
    </div>
  );
};

export default Home;
