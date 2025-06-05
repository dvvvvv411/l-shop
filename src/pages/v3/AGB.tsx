
import React from 'react';
import Header from '@/components/v3/Header';
import Footer from '@/components/v3/Footer';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';
import { Mountain } from 'lucide-react';

const AGB = () => {
  useDomainPageMeta('agb');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-violet-100">
          <div className="flex items-center mb-8">
            <Mountain className="h-8 w-8 text-violet-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Allgemeine Geschäftsbedingungen</h1>
          </div>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">§ 1 Geltungsbereich</h2>
              <div className="bg-violet-50 p-4 rounded-lg">
                <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der Sommer Öl und Industriebedarf GmbH und ihren Kunden über die Lieferung von Heizöl in Österreich. Österreichisches Recht findet Anwendung.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">§ 2 Vertragsschluss</h2>
              <p>Der Vertrag kommt durch die Annahme der Bestellung durch die Sommer Öl und Industriebedarf GmbH zustande. Die Annahme erfolgt durch schriftliche Auftragsbestätigung, E-Mail oder durch Auslieferung der Ware.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">§ 3 Preise und Zahlungsbedingungen</h2>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p>Es gelten die Preise zum Zeitpunkt der Bestellung. Alle Preise verstehen sich inklusive der gesetzlichen österreichischen Mehrwertsteuer (20%). Die Zahlung erfolgt per Überweisung nach Rechnungsstellung oder per Vorkasse.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">§ 4 Lieferung in Österreich</h2>
              <p>Die Lieferung erfolgt österreichweit frei Bordsteinkante. Der Kunde hat dafür zu sorgen, dass der Lieferort zugänglich ist und die Belieferung ordnungsgemäß erfolgen kann. Lieferzeiten sind unverbindlich, außer sie wurden ausdrücklich als verbindlich zugesagt.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">§ 5 Gewährleistung</h2>
              <p>Für die gelieferte Ware übernehmen wir die gesetzliche Gewährleistung nach österreichischem Recht. Reklamationen sind unverzüglich nach Entdeckung des Mangels schriftlich anzuzeigen. Die Gewährleistungsfrist beträgt 2 Jahre ab Lieferung.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">§ 6 Rücktrittsrecht für Verbraucher</h2>
              <div className="bg-violet-50 p-4 rounded-lg">
                <p>Verbraucher können binnen 14 Tagen ohne Angabe von Gründen vom Vertrag zurücktreten. Die Frist beginnt nach Erhalt der Ware und dieser Belehrung. Zur Wahrung der Frist genügt die rechtzeitige Absendung der Rücktrittserklärung.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">§ 7 Datenschutz</h2>
              <p>Ihre personenbezogenen Daten werden gemäß der österreichischen Datenschutz-Grundverordnung (DSGVO) verarbeitet. Weitere Informationen finden Sie in unserer Datenschutzerklärung.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-violet-800 mb-3">§ 8 Gerichtsstand und anzuwendendes Recht</h2>
              <p>Für alle Streitigkeiten aus diesem Vertragsverhältnis ist österreichisches Recht anwendbar. Gerichtsstand ist Wien, Österreich.</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AGB;
