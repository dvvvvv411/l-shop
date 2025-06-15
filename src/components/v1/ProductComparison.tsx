
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const ProductComparison = () => {
  const products = [
    {
      name: "Standard Heizöl",
      price: "0,70",
      popular: false,
      features: [
        "DIN EN 590 zertifiziert",
        "Schwefelarm (max. 10mg/kg)",
        "Hohe Heizleistung",
        "Umweltfreundlich",
        "Lange Lagerfähigkeit",
        "Kostenlose Lieferung ab 3.000L"
      ]
    },
    {
      name: "Premium Heizöl",
      price: "0,72",
      popular: true,
      features: [
        "Alle Standard-Eigenschaften",
        "Additive für optimale Verbrennung",
        "Verlängerte Lagerstabilität",
        "Reduzierte Ablagerungen",
        "Korrosionsschutz",
        "Kostenlose Lieferung ab 3.000L"
      ]
    }
  ];

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
            Wählen Sie zwischen unseren hochwertigen Heizöl-Sorten - beide zu unschlagbaren Preisen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all ${
                product.popular ? 'border-2 border-red-500 transform scale-105' : 'border border-gray-200'
              }`}
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star size={16} className="mr-1 fill-current" />
                    Beliebt
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h3>
                <div className="text-4xl font-bold text-red-600 mb-2">
                  €{product.price}
                </div>
                <div className="text-gray-500">pro Liter</div>
              </div>

              <ul className="space-y-4 mb-8">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                      <Check className="text-green-600" size={16} />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                product.popular 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                Jetzt bestellen
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;
