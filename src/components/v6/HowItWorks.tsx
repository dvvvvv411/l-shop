
import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Phone, Truck, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Calculator,
      title: "Calculate Your Needs",
      description: "Use our price calculator to determine the amount of heating oil you need and get an instant quote.",
      step: "01"
    },
    {
      icon: Phone,
      title: "Place Your Order",
      description: "Complete your order online or call our team. We'll confirm all details and schedule your delivery.",
      step: "02"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Our professional drivers deliver your heating oil directly to your location within 4-7 working days.",
      step: "03"
    },
    {
      icon: CheckCircle,
      title: "Quality Assured",
      description: "Enjoy reliable heating with our certified heating oil. We're here for ongoing support and future orders.",
      step: "04"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
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
            Getting your heating oil delivered across Malta is simple and straightforward. 
            Here's how we make it easy for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative text-center group"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-amber-300 to-amber-200 transform translate-x-0 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-amber-400 rounded-full"></div>
                </div>
              )}

              <div className="relative z-10 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="text-amber-600" size={32} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
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
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Questions About the Process?
            </h3>
            <p className="text-gray-600 mb-6">
              Our friendly customer service team is here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Contact Us
              </button>
              <button 
                onClick={() => window.location.href = '/order'}
                className="bg-white text-amber-600 border-2 border-amber-600 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-colors"
              >
                Start Your Order
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
