
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, Clock } from 'lucide-react';

const TrustElements = () => {
  const trustFactors = [
    {
      icon: Shield,
      title: "EU Certified Quality",
      description: "All our heating oil meets strict EU quality standards and Malta regulations"
    },
    {
      icon: Award,
      title: "Malta Business Award Winner",
      description: "Recognized for excellence in customer service and reliability"
    },
    {
      icon: Users,
      title: "2,500+ Happy Customers",
      description: "Trusted by families and businesses across Malta and Gozo"
    },
    {
      icon: Clock,
      title: "24/7 Emergency Service",
      description: "Emergency heating oil delivery available across Malta"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Malta <span className="text-blue-600">Trusts</span> Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trust is our foundation. Here's why thousands of Malta residents choose us for their heating oil needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFactors.map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-br from-blue-100 to-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <factor.icon className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{factor.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{factor.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustElements;
