
import React from 'react';
import Header from '@/components/v1/Header';
import Footer from '@/components/Footer';

const Impressum = () => {
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
                <p className="font-semibold">HeizölDirekt GmbH</p>
                <p>Musterstraße 123</p>
                <p>12345 Musterstadt</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Kontakt</h2>
              <p>Telefon: 0800 123 456 7</p>
              <p>E-Mail: info@heizoeldirekt.de</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Handelsregister</h2>
              <p>Registergericht: Amtsgericht Musterstadt</p>
              <p>Registernummer: HRB 12345</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Umsatzsteuer-ID</h2>
              <p>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:</p>
              <p>DE123456789</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Geschäftsführer</h2>
              <p>Max Mustermann</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p>Max Mustermann</p>
              <p>Musterstraße 123</p>
              <p>12345 Musterstadt</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;
