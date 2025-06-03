
import React from 'react';
import Header from '@/components/v1/Header';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const Datenschutz = () => {
  usePageMeta('datenschutz');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Allgemeine Hinweise</h3>
              <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Datenschutz</h3>
              <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">Verantwortliche Stelle</h3>
              <p>Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
              <div className="mt-2 p-4 bg-gray-50 rounded">
                <p className="font-semibold">STANTON GmbH</p>
                <p>Schellingstr. 109 a</p>
                <p>80798 München</p>
                <p>Deutschland</p>
                <p className="mt-2">E-Mail: info@stanton-energie.de</p>
                <p>Telefon: 089 41435467</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Datenerfassung auf dieser Website</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
              <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Ihre Rechte</h2>
              <p>Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen.</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Datenschutz;
