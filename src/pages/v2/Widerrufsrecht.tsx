
import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Clock, Mail, AlertTriangle } from 'lucide-react';
import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';

const Widerrufsrecht = () => {
  const steps = [
    {
      icon: Clock,
      title: "14 Tage Bedenkzeit",
      content: "Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen."
    },
    {
      icon: Mail,
      title: "Widerruf mitteilen",
      content: "Informieren Sie uns mittels einer eindeutigen Erklärung über Ihren Entschluss, den Vertrag zu widerrufen."
    },
    {
      icon: RotateCcw,
      title: "Rückerstattung",
      content: "Wir erstatten alle Zahlungen unverzüglich und spätestens binnen vierzehn Tagen zurück."
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
              Widerrufsrecht
            </h1>
            <p className="text-lg text-slate-600">
              Ihr Recht auf Widerruf verständlich erklärt
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <step.icon size={24} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h2>
                <p className="text-gray-700 leading-relaxed">{step.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Widerrufsbelehrung</h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Widerrufsrecht</h3>
                <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.</p>
              </section>

              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Ausübung des Widerrufsrechts</h3>
                <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Green Oil Trade and Service GmbH, Beethovenstraße 15, 60325 Frankfurt am Main, E-Mail: kontakt@oilexpress.de) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
              </section>

              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Folgen des Widerrufes</h3>
                <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.</p>
              </section>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6"
          >
            <div className="flex items-center mb-4">
              <AlertTriangle className="text-yellow-600 mr-3" size={24} />
              <h3 className="text-lg font-semibold text-yellow-800">Besondere Hinweise</h3>
            </div>
            <p className="text-yellow-700">
              <strong>Wichtig:</strong> Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die schnell verderben können oder deren Verfallsdatum schnell überschritten würde. Bei Heizöl kann das Widerrufsrecht daher eingeschränkt sein, wenn die Ware bereits geliefert und in den Tank eingefüllt wurde.
            </p>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Widerrufsrecht;
