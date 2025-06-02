import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star } from 'lucide-react';

const ProductComparison = () => {
  const products = [
    {
      name: "Standard Heizöl",
      price: "0,70€",
      popular: false,
      features: [
        { text: "DIN 51603-1 Qualität", included: true },
        { text: "Standardschwefelgehalt", included: true },
        { text: "Grundadditivierung", included: true },
        { text: "Premium Additive", included: false },
        { text: "Verlängerte Lagerfähigkeit", included: false },
        { text: "Optimierter Brennwert", included: false }
      ]
    },
    {
      name: "Premium Heizöl",
      price: "0,75€",
      popular: true,
      features: [
        { text: "DIN 51603-1 Qualität", included: true },
        { text: "Schwefelarm (<50mg/kg)", included: true },
        { text: "Hochwertige Additivierung", included: true },
        { text: "Premium Additive", included: true },
        { text: "Verlängerte Lagerfähigkeit", included: true },
        { text: "Optimierter Brennwert", included: true }
      ]
    }
  ];

  const scrollToPriceCalculator = () => {
    // Scroll to the top of the page where the price calculator is located
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Produktvergleich
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wählen Sie das perfekte Heizöl für Ihre Bedürfnisse - von bewährter Standardqualität bis hin zu Premium-Performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                product.popular ? 'ring-2 ring-red-500' : 'border border-gray-200'
              }`}
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star size={16} fill="currentColor" />
                    <span>Beliebteste Wahl</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="text-4xl font-bold text-red-600 mb-1">{product.price}</div>
                <div className="text-gray-600">pro Liter</div>
              </div>

              <div className="space-y-4 mb-8">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    {feature.included ? (
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                    ) : (
                      <X className="text-gray-400 flex-shrink-0" size={20} />
                    )}
                    <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={scrollToPriceCalculator}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  product.popular 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Jetzt wählen
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;
