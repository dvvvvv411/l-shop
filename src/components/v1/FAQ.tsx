
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Wie schnell wird mein Heizöl geliefert?",
    answer: "Die Lieferung erfolgt deutschlandweit innerhalb von 4-7 Werktagen nach Bestelleingang. Sie erhalten eine Auftragsbestätigung mit dem geplanten Liefertermin."
  },
  {
    question: "Welche Mindestmenge muss ich bestellen?",
    answer: "Die Mindestbestellmenge beträgt 500 Liter. Ab 3.000 Liter entfallen die Anfahrtskosten und Sie profitieren von besseren Konditionen."
  },
  {
    question: "Wie wird die Qualität des Heizöls sichergestellt?",
    answer: "Unser Heizöl entspricht der DIN 51603-1 und wird regelmäßig von unabhängigen Laboren geprüft. Wir bieten sowohl Standard- als auch Premium-Qualität mit Additiven an."
  },
  {
    question: "Welche Zahlungsmöglichkeiten gibt es?",
    answer: "Sie zahlen bequem per Überweisung nach Erhalt der Rechnung. Die Rechnung erhalten Sie nach erfolgter Lieferung per E-Mail."
  },
  {
    question: "Was kostet die Lieferung?",
    answer: "Ab einer Bestellmenge von 3.000 Litern ist die Anfahrt kostenlos. Bei kleineren Mengen berechnen wir eine faire Anfahrtspauschale je nach Entfernung."
  },
  {
    question: "In welche Gebiete liefern Sie?",
    answer: "Wir liefern deutschlandweit in alle Bundesländer. Geben Sie einfach Ihre Postleitzahl ein und prüfen Sie die Verfügbarkeit in Ihrem Gebiet."
  },
  {
    question: "Kann ich einen Wunschtermin für die Lieferung angeben?",
    answer: "Ja, Sie können bei der Bestellung Ihren Wunschtermin angeben. Wir versuchen diesen bestmöglich zu berücksichtigen und bestätigen Ihnen den finalen Termin."
  },
  {
    question: "Was passiert, wenn ich zum Liefertermin nicht da bin?",
    answer: "Bitte sorgen Sie dafür, dass jemand vor Ort ist oder der Tankzugang frei zugänglich ist. Bei Problemen kontaktiert Sie unser Fahrer telefonisch."
  }
];

const FAQ = () => {
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
            Häufig gestellte Fragen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Antworten auf die wichtigsten Fragen rund um Ihren Heizöl-Kauf
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
                className="bg-white rounded-lg border shadow-sm"
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
      </div>
    </section>
  );
};

export default FAQ;
