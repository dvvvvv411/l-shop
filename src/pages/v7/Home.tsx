
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import PriceCalculator from '../../components/v7/PriceCalculator';
import Footer from '../../components/v3/Footer';
import { Fuel, Star, Shield, Award, Clock } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useBelgianTranslations } from '@/hooks/useBelgianTranslations';

const Home = () => {
  usePageMeta('home');
  const t = useBelgianTranslations();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-24 overflow-hidden">
        {/* Enhanced Background Pattern with Belgian-themed Animation */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl belgian-animation"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-400 rounded-full blur-3xl belgian-animation-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300 rounded-full blur-3xl wave-animation"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-30 belgian-float-1"></div>
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-blue-500 rounded-full opacity-20 belgian-float-2"></div>
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-yellow-500 rounded-full opacity-25 belgian-float-3"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <Fuel size={18} className="mr-2" />
                {t.hero.badge}
                <Star size={16} className="ml-2 fill-current" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t.hero.description}
              </p>
            </motion.div>
          </div>

          {/* Price Calculator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <PriceCalculator />
          </motion.div>

          {/* Enhanced Benefits Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">{t.hero.guarantees.delivery}</div>
              <div className="text-gray-600 font-medium">{t.hero.guarantees.deliveryDesc}</div>
              <div className="text-sm text-gray-500 mt-1">België-breed</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">{t.hero.guarantees.freeShipping}</div>
              <div className="text-gray-600 font-medium">{t.hero.guarantees.freeShippingDesc}</div>
              <div className="text-sm text-gray-500 mt-1">Vanaf 2000 Liter</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">{t.hero.guarantees.customers}</div>
              <div className="text-gray-600 font-medium">{t.hero.guarantees.customersDesc}</div>
              <div className="text-sm text-gray-500 mt-1">Vertrouwen Ons</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Elements Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-700">{t.trust.sslEncrypted}</div>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-700">{t.trust.securePayment}</div>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-700">{t.trust.fastDelivery}</div>
            </div>
            <div className="text-center">
              <Fuel className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-gray-700">{t.trust.fairPrices}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.whyChooseUs.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.whyChooseUs.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(t.whyChooseUs.features).map(([key, feature], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-blue-100"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Fuel className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .belgian-animation {
          animation: belgianFloat 6s ease-in-out infinite;
        }
        .belgian-animation-delayed {
          animation: belgianFloat 6s ease-in-out infinite 2s;
        }
        .wave-animation {
          animation: wave 8s ease-in-out infinite;
        }
        .belgian-float-1 {
          animation: float 3s ease-in-out infinite;
        }
        .belgian-float-2 {
          animation: float 4s ease-in-out infinite 1s;
        }
        .belgian-float-3 {
          animation: float 5s ease-in-out infinite 2s;
        }
        
        @keyframes belgianFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes wave {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Home;
