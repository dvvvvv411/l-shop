
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Truck } from 'lucide-react';

const serviceAreas = [
  { province: 'Vlaanderen', cities: ['Antwerpen', 'Gent', 'Brugge', 'Leuven'], deliveryTime: '24-48u' },
  { province: 'Wallonië', cities: ['Luik', 'Charleroi', 'Namur', 'Mons'], deliveryTime: '24-48u' },
  { province: 'Brussel', cities: ['Brussel-Hoofdstad', 'Schaarbeek', 'Anderlecht'], deliveryTime: '24u' }
];

const ServiceAreas = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Onze leveringsgebieden
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wij leveren door heel België - van de kust tot de Ardennen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {serviceAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white p-3 rounded-full mr-4">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{area.province}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={14} className="mr-1" />
                    Levering: {area.deliveryTime}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {area.cities.map((city, cityIndex) => (
                  <div key={cityIndex} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {city}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delivery info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Truck size={32} className="mr-3" />
            <h3 className="text-2xl font-bold">Snelle levering gegarandeerd</h3>
          </div>
          <p className="text-lg opacity-90 mb-6">
            Besteld voor 14:00? Dan wordt uw mazout binnen 4-7 werkdagen geleverd!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">4-7</div>
              <div className="text-sm opacity-80">werkdagen levering</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-80">betrouwbaar</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-80">online bestellen</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceAreas;
