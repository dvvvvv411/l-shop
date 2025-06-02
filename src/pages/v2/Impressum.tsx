
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-8">
              Impressum
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Angaben gemäß § 5 TMG</h2>
                <div className="text-blue-800 space-y-1">
                  <p className="font-semibold">Green Oil Trade and Service GmbH</p>
                  <p>Beethovenstraße 15</p>
                  <p>60325 Frankfurt am Main</p>
                  <p>Deutschland</p>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold text-emerald-900 mb-4">Kontakt</h2>
                <div className="text-emerald-800 space-y-1">
                  <p>Telefon: 0800 987 654 3</p>
                  <p>E-Mail: kontakt@oilexpress.de</p>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Handelsregister</h2>
                <div className="text-slate-700 space-y-1">
                  <p>Registergericht: Amtsgericht Frankfurt am Main</p>
                  <p>Registernummer: HRB 112358</p>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold text-purple-900 mb-4">Umsatzsteuer-ID</h2>
                <div className="text-purple-800 space-y-1">
                  <p>Umsatzsteuer-Identifikationsnummer:</p>
                  <p className="font-mono">DE987654321</p>
                </div>
              </motion.section>
            </div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Geschäftsführung</h2>
              <p className="text-gray-700">Michael Grünberg</p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <div className="text-gray-700 space-y-1">
                <p>Michael Grünberg</p>
                <p>Beethovenstraße 15</p>
                <p>60325 Frankfurt am Main</p>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;
