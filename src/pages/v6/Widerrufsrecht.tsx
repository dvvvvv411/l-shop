
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const Widerrufsrecht = () => {
  usePageMeta('widerrufsrecht');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Right of Withdrawal</h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Withdrawal Policy</h2>
              <p>You have the right to withdraw from this contract within 14 days without giving any reason.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Withdrawal Period</h2>
              <p>The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the goods.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Exercising the Right of Withdrawal</h2>
              <p>To exercise the right of withdrawal, you must inform us:</p>
              <div className="mt-2 p-4 bg-gray-50 rounded">
                <p className="font-semibold">Malta Energy Solutions Ltd</p>
                <p>Triq il-Kbira</p>
                <p>VLT 1234 Valletta, Malta</p>
                <p className="mt-2">Email: info@malta-heating-oil.com</p>
                <p>Telephone: +356 2123 4567</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Widerrufsrecht;
