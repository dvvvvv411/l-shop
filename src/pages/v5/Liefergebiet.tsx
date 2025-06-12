import React from 'react';
import Header from '@/components/v5/Header';
import Footer from '@/components/v5/Footer';
import { MapPin, Truck, Clock, Euro, Shield, CheckCircle, Phone, Calendar, TrendingUp, Users, Fuel, AlertCircle } from 'lucide-react';
import { useDomainFavicon } from '@/hooks/useDomainFavicon';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Liefergebiet = () => {
  useDomainFavicon();
  useDomainPageMeta('liefergebiet');

  const deliveryZones = [
    {
      zone: "Nord Italia",
      regions: ["Lombardia", "Piemonte", "Veneto", "Liguria", "Emilia-Romagna", "Friuli-Venezia Giulia", "Trentino-Alto Adige", "Valle d'Aosta"],
      deliveryTime: "24-48 ore",
      minOrder: "1.000 litri",
      freeDelivery: "3.000 litri",
      coverage: "100%",
      features: ["Consegna express disponibile", "Servizio urgente 24h", "Network di depositi locali"]
    },
    {
      zone: "Centro Italia",
      regions: ["Toscana", "Lazio", "Umbria", "Marche", "Abruzzo"],
      deliveryTime: "48-72 ore",
      minOrder: "1.500 litri",
      freeDelivery: "3.500 litri",
      coverage: "100%",
      features: ["Consegna programmata", "Servizio tracking", "Assistenza locale"]
    },
    {
      zone: "Sud Italia",
      regions: ["Campania", "Puglia", "Basilicata", "Calabria"],
      deliveryTime: "72-96 ore",
      minOrder: "2.000 litri",
      freeDelivery: "4.000 litri",
      coverage: "95%",
      features: ["Rete distributiva estesa", "Partner locali certificati", "Supporto regionale"]
    },
    {
      zone: "Isole",
      regions: ["Sicilia", "Sardegna"],
      deliveryTime: "5-7 giorni",
      minOrder: "3.000 litri",
      freeDelivery: "5.000 litri",
      coverage: "85%",
      features: ["Logistica marittima", "Depositi insulari", "Pianificazione settimanale"]
    }
  ];

  const majorCities = [
    { city: "Milano", region: "Lombardia", delivery: "24h", depot: true },
    { city: "Roma", region: "Lazio", delivery: "48h", depot: true },
    { city: "Napoli", region: "Campania", delivery: "72h", depot: true },
    { city: "Torino", region: "Piemonte", delivery: "24h", depot: false },
    { city: "Genova", region: "Liguria", delivery: "48h", depot: false },
    { city: "Bologna", region: "Emilia-Romagna", delivery: "24h", depot: true },
    { city: "Firenze", region: "Toscana", delivery: "48h", depot: false },
    { city: "Bari", region: "Puglia", delivery: "72h", depot: true },
    { city: "Palermo", region: "Sicilia", delivery: "7 giorni", depot: true },
    { city: "Catania", region: "Sicilia", delivery: "7 giorni", depot: false }
  ];

  const deliveryAdvantages = [
    {
      icon: Truck,
      title: "Flotta moderna e certificata",
      description: "Autocisterne di ultima generazione certificate ADR per il trasporto sicuro di combustibili, dotate di sistemi GPS per il tracking in tempo reale."
    },
    {
      icon: Shield,
      title: "Sicurezza garantita",
      description: "Tutti i nostri autotrasportatori sono certificati per il trasporto di merci pericolose e seguono rigorosi protocolli di sicurezza."
    },
    {
      icon: Calendar,
      title: "Pianificazione flessibile",
      description: "Possibilità di programmare la consegna in base alle vostre esigenze, con servizio di promemoria automatico per rifornimenti periodici."
    },
    {
      icon: Phone,
      title: "Assistenza dedicata",
      description: "Team di customer service specializzato per ogni zona geografica, con conoscenza approfondita delle specificità locali."
    }
  ];

  // Real-time delivery stats (simulated data)
  const deliveryStats = [
    {
      icon: Truck,
      title: "Consegne oggi",
      value: "127",
      trend: "+12%",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Users,
      title: "Clienti serviti",
      value: "89",
      trend: "+8%",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: Fuel,
      title: "Litri consegnati",
      value: "45.320",
      trend: "+15%",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Clock,
      title: "Tempo medio",
      value: "36h",
      trend: "-5%",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const activeDeliveries = [
    { id: "GV001", destination: "Milano Centro", status: "In consegna", eta: "14:30", progress: 85 },
    { id: "GV002", destination: "Roma EUR", status: "In transito", eta: "16:45", progress: 60 },
    { id: "GV003", destination: "Napoli Vomero", status: "Partita", eta: "Domani 09:00", progress: 25 },
    { id: "GV004", destination: "Torino Mirafiori", status: "In consegna", eta: "15:15", progress: 90 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-red-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <MapPin className="mr-2" size={18} />
              Copertura Nazionale Italia
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Zone di <span className="text-green-600">consegna</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gasolio Veloce copre tutto il territorio italiano con una rete logistica capillare 
              per garantire consegne rapide e affidabili in ogni regione.
            </p>
          </div>
        </div>
      </section>

      {/* Real-time Delivery Dashboard */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Dashboard consegne in tempo reale</h2>
              <p className="text-lg text-gray-600">
                Monitorate le nostre operazioni di consegna live su tutto il territorio italiano
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {deliveryStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={stat.color} size={24} />
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp size={14} className="mr-1 text-green-500" />
                      <span className="text-green-600 font-medium">{stat.trend}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </div>
              ))}
            </div>

            {/* Active Deliveries */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Truck className="mr-3 text-green-600" size={28} />
                Consegne attive in questo momento
              </h3>
              
              <div className="space-y-4">
                {activeDeliveries.map((delivery, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <span className="text-green-700 font-bold text-sm">{delivery.id}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{delivery.destination}</h4>
                          <p className="text-gray-600 text-sm">{delivery.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900 font-semibold">ETA: {delivery.eta}</p>
                        <p className="text-gray-600 text-sm">{delivery.progress}% completato</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${delivery.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center text-blue-700">
                  <AlertCircle size={20} className="mr-2" />
                  <span className="font-medium">Aggiornamento automatico ogni 5 minuti</span>
                </div>
                <p className="text-blue-600 text-sm mt-1">
                  Tutti i nostri autotrasportatori sono dotati di GPS per il tracking in tempo reale
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Italy Map Placeholder */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Mappa delle zone di consegna</h2>
              <p className="text-lg text-gray-600">
                Cliccate sulla vostra regione per scoprire i dettagli della consegna nella vostra zona
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-96 flex items-center justify-center mb-12 border border-gray-300">
              <div className="text-center text-gray-600">
                <MapPin size={64} className="mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mappa Interattiva Italia</h3>
                <p className="text-lg">Copertura nazionale dal Nord alle Isole</p>
                <div className="mt-4 text-sm">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full mr-2">Nord: 24-48h</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full mr-2">Centro: 48-72h</span>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full mr-2">Sud: 72-96h</span>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">Isole: 5-7 giorni</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Zones Details */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Dettagli zone di consegna</h2>
              <p className="text-lg text-gray-600">
                Informazioni complete su tempi, costi e modalità di consegna per ogni area geografica
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {deliveryZones.map((zone, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-red-600 text-white p-6">
                    <h3 className="text-2xl font-bold mb-2">{zone.zone}</h3>
                    <p className="text-green-100">Copertura territoriale: {zone.coverage}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Regioni coperte:</h4>
                      <div className="flex flex-wrap gap-2">
                        {zone.regions.map((region, regionIndex) => (
                          <span key={regionIndex} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="text-green-600 flex-shrink-0" size={16} />
                        <div>
                          <div className="text-sm text-gray-600">Consegna</div>
                          <div className="font-semibold">{zone.deliveryTime}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Truck className="text-green-600 flex-shrink-0" size={16} />
                        <div>
                          <div className="text-sm text-gray-600">Min. ordine</div>
                          <div className="font-semibold">{zone.minOrder}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Euro className="text-green-600 flex-shrink-0" size={16} />
                        <div>
                          <div className="text-sm text-gray-600">Gratis da</div>
                          <div className="font-semibold">{zone.freeDelivery}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Shield className="text-green-600 flex-shrink-0" size={16} />
                        <div>
                          <div className="text-sm text-gray-600">Copertura</div>
                          <div className="font-semibold">{zone.coverage}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Servizi aggiuntivi:</h4>
                      <ul className="space-y-2">
                        {zone.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-600 text-sm">
                            <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={14} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Major Cities Coverage */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Copertura delle principali città</h2>
              <p className="text-lg text-gray-600">
                Tempi di consegna garantiti per le maggiori città italiane
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-green-600 to-red-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Città</th>
                    <th className="px-6 py-4 text-left font-semibold">Regione</th>
                    <th className="px-6 py-4 text-center font-semibold">Tempo di consegna</th>
                    <th className="px-6 py-4 text-center font-semibold">Deposito locale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {majorCities.map((city, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-6 py-4 font-semibold text-gray-900">{city.city}</td>
                      <td className="px-6 py-4 text-gray-600">{city.region}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {city.delivery}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {city.depot ? (
                          <CheckCircle className="text-green-500 mx-auto" size={20} />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Advantages */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">I vantaggi della nostra logistica</h2>
              <p className="text-lg text-gray-600">
                Perché scegliere Gasolio Veloce per le vostre consegne di gasolio da riscaldamento
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {deliveryAdvantages.map((advantage, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 p-4 rounded-xl mr-4">
                      <advantage.icon className="text-green-600" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{advantage.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Verificate la vostra zona di consegna</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Inserite il vostro CAP per conoscere immediatamente i tempi di consegna 
            e le modalità di spedizione nella vostra zona.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Inserite il vostro CAP..."
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 font-medium text-center"
              maxLength={5}
            />
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center">
              <MapPin className="mr-2" size={20} />
              Verifica zona
            </button>
          </div>
          <p className="text-green-100 mt-4 text-sm">
            Servizio gratuito e senza impegno
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Liefergebiet;
