
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/v6/Footer';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const AGB = () => {
  useDomainFavicon();
  useDomainPageMeta('agb');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">General Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms and conditions govern the supply of heating oil by Malta Energy Solutions Ltd 
                to customers in Malta and Gozo. By placing an order, you agree to these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Ordering and Payment</h2>
              <div className="space-y-4 text-gray-700">
                <p>Orders can be placed online, by phone, or email.</p>
                <p>Payment is required before delivery unless credit terms have been agreed.</p>
                <p>We accept bank transfers, credit cards, and cash on delivery (where available).</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Delivery</h2>
              <div className="space-y-4 text-gray-700">
                <p>We deliver across Malta and Gozo, typically within 24-48 hours of order confirmation.</p>
                <p>Delivery charges apply and are calculated based on location and quantity.</p>
                <p>Customer must provide safe access to the storage tank.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Quality and Returns</h2>
              <div className="space-y-4 text-gray-700">
                <p>All heating oil meets EU and Maltese quality standards.</p>
                <p>Any quality issues must be reported within 7 days of delivery.</p>
                <p>We guarantee the quality of our products and will replace or refund defective products.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;
