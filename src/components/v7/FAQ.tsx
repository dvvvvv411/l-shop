
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "Wat is de minimale bestelhoeveelheid?",
      answer: "De minimale bestelhoeveelheid is 500 liter. Voor bestellingen vanaf 3.000 liter is de levering gratis."
    },
    {
      question: "Hoe lang duurt de levering?",
      answer: "Normaal gesproken leveren wij binnen 2-4 werkdagen in heel België. U krijgt een dag voor levering een bevestiging met het tijdvenster."
    },
    {
      question: "Welke betaalmethoden accepteren jullie?",
      answer: "Wij accepteren bankoverschrijving. Na uw bestelling ontvangt u alle benodigde betaalgegevens per e-mail."
    },
    {
      question: "Is uw mazout van goede kwaliteit?",
      answer: "Ja, al onze mazout voldoet aan de NBN EN 590 norm. Onze premium mazout is zwavelarm en bevat speciale additieven voor betere prestaties."
    },
    {
      question: "Leveren jullie in heel België?",
      answer: "Ja, wij leveren in heel België. Voor sommige afgelegen gebieden kan er een kleine toeslag van toepassing zijn."
    },
    {
      question: "Kan ik mijn bestelling annuleren?",
      answer: "Ja, u kunt uw bestelling kosteloos annuleren tot 24 uur voor de geplande levering. Neem hiervoor contact met ons op."
    },
    {
      question: "Hoe wordt de mazout geleverd?",
      answer: "Onze mazout wordt geleverd met een moderne tankwagen. Onze chauffeur vult uw tank rechtstreeks en zorgt voor een schone en veilige levering."
    },
    {
      question: "Krijg ik een factuur?",
      answer: "Ja, u ontvangt automatisch een factuur per e-mail na de levering. Deze is ook beschikbaar in uw klantaccount."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Veelgestelde Vragen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hier vindt u antwoorden op de meest gestelde vragen over onze service en mazoutlevering
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-red-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
