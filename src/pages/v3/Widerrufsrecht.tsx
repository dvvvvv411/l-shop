
import React from 'react';
import Header from '@/components/v3/Header';
import Footer from '@/components/Footer';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';
import { Mountain, ArrowLeft } from 'lucide-react';

const Widerrufsrecht = () => {
  useDomainPageMeta('widerrufsrecht');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-violet-100">
          <div className="flex items-center mb-8">
            <ArrowLeft className="h-8 w-8 text-violet-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Widerrufsrecht & Widerrufsbelehrung</h1>
          </div>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Widerrufsbelehrung für Verbraucher</h2>
              <div className="bg-violet-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Widerrufsrecht:</p>
                <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Widerrufsfrist</h2>
              <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Ausübung des Widerrufsrechts</h2>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:</p>
                <div className="mt-2">
                  <p className="font-semibold">Heizöl Österreich GmbH</p>
                  <p>Mariahilfer Straße 123</p>
                  <p>1060 Wien, Österreich</p>
                  <p>E-Mail: widerruf@heizoel-austria.com</p>
                  <p>Telefon: +43 1 234 5678</p>
                </div>
                <p className="mt-2">mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Widerrufsfolgen</h2>
              <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Rückgabe der Waren</h2>
              <div className="bg-violet-50 p-4 rounded-lg">
                <p>Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Kosten der Rücksendung</h2>
              <p>Sie tragen die unmittelbaren Kosten der Rücksendung der Waren. Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Ausschluss des Widerrufsrechts</h2>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p>Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die schnell verderben können oder deren Verfallsdatum schnell überschritten würde, sowie bei Waren, die nach der Lieferung vermischt wurden und daher nicht mehr voneinander getrennt werden können.</p>
              </div>
            </section>

            <section className="border-t border-violet-200 pt-6">
              <h2 className="text-xl font-semibold text-violet-800 mb-3">Muster-Widerrufsformular</h2>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="font-semibold mb-2">Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück:</p>
                <div className="mt-4 space-y-2 text-sm">
                  <p>An: Heizöl Österreich GmbH, Mariahilfer Straße 123, 1060 Wien, E-Mail: widerruf@heizoel-austria.com</p>
                  <p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*):</p>
                  <p>Bestellt am (*) / erhalten am (*):</p>
                  <p>Name des/der Verbraucher(s):</p>
                  <p>Anschrift des/der Verbraucher(s):</p>
                  <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):</p>
                  <p>Datum:</p>
                  <p className="text-xs">(*) Unzutreffendes streichen</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Widerrufsrecht;
