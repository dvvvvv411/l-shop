
import React from 'react';
import Header from '@/components/v6/Header';
import Footer from '@/components/v6/Footer';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Impressum = () => {
  useDomainFavicon();
  useDomainPageMeta('impressum');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Legal Information</h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Company Information</h2>
              <div className="space-y-2 text-gray-700">
                <p><strong>Company Name:</strong> Malta Energy Solutions Ltd</p>
                <p><strong>Address:</strong> Triq il-Mediterran, 45, Valletta VLT 1234, Malta</p>
                <p><strong>Email:</strong> info@maltaheat.com</p>
                <p><strong>Phone:</strong> +356 2123 4567</p>
                <p><strong>VAT Number:</strong> MT12345678</p>
                <p><strong>Company Registration:</strong> C12345</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Legal Representative</h2>
              <p className="text-gray-700">
                Managing Director: John Mifsud
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Content Responsibility</h2>
              <p className="text-gray-700 leading-relaxed">
                Malta Energy Solutions Ltd is responsible for the content of this website according to Maltese law. 
                We strive to keep information updated and accurate, however we cannot guarantee 
                the completeness and accuracy of all content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed">
                For any disputes relating to this website or our services, 
                the courts of Malta have jurisdiction. Maltese law applies.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Impressum;
