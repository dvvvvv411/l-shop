
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

const AGB = () => {
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
              <FileText size={18} className="mr-2" />
              Allgemeine Geschäftsbedingungen
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              AGB
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Allgemeine Geschäftsbedingungen für die Lieferung von Heizöl
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
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="text-blue-600 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Wichtiger Hinweis</h3>
                    <p className="text-blue-800">
                      Diese AGB gelten für alle Lieferungen von HeizölDirekt GmbH. 
                      Mit der Bestellung akzeptieren Sie automatisch diese Bedingungen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 1 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                  Geltungsbereich
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Diese Allgemeinen Geschäftsbedingungen gelten für alle Lieferungen von Heizöl 
                    durch die HeizölDirekt GmbH (nachfolgend "Verkäufer") an Verbraucher und 
                    Unternehmer (nachfolgend "Käufer").
                  </p>
                  <p>
                    Abweichende Bedingungen des Käufers werden nicht anerkannt, es sei denn, 
                    der Verkäufer stimmt ihrer Geltung ausdrücklich schriftlich zu.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                  Vertragsschluss
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes 
                    Angebot, sondern einen unverbindlichen Katalog dar.
                  </p>
                  <p>
                    Durch das Absenden der Bestellung gibt der Käufer ein verbindliches Angebot 
                    zum Erwerb der bestellten Waren ab. Der Verkäufer kann dieses Angebot innerhalb 
                    von 5 Tagen annehmen.
                  </p>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="text-green-600" size={20} />
                      <span className="font-semibold text-green-800">
                        Der Vertrag kommt mit der Auftragsbestätigung per E-Mail zustande.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                  Preise und Zahlung
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer und 
                    sonstiger Preisbestandteile. Hinzu kommen etwaige Lieferkosten.
                  </p>
                  <p>
                    Die Zahlung erfolgt wahlweise per Vorkasse, Rechnung oder Lastschrift. 
                    Bei Zahlung per Vorkasse ist der Rechnungsbetrag innerhalb von 7 Tagen 
                    nach Vertragsschluss zu entrichten.
                  </p>
                  <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                    <p className="text-yellow-800">
                      <strong>Wichtig:</strong> Bei Lieferungen ab 3.000 Litern entfallen die Anfahrtskosten.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
                  Lieferung
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Die Lieferung erfolgt deutschlandweit an die vom Käufer angegebene Lieferadresse. 
                    Die Lieferzeit beträgt in der Regel 24-96 Stunden je nach Liefergebiet.
                  </p>
                  <p>
                    Der Käufer ist verpflichtet, zum vereinbarten Liefertermin anwesend zu sein 
                    oder eine bevollmächtigte Person zu benennen. Bei erfolgloser Anlieferung 
                    können zusätzliche Kosten entstehen.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Mindestbestellmengen</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Zone 1: 1.000 Liter</li>
                        <li>• Zone 2: 1.500 Liter</li>
                        <li>• Zone 3: 2.000 Liter</li>
                        <li>• Zone 4: 2.500 Liter</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Lieferzeiten</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Zone 1: 24-48h</li>
                        <li>• Zone 2: 48-72h</li>
                        <li>• Zone 3: 48-72h</li>
                        <li>• Zone 4: 72-96h</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">5</span>
                  Gewährleistung und Haftung
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Es gelten die gesetzlichen Gewährleistungsbestimmungen. Das gelieferte Heizöl 
                    entspricht der DIN 51603-1 Norm und wird regelmäßig qualitätskontrolliert.
                  </p>
                  <p>
                    Die Haftung des Verkäufers ist auf Vorsatz und grobe Fahrlässigkeit beschränkt, 
                    es sei denn, es handelt sich um die Verletzung wesentlicher Vertragspflichten 
                    oder Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">6</span>
                  Schlussbestimmungen
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. 
                    Erfüllungsort und Gerichtsstand ist Musterstadt.
                  </p>
                  <p>
                    Sollten einzelne Bestimmungen dieser AGB unwirksam sein, 
                    bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                  </p>
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

export default AGB;
