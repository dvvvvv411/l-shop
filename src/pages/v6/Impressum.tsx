
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const Impressum = () => {
  usePageMeta('impressum');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Legal Information</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Company Details</h2>
              <div>
                <p className="font-semibold">Malta Energy Solutions Ltd</p>
                <p>Triq il-Kbira</p>
                <p>VLT 1234 Valletta</p>
                <p>Malta</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Information</h2>
              <p>Telephone: +356 2123 4567</p>
              <p>Email: info@malta-heating-oil.com</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Commercial Registration</h2>
              <p>Registration Court: Malta Commercial Court</p>
              <p>Registration Number: C12345</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">VAT ID</h2>
              <p>VAT Identification Number:</p>
              <p>MT12345678</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Managing Director</h2>
              <p>John Mifsud</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Responsible for Content</h2>
              <p>John Mifsud</p>
              <p>Triq il-Kbira</p>
              <p>VLT 1234 Valletta</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;
