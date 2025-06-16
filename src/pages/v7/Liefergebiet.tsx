
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v7/Header';
import Footer from '../../components/v7/Footer';
import { MapPin, Truck, Clock, Euro } from 'lucide-react';

const Liefergebiet = () => {
  const deliveryAreas = [
    {
      region: "Vlaanderen",
      provinces: ["Antwerpen", "Limburg", "Oost-Vlaanderen", "Vlaams-Brabant", "West-Vlaanderen"],
      deliveryTime: "2-3 werkdagen",
      freeDelivery: "Vanaf 3.000L"
    },
    {
      region: "Wallonië",
      provinces: ["Henegouwen", "Luik", "Luxemburg", "Namen", "Waals-Brabant"],
      deliveryTime: "3-4 werkdagen",
      freeDelivery: "Vanaf 3.000L"
    },
    {
      region: "Brussel",
      provinces: ["Brussels Hoofdstedelijk Gewest"],
      deliveryTime: "2-3 werkdagen",
      freeDelivery: "Vanaf 3.000L"
    }
  ];

  const deliveryFeatures = [
    {
      icon: Truck,
      title: "Moderne Tankwagens",
      description: "Onze vloot bestaat uit moderne, goed onderhouden tankwagens die voldoen aan alle veiligheidsnormen."
    },
    {
      icon: Clock,
      title: "Flexibele Levertijden",
      description: "Wij plannen de levering op een voor u geschikt moment binnen ons leveringsvenster."
    },
    {
      icon: MapPin,
      title: "Heel België",
      description: "Wij leveren in alle provincies van België met onze uitgebreide distributienetwerk."
    },
    {
      icon: Euro,
      title: "Gratis Levering",
      description: "Vanaf 3.000 liter mazout is de levering volledig gratis in heel België."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-red-100 text-red-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <MapPin size={18} className="mr-2" />
              Levering in heel België
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Ons <span className="text-red-600">Leveringsgebied</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wij leveren betrouwbaar en snel in heel België - van Vlaanderen tot Wallonië, 
              inclusief het Brussels Hoofdstedelijk Gewest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Leveringsgebieden in België
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Overzicht van onze leveringsgebieden met bijbehorende levertijden
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {deliveryAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex p-4 rounded-full bg-red-100 text-red-600 mb-4">
                    <MapPin size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {area.region}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Provincies:</h4>
                    <ul className="text-gray-600 space-y-1">
                      {area.provinces.map((province, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                          {province}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Levertijd:</span>
                      <span className="font-semibold text-red-600">{area.deliveryTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Gratis levering:</span>
                      <span className="font-semibold text-green-600">{area.freeDelivery}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Onze Leveringsservice
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wat u kunt verwachten van onze professionele mazoutlevering
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {deliveryFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex p-4 rounded-full bg-red-100 text-red-600 mb-4">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">
                Belangrijke Leveringsinformatie
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
                <div>
                  <h4 className="font-semibold mb-2">Minimale bestelhoeveelheid:</h4>
                  <p>500 liter (gratis levering vanaf 3.000 liter)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Leveringstijden:</h4>
                  <p>Maandag t/m vrijdag: 8:00 - 17:00 uur</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Toegankelijkheid:</h4>
                  <p>Tankwagen moet tot 30 meter van de tank kunnen komen</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Bevestiging:</h4>
                  <p>U krijgt 1 dag voor levering een bevestiging</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Liefergebiet;
