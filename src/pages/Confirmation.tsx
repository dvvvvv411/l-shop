
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, CreditCard, Calendar, Truck, Phone, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressIndicator from '@/components/ProgressIndicator';
import OrderSummary from '@/components/OrderSummary';
import { useOrder } from '@/contexts/OrderContext';
import { Button } from '@/components/ui/button';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, clearOrderData } = useOrder();
  const orderNumber = location.state?.orderNumber || 'HÖ12345678';

  if (!orderData) {
    navigate('/');
    return null;
  }

  const handleNewOrder = () => {
    clearOrderData();
    navigate('/');
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
            <ProgressIndicator currentStep={4} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Confirmation Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Thank You Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-lg text-center"
                >
                  <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
                    <CheckCircle className="text-green-600" size={48} />
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Vielen Dank für Ihre Bestellung!
                  </h1>
                  
                  <p className="text-gray-600 text-lg mb-6">
                    Ihre Heizölbestellung wurde erfolgreich aufgenommen und wird bearbeitet.
                  </p>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
                    <div className="text-sm text-red-600 font-medium">Ihre Bestellnummer</div>
                    <div className="text-2xl font-bold text-red-700">{orderNumber}</div>
                  </div>
                </motion.div>

                {/* Payment Instructions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <CreditCard className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Zahlungshinweise</h3>
                      <p className="text-gray-600">So zahlen Sie Ihre Bestellung</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-3">Bankverbindung für Vorkasse</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-700 font-medium">Empfänger:</span>
                          <span className="text-blue-900">HeizölDirekt GmbH</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700 font-medium">IBAN:</span>
                          <span className="text-blue-900 font-mono">DE89 3704 0044 0532 0130 00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700 font-medium">BIC:</span>
                          <span className="text-blue-900 font-mono">COBADEFFXXX</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700 font-medium">Verwendungszweck:</span>
                          <span className="text-blue-900 font-mono">{orderNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700 font-medium">Betrag:</span>
                          <span className="text-blue-900 font-bold">{orderData.total.toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">💰 Skonto-Vorteil nutzen!</h4>
                      <p className="text-green-700 text-sm">
                        Bei Zahlung innerhalb von 14 Tagen erhalten Sie 3% Skonto. 
                        Ihr Skonto-Betrag: <strong>{(orderData.total * 0.97).toFixed(2)}€</strong>
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Delivery Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <Truck className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Lieferinformationen</h3>
                      <p className="text-gray-600">Wichtige Details zu Ihrer Lieferung</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Calendar className="text-orange-600 mr-2" size={18} />
                        <span className="font-semibold text-orange-900">Liefertermin</span>
                      </div>
                      <div className="text-orange-800 font-bold">{orderData.deliveryDate}</div>
                      <div className="text-orange-700 text-sm">Zwischen 7:00 - 17:00 Uhr</div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">Lieferadresse</div>
                      <div className="text-gray-700 text-sm space-y-1">
                        <div>{orderData.deliveryFirstName} {orderData.deliveryLastName}</div>
                        <div>{orderData.deliveryStreet}</div>
                        <div>{orderData.deliveryPostcode} {orderData.deliveryCity}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">📞 Wichtiger Hinweis zur Lieferung</h4>
                    <p className="text-yellow-700 text-sm">
                      Unser Fahrer wird Sie am Liefertag telefonisch kontaktieren. 
                      Bitte stellen Sie sicher, dass Sie unter {orderData.deliveryPhone} erreichbar sind.
                    </p>
                  </div>
                </motion.div>

                {/* Contact Support */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Fragen zu Ihrer Bestellung?</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="text-red-600" size={20} />
                      <div>
                        <div className="font-semibold text-gray-900">Telefon</div>
                        <div className="text-gray-600 text-sm">0800 123 456 7</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="text-red-600" size={20} />
                      <div>
                        <div className="font-semibold text-gray-900">E-Mail</div>
                        <div className="text-gray-600 text-sm">service@heizoeldirekt.de</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button
                      onClick={handleNewOrder}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold"
                    >
                      Neue Bestellung aufgeben
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <OrderSummary />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Confirmation;
