
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Eye, Lock, Database } from 'lucide-react';

const Datenschutz = () => {
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
              <Shield size={18} className="mr-2" />
              Datenschutzerklärung
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Datenschutz
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO
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
              {/* Overview */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
                <div className="flex items-start space-x-4">
                  <Shield className="text-blue-600 mt-1 flex-shrink-0" size={32} />
                  <div>
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Ihre Daten sind sicher</h2>
                    <p className="text-blue-800 mb-4">
                      Der Schutz Ihrer persönlichen Daten ist uns sehr wichtig. Wir verarbeiten Ihre 
                      Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2 text-blue-800">
                        <Lock size={16} />
                        <span className="text-sm">SSL-Verschlüsselung</span>
                      </div>
                      <div className="flex items-center space-x-2 text-blue-800">
                        <Database size={16} />
                        <span className="text-sm">Sichere Server</span>
                      </div>
                      <div className="flex items-center space-x-2 text-blue-800">
                        <Eye size={16} />
                        <span className="text-sm">Transparente Verarbeitung</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 1 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                  Verantwortlicher
                </h2>
                <div className="text-gray-700">
                  <p className="mb-4">
                    Verantwortlicher für die Datenverarbeitung auf dieser Website ist:
                  </p>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                    <p>
                      <strong>HeizölDirekt GmbH</strong><br />
                      Musterstraße 123<br />
                      12345 Musterstadt<br />
                      Deutschland<br /><br />
                      <strong>E-Mail:</strong> datenschutz@heizoeldirekt.de<br />
                      <strong>Telefon:</strong> 0800 123 456 7
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                  Datenerhebung auf unserer Website
                </h2>
                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookies</h3>
                    <p className="mb-3">
                      Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser 
                      auf Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot 
                      nutzerfreundlicher zu machen.
                    </p>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Wir verwenden folgende Cookie-Kategorien:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Technisch notwendige Cookies:</strong> Für die Grundfunktionen der Website</li>
                        <li>• <strong>Analyse-Cookies:</strong> Zur Verbesserung unserer Website (nur mit Einwilligung)</li>
                        <li>• <strong>Marketing-Cookies:</strong> Für personalisierte Werbung (nur mit Einwilligung)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Server-Log-Dateien</h3>
                    <p>
                      Der Provider der Seiten erhebt und speichert automatisch Informationen in 
                      Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. 
                      Diese Daten werden nach 7 Tagen automatisch gelöscht.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                  Bestellprozess und Kundenkonto
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Zur Abwicklung Ihrer Bestellung erheben wir folgende Daten:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Pflichtangaben</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Name und Anschrift</li>
                        <li>• E-Mail-Adresse</li>
                        <li>• Telefonnummer</li>
                        <li>• Lieferadresse</li>
                        <li>• Zahlungsinformationen</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Rechtsgrundlage</h4>
                      <p className="text-sm">
                        Die Verarbeitung erfolgt zur Erfüllung eines Vertrags 
                        (Art. 6 Abs. 1 lit. b DSGVO) sowie zur Erfüllung 
                        rechtlicher Verpflichtungen (Art. 6 Abs. 1 lit. c DSGVO).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
                  Ihre Rechte
                </h2>
                <div className="text-gray-700">
                  <p className="mb-4">Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Eye className="mr-2 text-red-600" size={16} />
                        Auskunftsrecht
                      </h4>
                      <p className="text-sm">Recht auf Auskunft über Ihre gespeicherten Daten</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Database className="mr-2 text-red-600" size={16} />
                        Berichtigungsrecht
                      </h4>
                      <p className="text-sm">Recht auf Korrektur falscher Daten</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Lock className="mr-2 text-red-600" size={16} />
                        Löschungsrecht
                      </h4>
                      <p className="text-sm">Recht auf Löschung Ihrer Daten</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Shield className="mr-2 text-red-600" size={16} />
                        Widerspruchsrecht
                      </h4>
                      <p className="text-sm">Recht auf Widerspruch gegen die Verarbeitung</p>
                    </div>
                  </div>
                  <div className="mt-6 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-blue-800">
                      <strong>Kontakt:</strong> Zur Ausübung Ihrer Rechte wenden Sie sich an: 
                      datenschutz@heizoeldirekt.de
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">5</span>
                  Datensicherheit
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren 
                    (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, 
                    die von Ihrem Browser unterstützt wird.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <Lock className="mx-auto text-green-600 mb-2" size={24} />
                      <h4 className="font-semibold text-gray-900 mb-1">SSL-Verschlüsselung</h4>
                      <p className="text-sm">256-Bit Verschlüsselung</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <Database className="mx-auto text-green-600 mb-2" size={24} />
                      <h4 className="font-semibold text-gray-900 mb-1">Sichere Server</h4>
                      <p className="text-sm">ISO 27001 zertifiziert</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <Shield className="mx-auto text-green-600 mb-2" size={24} />
                      <h4 className="font-semibold text-gray-900 mb-1">Regelmäßige Audits</h4>
                      <p className="text-sm">Jährliche Sicherheitsprüfungen</p>
                    </div>
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

export default Datenschutz;
