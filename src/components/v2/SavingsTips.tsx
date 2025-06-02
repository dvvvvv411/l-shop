
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Lightbulb, Calculator, Thermometer, Euro, ChevronDown, ChevronUp } from 'lucide-react';

const SavingsTips = () => {
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const savingsTips = [
    {
      icon: Thermometer,
      title: "Optimale Raumtemperatur",
      shortDesc: "1°C weniger spart bis zu 6% Heizkosten",
      savings: "bis zu 300€/Jahr",
      tips: [
        "Wohnräume: 20-21°C optimal",
        "Schlafzimmer: 16-18°C ausreichend", 
        "Küche: 18-20°C (Geräte produzieren Wärme)",
        "Programmierbare Thermostate nutzen"
      ]
    },
    {
      icon: TrendingDown,
      title: "Heizöl zur richtigen Zeit kaufen",
      shortDesc: "Saisonale Preisschwankungen clever nutzen",
      savings: "bis zu 15% sparen",
      tips: [
        "Sommermonate: Meist günstigere Preise",
        "Größere Mengen: Bessere Konditionen",
        "Marktbeobachtung: Preistrends verfolgen",
        "Vorratshaltung: Tank nicht komplett leeren"
      ]
    },
    {
      icon: Calculator,
      title: "Heizungsoptimierung",
      shortDesc: "Moderne Technik für maximale Effizienz",
      savings: "bis zu 20% weniger Verbrauch",
      tips: [
        "Heizung regelmäßig warten lassen",
        "Heizkörper entlüften (jährlich)",
        "Heizungspumpe auf Effizienz prüfen",
        "Brennwertkessel erwägen"
      ]
    },
    {
      icon: Lightbulb,
      title: "Einfache Sofort-Maßnahmen",
      shortDesc: "Kleine Änderungen, große Wirkung",
      savings: "bis zu 10% sofort",
      tips: [
        "Richtig lüften: Stoßlüften statt Dauerlüften",
        "Heizkörper freihalten (keine Möbel davor)",
        "Türen zu wenig beheizten Räumen schließen",
        "Rollläden nachts schließen"
      ]
    }
  ];

  const toggleTip = (index: number) => {
    setExpandedTip(expandedTip === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Euro size={16} className="mr-2" />
            Geld sparen leicht gemacht
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-emerald-600">Heizkosten senken</span> & clever sparen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mit unseren bewährten Tipps können Sie bis zu <strong className="text-emerald-600">30% Ihrer Heizkosten</strong> einsparen - 
            ganz ohne Komfortverlust!
          </p>
        </motion.div>

        {/* Savings Calculator Teaser */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 mb-12 border border-emerald-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">600€</div>
              <div className="text-gray-700 font-medium">Durchschnittliche jährliche Ersparnis</div>
              <div className="text-sm text-gray-500 mt-1">bei 3.000L Verbrauch</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">25%</div>
              <div className="text-gray-700 font-medium">Weniger Heizölverbrauch</div>
              <div className="text-sm text-gray-500 mt-1">mit optimierten Einstellungen</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">2-5°C</div>
              <div className="text-gray-700 font-medium">Weniger Raumtemperatur</div>
              <div className="text-sm text-gray-500 mt-1">kaum spürbar, aber wirksam</div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savingsTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleTip(index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <tip.icon className="text-emerald-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h3>
                      <p className="text-gray-600 mb-3">{tip.shortDesc}</p>
                      <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                        <TrendingDown size={14} className="mr-1" />
                        {tip.savings}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedTip === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-gray-400" size={20} />
                  </motion.div>
                </div>
              </div>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: expandedTip === index ? 'auto' : 0,
                  opacity: expandedTip === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4 space-y-3">
                    {tip.tips.map((tipItem, tipIndex) => (
                      <div key={tipIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{tipItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Bereit für niedrigere Heizkosten?
            </h3>
            <p className="text-gray-600 mb-6">
              Starten Sie jetzt mit Premium-Heizöl zum Bestpreis und unseren Expertentipps!
            </p>
            <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl">
              Heizöl bestellen & sparen
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SavingsTips;
