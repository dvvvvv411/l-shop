import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';
import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';

const Datenschutz = () => {
  usePageMeta('datenschutz');

  const sections = [
    {
      icon: Shield,
      title: "Datenschutz auf einen Blick",
      content: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können."
    },
    {
      icon: Lock,
      title: "Allgemeine Hinweise und Pflichtinformationen",
      content: "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung."
    },
    {
      icon: Eye,
      title: "Datenerfassung auf dieser Website",
      content: "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen."
    },
    {
      icon: UserCheck,
      title: "Ihre Rechte",
      content: "Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen."
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
              Datenschutzerklärung
            </h1>
            <p className="text-lg text-slate-600">
              Transparenz und Sicherheit für Ihre Daten
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Detaillierte Informationen</h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Verantwortliche Stelle</h3>
                <p>Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <div className="mt-2 p-4 bg-gray-50 rounded">
                  <p className="font-semibold">Green Oil Trade and Service GmbH</p>
                  <p>Kühgassfelderweg 13</p>
                  <p>90482 Nürnberg</p>
                  <p>Deutschland</p>
                  <p className="mt-2">E-Mail: info@greenoil-lieferung.de</p>
                  <p>Telefon: 0911 96643306</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-2">1. Datenverarbeitung</h3>
                <p>Wenn Sie diese Website besuchen, werden automatisch Informationen an den Server dieser Website gesendet. Diese Informationen werden temporär in einem sog. Logfile gespeichert.</p>
              </section>

              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-2">2. Kontaktformular</h3>
                <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.</p>
              </section>

              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-2">3. SSL-Verschlüsselung</h3>
                <p>Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt.</p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Datenschutz;
