
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Building, Mail, Phone, Globe } from 'lucide-react';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Building size={18} className="mr-2" />
              Rechtliche Informationen
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Impressum
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rechtliche Angaben und Kontaktinformationen gemäß § 5 TMG
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Building className="mr-3 text-red-600" />
                  Unternehmensangaben
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Firmenname</h3>
                    <p className="text-gray-600 mb-4">HeizölDirekt GmbH</p>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">Geschäftsführer</h3>
                    <p className="text-gray-600 mb-4">Max Mustermann</p>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">Registergericht</h3>
                    <p className="text-gray-600">Amtsgericht Musterstadt<br />HRB 12345</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Anschrift</h3>
                    <p className="text-gray-600 mb-4">
                      Musterstraße 123<br />
                      12345 Musterstadt<br />
                      Deutschland
                    </p>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">Umsatzsteuer-ID</h3>
                    <p className="text-gray-600">DE123456789</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Phone className="mr-3 text-red-600" />
                  Kontaktdaten
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex items-start space-x-3">
                    <Phone className="text-red-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                      <p className="text-gray-600">0800 123 456 7</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="text-red-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">E-Mail</h3>
                      <p className="text-gray-600">info@heizoeldirekt.de</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="text-red-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Website</h3>
                      <p className="text-gray-600">www.heizoeldirekt.de</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8 text-gray-700">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Rechtliche Hinweise</h2>
                  <p className="mb-4">
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Haftung für Inhalte</h3>
                  <p className="mb-4">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                    nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                    Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte 
                    fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine 
                    rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Haftung für Links</h3>
                  <p className="mb-4">
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen 
                    Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                    Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                    Seiten verantwortlich.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Urheberrecht</h3>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                    dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                    der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                    Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impressum;
