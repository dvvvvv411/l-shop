
import React from 'react';
import V7Header from '@/components/v7/Header';
import V7Footer from '@/components/v7/Footer';

const V7Produkte = () => {
  return (
    <div className="min-h-screen bg-white">
      <V7Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Mazout Producten</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Standaard Mazout</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Productkenmerken</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Hoge kwaliteit conform Belgische normen</li>
                      <li>• Geschikt voor alle standaard verwarmingsinstallaties</li>
                      <li>• Zwavelarm voor milieuvriendelijke verbranding</li>
                      <li>• Additieven toegevoegd voor stabiliteit</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Specificaties</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Dichtheid: 0,82-0,86 kg/l bij 15°C</li>
                      <li>• Zwavelgehalte: max. 10 mg/kg</li>
                      <li>• Vlampunt: min. 55°C</li>
                      <li>• Bewaarbaar tot 12 maanden</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kwaliteitsgarantie</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Gecertificeerd</h3>
                  <p className="text-gray-600">Conform Belgische kwaliteitsnormen</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏭</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Raffinaderij Direct</h3>
                  <p className="text-gray-600">Rechtstreeks van de raffinaderij</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚛</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Verse Voorraad</h3>
                  <p className="text-gray-600">Altijd verse mazout leveringen</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Opslagtips</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <ul className="space-y-3 text-gray-700">
                  <li>• Bewaar mazout in een schone, droge tank</li>
                  <li>• Zorg voor goede ventilatie van de opslagruimte</li>
                  <li>• Controleer regelmatig op lekken of corrosie</li>
                  <li>• Gebruik additieven bij langdurige opslag</li>
                  <li>• Laat de tank niet volledig leeg lopen (condensatie)</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
      <V7Footer />
    </div>
  );
};

export default V7Produkte;
