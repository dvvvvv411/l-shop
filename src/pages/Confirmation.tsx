
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, CreditCard, Calendar, Truck, Phone, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressIndicator from '@/components/ProgressIndicator';
import OrderSummary from '@/components/OrderSummary';
import SupplierInfo from '@/components/SupplierInfo';
import { useOrder } from '@/contexts/OrderContext';
import { useSuppliers, SupplierByPostcode } from '@/hooks/useSuppliers';
import { Button } from '@/components/ui/button';

const Confirmation = () => {
  const [supplier, setSupplier] = useState<SupplierByPostcode | null>(null);
  const [isLoadingSupplier, setIsLoadingSupplier] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, clearOrderData } = useOrder();
  const { getSupplierByPostcode } = useSuppliers();
  const orderNumber = location.state?.orderNumber || 'HÖ12345678';

  if (!orderData) {
    navigate('/');
    return null;
  }

  // Fetch supplier information when component mounts
  useEffect(() => {
    const fetchSupplier = async () => {
      if (orderData.deliveryPostcode) {
        setIsLoadingSupplier(true);
        try {
          const supplierData = await getSupplierByPostcode(orderData.deliveryPostcode);
          setSupplier(supplierData);
        } catch (error) {
          console.error('Error fetching supplier:', error);
        } finally {
          setIsLoadingSupplier(false);
        }
      }
    };

    fetchSupplier();
  }, [orderData.deliveryPostcode, getSupplierByPostcode]);

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

                  {/* Email confirmation notice */}
                  {orderData.customerEmail && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 text-blue-700">
                        <Mail size={20} />
                        <span className="font-medium">Bestätigung per E-Mail</span>
                      </div>
                      <p className="text-blue-600 text-sm mt-2">
                        Eine Bestellbestätigung wurde an <strong>{orderData.customerEmail}</strong> gesendet.
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Supplier Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Ihr Lieferant</h3>
                  <SupplierInfo supplier={supplier} isLoading={isLoadingSupplier} />
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
                      <h4 className="font-semibold text-blue-900 mb-3">Nächste Schritte</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start space-x-3">
                          <Phone className="text-blue-600 mt-1" size={16} />
                          <div>
                            <div className="font-semibold text-blue-900">1. Telefonischer Kontakt</div>
                            <div className="text-blue-700">Wir rufen Sie in den nächsten 24 Stunden an, um Ihre Bestellung zu bestätigen und Ihnen unsere Bankverbindung mitzuteilen.</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CreditCard className="text-blue-600 mt-1" size={16} />
                          <div>
                            <div className="font-semibold text-blue-900">2. Überweisung</div>
                            <div className="text-blue-700">Nach unserem Anruf überweisen Sie den Betrag von <strong>{orderData.total.toFixed(2)}€</strong> auf unser Konto.</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Truck className="text-blue-600 mt-1" size={16} />
                          <div>
                            <div className="font-semibold text-blue-900">3. Lieferung</div>
                            <div className="text-blue-700">Nach Zahlungseingang erfolgt die Lieferung in 4-7 Werktagen.</div>
                          </div>
                        </div>
                      </div>
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
                      <div className="text-orange-700 text-sm">Nach Zahlungseingang</div>
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
