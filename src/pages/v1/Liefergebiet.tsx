import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/v1/Header';
import Footer from '../../components/Footer';
import DeliveryMap from '../../components/v1/DeliveryMap';
import { MapPin, Clock, Truck, Euro, Shield, Award, CheckCircle } from 'lucide-react';

const Liefergebiet = () => {
  const navigate = useNavigate();
  const [postcode, setPostcode] = useState('');

  const handlePostcodeCheck = () => {
    if (postcode.trim()) {
      navigate('/1/home');
    }
  };

  const serviceAdvantages = [
    {
      icon: Clock,
      title: "Schnelle Lieferung",
      description: "Zuverlässige Lieferung in nur 4-7 Werktagen deutschlandweit",
      highlight: "4-7 Werktage"
    },
    {
      icon: Euro,
      title: "Faire Preise",
      description: "Transparente Preisgestaltung ohne versteckte Kosten",
      highlight: "Keine Überraschungen"
    },
    {
      icon: Shield,
      title: "Höchste Qualität",
      description: "Geprüftes Heizöl nach DIN 51603-1 Standard",
      highlight: "Zertifiziert"
    },
    {
      icon: Truck,
      title: "Moderne Flotte",
      description: "TÜV-geprüfte Tankfahrzeuge mit geschulten Fahrern",
      highlight: "Sicher & Sauber"
    },
    {
      icon: Award,
      title: "Umweltfreundlich",
      description: "Schwefelarmes Heizöl für umweltbewusste Kunden",
      highlight: "Umweltschonend"
    },
    {
      icon: CheckCircle,
      title: "Kundenservice",
      description: "Persönliche Beratung und Support bei allen Fragen",
      highlight: "24/7 Erreichbar"
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
              <MapPin size={18} className="mr-2" />
              Deutschland-weite Lieferung in 4-7 Werktagen
              <Truck size={16} className="ml-2" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Unser <span className="text-red-600">Liefergebiet</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Zuverlässige Heizöl-Lieferung in ganz Deutschland - 
              schnell, sicher und zu fairen Konditionen in nur 4-7 Werktagen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map */}
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
              Liefergebiete in Deutschland
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wir liefern deutschlandweit in nur 4-7 Werktagen - klicken Sie auf die Karte für weitere Informationen
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <DeliveryMap />
          </motion.div>
        </div>
      </section>

      {/* Service Advantages */}
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
              Unsere Service-Vorteile
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Warum Kunden deutschlandweit auf unseren zuverlässigen Heizöl-Service vertrauen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {serviceAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                    <advantage.icon className="text-red-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{advantage.description}</p>
                  <div className="inline-block bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {advantage.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Prüfen Sie Ihr Liefergebiet
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Geben Sie Ihre Postleitzahl ein und erfahren Sie sofort, 
              dass wir auch zu Ihnen in 4-7 Werktagen liefern können.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Ihre Postleitzahl eingeben..."
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 font-medium"
              />
              <button 
                onClick={handlePostcodeCheck}
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Prüfen
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Liefergebiet;
