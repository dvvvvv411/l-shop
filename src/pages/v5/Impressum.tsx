
import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Note legali</h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Informazioni aziendali</h2>
              <div className="space-y-2 text-gray-700">
                <p><strong>Ragione sociale:</strong> Gasolio Veloce S.r.l.</p>
                <p><strong>Indirizzo:</strong> Via Roma 123, 20121 Milano, Italia</p>
                <p><strong>Telefono:</strong> +39 02 1234 5678</p>
                <p><strong>Email:</strong> info@gasolio-veloce.it</p>
                <p><strong>Partita IVA:</strong> IT12345678901</p>
                <p><strong>Codice fiscale:</strong> 12345678901</p>
                <p><strong>REA:</strong> MI-1234567</p>
                <p><strong>Capitale sociale:</strong> €50.000,00 i.v.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Rappresentante legale</h2>
              <p className="text-gray-700">
                Amministratore Delegato: Mario Bianchi
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Responsabilità del contenuto</h2>
              <p className="text-gray-700 leading-relaxed">
                Gasolio Veloce S.r.l. è responsabile del contenuto di questo sito web secondo le leggi italiane. 
                Ci impegniamo a mantenere le informazioni aggiornate e accurate, tuttavia non possiamo garantire 
                la completezza e l'accuratezza di tutti i contenuti.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Risoluzione delle controversie</h2>
              <p className="text-gray-700 leading-relaxed">
                Per qualsiasi controversia relativa a questo sito web o ai nostri servizi, 
                è competente il Tribunale di Milano. Si applica il diritto italiano.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Contatti per reclami</h2>
              <p className="text-gray-700 leading-relaxed">
                Per reclami o segnalazioni, contattate il nostro servizio clienti:
                <br />Email: reclami@gasolio-veloce.it
                <br />Telefono: +39 02 1234 5678
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
