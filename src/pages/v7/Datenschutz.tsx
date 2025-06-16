
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import Footer from '../../components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const Datenschutz = () => {
  usePageMeta('datenschutz');

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
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacybeleid</h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gegevensbescherming</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Wij nemen de bescherming van uw persoonlijke gegevens zeer serieus. 
                    Deze privacyverklaring informeert u over de verwerking van uw gegevens 
                    op onze website en bij onze dienstverlening.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Verzamelde gegevens</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Wij verzamelen alleen gegevens die noodzakelijk zijn voor de uitvoering 
                    van uw bestelling: naam, adres, telefoonnummer en e-mailadres.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gebruik van gegevens</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Uw gegevens worden uitsluitend gebruikt voor orderverwerking, 
                    levering en communicatie over uw bestelling.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Uw rechten</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    U heeft het recht op inzage, rectificatie, verwijdering en overdraagbaarheid 
                    van uw persoonlijke gegevens. Neem contact op via info@mazoutvandaag.com.
                  </p>
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

export default Datenschutz;
