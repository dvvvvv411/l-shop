
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/v6/Footer';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Service = () => {
  useDomainFavicon();
  useDomainPageMeta('service');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Services</h1>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Premium Heating Oil Service in Malta</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Malta Energy Solutions Ltd provides comprehensive heating oil services across Malta and Gozo. 
                Our commitment is to deliver quality heating oil when you need it, where you need it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Delivery</h3>
                <p className="text-gray-600">
                  Next-day delivery across Malta and Gozo. Emergency deliveries available for urgent needs.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Guarantee</h3>
                <p className="text-gray-600">
                  All our heating oil meets EU standards and comes with a quality guarantee.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Competitive Pricing</h3>
                <p className="text-gray-600">
                  Best prices in Malta with transparent pricing and no hidden fees.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Local Support</h3>
                <p className="text-gray-600">
                  Malta-based customer service team providing support in English and Maltese.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Service;
