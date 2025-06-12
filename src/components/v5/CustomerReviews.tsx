
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Marco Rossi",
      location: "Milano",
      rating: 5,
      text: "Servizio eccellente! Consegna puntuale e gasolio di alta qualità. Lo consiglio vivamente!",
      date: "2 settimane fa"
    },
    {
      name: "Lucia Ferrari",
      location: "Roma",
      rating: 5,
      text: "Prezzi competitivi e servizio clienti fantastico. Sono cliente da anni e non ho mai avuto problemi.",
      date: "1 mese fa"
    },
    {
      name: "Giuseppe Bianchi",
      location: "Torino",
      rating: 5,
      text: "Processo di ordinazione molto semplice e consegna velocissima. Gasolio Veloce è davvero il migliore!",
      date: "3 settimane fa"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-red-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cosa dicono i nostri clienti
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La soddisfazione dei nostri clienti è la nostra priorità assoluta
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Quote className="text-green-600 mr-2" size={24} />
                <div className="flex">{renderStars(review.rating)}</div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{review.text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{review.name}</div>
                  <div className="text-gray-500 text-sm">{review.location}</div>
                </div>
                <div className="text-gray-400 text-sm">{review.date}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg">
            <div className="flex">{renderStars(5)}</div>
            <span className="text-gray-700 font-semibold">4.9/5 basato su 1.250+ recensioni</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
