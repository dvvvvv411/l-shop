
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v2/Header';
import Footer from '../../components/Footer';
import ProductComparison from '../../components/ProductComparison';
import { Crown, Shield, Award, Droplets, Thermometer, Gem } from 'lucide-react';

const Produkte = () => {
  const productFeatures = [
    {
      icon: Shield,
      title: "Premium-Zertifizierung",
      description: "Exklusiv zertifizierte Premium-Heizöle nach höchsten internationalen Standards."
    },
    {
      icon: Droplets,
      title: "Ultra-Schwefelarm",
      description: "Unser VIP-Heizöl mit weniger als 10mg/kg Schwefel für maximale Umweltfreundlichkeit."
    },
    {
      icon: Thermometer,
      title: "Maximaler Brennwert",
      description: "Durch spezielle Premium-Additivierung erreichen wir den höchstmöglichen Heizwert."
    },
    {
      icon: Gem,
      title: "Exklusiver Direktbezug",
      description: "Direkter VIP-Einkauf bei Premium-Raffinerien für außergewöhnliche Qualität."
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
              <Crown size={18} className="mr-2" />
              Exklusive Premium-Heizöle
              <Award size={16} className="ml-2" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Premium <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Heizöl-Kollektion</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Entdecken Sie unsere exklusive Kollektion erstklassiger Heizöle - 
              von Premium-Standard bis hin zu VIP-Performance für anspruchsvollste Kunden.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Features */}
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
              Exklusive Qualitätsmerkmale
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Erfahren Sie mehr über die außergewöhnlichen Eigenschaften unserer Premium-Heizöl-Kollektion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all"
              >
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 mb-4">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Comparison */}
      <div className="bg-slate-900">
        <ProductComparison />
      </div>

      {/* Technical Specifications */}
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
              Premium-Spezifikationen
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Detaillierte technische Daten unserer exklusiven Heizöl-Qualitäten
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
                <thead className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Eigenschaft</th>
                    <th className="px-6 py-4 text-center font-bold">Premium Standard</th>
                    <th className="px-6 py-4 text-center font-bold">VIP Excellence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr>
                    <td className="px-6 py-4 font-medium text-white">Zertifizierung</td>
                    <td className="px-6 py-4 text-center text-gray-300">DIN 51603-1 Premium</td>
                    <td className="px-6 py-4 text-center text-yellow-400">VIP+ Zertifizierung</td>
                  </tr>
                  <tr className="bg-slate-800/50">
                    <td className="px-6 py-4 font-medium text-white">Schwefelgehalt</td>
                    <td className="px-6 py-4 text-center text-gray-300">≤ 50 mg/kg</td>
                    <td className="px-6 py-4 text-center text-yellow-400">≤ 10 mg/kg</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-white">Heizwert</td>
                    <td className="px-6 py-4 text-center text-gray-300">≥ 43,2 MJ/kg</td>
                    <td className="px-6 py-4 text-center text-yellow-400">≥ 43,8 MJ/kg</td>
                  </tr>
                  <tr className="bg-slate-800/50">
                    <td className="px-6 py-4 font-medium text-white">Flammpunkt</td>
                    <td className="px-6 py-4 text-center text-gray-300">≥ 55°C</td>
                    <td className="px-6 py-4 text-center text-yellow-400">≥ 60°C</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-white">Additivierung</td>
                    <td className="px-6 py-4 text-center text-gray-300">Premium</td>
                    <td className="px-6 py-4 text-center text-yellow-400">VIP Excellence+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Produkte;
