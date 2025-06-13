
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Award, Users, Truck, Star } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "Premium heating oil meeting all EU standards with full quality certification for Malta."
    },
    {
      icon: Clock,
      title: "Fast 24h Delivery",
      description: "Next-day delivery across Malta and Gozo. Order today, receive tomorrow."
    },
    {
      icon: Award,
      title: "Malta's #1 Choice",
      description: "Most trusted heating oil supplier in Malta with over 2,500 satisfied customers."
    },
    {
      icon: Users,
      title: "Local Malta Team",
      description: "Friendly, English and Maltese speaking customer service team based right here in Malta."
    },
    {
      icon: Truck,
      title: "Island-wide Coverage",
      description: "We deliver to every locality in Malta and Gozo, no matter how remote."
    },
    {
      icon: Star,
      title: "Competitive Prices",
      description: "Best heating oil prices in Malta with transparent pricing and no hidden fees."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-red-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-blue-600">Malta Heating Oil?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another heating oil supplier. We're Malta's dedicated heating solution, 
            committed to keeping your home warm with reliable service and competitive prices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-blue-100 to-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Get Your Quote Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
