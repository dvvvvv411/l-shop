
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v1/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

const Kontakt = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      value: "0800 123 456 7",
      description: "Kostenlose Hotline Mo-Fr 8-18 Uhr"
    },
    {
      icon: Mail,
      title: "E-Mail",
      value: "info@heizoeldirekt.de",
      description: "Wir antworten innerhalb von 24h"
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "Musterstraße 123, 12345 Musterstadt",
      description: "Hauptsitz und Verwaltung"
    },
    {
      icon: Clock,
      title: "Öffnungszeiten",
      value: "Mo-Fr: 8:00-18:00 Uhr",
      description: "Sa: 9:00-14:00 Uhr"
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
              <MessageSquare size={18} className="mr-2" />
              Kontakt & Support
              <Phone size={16} className="ml-2" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Wir sind für <span className="text-red-600">Sie da</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Haben Sie Fragen zu unseren Heizöl-Produkten oder benötigen Sie Beratung? 
              Unser erfahrenes Team steht Ihnen gerne zur Verfügung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors"
              >
                <div className="inline-flex p-4 rounded-full bg-red-100 text-red-600 mb-4">
                  <info.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-lg font-semibold text-red-600 mb-1">{info.value}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
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
