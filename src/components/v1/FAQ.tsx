
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Wie schnell kann Heizöl geliefert werden?",
      answer: "Wir liefern Heizöl innerhalb von 4-7 Werktagen deutschlandweit. Bei dringenden Bestellungen bieten wir auch Express-Lieferungen auf Anfrage an. Die Lieferung ist kostenlos ab einer Bestellmenge von 3.000 Litern."
    },
    {
      question: "In welche Gebiete in Deutschland liefern Sie?",
      answer: "Wir liefern in ganz Deutschland, einschließlich aller Großstädte und ländlichen Gebiete. Unser Liefernetzwerk deckt alle deutschen Postleitzahlengebiete ab."
    },
    {
      question: "Welche Zahlungsmethoden akzeptieren Sie?",
      answer: "Wir akzeptieren verschiedene Zahlungsmethoden wie Banküberweisung, Lastschrift und Kreditkartenzahlungen. Sie erhalten Ihre Rechnung per E-Mail nach der Lieferung und können Ihre bevorzugte Zahlungsmethode wählen."
    },
    {
      question: "Welche Qualitätsstandards erfüllt Ihr Heizöl?",
      answer: "Alle unsere Heizölprodukte entsprechen den EN 590 europäischen Standards und werden regelmäßig von unabhängigen Laboren getestet. Wir garantieren höchste Qualität und Reinheit für optimale Heizleistung."
    },
    {
      question: "Gibt es eine Mindestbestellmenge?",
      answer: "Die Mindestbestellmenge beträgt 1.500 Liter. Bei Bestellungen ab 3.000 Litern ist die Lieferung kostenlos. Kleinere Mengen können eine Anfahrtspauschale von 25€ beinhalten."
    },
    {
      question: "Kann ich meinen Liefertermin selbst wählen?",
      answer: "Ja, während des Bestellvorgangs können Sie Ihren Wunschliefertermin aus verfügbaren Zeitfenstern auswählen. Wir versuchen, Sonderwünsche und kurzfristige Lieferungen nach Möglichkeit zu berücksichtigen."
    },
    {
      question: "Was passiert, wenn ich bei der Lieferung nicht zu Hause bin?",
      answer: "Unser Lieferteam kontaktiert Sie im Voraus, um die Lieferzeit zu bestätigen. Falls Sie nicht verfügbar sind, können wir die Lieferung an einem bestimmten Ort auf Ihrem Grundstück arrangieren oder einen neuen Termin vereinbaren."
    },
    {
      question: "Bieten Sie Notfalllieferungen an?",
      answer: "Ja, wir verstehen, dass Heizungsnotfälle auftreten können. Kontaktieren Sie unser Kundenservice-Team, und wir werden unser Bestes geben, um eine Notfalllieferung innerhalb von 24-48 Stunden zu arrangieren, je nach Verfügbarkeit."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-red-100 text-red-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
            <HelpCircle size={18} className="mr-2" />
            Häufig gestellte Fragen
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Fragen & Antworten
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finden Sie Antworten auf die häufigsten Fragen zu unserem Heizöl-Lieferservice
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
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <AccordionTrigger className="px-8 py-6 hover:no-underline">
                  <span className="text-left text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6">
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
            Haben Sie noch Fragen? Unser Kundenservice-Team hilft Ihnen gerne weiter.
          </p>
          <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl">
            Kontakt aufnehmen
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
