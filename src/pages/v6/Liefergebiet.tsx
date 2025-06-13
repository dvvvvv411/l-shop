
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/v6/Footer';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Liefergebiet = () => {
  useDomainFavicon();
  useDomainPageMeta('liefergebiet');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Delivery Areas</h1>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Island-wide Heating Oil Delivery</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Malta Energy Solutions Ltd delivers premium heating oil across the entire Maltese archipelago. 
                No matter where you are located, we can reach you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Malta</h3>
                <p className="text-gray-600 mb-4">
                  We deliver to all localities across Malta, including:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Valletta and surroundings</li>
                  <li>• Sliema and St. Julian's</li>
                  <li>• Birkirkara and surrounding areas</li>
                  <li>• All other Malta localities</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Gozo</h3>
                <p className="text-gray-600 mb-4">
                  Complete coverage of Gozo island including:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Victoria (Rabat)</li>
                  <li>• Xewkija and Zebbug</li>
                  <li>• All Gozo villages</li>
                  <li>• Regular scheduled deliveries</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Delivery Schedule</h3>
                <p className="text-gray-600 mb-4">
                  Flexible delivery options to suit your needs:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Next-day delivery</li>
                  <li>• Scheduled deliveries</li>
                  <li>• Emergency service available</li>
                  <li>• Weekend deliveries (surcharge applies)</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Delivery Information</h3>
                <p className="text-gray-600 mb-4">
                  Important delivery details:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Safe access to tank required</li>
                  <li>• Delivery charges may apply</li>
                  <li>• Minimum order quantities</li>
                  <li>• SMS delivery notifications</li>
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

export default Liefergebiet;
