
import React from 'react';
import Header from '@/components/v3/Header';
import Footer from '@/components/Footer';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';
import { Mountain, Shield } from 'lucide-react';

const Datenschutz = () => {
  useDomainPageMeta('datenschutz');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-violet-100">
          <div className="flex items-center mb-8">
            <Shield className="h-8 w-8 text-violet-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Datenschutzerklärung</h1>
          </div>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">1. Verantwortlicher</h2>
              <div className="bg-violet-50 p-4 rounded-lg">
                <p className="font-semibold">Heizöl Österreich GmbH</p>
                <p>Mariahilfer Straße 123, 1060 Wien, Österreich</p>
                <p>E-Mail: datenschutz@heizoel-austria.com</p>
                <p>Telefon: +43 1 234 5678</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
              <p>Wir erheben personenbezogene Daten nur im Rahmen der Geschäftsabwicklung und zur Erfüllung unserer vertraglichen Verpflichtungen. Dies umfasst:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Name und Kontaktdaten für die Lieferung</li>
                <li>Adressdaten für die Zustellung</li>
                <li>Rechnungsdaten für die Abwicklung</li>
                <li>Kommunikationsdaten für den Kundenservice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">3. Rechtsgrundlage der Verarbeitung</h2>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p>Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO zur Vertragserfüllung sowie lit. f DSGVO zur Wahrung berechtigter Interessen der ordnungsgemäßen Geschäftsabwicklung.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">4. Ihre Rechte</h2>
              <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">5. Speicherdauer</h2>
              <p>Wir speichern Ihre Daten nur so lange, wie es für die Erfüllung der Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen. Geschäftsdaten werden gemäß österreichischem Handelsrecht 7 Jahre aufbewahrt.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">6. Datenschutzbeauftragte/r</h2>
              <div className="bg-violet-50 p-4 rounded-lg">
                <p>Bei Fragen zum Datenschutz wenden Sie sich an:</p>
                <p>E-Mail: datenschutz@heizoel-austria.com</p>
                <p>Telefon: +43 1 234 5678</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">7. Beschwerderecht</h2>
              <p>Sie haben das Recht, sich bei der österreichischen Datenschutzbehörde zu beschweren:</p>
              <p className="mt-2">
                <strong>Österreichische Datenschutzbehörde</strong><br />
                Barichgasse 40-42, 1030 Wien<br />
                E-Mail: dsb@dsb.gv.at
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Datenschutz;
