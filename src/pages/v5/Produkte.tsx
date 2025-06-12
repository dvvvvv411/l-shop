
import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
import { Flame, Shield, Thermometer, Droplets, Award, CheckCircle, Beaker, Factory } from 'lucide-react';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Produkte = () => {
  useDomainFavicon();
  useDomainPageMeta('produkte');

  const products = [
    {
      name: "Gasolio Standard",
      description: "Il nostro gasolio standard è perfetto per il riscaldamento domestico e conforme a tutte le normative italiane ed europee.",
      features: [
        "Conforme alle normative EN 590",
        "Ideale per caldaie domestiche tradizionali",
        "Ottimo rapporto qualità-prezzo",
        "Disponibile tutto l'anno"
      ],
      specifications: {
        "Contenuto di zolfo": "≤ 1000 mg/kg",
        "Potere calorifico": "≥ 42,6 MJ/kg",
        "Punto di infiammabilità": "≥ 55°C",
        "Viscosità": "2,0-4,5 mm²/s"
      },
      price: "Prezzo competitivo",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Gasolio Premium",
      description: "Gasolio di alta qualità con additivi speciali per migliorare le prestazioni e ridurre le emissioni, ideale per impianti moderni.",
      features: [
        "Additivi per prestazioni ottimali",
        "Riduce le emissioni inquinanti",
        "Migliora l'efficienza energetica",
        "Protegge il sistema di riscaldamento"
      ],
      specifications: {
        "Contenuto di zolfo": "≤ 50 mg/kg",
        "Potere calorifico": "≥ 43,0 MJ/kg",
        "Punto di infiammabilità": "≥ 55°C",
        "Additivi": "Pacchetto premium"
      },
      price: "Prezzo premium",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Gasolio Eco",
      description: "La nostra formula eco-friendly è progettata per ridurre l'impatto ambientale mantenendo alte prestazioni energetiche.",
      features: [
        "Formula eco-sostenibile",
        "Basse emissioni di CO₂",
        "Combustione più pulita",
        "Contribuisce alla sostenibilità ambientale"
      ],
      specifications: {
        "Contenuto di zolfo": "≤ 10 mg/kg",
        "Potere calorifico": "≥ 42,8 MJ/kg",
        "Biodiesel blend": "Fino al 7%",
        "Emissioni CO₂": "Ridotte del 15%"
      },
      price: "Investimento verde",
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  const applications = [
    {
      icon: Factory,
      title: "Riscaldamento domestico",
      description: "Perfetto per ville, appartamenti e case unifamiliari con caldaie a gasolio di qualsiasi tipologia e potenza."
    },
    {
      icon: Thermometer,
      title: "Riscaldamento industriale",
      description: "Ideale per capannoni, uffici, laboratori e strutture commerciali che richiedono un riscaldamento affidabile."
    },
    {
      icon: Beaker,
      title: "Caldaie a condensazione",
      description: "Formulato specificamente per caldaie moderne ad alta efficienza e sistemi a condensazione."
    }
  ];

  const qualityStandards = [
    { name: "EN 590", description: "Standard europeo per gasolio da riscaldamento" },
    { name: "UNI 6579", description: "Specifica italiana per combustibili liquidi" },
    { name: "ISO 8217", description: "Standard internazionale per combustibili marini" },
    { name: "ASTM D975", description: "Specifica americana per gasolio" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-red-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Flame className="mr-2" size={18} />
              Prodotti Premium per l'Italia
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              I nostri <span className="text-green-600">prodotti</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scoprite la nostra gamma completa di gasolio da riscaldamento: dalle soluzioni 
              standard a quelle premium e eco-sostenibili, per ogni tipo di impianto.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">La nostra gamma di prodotti</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tre tipologie di gasolio per soddisfare ogni esigenza di riscaldamento, dalle più economiche alle più performanti
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {products.map((product, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                  <div className={`h-32 bg-gradient-to-r ${product.color} flex items-center justify-center`}>
                    <Flame className="text-white" size={48} />
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Caratteristiche principali:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-600 text-sm">
                            <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={14} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Specifiche tecniche:</h4>
                      <div className="space-y-2">
                        {Object.entries(product.specifications).map(([key, value], specIndex) => (
                          <div key={specIndex} className="flex justify-between text-sm">
                            <span className="text-gray-600">{key}:</span>
                            <span className="font-medium text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-center">
                        <span className="text-lg font-semibold text-green-600">{product.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Applicazioni del gasolio da riscaldamento</h2>
              <p className="text-lg text-gray-600">
                I nostri prodotti sono ideali per diverse tipologie di impianti e utilizzi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {applications.map((app, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                  <div className="bg-red-100 p-4 rounded-full inline-flex mb-6">
                    <app.icon className="text-red-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{app.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{app.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Standard di qualità certificati</h2>
              <p className="text-lg text-gray-600">
                Tutti i nostri prodotti rispettano rigorosi standard internazionali e normative europee
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {qualityStandards.map((standard, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-red-50 rounded-2xl p-6 text-center border border-gray-200">
                  <div className="bg-white p-3 rounded-full inline-flex mb-4 shadow-md">
                    <Shield className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{standard.name}</h3>
                  <p className="text-gray-600 text-sm">{standard.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-100 to-red-100 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Analisi di laboratorio certificate</h3>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Ogni lotto di gasolio viene sottoposto ad analisi rigorose presso laboratori certificati. 
                Riceverete sempre un certificato di analisi che garantisce la conformità del prodotto 
                alle specifiche tecniche e normative vigenti in Italia e in Europa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Confronto tecnico dettagliato</h2>
              <p className="text-lg text-gray-600">
                Specifiche tecniche a confronto per aiutarvi nella scelta del prodotto più adatto
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-green-600 to-red-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Caratteristica</th>
                    <th className="px-6 py-4 text-center font-semibold">Standard</th>
                    <th className="px-6 py-4 text-center font-semibold">Premium</th>
                    <th className="px-6 py-4 text-center font-semibold">Eco</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Contenuto di zolfo (mg/kg)</td>
                    <td className="px-6 py-4 text-center">≤ 1000</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">≤ 50</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">≤ 10</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Potere calorifico (MJ/kg)</td>
                    <td className="px-6 py-4 text-center">≥ 42,6</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">≥ 43,0</td>
                    <td className="px-6 py-4 text-center">≥ 42,8</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Punto di infiammabilità (°C)</td>
                    <td className="px-6 py-4 text-center">≥ 55</td>
                    <td className="px-6 py-4 text-center">≥ 55</td>
                    <td className="px-6 py-4 text-center">≥ 55</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Additivazione</td>
                    <td className="px-6 py-4 text-center">Base</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">Premium+</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">Eco+</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Impatto ambientale</td>
                    <td className="px-6 py-4 text-center">Standard</td>
                    <td className="px-6 py-4 text-center text-green-600">Migliorato</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">Ottimizzato</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Produkte;
