
import React from 'react';
import { motion } from 'framer-motion';
import { Euro, Truck, Shield, Phone, Award, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Euro,
      title: "Garanzia miglior prezzo",
      description: "Vi offriamo i prezzi più competitivi sul mercato. Se trovate di meglio altrove, adeguiamo il nostro prezzo."
    },
    {
      icon: Truck,
      title: "Consegna rapida",
      description: "Consegna in 3-5 giorni lavorativi direttamente a casa vostra. Gratuita per ordini superiori a 3.000 litri."
    },
    {
      icon: Shield,
      title: "Qualità superiore",
      description: "Tutte le nostre qualità di gasolio sono conformi alla norma EN 590 e vengono regolarmente testate da laboratori indipendenti."
    },
    {
      icon: Phone,
      title: "Servizio personalizzato",
      description: "Il nostro team esperto di assistenza clienti è a vostra disposizione dal lunedì al venerdì dalle 8:00 alle 18:00."
    },
    {
      icon: Award,
      title: "15+ anni di esperienza",
      description: "Da oltre 15 anni siamo il vostro partner affidabile per le consegne di gasolio da riscaldamento in tutta Italia."
    },
    {
      icon: Clock,
      title: "Appuntamenti flessibili",
      description: "Scegliete la data che preferite per la consegna. Anche gli appuntamenti last-minute sono spesso possibili."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Perché Gasolio Veloce?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scoprite i vantaggi che ci rendono il fornitore leader di gasolio in Italia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-4 rounded-full">
                  <reason.icon className="text-green-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl">
            Richiedi preventivo ora
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
