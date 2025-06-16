
import React from 'react';
import V7Header from '@/components/v7/Header';
import V7Footer from '@/components/v7/Footer';

const V7Liefergebiet = () => {
  return (
    <div className="min-h-screen bg-white">
      <V7Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Leveringsgebied</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Heel België</h2>
              <p className="text-lg text-gray-600 mb-6">
                MazoutVandaag levert in heel België. Van de drukke steden tot de 
                rustige plattelandsgebieden - wij zorgen ervoor dat uw mazout op tijd wordt geleverd.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-50 p-6 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">Vlaanderen</h3>
                  <p className="text-gray-600">
                    Antwerpen, Gent, Brugge, Leuven, Hasselt en alle andere steden en gemeenten
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">Wallonië</h3>
                  <p className="text-gray-600">
                    Luik, Namen, Bergen, Charleroi, Doornik en alle andere steden en gemeenten
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">Brussel</h3>
                  <p className="text-gray-600">
                    Brussels Hoofdstedelijk Gewest en alle 19 gemeenten
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Leveringsvoorwaarden</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Standaard Levering</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Minimale bestelling: 500 liter</li>
                    <li>• Leveringskosten: €45 (onder 3.000L)</li>
                    <li>• Gratis levering vanaf 3.000 liter</li>
                    <li>• Levertijd: 3-5 werkdagen</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Toegankelijkheid</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Tankwagen moet het pand kunnen bereiken</li>
                    <li>• Maximale slanglengte: 30 meter</li>
                    <li>• Vulpunt moet toegankelijk zijn</li>
                    <li>• Parkeerplaats voor vrachtwagen nodig</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Leveringsproces</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Contactopname</h4>
                      <p className="text-gray-600">Onze chauffeur belt u op de dag van levering</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Aankomst</h4>
                      <p className="text-gray-600">Chauffeur arriveert binnen het afgesproken tijdvenster</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Levering</h4>
                      <p className="text-gray-600">Professionele levering rechtstreeks in uw tank</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Afronding</h4>
                      <p className="text-gray-600">Leveringsbon en eventuele documentatie</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <V7Footer />
    </div>
  );
};

export default V7Liefergebiet;
