
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mountain } from 'lucide-react';

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "Wie schnell wird mein Heizöl in Österreich geliefert?",
      answer: "In der Regel liefern wir österreichweit innerhalb von 2-5 Werktagen nach Ihrer Bestellung. Von Wien bis Innsbruck, von Salzburg bis Graz - wir beliefern alle Bundesländer zuverlässig."
    },
    {
      question: "Ab welcher Menge liefern Sie kostenlos in Österreich?",
      answer: "Ab einer Bestellmenge von 3.000 Litern liefern wir österreichweit kostenlos. Bei kleineren Mengen berechnen wir eine faire Anfahrtspauschale von €35."
    },
    {
      question: "Welche Zahlungsmöglichkeiten bieten Sie in Österreich an?",
      answer: "Sie können bequem per Banküberweisung, SEPA-Lastschrift oder Kreditkarte bezahlen. Alle Preise verstehen sich inklusive 20% österreichischer Mehrwertsteuer."
    },
    {
      question: "Entspricht Ihr Heizöl österreichischen Qualitätsstandards?",
      answer: "Ja, unser Heizöl entspricht der ÖNORM C 1109 und wird regelmäßig von österreichischen Prüflaboren kontrolliert. Sie erhalten zu jeder Lieferung einen Qualitätsnachweis."
    },
    {
      question: "Liefern Sie in alle österreichischen Bundesländer?",
      answer: "Ja, wir liefern in alle 9 Bundesländer Österreichs: Wien, Niederösterreich, Oberösterreich, Salzburg, Tirol, Vorarlberg, Kärnten, Steiermark und Burgenland."
    },
    {
      question: "Was passiert, wenn ich nicht zu Hause bin?",
      answer: "Kein Problem! Wir vereinbaren einen festen Liefertermin mit Ihnen. Falls Sie verhindert sind, kann auch eine bevollmächtigte Person die Lieferung entgegennehmen."
    },
    {
      question: "Gibt es spezielle Preise für österreichische Regionen?",
      answer: "Nein, wir bieten faire Einheitspreise für ganz Österreich. Ob Wien oder Vorarlberg - Sie zahlen den gleichen fairen Preis pro Liter."
    }
  ];

  const handleContactClick = () => {
    navigate('/kontakt');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-violet-100 to-amber-100 px-6 py-3 rounded-full mb-6">
            <Mountain className="h-5 w-5 text-violet-600 mr-2" />
            <span className="text-violet-800 font-semibold">Häufige Fragen</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Antworten für Österreich
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um Ihre Heizölbestellung in Österreich
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-violet-100">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-violet-100 last:border-b-0">
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-violet-600 transition-colors py-4">
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
          <div className="bg-gradient-to-r from-violet-600 to-amber-500 rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Haben Sie weitere Fragen?</h3>
            <p className="text-violet-100 mb-6">
              Unser österreichisches Kundenservice-Team hilft Ihnen gerne weiter.
            </p>
            <button 
              onClick={handleContactClick}
              className="bg-white text-violet-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-violet-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Kontakt aufnehmen
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
