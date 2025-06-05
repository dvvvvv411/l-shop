
import React from 'react';
import Header from '@/components/v3/Header';
import Footer from '@/components/Footer';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';
import { Mountain } from 'lucide-react';

const Impressum = () => {
  useDomainPageMeta('impressum');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-violet-100">
          <div className="flex items-center mb-8">
            <Mountain className="h-8 w-8 text-violet-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Impressum</h1>
          </div>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Medieninhaber und Herausgeber</h2>
              <div className="bg-violet-50 p-4 rounded-lg">
                <p className="font-semibold">Heizöl Österreich GmbH</p>
                <p>Mariahilfer Straße 123</p>
                <p>1060 Wien</p>
                <p>Österreich</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Kontakt</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p><span className="font-medium">Telefon:</span> +43 1 234 5678</p>
                  <p><span className="font-medium">E-Mail:</span> info@heizoel-austria.com</p>
                </div>
                <div>
                  <p><span className="font-medium">Fax:</span> +43 1 234 5679</p>
                  <p><span className="font-medium">Web:</span> www.heizoel-austria.com</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Unternehmensgegenstand</h2>
              <p>Handel mit Mineralölerzeugnissen, insbesondere Heizöl, sowie damit verbundene Dienstleistungen.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Firmenbucheintragung</h2>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p><span className="font-medium">Firmenbuchgericht:</span> Handelsgericht Wien</p>
                <p><span className="font-medium">Firmenbuchnummer:</span> FN 123456a</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Umsatzsteuer-Identifikationsnummer</h2>
              <p>ATU12345678</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Geschäftsführung</h2>
              <p>Mag. Maria Österreicher</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Aufsichtsbehörde</h2>
              <p>Magistrat der Stadt Wien, MA 63 - Gewerberechtliche Angelegenheiten</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Berufsbezeichnung und berufsrechtliche Vorschriften</h2>
              <p>Konzessionierter Mineralölhändler gemäß Gewerbeordnung (GewO)</p>
              <p>Berufsrechtliche Vorschriften: Gewerbeordnung (GewO), abrufbar unter www.ris.bka.gv.at</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Verbraucherstreitbeilegung</h2>
              <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                 <a href="https://ec.europa.eu/consumers/odr/" className="text-violet-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                   https://ec.europa.eu/consumers/odr/
                 </a>
              </p>
              <p className="mt-2">Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Haftungshinweis</h2>
              <p className="text-sm leading-relaxed">
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. 
                Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
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
