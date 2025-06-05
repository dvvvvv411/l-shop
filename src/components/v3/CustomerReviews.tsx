
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Mountain } from 'lucide-react';

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Maria Huber",
      location: "Wien",
      rating: 5,
      text: "Seit Jahren bestelle ich mein Heizöl bei Heizöl Österreich. Die Qualität ist hervorragend und die Lieferung nach Wien immer pünktlich. Absolut empfehlenswert!",
      date: "November 2024"
    },
    {
      name: "Hans Gruber",
      location: "Salzburg",
      rating: 5,
      text: "Faire Preise, österreichische Qualität und freundlicher Service. Die Lieferung nach Salzburg war problemlos und schnell. Danke für den tollen Service!",
      date: "Oktober 2024"
    },
    {
      name: "Elisabeth Maier",
      location: "Innsbruck",
      rating: 5,
      text: "Auch in die Berge nach Tirol wird zuverlässig geliefert. Das Heizöl brennt sauber und der Preis ist fair. Österreichische Qualität, wie sie sein soll!",
      date: "November 2024"
    },
    {
      name: "Franz Steiner",
      location: "Graz",
      rating: 5,
      text: "Bestelle schon seit 15 Jahren hier mein Heizöl. Die Qualität ist konstant hoch und der Service immer freundlich. In die Steiermark wird schnell geliefert.",
      date: "Oktober 2024"
    },
    {
      name: "Anna Winkler",
      location: "Linz",
      rating: 5,
      text: "Premium-Heizöl zu fairen Preisen. Die Lieferung nach Oberösterreich war termingerecht und der Kundenservice sehr hilfsbereit. Sehr zufrieden!",
      date: "November 2024"
    },
    {
      name: "Karl Bauer",
      location: "Klagenfurt",
      rating: 5,
      text: "Selbst nach Kärnten wird zuverlässig geliefert. Das Heizöl entspricht allen österreichischen Standards. Klare Weiterempfehlung für alle Österreicher!",
      date: "Oktober 2024"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-violet-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-violet-100 to-amber-100 px-6 py-3 rounded-full mb-6">
            <Mountain className="h-5 w-5 text-violet-600 mr-2" />
            <span className="text-violet-800 font-semibold">Kundenstimmen</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Was Österreich über uns sagt
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vertrauen Sie auf die Erfahrungen von über 85.000 zufriedenen Kunden aus allen österreichischen Bundesländern
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100"
            >
              <div className="flex items-center mb-4">
                <div className="flex space-x-1 mr-3">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4 italic">
                "{review.text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{review.name}</div>
                  <div className="text-sm text-violet-600 flex items-center">
                    <Mountain className="w-3 h-3 mr-1" />
                    {review.location}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-4 h-3 bg-red-600 rounded-sm"></div>
                  <div className="w-4 h-3 bg-white border border-gray-300 rounded-sm"></div>
                  <div className="w-4 h-3 bg-red-600 rounded-sm"></div>
                </div>
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
          <div className="bg-gradient-to-r from-violet-600 to-amber-500 rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-6 h-6 text-amber-300 fill-current" />
                ))}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">4.9/5 Sterne</h3>
            <p className="text-violet-100 mb-6">
              Basierend auf über 12.500 österreichischen Kundenbewertungen
            </p>
            <div className="text-sm text-violet-200">
              ★ Österreichs bestbewerteter Heizöl-Lieferant ★
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
