
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Euro, Calculator, CheckCircle, Info, ArrowRight, TrendingDown } from 'lucide-react';

const PriceTransparency = () => {
  const [selectedAmount, setSelectedAmount] = useState(3000);

  const priceComponents = [
    {
      component: "Heizöl Standard",
      price: "0,65",
      description: "Grundpreis pro Liter"
    },
    {
      component: "Lieferung",
      price: "0,00",
      description: "Kostenlos ab 2.500L"
    },
    {
      component: "TÜV-Prüfung",
      price: "inklusive",
      description: "Qualitätszertifikat"
    },
    {
      component: "Service",
      price: "inklusive",
      description: "Beratung & Support"
    }
  ];

  const savingsTips = [
    {
      tip: "Größere Mengen bestellen",
      saving: "bis 8 Cent/L",
      icon: TrendingDown
    },
    {
      tip: "Flexible Liefertermine",
      saving: "bis 3 Cent/L", 
      icon: CheckCircle
    },
    {
      tip: "Sammelbestellungen",
      saving: "bis 5 Cent/L",
      icon: Euro
    }
  ];

  const amounts = [1500, 2000, 3000, 5000];

  const calculatePrice = (amount: number) => {
    let basePrice = 0.65;
    if (amount >= 5000) basePrice -= 0.08;
    else if (amount >= 3000) basePrice -= 0.05;
    else if (amount >= 2000) basePrice -= 0.03;
    
    return {
      pricePerLiter: basePrice.toFixed(2),
      totalPrice: (amount * basePrice).toFixed(2),
      deliveryFree: amount >= 2500
    };
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light text-slate-800 mb-4">
            Transparente <span className="font-semibold text-blue-600">Preisgestaltung</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Keine versteckten Kosten, keine Überraschungen - bei uns wissen Sie 
            immer genau, was Sie bezahlen und wofür
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Price Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-8 mb-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                Interaktiver Preisrechner
              </h3>
              <p className="text-slate-600">
                Wählen Sie Ihre gewünschte Menge und sehen Sie sofort den Gesamtpreis
              </p>
            </div>

            {/* Amount Selection */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedAmount === amount
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:shadow-md'
                  }`}
                >
                  {amount.toLocaleString()} Liter
                </button>
              ))}
            </div>

            {/* Price Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {calculatePrice(selectedAmount).pricePerLiter}€
                </div>
                <div className="text-slate-600">pro Liter</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">
                  {calculatePrice(selectedAmount).totalPrice}€
                </div>
                <div className="text-slate-600">Gesamtpreis</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${calculatePrice(selectedAmount).deliveryFree ? 'text-emerald-600' : 'text-orange-600'}`}>
                  {calculatePrice(selectedAmount).deliveryFree ? 'Kostenlos' : '+49€'}
                </div>
                <div className="text-slate-600">Lieferung</div>
              </div>
            </div>
          </motion.div>

          {/* Price Components */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <Calculator className="mr-2 text-blue-600" size={24} />
                Preiszusammensetzung
              </h3>
              
              <div className="space-y-4">
                {priceComponents.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="font-medium text-slate-800">{item.component}</div>
                      <div className="text-sm text-slate-600">{item.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-800">
                        {item.price === "inklusive" ? item.price : `${item.price}€`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700">
                  <Info size={16} />
                  <span className="text-sm font-medium">Alle Preise inkl. MwSt.</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <TrendingDown className="mr-2 text-emerald-600" size={24} />
                Sparmöglichkeiten
              </h3>
              
              <div className="space-y-4">
                {savingsTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <tip.icon className="text-emerald-600" size={16} />
                      </div>
                      <span className="font-medium text-slate-800">{tip.tip}</span>
                    </div>
                    <div className="text-emerald-600 font-bold">{tip.saving}</div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-emerald-700 transition-all">
                  <span>Jetzt sparen</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full mb-4">
              <CheckCircle className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Preisgarantie
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Der angezeigte Preis ist Ihr Endpreis - ohne versteckte Kosten, 
              ohne Nachzahlungen, ohne Überraschungen. Garantiert.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PriceTransparency;
