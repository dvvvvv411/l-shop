import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck, Clock, Phone, CheckCircle, Zap } from 'lucide-react';

const ServiceAreas = () => {
  const regions = [
    {
      name: "Norddeutschland",
      states: ["Hamburg", "Bremen", "Niedersachsen", "Schleswig-Holstein"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Westdeutschland", 
      states: ["NRW", "Rheinland-Pfalz", "Saarland", "Hessen"],
      color: "from-emerald-500 to-teal-500"
    },
    {
      name: "Süddeutschland",
      states: ["Bayern", "Baden-Württemberg"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      name: "Ostdeutschland",
      states: ["Berlin", "Brandenburg", "Sachsen", "Thüringen"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const services = [
    {
      icon: Truck,
      title: "Express-Lieferung",
      description: "2-5 Werktage deutschlandweit",
      highlight: "Notfall-Service verfügbar"
    },
    {
      icon: Clock,
      title: "Flexible Termine",
      description: "Wunschtermin nach Absprache",
      highlight: "Auch Wochenende möglich"
    },
    {
      icon: Phone,
      title: "Persönliche Beratung",
      description: "Mo-Fr 7:00-20:00 Uhr",
      highlight: "Direkter Draht zu Experten"
    },
    {
      icon: CheckCircle,
      title: "Qualitätsgarantie",
      description: "TÜV-geprüfte Heizölqualität",
      highlight: "DIN 51603-1 zertifiziert"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MapPin size={16} className="mr-2" />
            Deutschlandweiter Service
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Unsere <span className="text-blue-600">Servicegebiete</span> & Leistungen
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Von Nord bis Süd - wir beliefern ganz Deutschland mit Premium-Heizöl 
            und erstklassigem Service direkt zu Ihnen nach Hause.
          </p>
        </motion.div>

        {/* Service Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Unsere Liefergebiete</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regions.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 hover:shadow-lg transition-all"
                >
                  <div className={`h-2 w-full bg-gradient-to-r ${region.color} rounded-full mb-3`}></div>
                  <h4 className="font-bold text-slate-800 mb-2">{region.name}</h4>
                  <div className="space-y-1">
                    {region.states.map((state, stateIndex) => (
                      <div key={stateIndex} className="text-sm text-slate-600 flex items-center">
                        <CheckCircle size={12} className="text-emerald-500 mr-2" />
                        {state}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Unsere Services</h3>
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <service.icon className="text-blue-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 mb-1">{service.title}</h4>
                      <p className="text-slate-600 text-sm mb-1">{service.description}</p>
                      <div className="flex items-center text-xs text-emerald-600 font-medium">
                        <Zap size={12} className="mr-1" />
                        {service.highlight}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Ihr Gebiet nicht dabei?
          </h3>
          <p className="text-slate-600 mb-6">
            Kontaktieren Sie uns - wir erweitern kontinuierlich unsere Liefergebiete!
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl">
            Verfügbarkeit anfragen
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceAreas;
