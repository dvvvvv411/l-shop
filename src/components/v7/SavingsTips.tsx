
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Calendar, Thermometer, Calculator } from 'lucide-react';

const savingsTips = [
  {
    icon: Calculator,
    title: "Bestel in grotere hoeveelheden",
    description: "Vanaf 1000 liter krijgt u aanzienlijke kortingen per liter",
    savings: "Tot €0.05/liter",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Calendar,
    title: "Plan uw bestelling vooruit",
    description: "Bestellen buiten het stookseizoen kan u geld besparen",
    savings: "5-15% korting",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Thermometer,
    title: "Optimaliseer uw verbruik",
    description: "1°C lager stoken bespaart u 7% op uw jaarverbruik",
    savings: "Tot 20% besparing",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: TrendingDown,
    title: "Volg de mazoutprijzen",
    description: "Koop mazout wanneer de prijzen laag zijn",
    savings: "10-20% voordeel",
    color: "bg-purple-100 text-purple-600"
  }
];

const SavingsTips = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bespaartips voor slim mazout kopen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Met deze eenvoudige tips bespaart u honderden euro's per jaar op uw mazoutkosten
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {savingsTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-full mb-4 ${tip.color}`}>
                <tip.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {tip.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {tip.description}
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="text-green-800 font-semibold text-sm">
                  Mogelijk voordeel: {tip.savings}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-lg text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Bereken uw besparing nu
          </h3>
          <p className="text-gray-600 mb-6">
            Gebruik onze prijscalculator om te zien hoeveel u kunt besparen met een slimme bestelling
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl">
            Bereken nu uw voordeel
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SavingsTips;
