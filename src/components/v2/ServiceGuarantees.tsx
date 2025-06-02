
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Award, Users, Truck, CheckCircle } from 'lucide-react';

const ServiceGuarantees = () => {
  const guarantees = [
    {
      icon: Clock,
      title: "Pünktlichkeitsgarantie",
      description: "99,7% Termintreue oder Lieferung kostenlos",
      details: ["Präzise Zeitfenster", "SMS-Benachrichtigung", "Echtzeit-Tracking"],
      badge: "Garantiert"
    },
    {
      icon: Shield,
      title: "Qualitätssicherung",
      description: "DIN EN 590 zertifiziertes Premium-Heizöl",
      details: ["Laborgeprüfte Qualität", "Additive inklusive", "Langzeitstabilität"],
      badge: "Zertifiziert"
    },
    {
      icon: Award,
      title: "Service-Excellenz",
      description: "Ausgezeichneter Kundenservice seit 1998",
      details: ["Persönliche Beratung", "24/7 Hotline", "Expertenteam"],
      badge: "Prämiert"
    },
    {
      icon: Users,
      title: "Kundenzufriedenheit",
      description: "4.8/5 Sterne bei über 25.000 Bewertungen",
      details: ["Transparente Bewertungen", "Regelmäßige Umfragen", "Kontinuierliche Verbesserung"],
      badge: "Top bewertet"
    },
    {
      icon: Truck,
      title: "Liefersicherheit",
      description: "Moderne Fahrzeugflotte mit Vollversicherung",
      details: ["GPS-Überwachung", "Vollkasko-Schutz", "Erfahrene Fahrer"],
      badge: "Versichert"
    },
    {
      icon: CheckCircle,
      title: "Preisgarantie",
      description: "Transparente Preise ohne versteckte Kosten",
      details: ["Keine Nachzahlungen", "Alle Kosten inklusive", "Preisklarheit"],
      badge: "Transparent"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light text-slate-800 mb-4">
            Unsere Service-Garantien
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Vertrauen Sie auf unsere verbindlichen Zusagen für erstklassigen Service 
            und höchste Qualität bei jeder Lieferung
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                {/* Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {guarantee.badge}
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <guarantee.icon className="text-blue-600" size={28} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{guarantee.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{guarantee.description}</p>

                {/* Details */}
                <ul className="space-y-2">
                  {guarantee.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                      <CheckCircle className="text-emerald-600 flex-shrink-0" size={14} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-emerald-100 text-slate-700 px-6 py-3 rounded-full">
            <Shield size={20} className="mr-2 text-blue-600" />
            <span className="font-medium">TÜV-zertifiziert • ISO 9001 • Trusted Shops</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceGuarantees;
