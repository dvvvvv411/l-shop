
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const products = [
  {
    name: "Standard Heizöl EL",
    description: "Qualitäts-Heizöl nach DIN 51603-1",
    features: [
      "DIN-zertifizierte Qualität",
      "Schwefelarm (max. 50mg/kg)",
      "Deutschlandweite Lieferung",
      "4-7 Werktage Lieferzeit"
    ],
    popular: false
  },
  {
    name: "Premium Heizöl EL",
    description: "Additiviertes Heizöl für optimale Leistung",
    features: [
      "Alle Standard-Features",
      "Additiviert gegen Alterung",
      "Verbesserte Fließeigenschaften",
      "Korrosionsschutz inklusive",
      "Längere Lagerfähigkeit"
    ],
    popular: true
  },
  {
    name: "Bio-Heizöl",
    description: "Umweltfreundliche Alternative",
    features: [
      "Alle Premium-Features",
      "10% Bioanteil",
      "CO2-reduziert",
      "Umweltschonend"
    ],
    popular: false
  }
];

const ProductComparison = () => {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Unsere Heizöl-Qualitäten
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wählen Sie die passende Qualität für Ihre Heizungsanlage
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow ${
                product.popular ? 'ring-2 ring-red-500' : ''
              }`}
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center text-sm font-semibold">
                    <Star size={16} className="mr-1 fill-current" />
                    Beliebteste Wahl
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h3>
                <p className="text-gray-600">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <Check size={20} className="text-green-500" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;
