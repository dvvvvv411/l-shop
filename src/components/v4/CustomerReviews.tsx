
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const CustomerReviews = () => {
  const reviews = [
    {
      name: 'Pierre Dubois',
      location: 'Lyon',
      rating: 5,
      comment: 'Service impeccable ! Livraison rapide et fioul de qualité. Je recommande vivement Fuel Express France.',
      date: 'Il y a 2 semaines'
    },
    {
      name: 'Marie-Claire Rousseau',
      location: 'Toulouse',
      rating: 5,
      comment: 'Cliente depuis 3 ans, jamais déçue. Prix compétitifs et équipe très professionnelle.',
      date: 'Il y a 1 mois'
    },
    {
      name: 'Jean-Michel Bernard',
      location: 'Marseille',
      rating: 5,
      comment: 'Excellente réactivité pour une commande urgente. Livraison en 24h comme promis !',
      date: 'Il y a 3 semaines'
    },
    {
      name: 'Sophie Moreau',
      location: 'Bordeaux',
      rating: 5,
      comment: 'Service client au top ! Ils ont répondu à toutes mes questions avec patience et professionnalisme.',
      date: 'Il y a 2 semaines'
    },
    {
      name: 'François Leroy',
      location: 'Nantes',
      rating: 5,
      comment: 'Rapport qualité-prix excellent. Le fioul premium vaut vraiment le coup pour mon installation.',
      date: 'Il y a 1 semaine'
    },
    {
      name: 'Catherine Durand',
      location: 'Strasbourg',
      rating: 5,
      comment: 'Très satisfaite ! Commande en ligne simple et livraison ponctuelle. Merci !',
      date: 'Il y a 4 jours'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const scrollToCalculator = () => {
    const calculatorElement = document.querySelector('#calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/3 w-32 h-32 bg-red-100 rounded-full opacity-60 blur-2xl"></div>
        <div className="absolute bottom-10 right-1/3 w-40 h-40 bg-blue-100 rounded-full opacity-60 blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="flex space-x-1">
              <div className="w-3 h-2 bg-blue-600 rounded-sm"></div>
              <div className="w-3 h-2 bg-white border border-gray-300 rounded-sm"></div>
              <div className="w-3 h-2 bg-red-600 rounded-sm"></div>
            </div>
            <span className="text-red-600 font-semibold">Témoignages</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients français
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-xl font-bold text-gray-900">4.8/5</span>
            <span className="text-gray-600">• Plus de 2.500 avis</span>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les retours de nos clients satisfaits partout en France. 
            Leur confiance fait notre fierté !
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full">
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="h-8 w-8 text-red-400" />
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
                
                {/* Customer Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                
                {/* Hover effect decoration */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Rejoignez nos clients satisfaits !
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Faites confiance à l'expertise française de Fuel Express France 
              pour votre approvisionnement en fioul domestique.
            </p>
            <motion.button
              onClick={scrollToCalculator}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Demander un devis gratuit
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
