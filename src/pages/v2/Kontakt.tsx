import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Users } from 'lucide-react';
import Header from '../../components/v2/Header';
import Footer from '../../components/v2/Footer';

const Kontakt = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Telefon-Support",
      info: "0800 987 654 3",
      description: "Kostenlose Beratung täglich 7-20 Uhr",
      action: "Jetzt anrufen"
    },
    {
      icon: Mail,
      title: "E-Mail Support",
      info: "kontakt@oilexpress.de",
      description: "Antwort binnen 2 Stunden während der Geschäftszeiten",
      action: "E-Mail senden"
    }
  ];

  const officeInfo = [
    {
      icon: MapPin,
      title: "Hauptsitz",
      details: ["OilExpress GmbH", "Energiestraße 45", "20355 Hamburg"]
    },
    {
      icon: Clock,
      title: "Öffnungszeiten",
      details: ["Mo-Fr: 7:00 - 20:00 Uhr", "Sa: 8:00 - 16:00 Uhr", "So: Notdienst verfügbar"]
    },
    {
      icon: Users,
      title: "Support-Team",
      details: ["15 Fachberater", "Durchschnittlich 8 Jahre Erfahrung", "Zertifizierte Energieexperten"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-emerald-100 text-slate-700 px-5 py-2 rounded-full text-sm font-medium mb-8">
              <Users size={16} className="mr-2" />
              Persönlicher Expertenservice
              <MessageCircle size={14} className="ml-2" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
              Ihr direkter <span className="font-semibold text-blue-600">Support</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Unser erfahrenes Team steht Ihnen täglich 7-20 Uhr zur Verfügung. 
              Kompetente Beratung, schnelle Hilfe und persönliche Betreuung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-slate-800 mb-4">
              Kontaktmöglichkeiten
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Wählen Sie Ihren bevorzugten Kommunikationsweg für schnelle und kompetente Hilfe
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg border border-gray-100 p-6 hover:shadow-lg transition-all hover:-translate-y-1 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-lg mb-4">
                  <method.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">{method.title}</h3>
                <div className="text-blue-600 font-medium mb-2">{method.info}</div>
                <p className="text-slate-600 text-sm mb-4">{method.description}</p>
                <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-emerald-700 transition-all">
                  {method.action}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-slate-800 mb-4">
              Unternehmensinformationen
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Alles Wichtige über unser Unternehmen und unser Support-Team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {officeInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg border border-gray-100 p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-lg mb-4">
                  <info.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="text-slate-600 text-sm">
                      {detail}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Kontakt;
