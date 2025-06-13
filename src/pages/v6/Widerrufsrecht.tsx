
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/v6/Footer';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Widerrufsrecht = () => {
  useDomainFavicon();
  useDomainPageMeta('widerrufsrecht');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Right of Withdrawal</h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Withdrawal Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                As a consumer, you have the right to withdraw from contracts for the supply of heating oil 
                under certain conditions as defined by EU and Maltese consumer protection law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Withdrawal Period</h2>
              <p className="text-gray-700 leading-relaxed">
                You have 14 days from the date of contract conclusion to withdraw from your order, 
                provided the heating oil has not yet been delivered.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Exceptions</h2>
              <div className="space-y-4 text-gray-700">
                <p>The right of withdrawal does not apply to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Contracts for heating oil that has already been delivered</li>
                  <li>Emergency delivery services</li>
                  <li>Customized orders with specific delivery requirements</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">How to Exercise Your Right</h2>
              <p className="text-gray-700 leading-relaxed">
                To exercise your right of withdrawal, contact us at info@maltaheat.com or +356 2123 4567 
                before the heating oil is delivered. You must clearly state your decision to withdraw from the contract.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Widerrufsrecht;
