
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/v6/Footer';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Produkte = () => {
  useDomainFavicon();
  useDomainPageMeta('produkte');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Products</h1>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Premium Heating Oil Products for Malta</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                We offer a comprehensive range of heating oil products to meet every heating need in Malta, 
                from residential homes to commercial properties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Standard Heating Oil</h3>
                <p className="text-gray-600 mb-4">
                  High-quality heating oil perfect for residential use. Clean burning and efficient.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• EU quality standards</li>
                  <li>• Competitive pricing</li>
                  <li>• Reliable supply</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Heating Oil</h3>
                <p className="text-gray-600 mb-4">
                  Enhanced heating oil with improved performance and efficiency.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Enhanced performance</li>
                  <li>• Improved efficiency</li>
                  <li>• Extended equipment life</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Commercial Grade</h3>
                <p className="text-gray-600 mb-4">
                  Heavy-duty heating oil for commercial and industrial applications.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Bulk quantities available</li>
                  <li>• Commercial pricing</li>
                  <li>• Scheduled deliveries</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Eco-Friendly Option</h3>
                <p className="text-gray-600 mb-4">
                  Environmentally conscious heating oil with reduced environmental impact.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Lower emissions</li>
                  <li>• Biodegradable additives</li>
                  <li>• Sustainable sourcing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Produkte;
