
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Truck, CheckCircle, Clock, Users } from 'lucide-react';

const TrustElements = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vertrouwd door duizenden Belgische gezinnen
            </h2>
            <p className="text-xl text-gray-600">
              Ontdek waarom wij de voorkeursleverancier zijn voor mazout in België
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center p-6 bg-gray-50 rounded-xl"
          >
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">100% Veilig</h3>
            <p className="text-gray-600">
              SSL-versleutelde betalingen en volledige bescherming van uw gegevens
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center p-6 bg-gray-50 rounded-xl"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Erkende Kwaliteit</h3>
            <p className="text-gray-600">
              Gecertificeerd volgens Belgische normen en internationale standaarden
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center p-6 bg-gray-50 rounded-xl"
          >
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Snelle Levering</h3>
            <p className="text-gray-600">
              Levering binnen 2-4 werkdagen door heel België
            </p>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
              <div className="font-semibold text-gray-900">Belgische Normen</div>
              <div className="text-sm text-gray-600">NBN EN 590</div>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-blue-600 mb-2" />
              <div className="font-semibold text-gray-900">24/7 Service</div>
              <div className="text-sm text-gray-600">Altijd bereikbaar</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-purple-600 mb-2" />
              <div className="font-semibold text-gray-900">75.000+</div>
              <div className="text-sm text-gray-600">Tevreden klanten</div>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 text-yellow-600 mb-2" />
              <div className="font-semibold text-gray-900">25+ Jaar</div>
              <div className="text-sm text-gray-600">Ervaring</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustElements;
