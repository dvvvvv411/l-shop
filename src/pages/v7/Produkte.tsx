
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import Footer from '../../components/v7/Footer';
import ProductComparison from '../../components/v7/ProductComparison';
import { Droplet, Shield, Award, Droplets, Thermometer, Factory } from 'lucide-react';

const Produkte = () => {
  const productFeatures = [
    {
      icon: Shield,
      title: "NBN-Gecertificeerd",
      description: "Al onze mazout voldoet aan de NBN EN 590 norm voor de hoogste kwaliteitsnormen."
    },
    {
      icon: Droplets,
      title: "Zwavelarm",
      description: "Onze premium mazout bevat minder dan 50mg/kg zwavel voor milieuvriendelijke verbranding."
    },
    {
      icon: Thermometer,
      title: "Geoptimaliseerde Verbrandingswaarde",
      description: "Door speciale additieven bereiken wij een hogere verbrandingswaarde en betere efficiëntie."
    },
    {
      icon: Factory,
      title: "Directe Inkoop",
      description: "Door directe inkoop bij raffinaderijen garanderen wij de beste prijzen en kwaliteit."
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
              <Droplet size={18} className="mr-2" />
              Premium Mazout Producten
              <Award size={16} className="ml-2" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Onze <span className="text-red-600">Mazout Producten</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van bewezen standaardkwaliteit tot premium performance - 
              kies de perfecte mazout voor uw behoeften.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Features */}
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
              Kwaliteitskenmerken van onze mazout
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Leer meer over de bijzondere eigenschappen en voordelen van onze mazout producten
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
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-red-100 text-red-600 mb-4">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Comparison */}
      <ProductComparison />

      {/* Technical Specifications */}
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
              Technische Specificaties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Gedetailleerde informatie over onze mazout kwaliteiten
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Eigenschap</th>
                    <th className="px-6 py-4 text-center">Standaard Mazout</th>
                    <th className="px-6 py-4 text-center">Premium Mazout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium">NBN-Norm</td>
                    <td className="px-6 py-4 text-center">NBN EN 590</td>
                    <td className="px-6 py-4 text-center">NBN EN 590</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">Zwavelgehalte</td>
                    <td className="px-6 py-4 text-center">≤ 1000 mg/kg</td>
                    <td className="px-6 py-4 text-center">≤ 50 mg/kg</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Verbrandingswaarde</td>
                    <td className="px-6 py-4 text-center">≥ 42,6 MJ/kg</td>
                    <td className="px-6 py-4 text-center">≥ 43,0 MJ/kg</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium">Vlampunt</td>
                    <td className="px-6 py-4 text-center">≥ 55°C</td>
                    <td className="px-6 py-4 text-center">≥ 55°C</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Additieven</td>
                    <td className="px-6 py-4 text-center">Standaard</td>
                    <td className="px-6 py-4 text-center">Premium+</td>
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
