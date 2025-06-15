
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "Wie schnell wird mein Heizöl geliefert?",
      answer: "Wir liefern Ihr Heizöl innerhalb von 4-7 Werktagen nach Bestelleingang direkt zu Ihnen nach Hause. Bei dringenden Bestellungen ist oft auch eine schnellere Lieferung möglich."
    },
    {
      question: "Ab welcher Menge ist die Lieferung kostenlos?",
      answer: "Die Lieferung ist ab einer Bestellmenge von 3.000 Litern kostenlos. Bei kleineren Mengen berechnen wir eine Anfahrtspauschale von 89€."
    },
    {
      question: "Welche Zahlungsmöglichkeiten gibt es?",
      answer: "Sie können bequem per Vorkasse (Überweisung) bezahlen. Nach Ihrer Bestellung erhalten Sie eine Rechnung mit allen Zahlungsdetails."
    },
    {
      question: "Ist Ihr Heizöl zertifiziert?",
      answer: "Ja, all unsere Heizöl-Sorten entsprechen der DIN EN 590 Norm und werden regelmäßig von unabhängigen Laboren geprüft. Sie erhalten höchste Qualität zu fairen Preisen."
    },
    {
      question: "Liefern Sie deutschlandweit?",
      answer: "Ja, wir liefern deutschlandweit. Geben Sie einfach Ihre Postleitzahl in unseren Preisrechner ein und prüfen Sie, ob wir auch in Ihr Gebiet liefern."
    },
    {
      question: "Was ist der Unterschied zwischen Standard und Premium Heizöl?",
      answer: "Unser Standard Heizöl erfüllt alle DIN-Normen. Das Premium Heizöl enthält zusätzliche Additive für optimale Verbrennung, längere Lagerstabilität und reduzierten Wartungsaufwand."
    },
    {
      question: "Kann ich einen Wunschtermin für die Lieferung angeben?",
      answer: "Ja, Sie können bei der Bestellung Ihren Wunschtermin angeben. Wir versuchen diesen bestmöglich einzuhalten. Auch kurzfristige Termine sind oft möglich."
    },
    {
      question: "Wie erfahre ich, wenn mein Heizöl geliefert wird?",
      answer: "Sie erhalten eine Bestätigung per E-Mail und werden am Tag vor der Lieferung telefonisch kontaktiert, um den genauen Lieferzeitpunkt abzustimmen."
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
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um unseren Heizöl-Service
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
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
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
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Haben Sie weitere Fragen? Unser Kundenservice hilft gerne weiter!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:08941435467" 
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              089 41435467 anrufen
            </a>
            <a 
              href="/kontakt" 
              className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Kontakt aufnehmen
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
