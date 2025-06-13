
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/v6/Footer';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Datenschutz = () => {
  useDomainFavicon();
  useDomainPageMeta('datenschutz');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                Malta Energy Solutions Ltd respects your privacy and is committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Information We Collect</h2>
              <div className="space-y-4 text-gray-700">
                <p>We collect information you provide when placing orders, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and contact details</li>
                  <li>Delivery address</li>
                  <li>Payment information</li>
                  <li>Order history</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">How We Use Your Data</h2>
              <div className="space-y-4 text-gray-700">
                <p>We use your personal data to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process and deliver your orders</li>
                  <li>Provide customer service</li>
                  <li>Send order confirmations and updates</li>
                  <li>Improve our services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                Under GDPR and Maltese data protection law, you have the right to access, correct, 
                or delete your personal data. Contact us at info@maltaheat.com for any data protection requests.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Datenschutz;
