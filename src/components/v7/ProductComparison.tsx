
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Droplet } from 'lucide-react';

const ProductComparison = () => {
  const products = [
    {
      name: "Standaard Mazout",
      price: "0,50",
      description: "Hoogwaardige mazout volgens NBN EN 590",
      features: [
        "NBN EN 590 gecertificeerd",
        "Betrouwbare kwaliteit",
        "Geschikt voor alle ketels",
        "Standaard additieven"
      ],
      popular: false,
      icon: Droplet
    },
    {
      name: "Premium Mazout",
      price: "0,52",
      description: "Zwavelarm premium mazout met additieven",
      features: [
        "Zwavelarm (< 50mg/kg)",
        "Extra additieven",
        "Verbeterde verbranding",
        "Langere ketellevensduur",
        "Milieuschonender"
      ],
      popular: true,
      icon: Star
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
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Onze Mazout Producten
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Van betrouwbare standaardkwaliteit tot premium performance - 
            kies de perfecte mazout voor uw behoeften.
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
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 ${
                product.popular ? 'border-red-500' : 'border-gray-200'
              }`}
            >
              {product.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Meest Populair
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex p-4 rounded-full mb-4 ${
                  product.popular ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  <product.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <div className="text-4xl font-bold text-red-600 mb-1">
                  €{product.price}
                </div>
                <div className="text-gray-500">per liter</div>
              </div>

              <div className="space-y-3">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check className="text-green-500 mr-3 flex-shrink-0" size={20} />
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
