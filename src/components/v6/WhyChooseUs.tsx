
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, CreditCard, HeadphonesIcon, Award, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Certified Quality",
      description: "All our heating oil meets European EN 590 standards and undergoes rigorous quality testing.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Truck,
      title: "Malta-wide Delivery",
      description: "We deliver to every corner of Malta, including Gozo, with our modern fleet of delivery vehicles.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: CreditCard,
      title: "Competitive Pricing",
      description: "Direct sourcing means better prices for you. Save up to 15% compared to retail prices.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: HeadphonesIcon,
      title: "Expert Support",
      description: "Our experienced team provides professional advice and support for all your heating needs.",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Award,
      title: "25+ Years Experience",
      description: "Quarter century of experience in the heating oil industry ensures reliable service.",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Standard delivery within 4-7 working days. Emergency deliveries available on request.",
      color: "from-orange-500 to-amber-500"
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
            Why Choose Malta Energy Solutions?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are Malta's trusted heating oil provider, committed to delivering quality, 
            reliability, and exceptional service to every customer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-200"
            >
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied customers across Malta who trust us for their heating oil needs.
            </p>
            <button 
              onClick={() => window.location.href = '/order'}
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Your Quote Today
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
