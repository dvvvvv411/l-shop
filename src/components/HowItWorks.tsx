
import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, MapPin, Truck, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: Calculator,
      title: "Calculate Price",
      description: "Enter your postal code and desired quantity. Our calculator shows you the current best price immediately."
    },
    {
      step: 2,
      icon: MapPin,
      title: "Place Order",
      description: "Choose your preferred delivery date from the available delivery slots in your region."
    },
    {
      step: 3,
      icon: CheckCircle,
      title: "Receive Invoice",
      description: "You will receive your invoice by email and can pay conveniently by bank transfer or direct debit."
    },
    {
      step: 4,
      icon: Truck,
      title: "Get Delivery",
      description: "Our delivery vehicle arrives at the agreed time and fills your tank professionally and cleanly."
    }
  ];

  const scrollToPriceCalculator = () => {
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
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your affordable heating oil in just 4 simple steps - fast, secure and uncomplicated
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center mb-16 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 lg:px-8 mb-8 lg:mb-0">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="bg-amber-100 p-8 rounded-full">
                  <step.icon className="text-amber-600" size={64} />
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-px h-16 bg-gray-300 mt-32"></div>
              )}
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
          <button 
            onClick={scrollToPriceCalculator}
            className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
