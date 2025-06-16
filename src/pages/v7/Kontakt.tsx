
import React from 'react';
import V7Header from '@/components/v7/Header';
import V7Footer from '@/components/v7/Footer';

const V7Kontakt = () => {
  return (
    <div className="min-h-screen bg-white">
      <V7Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contactgegevens</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Adres</h3>
                  <p className="text-gray-600">
                    MazoutVandaag BVBA<br />
                    Grote Markt 1<br />
                    1000 Brussel<br />
                    België
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Telefoon</h3>
                  <p className="text-gray-600">+32 2 123 4567</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">E-mail</h3>
                  <p className="text-gray-600">info@mazoutvandaag.com</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Openingstijden</h3>
                  <p className="text-gray-600">
                    Maandag - Vrijdag: 8:00 - 18:00<br />
                    Zaterdag: 9:00 - 16:00<br />
                    Zondag: Gesloten
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hoe kunnen wij u helpen?</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900">Voor bestellingen</h3>
                  <p className="text-gray-600">
                    U kunt direct online bestellen via onze website. Voor vragen over 
                    uw bestelling kunt u contact opnemen via telefoon of e-mail.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Voor leveringen</h3>
                  <p className="text-gray-600">
                    Onze chauffeur neemt contact op voordat de levering plaatsvindt. 
                    Zorg ervoor dat u bereikbaar bent op het opgegeven telefoonnummer.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Voor technische vragen</h3>
                  <p className="text-gray-600">
                    Voor vragen over mazout kwaliteit, opslag of andere technische 
                    zaken kunt u contact opnemen met onze specialisten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <V7Footer />
    </div>
  );
};

export default V7Kontakt;
