
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Calendar, Phone, CheckCircle, ArrowRight } from 'lucide-react';

const ExpressServiceInfo = () => {
  const expressFeatures = [
    {
      icon: Zap,
      title: "Same-Day Service",
      description: "In Ballungsräumen möglich",
      availability: "Mo-Fr bis 14:00 Uhr",
      surcharge: "+29€"
    },
    {
      icon: Clock,
      title: "Express 24h",
      description: "Lieferung am nächsten Werktag",
      availability: "Mo-Fr bis 16:00 Uhr",
      surcharge: "+19€"
    },
    {
      icon: Calendar,
      title: "Wunschtermin",
      description: "Flexibler Terminservice",
      availability: "Auch Samstags",
      surcharge: "+9€"
    }
  ];

  const expressZones = [
    { city: "Hamburg", time: "Same-Day bis 14:00", coverage: "100%" },
    { city: "Berlin", time: "Same-Day bis 14:00", coverage: "95%" },
    { city: "München", time: "24h Express", coverage: "90%" },
    { city: "Köln", time: "Same-Day bis 14:00", coverage: "100%" },
    { city: "Frankfurt", time: "Same-Day bis 14:00", coverage: "98%" },
    { city: "Stuttgart", time: "24h Express", coverage: "92%" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <Zap size={16} className="mr-2" />
            Express-Service verfügbar
          </div>
          
          <h2 className="text-4xl font-light text-slate-800 mb-4">
            Ultraschnelle <span className="font-semibold text-blue-600">Express-Lieferung</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Wenn es schnell gehen muss - unser Express-Service bringt Ihr Heizöl 
            in Rekordzeit zu Ihnen nach Hause
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Express Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {expressFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="text-blue-600" size={32} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 mb-4">{feature.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Verfügbarkeit:</span>
                      <span className="font-medium text-slate-700">{feature.availability}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Aufpreis:</span>
                      <span className="font-bold text-blue-600">{feature.surcharge}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-emerald-700 transition-all">
                    Jetzt buchen
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Express Coverage Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
              Express-Service Verfügbarkeit
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {expressZones.map((zone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-semibold text-slate-800">{zone.city}</div>
                    <div className="text-sm text-slate-600">{zone.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-emerald-600">{zone.coverage}</div>
                    <div className="text-xs text-slate-500">Abdeckung</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-slate-800 mb-2">
                Brauchen Sie Express-Service?
              </h4>
              <p className="text-slate-600 mb-4">
                Rufen Sie uns an und wir prüfen die Verfügbarkeit für Ihre Postleitzahl
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href="tel:091196643306"
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-emerald-700 transition-all"
                >
                  <Phone size={16} />
                  <span>0911 96643306</span>
                </a>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span>Kostenlose Beratung</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExpressServiceInfo;
