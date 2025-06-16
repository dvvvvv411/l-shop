
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Marie Janssens",
    location: "Antwerpen",
    rating: 5,
    review: "Uitstekende service! Mazout werd snel geleverd en de prijs was zeer competitief. Absoluut een aanrader voor iedereen die betrouwbare mazoutlevering zoekt.",
    date: "December 2024"
  },
  {
    name: "Johan De Smet",
    location: "Gent",
    rating: 5,
    review: "Al jaren klant bij MazoutVandaag. Altijd op tijd, eerlijke prijzen en vriendelijke service. De online bestelling is super makkelijk.",
    date: "November 2024"
  },
  {
    name: "Véronique Dupont",
    location: "Brussel",
    rating: 5,
    review: "Perfecte communicatie en snelle levering. Het mazout was van topkwaliteit en de leverancier was zeer professioneel. Zeer tevreden!",
    date: "Oktober 2024"
  },
  {
    name: "Frank Willems",
    location: "Leuven",
    rating: 5,
    review: "Fantastische ervaring! Besteld op dinsdag, geleverd op vrijdag. Zeer transparante prijzen en geen verborgen kosten. Top service!",
    date: "September 2024"
  }
];

const CustomerReviews = () => {
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
            Wat onze klanten zeggen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meer dan 10.000 tevreden klanten vertrouwen op onze mazoutservice
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 relative"
            >
              <div className="absolute top-4 right-4 text-blue-300">
                <Quote size={24} />
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 text-sm mb-4 leading-relaxed italic">
                "{review.review}"
              </p>

              <div className="border-t border-blue-200 pt-4">
                <div className="font-semibold text-gray-900">{review.name}</div>
                <div className="text-sm text-gray-600">{review.location}</div>
                <div className="text-xs text-gray-500 mt-1">{review.date}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-sm opacity-80">Gemiddelde beoordeling</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10.000+</div>
              <div className="text-sm opacity-80">Tevreden klanten</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-sm opacity-80">Jaar ervaring</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99%</div>
              <div className="text-sm opacity-80">Op tijd geleverd</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
