
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MapPin, Fuel, Euro } from 'lucide-react';

const PriceCalculator = () => {
  const [formData, setFormData] = useState({
    liters: '',
    postcode: '',
    fuelType: 'standard'
  });

  const [quote, setQuote] = useState<{
    price: number;
    total: number;
    delivery: number;
  } | null>(null);

  const fuelTypes = [
    { value: 'standard', label: 'Gasolio Standard', price: 1.15 },
    { value: 'premium', label: 'Gasolio Premium', price: 1.22 },
    { value: 'eco', label: 'Gasolio Eco', price: 1.18 }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculatePrice = () => {
    if (!formData.liters || !formData.postcode) return;

    const selectedFuel = fuelTypes.find(fuel => fuel.value === formData.fuelType);
    const liters = parseInt(formData.liters);
    const pricePerLiter = selectedFuel?.price || 1.15;
    const deliveryFee = liters >= 3000 ? 0 : 45;
    
    const subtotal = liters * pricePerLiter;
    const total = subtotal + deliveryFee;

    setQuote({
      price: pricePerLiter,
      total: total,
      delivery: deliveryFee
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Calcolatore di prezzo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ricevi subito un preventivo personalizzato per la tua consegna di gasolio
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Calculator className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Configura il tuo ordine
                  </h3>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Fuel className="inline mr-2" size={16} />
                    Tipo di gasolio
                  </label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  >
                    {fuelTypes.map(fuel => (
                      <option key={fuel.value} value={fuel.value}>
                        {fuel.label} - €{fuel.price}/L
                      </option>
                    ))}
                  </select>
                </div>

                {/* Liters */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Quantità (Litri)
                  </label>
                  <input
                    type="number"
                    name="liters"
                    value={formData.liters}
                    onChange={handleInputChange}
                    placeholder="es. 2000"
                    min="500"
                    max="10000"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Minimo 500 litri, consegna gratuita da 3.000 litri
                  </p>
                </div>

                {/* Postcode */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <MapPin className="inline mr-2" size={16} />
                    Codice postale
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    placeholder="es. 20121"
                    maxLength={5}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  />
                </div>

                <button
                  onClick={calculatePrice}
                  className="w-full bg-gradient-to-r from-green-600 to-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300"
                >
                  Calcola prezzo
                </button>
              </div>

              {/* Quote Display */}
              <div className="lg:pl-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Euro className="text-red-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Il tuo preventivo
                  </h3>
                </div>

                {quote ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-green-50 to-red-50 p-6 rounded-2xl space-y-4"
                  >
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Prezzo per litro:</span>
                      <span className="font-bold text-lg">€{quote.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Quantità:</span>
                      <span className="font-bold">{formData.liters} L</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Costo gasolio:</span>
                      <span className="font-bold">€{(parseInt(formData.liters) * quote.price).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Consegna:</span>
                      <span className="font-bold">
                        {quote.delivery === 0 ? 'GRATUITA' : `€${quote.delivery.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-white rounded-xl px-4">
                      <span className="text-xl font-bold text-gray-900">Totale:</span>
                      <span className="text-2xl font-bold text-green-600">€{quote.total.toFixed(2)}</span>
                    </div>
                    
                    <button className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-green-700 transition-colors mt-4">
                      Ordina ora
                    </button>
                  </motion.div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-2xl text-center">
                    <div className="text-gray-400 mb-4">
                      <Euro size={48} className="mx-auto" />
                    </div>
                    <p className="text-gray-600">
                      Compila i campi per ricevere il tuo preventivo personalizzato
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
