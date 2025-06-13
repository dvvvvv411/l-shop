
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const Liefergebiet = () => {
  usePageMeta('liefergebiet');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Delivery Areas
          </h1>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Malta-wide Delivery</h2>
            
            <p className="text-gray-600 mb-6">
              We deliver premium heating oil throughout Malta, including all major towns and villages. 
              Our delivery network covers the entire Maltese archipelago.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Main Areas</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Valletta and surrounding areas</li>
                  <li>• Sliema and St. Julian's</li>
                  <li>• Birkirkara and Hamrun</li>
                  <li>• Mosta and Naxxar</li>
                  <li>• Qormi and Zejtun</li>
                  <li>• Marsaskala and Marsaxlokk</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Coverage</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• All localities in Malta</li>
                  <li>• Gozo and Comino (subject to ferry schedule)</li>
                  <li>• Industrial areas</li>
                  <li>• Residential districts</li>
                  <li>• Commercial zones</li>
                  <li>• Rural areas</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-50 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Delivery Information</h3>
              <p className="text-amber-700">
                Standard delivery time is 4-7 working days. For urgent deliveries or 
                special requirements, please contact our customer service team.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Liefergebiet;
