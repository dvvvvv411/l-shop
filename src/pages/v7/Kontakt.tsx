
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import Footer from '../../components/v7/Footer';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Kontakt = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefoon",
      details: ["+32 2 123 4567", "Gratis binnen België"],
      description: "Ma-Vr: 8:00-18:00 uur"
    },
    {
      icon: Mail,
      title: "E-mail",
      details: ["info@mazoutvandaag.com"],
      description: "Wij reageren binnen 24 uur"
    },
    {
      icon: MapPin,
      title: "Adres",
      details: ["Voorbeeldstraat 123", "1000 Brussel", "België"],
      description: "Bezoek op afspraak"
    },
    {
      icon: Clock,
      title: "Openingstijden",
      details: ["Ma-Vr: 8:00-18:00", "Za: 9:00-12:00"],
      description: "Zondag gesloten"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-red-100 text-red-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Phone size={18} className="mr-2" />
              Neem Contact Op
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Wij helpen u <span className="text-red-600">graag verder</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Heeft u vragen over onze mazout, levering of service? 
              Ons ervaren team staat klaar om u persoonlijk te helpen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Contactgegevens
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bereik ons via telefoon, e-mail of kom langs op ons kantoor
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="inline-flex p-4 rounded-full bg-red-100 text-red-600 mb-4">
                  <info.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <div key={idx} className="text-gray-700 font-semibold">
                      {detail}
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Snel aan de slag
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Begin direct met het berekenen van uw prijs of neem contact op voor persoonlijk advies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-center">
                <div className="inline-flex p-4 rounded-full bg-red-100 text-red-600 mb-6">
                  <Phone size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Bel ons direct
                </h3>
                <p className="text-gray-600 mb-6">
                  Spreek direct met een van onze experts voor persoonlijk advies en ondersteuning.
                </p>
                <a
                  href="tel:+3221234567"
                  className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors inline-block"
                >
                  +32 2 123 4567
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-center">
                <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                  <Mail size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Bereken uw prijs
                </h3>
                <p className="text-gray-600 mb-6">
                  Gebruik onze prijscalculator om direct de beste prijs voor uw mazout te berekenen.
                </p>
                <a
                  href="/7/home"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors inline-block"
                >
                  Prijs berekenen
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Reference */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Veelgestelde vragen
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Bekijk onze veelgestelde vragen voor snelle antwoorden op de meest gestelde vragen
            </p>
            <a
              href="/7/home#faq"
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors inline-block"
            >
              Bekijk FAQ
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Kontakt;
