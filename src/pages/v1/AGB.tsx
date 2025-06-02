
import React from 'react';
import Header from '@/components/v1/Header';
import Footer from '@/components/Footer';

const AGB = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Allgemeine Geschäftsbedingungen</h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">§ 1 Geltungsbereich</h2>
              <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der STANTON GmbH und ihren Kunden über die Lieferung von Heizöl.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">§ 2 Vertragsschluss</h2>
              <p>Der Vertrag kommt durch die Annahme der Bestellung durch die STANTON GmbH zustande. Die Annahme erfolgt durch schriftliche Auftragsbestätigung oder durch Auslieferung der Ware.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">§ 3 Preise und Zahlungsbedingungen</h2>
              <p>Es gelten die Preise zum Zeitpunkt der Bestellung. Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt per Überweisung nach Rechnungsstellung.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">§ 4 Lieferung</h2>
              <p>Die Lieferung erfolgt frei Bordsteinkante. Der Kunde hat dafür zu sorgen, dass der Lieferort zugänglich ist und die Belieferung ordnungsgemäß erfolgen kann.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">§ 5 Gewährleistung</h2>
              <p>Für die gelieferte Ware übernehmen wir die gesetzliche Gewährleistung. Reklamationen sind unverzüglich nach Entdeckung des Mangels schriftlich anzuzeigen.</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AGB;
