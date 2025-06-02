
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/v2/Header';
import Footer from '../../components/Footer';
import DeliveryMap from '../../components/DeliveryMap';
import { MapPin, Clock, Truck, Crown, Shield, Award, CheckCircle } from 'lucide-react';

const Liefergebiet = () => {
  const navigate = useNavigate();
  const [postcode, setPostcode] = useState('');

  const handlePostcodeCheck = () => {
    if (postcode.trim()) {
      navigate('/2/home');
    }
  };

  const serviceAdvantages = [
    {
      icon: Clock,
      title: "Express-Lieferung",
      description: "VIP-Kunden erhalten bevorzugte Express-Lieferung innerhalb von 24-48 Stunden",
      highlight: "24-48h Express"
    },
    {
      icon: Crown,
      title: "Premium-Preise",
      description: "Exklusive VIP-Konditionen mit garantiert besten Preisen für unsere Premium-Kunden",
      highlight: "VIP-Konditionen"
    },
    {
      icon: Shield,
      title: "Höchste Exzellenz",
      description: "Zertifiziertes Premium-Heizöl nach internationalen Exzellenz-Standards",
      highlight: "Premium-Zertifiziert"
    },
    {
      icon: Truck,
      title: "Luxus-Flotte",
      description: "Modernste Premium-Tankfahrzeuge mit speziell geschulten VIP-Fahrern",
      highlight: "Luxus-Service"
    },
    {
      icon: Award,
      title: "Umwelt-Excellence",
      description: "Ultra-schwefelarmes Premium-Heizöl für umweltbewusste VIP-Kunden",
      highlight: "Umwelt-Premium"
    },
    {
      icon: CheckCircle,
      title: "VIP-Betreuung",
      description: "Persönlicher Kundenberater und 24/7 Premium-Support für VIP-Kunden",
      highlight: "24/7 VIP-Support"
    }
  ];

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
              <MapPin size={18} className="mr-2" />
              Exklusive VIP-Liefergebiete deutschlandweit
              <Truck size={16} className="ml-2" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Premium <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Lieferservice</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Exklusiver VIP-Heizöl-Service in ganz Deutschland - 
              mit persönlicher Betreuung, Express-Lieferung und Premium-Konditionen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              VIP-Liefergebiete in Deutschland
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Unser Premium-Service erreicht Sie deutschlandweit - entdecken Sie unsere exklusiven VIP-Gebiete
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
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              VIP-Service Vorteile
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Warum anspruchsvolle Kunden deutschlandweit auf unseren exklusiven Premium-Service vertrauen
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
                className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full mb-6">
                    <advantage.icon className="text-yellow-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{advantage.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{advantage.description}</p>
                  <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold">
                    {advantage.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Prüfen Sie Ihr VIP-Liefergebiet
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Geben Sie Ihre Postleitzahl ein und erfahren Sie sofort, 
              ob Sie von unserem exklusiven VIP-Service profitieren können.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Ihre Postleitzahl eingeben..."
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="flex-1 px-6 py-3 rounded-xl text-slate-900 font-medium border-2 border-transparent focus:border-slate-900 focus:outline-none"
              />
              <button 
                onClick={handlePostcodeCheck}
                className="bg-slate-900 text-yellow-400 px-8 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-lg"
              >
                VIP-Check
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
