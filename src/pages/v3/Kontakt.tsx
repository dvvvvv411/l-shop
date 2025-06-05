import React from 'react';
import Header from '@/components/v3/Header';
import Footer from '@/components/Footer';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';
import { Mountain, Phone, Mail, MapPin, Clock } from 'lucide-react';
const Kontakt = () => {
  useDomainPageMeta('kontakt');
  return <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Mountain className="h-10 w-10 text-violet-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Kontakt & Beratung</h1>
            </div>
            <p className="text-xl text-gray-600">Ihr österreichweiter Partner für Premium-Heizöl</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-violet-100">
              <h2 className="text-2xl font-bold text-violet-800 mb-6">Unser Service-Team</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-violet-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Telefon</h3>
                    <p className="text-violet-600 font-medium">+43 1 234 5678</p>
                    <p className="text-sm text-gray-600">Kostenlose Beratung</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">E-Mail</h3>
                    <p className="text-violet-600 font-medium">info@heizoel-austria.com</p>
                    <p className="text-sm text-gray-600">Schnelle Antwort garantiert</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-violet-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Adresse</h3>
                    <p className="text-gray-700">Brünner Straße 209/8/9</p>
                    <p className="text-gray-700">1210 Wien</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Öffnungszeiten</h3>
                    <p className="text-gray-700">Montag - Freitag: 8:00 - 18:00</p>
                    <p className="text-gray-700">Samstag: 9:00 - 14:00</p>
                    <p className="text-gray-700">Sonntag: Geschlossen</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg">
                <h3 className="font-semibold text-violet-800 mb-2">24/7 Notfall-Service</h3>
                <p className="text-sm text-gray-700">
                  Für dringende Heizöl-Lieferungen außerhalb der Geschäftszeiten 
                  stehen wir Ihnen gerne zur Verfügung.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-violet-100">
              <h2 className="text-2xl font-bold text-violet-800 mb-6">Nachricht senden</h2>
              
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vorname *
                    </label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nachname *
                    </label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail *
                  </label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bundesland
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                    <option value="">Bitte wählen</option>
                    <option value="wien">Wien</option>
                    <option value="niederoesterreich">Niederösterreich</option>
                    <option value="oberoesterreich">Oberösterreich</option>
                    <option value="salzburg">Salzburg</option>
                    <option value="tirol">Tirol</option>
                    <option value="vorarlberg">Vorarlberg</option>
                    <option value="kaernten">Kärnten</option>
                    <option value="steiermark">Steiermark</option>
                    <option value="burgenland">Burgenland</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nachricht *
                  </label>
                  <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent" placeholder="Wie können wir Ihnen helfen?" required />
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white py-3 px-6 rounded-lg font-medium hover:from-violet-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl border border-amber-300/50">
                  <Mountain className="inline h-5 w-5 mr-2" />
                  Nachricht senden
                </button>
              </form>
            </div>
          </div>

          {/* Austrian Regions Coverage */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-violet-100">
            <h2 className="text-2xl font-bold text-violet-800 mb-6 text-center">
              Österreichweite Abdeckung
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Ostösterreich</h3>
                <p className="text-sm text-gray-600">Wien, Niederösterreich, Burgenland</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Westösterreich</h3>
                <p className="text-sm text-gray-600">Tirol, Vorarlberg, Salzburg</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Südösterreich</h3>
                <p className="text-sm text-gray-600">Steiermark, Kärnten, Oberösterreich</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Kontakt;