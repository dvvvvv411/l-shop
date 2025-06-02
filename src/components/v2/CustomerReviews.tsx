import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MapPin, Calendar, CheckCircle, Users } from 'lucide-react';

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Familie Müller",
      location: "Hamburg",
      date: "Vor 2 Wochen",
      rating: 5,
      title: "Schnell, zuverlässig und super Service!",
      review: "Bestellung am Montag aufgegeben, Mittwoch war das Heizöl da. Der Fahrer war pünktlich und sehr freundlich. Preis war deutlich günstiger als beim lokalen Händler.",
      verified: true,
      orderSize: "3.500L Premium Heizöl"
    },
    {
      name: "Thomas K.",
      location: "München", 
      date: "Vor 1 Woche",
      rating: 5,
      title: "Hervorragende Beratung und Top-Qualität",
      review: "Wurde telefonisch sehr gut beraten. Das Premium-Heizöl brennt deutlich sauberer als das vom vorherigen Anbieter. Gerne wieder!",
      verified: true,
      orderSize: "5.000L Premium Heizöl"
    },
    {
      name: "Renate S.",
      location: "Köln",
      date: "Vor 3 Wochen", 
      rating: 5,
      title: "Faire Preise, keine versteckten Kosten",
      review: "Endlich ein Anbieter ohne Überraschungen! Preis online berechnet, bestellt, geliefert. Genau wie versprochen. Sehr zu empfehlen.",
      verified: true,
      orderSize: "2.800L Standard Heizöl"
    },
    {
      name: "Marcus W.",
      location: "Berlin",
      date: "Vor 1 Monat",
      rating: 5,
      title: "Professionell und kundenorientiert",
      review: "Brauchte dringend Heizöl und bekam einen Notfall-Termin. Alles hat super geklappt. Der Service ist wirklich außergewöhnlich gut.",
      verified: true,
      orderSize: "4.200L Premium Heizöl"
    }
  ];

  const trustFactors = [
    {
      icon: Users,
      value: "98%",
      label: "Weiterempfehlung",
      description: "Unserer Kunden würden uns weiterempfehlen"
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Kundenbewertung",
      description: "Durchschnittliche Bewertung aus 15.000+ Reviews"
    },
    {
      icon: CheckCircle,
      value: "150.000+",
      label: "Zufriedene Kunden",
      description: "Vertrauen bereits auf unseren Service"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-slate-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star size={16} className="mr-2 fill-current" />
            Verifizierte Kundenbewertungen
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Was unsere <span className="text-blue-600">Kunden sagen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Echte Bewertungen von echten Kunden - erfahren Sie, warum über 
            <strong className="text-blue-600"> 150.000 Deutsche</strong> uns ihr Vertrauen schenken.
          </p>
        </motion.div>

        {/* Trust Factors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {trustFactors.map((factor, index) => (
            <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <factor.icon className="text-blue-600" size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{factor.value}</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{factor.label}</div>
              <div className="text-sm text-gray-600">{factor.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Customer Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 bg-blue-600 rounded-full p-2">
                <Quote className="text-white" size={16} />
              </div>

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    {review.verified && (
                      <CheckCircle className="text-green-500" size={16} />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{review.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
              </div>

              {/* Review Content */}
              <h5 className="font-bold text-gray-900 mb-3">{review.title}</h5>
              <p className="text-gray-700 mb-4 leading-relaxed">{review.review}</p>

              {/* Order Info */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">
                  <strong>Bestellung:</strong> {review.orderSize}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Werden Sie unser nächster zufriedener Kunde!
            </h3>
            <p className="text-gray-600 mb-6">
              Über 15.000 Bewertungen sprechen für sich - überzeugen Sie sich selbst von unserem Service.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={scrollToTop}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Jetzt bestellen
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
