
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, FileText, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressIndicator from '@/components/ProgressIndicator';
import OrderSummary from '@/components/OrderSummary';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';

const Summary = () => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { orderData } = useOrder();
  const navigate = useNavigate();

  if (!orderData) {
    navigate('/order');
    return null;
  }

  const handlePlaceOrder = () => {
    if (!acceptTerms) {
      alert('Bitte akzeptieren Sie die AGB und Widerrufsbelehrung.');
      return;
    }
    
    // Navigate to confirmation with the existing order number
    navigate('/confirmation', { state: { orderNumber: orderData.orderNumber } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProgressIndicator currentStep={3} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Review */}
              <div className="lg:col-span-2 space-y-6">
                {/* Delivery Address Review */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <CheckCircle className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Lieferadresse</h3>
                      <p className="text-gray-600">Ihre Angaben zur Lieferung</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">
                      {orderData.deliveryFirstName} {orderData.deliveryLastName}
                    </div>
                    <div className="text-gray-700 space-y-1">
                      <div>{orderData.deliveryStreet}</div>
                      <div>{orderData.deliveryPostcode} {orderData.deliveryCity}</div>
                      <div>Tel: {orderData.deliveryPhone}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Billing Address Review */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FileText className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Rechnungsadresse</h3>
                      <p className="text-gray-600">Ihre Angaben zur Rechnung</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    {orderData.useSameAddress ? (
                      <div className="text-gray-700">
                        Identisch mit Lieferadresse
                      </div>
                    ) : (
                      <div>
                        <div className="font-semibold text-gray-900 mb-2">
                          {orderData.billingFirstName} {orderData.billingLastName}
                        </div>
                        <div className="text-gray-700 space-y-1">
                          <div>{orderData.billingStreet}</div>
                          <div>{orderData.billingPostcode} {orderData.billingCity}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Payment Method Review */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <CreditCard className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Zahlungsart</h3>
                      <p className="text-gray-600">Ihre gewählte Zahlungsmethode</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">Vorkasse</div>
                    <div className="text-gray-700 text-sm space-y-1">
                      <div>• Überweisung vor Lieferung</div>
                      <div>• 3% Skonto bei Zahlung innerhalb von 14 Tagen</div>
                      <div>• Sie erhalten unsere Bankverbindung per E-Mail</div>
                    </div>
                  </div>
                </motion.div>

                {/* Terms and Cancellation Policy */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">AGB und Widerrufsbelehrung</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Widerrufsbelehrung</h4>
                      <p className="text-yellow-700 text-sm">
                        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. 
                        Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="acceptTerms"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-1"
                      />
                      <label htmlFor="acceptTerms" className="text-sm text-gray-700 cursor-pointer">
                        Ich akzeptiere die{' '}
                        <a href="#" className="text-red-600 hover:underline">
                          Allgemeinen Geschäftsbedingungen
                        </a>{' '}
                        und die{' '}
                        <a href="#" className="text-red-600 hover:underline">
                          Widerrufsbelehrung
                        </a>
                        . Mir ist bekannt, dass ich bei einer Bestellung von Heizöl mein Widerrufsrecht verliere, 
                        sobald die Lieferung begonnen hat. *
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={!acceptTerms}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Zahlungspflichtig bestellen
                  </Button>
                </motion.div>
              </div>

              {/* Order Summary Sidebar - Pass the orderData converted to the expected format */}
              <div className="lg:col-span-1">
                <OrderSummary orderData={{
                  product: {
                    id: 'standard',
                    name: orderData.product,
                    price: orderData.pricePerLiter,
                    description: 'Qualitäts-Heizöl nach DIN 51603-1'
                  },
                  amount: orderData.amount,
                  postcode: orderData.deliveryPostcode,
                  basePrice: orderData.basePrice,
                  deliveryFee: orderData.deliveryFee,
                  totalPrice: orderData.total,
                  savings: orderData.discount
                }} />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Summary;
