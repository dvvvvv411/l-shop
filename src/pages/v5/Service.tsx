
import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
import { Shield, Truck, Clock, Award, Phone, CheckCircle, Thermometer, Wrench } from 'lucide-react';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Service = () => {
  useDomainFavicon();
  useDomainPageMeta('service');

  const services = [
    {
      icon: Truck,
      title: "Consegna rapida e sicura",
      description: "Consegna del gasolio da riscaldamento in tutta Italia con tempi garantiti di 3-5 giorni lavorativi. I nostri autotrasportatori certificati utilizzano autocisterne moderne e sicure.",
      features: ["Consegna puntuale garantita", "Autotrasportatori certificati ADR", "Autocisterne con sistemi di sicurezza avanzati", "Tracking in tempo reale della consegna"]
    },
    {
      icon: Shield,
      title: "Gasolio certificato di qualità",
      description: "Forniamo esclusivamente gasolio conforme alle normative europee EN 590 e alle specifiche italiane per il riscaldamento domestico e industriale.",
      features: ["Certificazione EN 590", "Analisi di qualità su ogni lotto", "Gasolio a basso contenuto di zolfo", "Additivi per migliorare le prestazioni"]
    },
    {
      icon: Clock,
      title: "Servizio clienti dedicato",
      description: "Il nostro team di esperti è a vostra disposizione per consulenze tecniche, gestione ordini e assistenza post-vendita professionale.",
      features: ["Consulenza tecnica specializzata", "Supporto telefonico 8:00-18:00", "Gestione ordini personalizzata", "Assistenza per impianti di riscaldamento"]
    },
    {
      icon: Award,
      title: "Garanzia e affidabilità",
      description: "Oltre 15 anni di esperienza nel settore energetico italiano con migliaia di clienti soddisfatti in tutto il territorio nazionale.",
      features: ["Garanzia sulla qualità del prodotto", "Oltre 15 anni di esperienza", "Network nazionale di distribuzione", "Certificazioni di settore"]
    }
  ];

  const qualityCertifications = [
    { name: "EN 590", description: "Standard europeo per combustibili diesel" },
    { name: "ISO 9001", description: "Sistema di gestione qualità certificato" },
    { name: "ADR", description: "Trasporto merci pericolose certificato" },
    { name: "UNI EN 228", description: "Conformità normative italiane" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-red-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Award className="mr-2" size={18} />
              Servizio Premium per l'Italia
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              I nostri <span className="text-green-600">servizi</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gasolio Veloce offre servizi completi per il riscaldamento in Italia: 
              dalla consegna rapida alla consulenza tecnica specializzata.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Servizi completi per il riscaldamento</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Dalla fornitura di gasolio premium alla consulenza tecnica: tutto quello che serve per il vostro impianto di riscaldamento
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 p-4 rounded-xl mr-4">
                      <service.icon className="text-green-600" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Servizi tecnici specializzati</h2>
              <p className="text-lg text-gray-600">
                Supporto tecnico professionale per ottimizzare il vostro impianto di riscaldamento
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="bg-red-100 p-4 rounded-full inline-flex mb-6">
                  <Thermometer className="text-red-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Analisi energetica</h3>
                <p className="text-gray-600 leading-relaxed">
                  Valutiamo il vostro consumo energetico e vi consigliamo la tipologia di gasolio più adatta per massimizzare l'efficienza.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="bg-red-100 p-4 rounded-full inline-flex mb-6">
                  <Wrench className="text-red-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Consulenza impianti</h3>
                <p className="text-gray-600 leading-relaxed">
                  I nostri tecnici qualificati forniscono consulenza per l'ottimizzazione e la manutenzione degli impianti di riscaldamento.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="bg-red-100 p-4 rounded-full inline-flex mb-6">
                  <Phone className="text-red-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Assistenza 24/7</h3>
                <p className="text-gray-600 leading-relaxed">
                  Servizio di emergenza disponibile per situazioni critiche e supporto tecnico continuo durante la stagione di riscaldamento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Certificazioni di qualità</h2>
              <p className="text-lg text-gray-600">
                Tutti i nostri prodotti e servizi rispettano i più elevati standard qualitativi europei e italiani
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {qualityCertifications.map((cert, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-red-50 rounded-2xl p-6 text-center border border-gray-200">
                  <div className="bg-white p-4 rounded-full inline-flex mb-4 shadow-md">
                    <Award className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-gray-600 text-sm">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Hai bisogno di assistenza?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Il nostro team di esperti è pronto ad aiutarti. Contattaci per una consulenza personalizzata gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+390212345678"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-2" size={20} />
              +39 02 1234 5678
            </a>
            <a
              href="mailto:info@gasolio-veloce.it"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Scrivici una email
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Service;
