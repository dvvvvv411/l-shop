
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, Euro, Phone, Award, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Euro,
      title: "Best Price Guarantee",
      description: "We guarantee the best prices on the market. If you find cheaper elsewhere, we'll match the price."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Delivery within 4-7 working days directly to your home. Free from 3,000 litres order quantity."
    },
    {
      icon: Shield,
      title: "Highest Quality",
      description: "All our heating oil grades comply with EN 590 standards and are regularly tested by independent laboratories."
    },
    {
      icon: Phone,
      title: "Personal Service",
      description: "Our experienced customer service team is available Mon-Fri from 8am-6pm for all your questions."
    },
    {
      icon: Award,
      title: "15+ Years Experience",
      description: "For over 15 years, we have been your reliable partner for heating oil deliveries throughout Malta."
    },
    {
      icon: Clock,
      title: "Flexible Appointments",
      description: "Choose your preferred delivery date. Even short-notice appointments are usually possible."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Malta Energy?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the advantages that make us Malta's leading heating oil supplier
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-amber-100 p-4 rounded-full">
                  <reason.icon className="text-amber-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl">
            Request Quote Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
