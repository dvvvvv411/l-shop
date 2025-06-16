
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Hoe snel wordt mijn mazout geleverd?',
      answer: 'Wij leveren uw mazout binnen 2-4 werkdagen na uw bestelling. Voor urgente leveringen bieden wij ook express-service aan.'
    },
    {
      question: 'Wat zijn de leveringskosten?',
      answer: 'Levering is gratis vanaf 3.000 liter. Voor kleinere hoeveelheden rekenen wij €89 leveringskosten.'
    },
    {
      question: 'Welke betalingsmogelijkheden zijn er?',
      answer: 'U kunt betalen via Bancontact, creditcard, bankoverschrijving of bij levering (alleen contant). Alle betalingen zijn veilig versleuteld.'
    },
    {
      question: 'Leveren jullie door heel België?',
      answer: 'Ja, wij leveren door heel België, inclusief Vlaanderen, Wallonië en Brussel. Voer uw postcode in om te controleren of wij in uw gebied leveren.'
    },
    {
      question: 'Wat is het verschil tussen standaard en premium mazout?',
      answer: 'Premium mazout bevat extra additieven die uw ketel beschermen, de houdbaarheid verlengen en de uitstoot verminderen. Het kost slechts €0,02 meer per liter.'
    },
    {
      question: 'Kan ik mijn bestelling annuleren?',
      answer: 'U kunt uw bestelling kosteloos annuleren tot 24 uur voor de geplande levering. Neem hiervoor contact op met onze klantenservice.'
    },
    {
      question: 'Hoe wordt de kwaliteit van jullie mazout gegarandeerd?',
      answer: 'Onze mazout voldoet aan alle Belgische normen (NBN EN 590) en wordt regelmatig getest. Wij bieden volledige garantie op de kwaliteit.'
    },
    {
      question: 'Wat gebeurt er als ik niet thuis ben bij de levering?',
      answer: 'Onze chauffeur neemt vooraf contact op om een geschikt tijdstip af te spreken. Als u niet thuis bent, kunnen wij een nieuwe afspraak maken.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Veelgestelde vragen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Heeft u vragen over onze mazoutlevering? Hier vindt u antwoorden op de meest gestelde vragen.
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <button
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-6 w-6 text-red-600" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-red-600" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Heeft u nog andere vragen?
            </h3>
            <p className="text-gray-600 mb-6">
              Onze klantenservice staat voor u klaar om al uw vragen te beantwoorden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Bel +32 2 123 4567
              </button>
              <button className="border border-red-600 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                E-mail ons
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
