
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { RotateCcw, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const Widerrufsrecht = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <RotateCcw size={18} className="mr-2" />
              Widerrufsrecht
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Widerrufsrecht
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Informationen zu Ihrem Widerrufsrecht bei Verbraucherverträgen
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* Important Notice */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="text-orange-600 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-orange-900 mb-2">Wichtiger Hinweis</h3>
                    <p className="text-orange-800">
                      Bei Heizöl-Lieferungen gelten besondere Bestimmungen zum Widerrufsrecht. 
                      Bitte lesen Sie diese Informationen sorgfältig durch.
                    </p>
                  </div>
                </div>
              </div>

              {/* Widerrufsbelehrung */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <RotateCcw className="mr-3 text-red-600" />
                  Widerrufsbelehrung
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Widerrufsrecht</h3>
                    <p className="mb-4">
                      Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen 
                      Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, 
                      an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, 
                      die Waren in Besitz genommen haben bzw. hat.
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="text-blue-600" size={20} />
                        <span className="font-semibold text-blue-900">
                          Widerrufsfrist: 14 Tage ab Vertragsschluss
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Ausübung des Widerrufsrechts</h3>
                    <p className="mb-4">
                      Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen 
                      Erklärung (z.B. ein mit der Post versandter Brief, Telefax oder E-Mail) 
                      über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="font-semibold text-gray-900 mb-2">Kontakt für Widerruf:</p>
                      <p>
                        HeizölDirekt GmbH<br />
                        Musterstraße 123<br />
                        12345 Musterstadt<br />
                        Deutschland<br /><br />
                        <strong>E-Mail:</strong> widerruf@heizoeldirekt.de<br />
                        <strong>Telefon:</strong> 0800 123 456 7
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Besonderheiten bei Heizöl */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center">
                  <AlertTriangle className="mr-3 text-red-600" />
                  Besonderheiten bei Heizöl-Lieferungen
                </h2>
                <div className="space-y-4 text-red-800">
                  <p>
                    <strong>Wichtiger Hinweis:</strong> Das Widerrufsrecht erlischt bei Verträgen 
                    zur Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung 
                    eine individuelle Auswahl oder Bestimmung durch den Verbraucher maßgeblich ist 
                    oder die eindeutig auf die persönlichen Bedürfnisse des Verbrauchers zugeschnitten sind.
                  </p>
                  <p>
                    Bei Heizöl-Lieferungen kann das Widerrufsrecht bereits vor Ablauf der 14-Tage-Frist 
                    erlöschen, wenn die Lieferung entsprechend Ihrer Bestellung begonnen hat.
                  </p>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-red-500 mt-4">
                    <p className="text-red-900">
                      <strong>Das Widerrufsrecht erlischt insbesondere:</strong><br />
                      • Bei bereits begonnener Lieferung von Heizöl<br />
                      • Bei kundenspezifisch gemischten Heizöl-Qualitäten<br />
                      • Bei Eillieferungen auf ausdrücklichen Kundenwunsch
                    </p>
                  </div>
                </div>
              </div>

              {/* Widerrufsformular */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Muster-Widerrufsformular
                </h2>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)
                  </p>
                  <div className="space-y-4">
                    <p>An HeizölDirekt GmbH, Musterstraße 123, 12345 Musterstadt, widerruf@heizoeldirekt.de:</p>
                    <p>
                      Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag 
                      über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p>Bestellt am (*)/erhalten am (*):</p>
                        <div className="border-b border-gray-300 mt-1"></div>
                      </div>
                      <div>
                        <p>Name des/der Verbraucher(s):</p>
                        <div className="border-b border-gray-300 mt-1"></div>
                      </div>
                      <div>
                        <p>Anschrift des/der Verbraucher(s):</p>
                        <div className="border-b border-gray-300 mt-1"></div>
                      </div>
                      <div>
                        <p>Unterschrift des/der Verbraucher(s):</p>
                        <div className="border-b border-gray-300 mt-1"></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm">Datum:</p>
                      <div className="border-b border-gray-300 mt-1 w-32"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">(*) Unzutreffendes streichen.</p>
                  </div>
                </div>
              </div>

              {/* Folgen des Widerrufs */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="mr-3 text-green-600" />
                  Folgen des Widerrufs
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von 
                    Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen 
                    Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von 
                    uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und 
                    spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung 
                    über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
                  </p>
                  <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                    <p className="text-yellow-800">
                      <strong>Wichtig:</strong> Bei bereits geliefertem Heizöl können Sie die Ware 
                      nicht zurücksenden. In diesem Fall ist ein Widerruf nicht mehr möglich.
                    </p>
                  </div>
                </div>
              </div>

              {/* Last Update */}
              <div className="text-center pt-8 border-t border-gray-200">
                <p className="text-gray-500">
                  Stand: Dezember 2024 | HeizölDirekt GmbH
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Widerrufsrecht;
