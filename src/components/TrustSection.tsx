
import React from 'react';
import { Shield, Truck, Award, Headphones } from 'lucide-react';

const trustFeatures = [
  {
    icon: Shield,
    title: "Premium Qualität",
    description: "DIN-zertifiziertes Heizöl nach höchsten Standards",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Truck,
    title: "Schnelle Lieferung", 
    description: "Zuverlässige Lieferung binnen 4-7 Werktagen",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Award,
    title: "Beste Preise",
    description: "Garantiert günstige Preise durch direkten Einkauf",
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    icon: Headphones,
    title: "Top Service",
    description: "Persönliche Beratung und 24/7 Kundenservice",
    color: "bg-red-100 text-red-600"
  }
];

const TrustSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Warum HeizölDirekt?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Über 25 Jahre Erfahrung im Heizölhandel - Vertrauen Sie auf unsere Expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-center">
                <div className={`inline-flex p-3 rounded-full mb-4 ${feature.color}`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">25+</div>
              <div className="text-gray-600">Jahre Erfahrung</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">50k+</div>
              <div className="text-gray-600">Zufriedene Kunden</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">99%</div>
              <div className="text-gray-600">Pünktliche Lieferung</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
