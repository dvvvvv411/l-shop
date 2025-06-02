
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v2/Header';
import Footer from '../../components/Footer';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Crown } from 'lucide-react';

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
      title: "VIP-Hotline",
      value: "0800 123 456 7",
      description: "Exklusive Premium-Hotline Mo-Fr 8-20 Uhr"
    },
    {
      icon: Mail,
      title: "Premium-E-Mail",
      value: "vip@heizoeldirekt.de",
      description: "VIP-Antwort innerhalb von 2 Stunden"
    },
    {
      icon: MapPin,
      title: "Premium-Zentrale",
      value: "Luxusstraße 123, 12345 Premium-Stadt",
      description: "Exklusiver VIP-Hauptsitz"
    },
    {
      icon: Clock,
      title: "VIP-Öffnungszeiten",
      value: "Mo-Fr: 8:00-20:00 Uhr",
      description: "Sa: 9:00-16:00 Uhr, 24/7 Notfall"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('VIP Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 text-yellow-400 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <MessageSquare size={18} className="mr-2" />
              VIP-Kontakt & Premium-Support
              <Phone size={16} className="ml-2" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Ihr persönlicher <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">VIP-Service</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Haben Sie Fragen zu unseren Premium-Heizöl-Produkten oder benötigen Sie VIP-Beratung? 
              Ihr persönlicher Premium-Kundenberater steht Ihnen exklusiv zur Verfügung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all"
              >
                <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 mb-4">
                  <info.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                <p className="text-lg font-semibold text-yellow-400 mb-1">{info.value}</p>
                <p className="text-sm text-gray-300">{info.description}</p>
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
              <h2 className="text-3xl font-bold text-white mb-6">
                VIP-Kontaktformular
              </h2>
              <p className="text-gray-300 mb-8">
                Senden Sie uns eine Nachricht und Ihr persönlicher Premium-Berater meldet sich umgehend bei Ihnen.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">E-Mail *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">VIP-Betreff *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="vip-preisanfrage">VIP-Preisanfrage</option>
                      <option value="premium-bestellung">Premium-Bestellung</option>
                      <option value="vip-service">VIP-Service</option>
                      <option value="premium-beratung">Premium-Beratung</option>
                      <option value="exklusives-anliegen">Exklusives Anliegen</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">VIP-Nachricht *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                    placeholder="Teilen Sie uns Ihr exklusives Anliegen mit..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 px-8 py-4 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Send size={20} />
                  <span>VIP-Nachricht senden</span>
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
              <h2 className="text-3xl font-bold text-white mb-6">
                Premium-Zentrale finden
              </h2>
              <div className="bg-slate-700 border border-slate-600 rounded-2xl h-96 flex items-center justify-center mb-6">
                <div className="text-center text-gray-300">
                  <MapPin size={48} className="mx-auto mb-4 text-yellow-400" />
                  <p className="text-lg font-medium">Interaktive Premium-Karte</p>
                  <p>Luxusstraße 123, 12345 Premium-Stadt</p>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">VIP-Anfahrt</h3>
                <div className="space-y-3 text-gray-300">
                  <p><strong>Mit dem Auto:</strong> A1 Ausfahrt Premium-Stadt, dann B123 Richtung VIP-Zentrum</p>
                  <p><strong>Öffentliche Verkehrsmittel:</strong> S-Bahn S1 bis Premium-Stadt Hauptbahnhof, dann Luxus-Shuttle</p>
                  <p><strong>VIP-Parkplätze:</strong> Exklusive Premium-Parkplätze direkt vor der VIP-Zentrale</p>
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
