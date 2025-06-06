
import React from 'react';
import Header from '@/components/v1/Header';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const Impressum = () => {
  usePageMeta('impressum');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Angaben gemäß § 5 TMG</h2>
              <div>
                <p className="font-semibold">STANTON GmbH</p>
                <p>Schellingstr. 109 a</p>
                <p>80798 München</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Kontakt</h2>
              <p>Telefon: 089 41435467</p>
              <p>E-Mail: info@stanton-energie.de</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Handelsregister</h2>
              <p>Registergericht: Amtsgericht Traunstein</p>
              <p>Registernummer: HRB 27690</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Umsatzsteuer-ID</h2>
              <p>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:</p>
              <p>DE341971594</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Geschäftsführer</h2>
              <p>Antonio Vacca</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p>Antonio Vacca</p>
              <p>Schellingstr. 109 a</p>
              <p>80798 München</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;
