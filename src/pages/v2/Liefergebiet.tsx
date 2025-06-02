
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/v2/Header';
import Footer from '../../components/Footer';
import DeliveryMap from '../../components/DeliveryMap';
import { MapPin, Clock, Truck, Euro, Shield, Users, CheckCircle } from 'lucide-react';

const Liefergebiet = () => {
  const navigate = useNavigate();
  const [postcode, setPostcode] = useState('');

  const handlePostcodeCheck = () => {
    if (postcode.trim()) {
      navigate('/2/home');
    }
  };

  const serviceHighlights = [
    {
      icon: Clock,
      title: "Express-Service",
      description: "Professionelle Lieferung in nur 2-5 Werktagen",
      highlight: "Express-Timing"
    },
    {
      icon: Euro,
      title: "Transparente Kosten",
      description: "Klare Preisgestaltung ohne versteckte Zusatzkosten",
      highlight: "Ehrliche Preise"
    },
    {
      icon: Shield,
      title: "Premium Qualität",
      description: "Hochwertige Heizöl-Produkte nach strengsten Standards",
      highlight: "Qualitätsgarantie"
    },
    {
      icon: Truck,
      title: "Moderne Logistik",
      description: "Hochmoderne Fahrzeugflotte mit erfahrenen Fahrern",
      highlight: "Zuverlässig"
    },
    {
      icon: Users,
      title: "Persönlicher Service",
      description: "Individuelle Beratung und persönliche Betreuung",
      highlight: "Kundenorientiert"
    },
    {
      icon: CheckCircle,
      title: "Termingenauigkeit",
      description: "Pünktliche Lieferung zum vereinbarten Zeitpunkt",
      highlight: "Verlässlich"
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
              <MapPin size={16} className="mr-2" />
              Deutschlandweiter Express-Service
              <Truck size={14} className="ml-2" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
              Unser <span className="font-semibold text-blue-600">Lieferservice</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Professionelle Heizöl-Lieferung in ganz Deutschland - 
              mit Express-Service in nur 2-5 Werktagen und persönlicher Betreuung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map */}
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
              Unser Liefernetzwerk
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Entdecken Sie unser deutschlandweites Liefernetzwerk - klicken Sie auf Ihre Region
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <DeliveryMap />
          </motion.div>
        </div>
      </section>

      {/* Service Highlights */}
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
              Service-Highlights
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Was unseren deutschlandweiten Lieferservice besonders macht
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {serviceHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg border border-gray-100 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-lg mb-4">
                    <highlight.icon className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-2">{highlight.title}</h3>
                  <p className="text-slate-600 mb-3 text-sm leading-relaxed">{highlight.description}</p>
                  <div className="inline-block bg-gradient-to-r from-blue-50 to-emerald-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {highlight.highlight}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-light mb-4">
              Verfügbarkeit prüfen
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Geben Sie Ihre Postleitzahl ein und erfahren Sie, 
              wie schnell wir zu Ihnen liefern können.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
              <input
                type="text"
                placeholder="PLZ eingeben..."
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="flex-1 px-4 py-3 rounded-md text-slate-800 font-medium border-0 focus:ring-2 focus:ring-white/50"
              />
              <button 
                onClick={handlePostcodeCheck}
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Verfügbarkeit prüfen
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
