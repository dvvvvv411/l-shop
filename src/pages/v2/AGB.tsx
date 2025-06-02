
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';

const AGB = () => {
  const sections = [
    {
      icon: FileText,
      title: "Geltungsbereich",
      content: "Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der Green Oil Trade and Service GmbH und ihren Kunden über die Lieferung von Premium-Heizöl."
    },
    {
      icon: CheckCircle,
      title: "Vertragsschluss",
      content: "Der Vertrag kommt durch die Annahme der Bestellung durch die Green Oil Trade and Service GmbH zustande. Die Annahme erfolgt durch schriftliche Auftragsbestätigung oder durch Auslieferung der Ware."
    },
    {
      icon: CreditCard,
      title: "Preise und Zahlungsbedingungen",
      content: "Es gelten die Preise zum Zeitpunkt der Bestellung. Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt per Überweisung nach Rechnungsstellung."
    },
    {
      icon: AlertCircle,
      title: "Lieferung und Gewährleistung",
      content: "Die Lieferung erfolgt frei Bordsteinkante. Für die gelieferte Ware übernehmen wir die gesetzliche Gewährleistung. Reklamationen sind unverzüglich schriftlich anzuzeigen."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Allgemeine Geschäftsbedingungen
            </h1>
            <p className="text-lg text-slate-600">
              Transparente Bedingungen für unsere Zusammenarbeit
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-3 rounded-lg mr-4">
                    <section.icon size={24} className="text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Detaillierte Bestimmungen</h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-2">§ 1 Geltungsbereich</h3>
                <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der Green Oil Trade and Service GmbH und ihren Kunden über die Lieferung von Premium-Heizöl. Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, wir haben ausdrücklich schriftlich zugestimmt.</p>
              </section>

              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-2">§ 2 Vertragsschluss</h3>
                <p>Der Vertrag kommt durch die Annahme der Bestellung durch die Green Oil Trade and Service GmbH zustande. Die Annahme erfolgt durch schriftliche Auftragsbestätigung oder durch Auslieferung der Ware. Unsere Angebote sind freibleibend und unverbindlich.</p>
              </section>

              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-2">§ 3 Preise und Zahlungsbedingungen</h3>
                <p>Es gelten die Preise zum Zeitpunkt der Bestellung. Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt per Überweisung nach Rechnungsstellung innerhalb von 14 Tagen ohne Abzug.</p>
              </section>

              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-2">§ 4 Lieferung</h3>
                <p>Die Lieferung erfolgt frei Bordsteinkante. Der Kunde hat dafür zu sorgen, dass der Lieferort zugänglich ist und die Belieferung ordnungsgemäß erfolgen kann. Liefertermine sind nur dann verbindlich, wenn sie von uns schriftlich bestätigt wurden.</p>
              </section>

              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-2">§ 5 Gewährleistung</h3>
                <p>Für die gelieferte Ware übernehmen wir die gesetzliche Gewährleistung. Reklamationen sind unverzüglich nach Entdeckung des Mangels schriftlich anzuzeigen. Bei berechtigten Mängelrügen leisten wir nach unserer Wahl Nacherfüllung durch Nachbesserung oder Ersatzlieferung.</p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AGB;
