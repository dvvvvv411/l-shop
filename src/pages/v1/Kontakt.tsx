
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v1/Header';
import Footer from '../../components/Footer';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

const Kontakt = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Kontaktformular
              </h2>
              <p className="text-gray-600 mb-8">
                Senden Sie uns eine Nachricht und wir melden uns schnellstmöglich bei Ihnen zurück.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">E-Mail *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Betreff *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="preisanfrage">Preisanfrage</option>
                      <option value="bestellung">Bestellung</option>
                      <option value="reklamation">Reklamation</option>
                      <option value="beratung">Beratung</option>
                      <option value="sonstiges">Sonstiges</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nachricht *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    placeholder="Teilen Sie uns Ihr Anliegen mit..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Nachricht senden</span>
                </button>
              </form>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                So finden Sie uns
              </h2>
              <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center mb-6">
                <div className="text-center text-gray-600">
                  <MapPin size={48} className="mx-auto mb-4" />
                  <p className="text-lg font-medium">Interaktive Karte</p>
                  <p>Musterstraße 123, 12345 Musterstadt</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Anfahrt</h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Mit dem Auto:</strong> A1 Ausfahrt Musterstadt, dann B123 Richtung Zentrum</p>
                  <p><strong>Öffentliche Verkehrsmittel:</strong> S-Bahn S1 bis Musterstadt Hauptbahnhof, dann Bus 42</p>
                  <p><strong>Parkplätze:</strong> Kostenlose Parkplätze direkt vor dem Gebäude verfügbar</p>
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

export default Kontakt;
