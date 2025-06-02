
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const FAQ = () => {
  const faqs = [{
    question: "Wie schnell wird mein Heizöl geliefert?",
    answer: "In der Regel liefern wir innerhalb von 4-7 Werktagen nach Ihrer Bestellung. Bei kurzfristigen Bestellungen am Wochenende kann sich die Lieferung bis zum nächsten Werktag verzögern."
  }, {
    question: "Ab welcher Menge liefern Sie kostenlos?",
    answer: "Ab einer Bestellmenge von 3.000 Litern liefern wir deutschlandweit kostenlos. Bei kleineren Mengen berechnen wir eine Anfahrtspauschale von 25€."
  }, {
    question: "Welche Zahlungsmöglichkeiten bieten Sie an?",
    answer: "Sie können bequem per Banküberweisung, Lastschrift oder Kreditkarte bezahlen. Die Rechnung erhalten Sie per E-Mail direkt nach der Lieferung."
  }, {
    question: "Wie wird die Qualität des Heizöls sichergestellt?",
    answer: "Unser Heizöl entspricht der DIN 51603-1 Norm und wird regelmäßig von unabhängigen Laboren geprüft. Sie erhalten zu jeder Lieferung einen Qualitätsnachweis."
  }, {
    question: "Kann ich auch am Wochenende bestellen?",
    answer: "Ja, Sie können 24/7 online bestellen. Bestellungen am Wochenende werden am nächsten Werktag bearbeitet und geliefert."
  }, {
    question: "Was passiert, wenn ich nicht zu Hause bin?",
    answer: "Kein Problem! Wir vereinbaren einen festen Liefertermin mit Ihnen. Falls Sie verhindert sind, kann auch eine bevollmächtigte Person die Lieferung entgegennehmen."
  }, {
    question: "Liefern Sie auch in meine Region?",
    answer: "Wir liefern deutschlandweit in fast alle Regionen. Geben Sie einfach Ihre PLZ in unseren Rechner ein - falls wir nicht liefern können, erhalten Sie sofort eine entsprechende Meldung."
  }];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Häufige Fragen
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Haben Sie <span className="text-purple-600">Fragen?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hier finden Sie Antworten auf die häufigsten Fragen rund um unseren Heizöl-Service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-2"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-purple-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Weitere Fragen?
            </h3>
            <p className="text-gray-600 mb-6">
              Unser Kundenservice-Team steht Ihnen gerne zur Verfügung!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl">
                Kontakt aufnehmen
              </button>
              <button className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-all">
                📞 0800 123 456 789
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
