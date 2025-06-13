
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const Datenschutz = () => {
  usePageMeta('datenschutz');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Data Protection at a Glance</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">General Information</h3>
              <p>The following information provides an overview of what happens to your personal data when you visit this website. Personal data is any data with which you could be personally identified.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. General Information and Mandatory Information</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Data Protection</h3>
              <p>The operators of this website take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.</p>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">Responsible Body</h3>
              <p>The responsible body for data processing on this website is:</p>
              <div className="mt-2 p-4 bg-gray-50 rounded">
                <p className="font-semibold">Malta Energy Solutions Ltd</p>
                <p>Triq il-Kbira</p>
                <p>VLT 1234 Valletta</p>
                <p>Malta</p>
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

export default Datenschutz;
