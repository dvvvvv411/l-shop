
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Truck, HeadphonesIcon } from 'lucide-react';

const V7TrustElements = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Trust indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.8/5</div>
              <div className="text-gray-600">Klantenwaardering</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-gray-600">Veilige betaling</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-gray-600">Op tijd geleverd</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <HeadphonesIcon className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600">Klantenservice</div>
            </div>
          </div>
        </motion.div>

        {/* Customer testimonials */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Wat onze klanten zeggen
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Zeer tevreden over de service. Snelle levering en goede prijzen. Zeker een aanrader!"
              </p>
              <div className="text-sm text-gray-500">
                - Marie V., Brussel
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Online bestellen ging heel eenvoudig. Levering precies op tijd zoals beloofd."
              </p>
              <div className="text-sm text-gray-500">
                - Jan D., Antwerpen
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Goede kwaliteit mazout en vriendelijke chauffeur. Al jaren klant en altijd tevreden."
              </p>
              <div className="text-sm text-gray-500">
                - Sophie L., Gent
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default V7TrustElements;
