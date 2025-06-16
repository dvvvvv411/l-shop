
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import Footer from '../../components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const Widerrufsrecht = () => {
  usePageMeta('widerrufsrecht');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Herroepingsrecht</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Herroepingsrecht</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    U heeft het recht om binnen veertien dagen zonder opgave van redenen 
                    dit contract te herroepen. De herroepingstermijn bedraagt veertien dagen 
                    vanaf de dag van contractsluiting.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Bijzondere bepalingen voor mazout</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    <strong>Belangrijk:</strong> Het herroepingsrecht vervalt bij mazoutleveringen 
                    zodra de levering is begonnen, omdat mazout op bestelling wordt geleverd 
                    en bederfelijk is.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Herroeping melden</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Om uw herroepingsrecht uit te oefenen, moet u ons duidelijk mededelen 
                    dat u het contract herroept. Dit kunt u doen via:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>E-mail: info@mazoutvandaag.com</li>
                    <li>Telefoon: +32 2 123 4567</li>
                    <li>Post: Mazout Vandaag BVBA, Voorbeeldstraat 123, 1000 Brussel</li>
                  </ul>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Widerrufsrecht;
