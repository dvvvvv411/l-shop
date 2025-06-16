
import React from 'react';
import V7Header from '@/components/v7/Header';
import V7Footer from '@/components/v7/Footer';

const V7Service = () => {
  return (
    <div className="min-h-screen bg-white">
      <V7Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Service</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Onze Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Mazout Levering</h3>
                  <p className="text-gray-600">
                    Betrouwbare levering van kwaliteitsmezout binnen 3-5 werkdagen. 
                    Gratis levering vanaf 3.000 liter.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Online Bestellen</h3>
                  <p className="text-gray-600">
                    Eenvoudig online bestellen met directe prijsberekening en 
                    transparante kostenopbouw.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Klantenservice</h3>
                  <p className="text-gray-600">
                    Persoonlijke begeleiding van bestelling tot levering. 
                    Bereikbaar tijdens kantooruren.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Technisch Advies</h3>
                  <p className="text-gray-600">
                    Professioneel advies over mazout opslag, verbruik en 
                    kwaliteitseisen.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Leveringsproces</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Online Bestelling</h3>
                    <p className="text-gray-600">Plaats uw bestelling online met directe prijsberekening</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Bevestiging</h3>
                    <p className="text-gray-600">U ontvangt een bevestiging met factuur en betaalinstructies</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Betaling</h3>
                    <p className="text-gray-600">Betaal veilig via bankoverschrijving</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Levering</h3>
                    <p className="text-gray-600">Levering binnen 3-5 werkdagen na betalingsbevestiging</p>
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

export default V7Service;
