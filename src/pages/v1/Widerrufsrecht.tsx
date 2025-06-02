
import React from 'react';
import Header from '@/components/v1/Header';
import Footer from '@/components/Footer';

const Widerrufsrecht = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Widerrufsrecht</h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Widerrufsbelehrung</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Widerrufsrecht</h3>
              <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
              <p className="mt-2">Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Ausübung des Widerrufsrechts</h2>
              <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (HeizölDirekt GmbH, Musterstraße 123, 12345 Musterstadt, E-Mail: info@heizoeldirekt.de) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Folgen des Widerrufes</h2>
              <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Besondere Hinweise</h2>
              <p className="bg-yellow-50 border border-yellow-200 rounded p-4">
                <strong>Wichtig:</strong> Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die schnell verderben können oder deren Verfallsdatum schnell überschritten würde. Bei Heizöl kann das Widerrufsrecht daher eingeschränkt sein, wenn die Ware bereits geliefert und in den Tank eingefüllt wurde.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Widerrufsrecht;
