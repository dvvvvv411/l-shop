
import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-8">
              <div className="flex space-x-1">
                <div className="w-3 h-2 bg-green-600 rounded-sm"></div>
                <div className="w-3 h-2 bg-white border border-gray-300 rounded-sm"></div>
                <div className="w-3 h-2 bg-red-600 rounded-sm"></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Note Legali</h1>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Editore del sito</h2>
                <div className="bg-green-50/80 p-6 rounded-xl">
                  <p><strong>Gasolio Express Italia Srl</strong></p>
                  <p>Via Roma 123</p>
                  <p>20121 Milano</p>
                  <p>Italia</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Informazioni legali</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p><strong>Partita IVA:</strong> IT12345678901</p>
                    <p><strong>Codice Fiscale:</strong> 12345678901</p>
                    <p><strong>REA Milano:</strong> MI-1234567</p>
                  </div>
                  <div>
                    <p><strong>Codice ATECO:</strong> 46.71.00</p>
                    <p><strong>Forma giuridica:</strong> Srl</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contatto</h2>
                <p>
                  <strong>Email:</strong> info@gasolio-express.it<br />
                  <strong>Sito web:</strong> gasolio-express.it<br />
                  <strong>Orari:</strong> Lunedì - Venerdì: 8:00 - 18:00
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Direttore della pubblicazione</h2>
                <p>Gasolio Express Italia Srl</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hosting</h2>
                <p>
                  Questo sito è ospitato da:<br />
                  <strong>Aruba S.p.A.</strong><br />
                  Via San Clemente 53<br />
                  24036 Ponte San Pietro (BG)<br />
                  Italia
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Proprietà intellettuale</h2>
                <p>
                  L'insieme di questo sito è soggetto alla legislazione italiana e 
                  internazionale sui diritti d'autore e sulla proprietà intellettuale. 
                  Tutti i diritti di riproduzione sono riservati, compresi quelli per 
                  i documenti scaricabili e le rappresentazioni iconografiche e fotografiche.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsabilità</h2>
                <p>
                  Le informazioni contenute in questo sito sono il più precise possibili 
                  e il sito viene aggiornato in diversi periodi dell'anno, ma può tuttavia 
                  contenere inesattezze o omissioni.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;
