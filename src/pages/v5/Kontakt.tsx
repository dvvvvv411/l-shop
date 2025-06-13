
import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
import { Mail, MapPin, Clock } from 'lucide-react';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Kontakt = () => {
  useDomainFavicon();
  useDomainPageMeta('kontakt');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contattaci</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-green-50 to-red-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informazioni di contatto</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Mail className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@gasoliocasa.it</p>
                      <p className="text-sm text-gray-500">Risposta entro 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <MapPin className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Indirizzo</h3>
                      <p className="text-gray-600">
                        Via delle Terme, 13<br />
                        Falerone (FM), 63837<br />
                        Marche, Italia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Clock className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Orari di apertura</h3>
                      <p className="text-gray-600">
                        Lunedì - Venerdì: 8:00 - 18:00<br />
                        Sabato: 9:00 - 13:00<br />
                        Domenica: Chiuso
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Invia un messaggio</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cognome *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Oggetto *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Seleziona un oggetto</option>
                    <option value="richiesta-preventivo">Richiesta preventivo</option>
                    <option value="informazioni-consegna">Informazioni consegna</option>
                    <option value="qualita-prodotto">Qualità prodotto</option>
                    <option value="reclamo">Reclamo</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Messaggio *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Descrivi la tua richiesta..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
                >
                  Invia messaggio
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Kontakt;
