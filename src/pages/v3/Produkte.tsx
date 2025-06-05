
import React from 'react';
import Header from '@/components/v3/Header';
import Footer from '@/components/Footer';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';
import { Mountain, Droplets, Flame, Shield, Award, CheckCircle } from 'lucide-react';

const Produkte = () => {
  useDomainPageMeta('produkte');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Droplets className="h-12 w-12 text-violet-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900">Premium Heizöl-Produkte</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hochwertige Heizöl-Qualität für österreichische Haushalte - 
              zertifiziert, getestet und für alle gängigen Heizanlagen geeignet.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Premium EL Heizöl */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-violet-100">
              <div className="flex items-center mb-6">
                <div className="bg-violet-100 p-3 rounded-lg mr-4">
                  <Flame className="h-8 w-8 text-violet-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-violet-800">Premium EL Heizöl</h2>
                  <p className="text-gray-600">Unser Standardprodukt für alle Haushalte</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Schwefelarm (max. 50 mg/kg)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">DIN EN 14214 zertifiziert</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Optimal für alle Brennertypen</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Hoher Heizwert (ca. 10 kWh/l)</span>
                </div>
              </div>

              <div className="bg-violet-50 p-4 rounded-lg">
                <h3 className="font-semibold text-violet-800 mb-2">Eigenschaften</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Schwefelgehalt: max. 50 mg/kg</li>
                  <li>• Flammpunkt: min. 55°C</li>
                  <li>• Dichte bei 15°C: 0,820-0,860 kg/l</li>
                  <li>• Wassergehalt: max. 200 mg/kg</li>
                </ul>
              </div>
            </div>

            {/* Premium Plus mit Additiven */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-amber-200">
              <div className="flex items-center mb-6">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">
                  <Award className="h-8 w-8 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-amber-700">Premium Plus</h2>
                  <p className="text-gray-600">Mit speziellen Additiven für optimale Leistung</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Alle Eigenschaften von Premium EL</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Antioxidantien für längere Lagerfähigkeit</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Metallinaktivatoren gegen Korrosion</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Verbesserte Fließeigenschaften</span>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-amber-700 mb-2">Zusätzliche Vorteile</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Verlängerte Lagerfähigkeit bis zu 2 Jahre</li>
                  <li>• Reduzierte Ablagerungen im Tank</li>
                  <li>• Optimierter Verbrennungsprozess</li>
                  <li>• Schutz vor Mikroorganismen</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quality Assurance */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16 border border-violet-100">
            <div className="text-center mb-8">
              <Shield className="h-12 w-12 text-violet-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-violet-800">Österreichische Qualitätsstandards</h2>
              <p className="text-gray-600 mt-2">
                Unser Heizöl erfüllt alle österreichischen und EU-Normen
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">ÖNORM C 1109</h3>
                <p className="text-sm text-gray-600">
                  Österreichische Norm für Heizöl Extra Leicht
                </p>
              </div>
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">DIN EN 14214</h3>
                <p className="text-sm text-gray-600">
                  Europäische Norm für flüssige Brennstoffe
                </p>
              </div>
              <div className="text-center">
                <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Laborgeprüft</h3>
                <p className="text-sm text-gray-600">
                  Regelmäßige Qualitätskontrollen in zertifizierten Labors
                </p>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">
              Technische Daten im Überblick
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-amber-300 mb-4">Heizöl Premium EL</h3>
                <div className="space-y-2 text-violet-100">
                  <div className="flex justify-between">
                    <span>Heizwert:</span>
                    <span>ca. 10,0 kWh/l</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dichte (15°C):</span>
                    <span>0,820-0,860 kg/l</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Schwefelgehalt:</span>
                    <span>max. 50 mg/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flammpunkt:</span>
                    <span>min. 55°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wassergehalt:</span>
                    <span>max. 200 mg/kg</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-300 mb-4">Lieferqualität</h3>
                <div className="space-y-2 text-violet-100">
                  <div className="flex justify-between">
                    <span>Mindestmenge:</span>
                    <span>500 Liter</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Liefergenauigkeit:</span>
                    <span>± 2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temperatur:</span>
                    <span>15°C Referenz</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tankwagentyp:</span>
                    <span>TÜV-geprüft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lieferzeit:</span>
                    <span>24-48h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Produkte;
