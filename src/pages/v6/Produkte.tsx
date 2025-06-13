
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const Produkte = () => {
  usePageMeta('produkte');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Our Products
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Premium Heating Oil</h2>
              <p className="text-gray-600 mb-4">
                High-quality heating oil for efficient and clean heating. 
                Meets all European standards and regulations.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Low sulfur content</li>
                <li>• High energy efficiency</li>
                <li>• Clean burning</li>
                <li>• Suitable for all heating systems</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Additive Heating Oil</h2>
              <p className="text-gray-600 mb-4">
                Premium heating oil with special additives for enhanced 
                performance and system protection.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Extended storage life</li>
                <li>• Corrosion protection</li>
                <li>• Improved combustion</li>
                <li>• System cleaning properties</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Produkte;
