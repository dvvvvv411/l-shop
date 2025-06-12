
import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const AGB = () => {
  useDomainFavicon();
  useDomainPageMeta('agb');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Termini e Condizioni Generali</h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">1. Ambito di applicazione</h2>
              <p className="text-gray-700 leading-relaxed">
                I presenti Termini e Condizioni Generali si applicano a tutti i contratti di fornitura 
                di gasolio da riscaldamento tra Gasolio Veloce S.r.l. e i clienti. Le condizioni del 
                cliente sono valide solo se espressamente accettate per iscritto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">2. Conclusione del contratto</h2>
              <p className="text-gray-700 leading-relaxed">
                Il contratto si conclude con la conferma scritta dell'ordine da parte di Gasolio Veloce S.r.l. 
                I prezzi indicati sono vincolanti al momento dell'ordine e includono l'IVA dove applicabile.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">3. Prezzi e pagamento</h2>
              <p className="text-gray-700 leading-relaxed">
                I prezzi sono indicati in Euro e includono l'IVA. Il pagamento è dovuto al momento della 
                consegna tramite bonifico bancario, carta di credito o contanti. In caso di ritardo nei 
                pagamenti, ci riserviamo il diritto di addebitare interessi di mora.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">4. Consegna</h2>
              <p className="text-gray-700 leading-relaxed">
                La consegna avviene nei tempi concordati, generalmente entro 3-5 giorni lavorativi. 
                Le date di consegna sono approssimative. Il cliente deve garantire l'accesso al serbatoio 
                e la presenza di una persona autorizzata al ricevimento.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">5. Qualità del prodotto</h2>
              <p className="text-gray-700 leading-relaxed">
                Il gasolio fornito è conforme agli standard EN 590. Garantiamo la qualità del prodotto 
                al momento della consegna. Eventuali reclami sulla qualità devono essere segnalati 
                immediatamente alla consegna.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">6. Diritto di recesso</h2>
              <p className="text-gray-700 leading-relaxed">
                Per i clienti privati si applica il diritto di recesso di 14 giorni secondo il Codice del Consumo italiano. 
                Il recesso deve essere comunicato per iscritto prima della consegna.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">7. Responsabilità</h2>
              <p className="text-gray-700 leading-relaxed">
                La nostra responsabilità è limitata ai danni prevedibili tipici del contratto. 
                Non rispondiamo per danni consequenziali o perdite di profitto, salvo nei casi 
                di dolo o colpa grave.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-green-600 mb-4">8. Legge applicabile</h2>
              <p className="text-gray-700 leading-relaxed">
                Si applica il diritto italiano. Per le controversie è competente il Tribunale di Milano.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;
