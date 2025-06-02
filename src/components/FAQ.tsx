
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "Wie schnell wird mein Heizöl geliefert?",
      answer: "In der Regel liefern wir innerhalb von 4-7 Werktagen nach Ihrer Bestellung. Bei kurzfristigen Bestellungen am Wochenende kann sich die Lieferung bis zum nächsten Werktag verzögern."
    },
    {
      question: "Ab welcher Menge liefern Sie kostenlos?",
      answer: "Ab einer Bestellmenge von 3.000 Litern liefern wir deutschlandweit kostenlos. Bei kleineren Mengen berechnen wir eine Anfahrtspauschale von 25€."
    },
    {
      question: "Welche Zahlungsmöglichkeiten bieten Sie an?",
      answer: "Sie können bequem per Banküberweisung, Lastschrift oder Kreditkarte bezahlen. Die Rechnung erhalten Sie per E-Mail direkt nach der Lieferung."
    },
    {
      question: "Wie wird die Qualität des Heizöls sichergestellt?",
      answer: "Unser Heizöl entspricht der DIN 51603-1 Norm und wird regelmäßig von unabhängigen Laboren geprüft. Sie erhalten zu jeder Lieferung einen Qualitätsnachweis."
    },
    {
      question: "Kann ich auch am Wochenende bestellen?",
      answer: "Ja, Sie können 24/7 online bestellen. Bestellungen am Wochenende werden am nächsten Werktag bearbeitet und geliefert."
    },
    {
      question: "Was passiert, wenn ich nicht zu Hause bin?",
      answer: "Kein Problem! Wir vereinbaren einen festen Liefertermin mit Ihnen. Falls Sie verhindert sind, kann auch eine bevollmächtigte Person die Lieferung entgegennehmen."
    },
    {
      question: "Liefern Sie auch in meine Region?",
      answer: "Wir liefern deutschlandweit in fast alle Regionen. Geben Sie einfach Ihre PLZ in unseren Rechner ein - falls wir nicht liefern können, erhalten Sie sofort eine entsprechende Meldung."
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
            Häufige Fragen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um Ihre Heizölbestellung
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-b-0">
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Haben Sie weitere Fragen? Unser Kundenservice hilft Ihnen gerne weiter.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl">
            Kontakt aufnehmen
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
