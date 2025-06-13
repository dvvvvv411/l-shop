
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const AGB = () => {
  usePageMeta('agb');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">§ 1 Scope of Application</h2>
              <p>These Terms and Conditions apply to all contracts between Malta Energy Solutions Ltd and its customers for the delivery of heating oil.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">§ 2 Contract Formation</h2>
              <p>The contract is formed by acceptance of the order by Malta Energy Solutions Ltd. Acceptance occurs through written order confirmation or delivery of the goods.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">§ 3 Prices and Payment Terms</h2>
              <p>Prices valid at the time of order apply. All prices include applicable VAT. Payment is made by bank transfer after invoicing.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">§ 4 Delivery</h2>
              <p>Delivery is made to the kerbside. The customer must ensure that the delivery location is accessible and that delivery can be carried out properly.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">§ 5 Warranty</h2>
              <p>We provide statutory warranty for the delivered goods. Complaints must be reported in writing immediately upon discovery of the defect.</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AGB;
