
import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Shield, Zap, Leaf } from 'lucide-react';

const ProductInfo = () => {
  const products = [
    {
      icon: Droplets,
      name: "Premium Heating Oil",
      description: "High-quality heating oil perfect for residential and commercial use across Malta.",
      features: ["Low sulfur content", "Clean burning", "High efficiency", "EU compliant"]
    },
    {
      icon: Shield,
      name: "Standard Heating Oil",
      description: "Reliable, cost-effective heating oil for everyday heating needs in Malta.",
      features: ["Quality assured", "Competitive pricing", "Reliable supply", "Island delivery"]
    },
    {
      icon: Zap,
      name: "High-Performance Oil",
      description: "Enhanced heating oil with additives for optimal performance and efficiency.",
      features: ["Enhanced performance", "Reduced emissions", "Extended equipment life", "Premium quality"]
    },
    {
      icon: Leaf,
      name: "Eco-Friendly Option",
      description: "Environmentally conscious heating oil with reduced environmental impact.",
      features: ["Lower emissions", "Biodegradable additives", "Environmental friendly", "Sustainable sourcing"]
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
            Our <span className="text-blue-600">Premium</span> Heating Oil Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of heating oil products to meet every need in Malta, 
            from residential homes to commercial properties.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-red-50 rounded-xl p-8 border border-blue-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-blue-100 to-red-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                  <product.icon className="text-blue-600" size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                  <ul className="space-y-2">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Choosing the Right Heating Oil?
            </h3>
            <p className="text-gray-600 mb-6">
              Our Malta-based experts are here to help you select the perfect heating oil for your needs.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300">
              Contact Our Experts
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductInfo;
