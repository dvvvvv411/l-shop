
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Edit3, Lock, ArrowLeft } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import { useSuppliers, SupplierByPostcode } from '@/hooks/useSuppliers';
import { Button } from '@/components/ui/button';
import { calculateVATFromGross, formatCurrency } from '@/utils/vatCalculations';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';

const Summary = () => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [supplier, setSupplier] = useState<SupplierByPostcode | null>(null);
  const [isLoadingSupplier, setIsLoadingSupplier] = useState(false);
  const { orderData } = useOrder();
  const { getSupplierByPostcode } = useSuppliers();
  const navigate = useNavigate();

  if (!orderData) {
    navigate('/order');
    return null;
  }

  // Calculate VAT breakdown
  const vatBreakdown = calculateVATFromGross(orderData.total);

  // Fetch supplier information when component mounts or postcode changes
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

  const handlePlaceOrder = () => {
    if (!acceptTerms) {
      alert('Bitte akzeptieren Sie die AGB und Widerrufsbelehrung.');
      return;
    }

    // Navigate to confirmation with the existing order number
    navigate('/confirmation', {
      state: {
        orderNumber: orderData.orderNumber
      }
    });
  };

  const handleBackToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shopify-style Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">HeizölDirekt</span>
          </div>
          
          <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600">
            <span>Sichere Zahlung</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>SSL verschlüsselt</span>
          </div>
        </div>
      </header>
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 min-h-screen"
          >
            {/* Left Column - Order Review (Shopify style) */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-white lg:bg-transparent p-6 lg:p-0">
                {/* Breadcrumb */}
                <div className="hidden lg:block mb-8">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <button 
                      onClick={() => navigate('/')}
                      className="hover:text-gray-700 transition-colors"
                    >
                      Warenkorb
                    </button>
                    <span>›</span>
                    <button 
                      onClick={handleBackToCheckout}
                      className="hover:text-gray-700 transition-colors"
                    >
                      Informationen
                    </button>
                    <span>›</span>
                    <span className="text-gray-900 font-medium">Zusammenfassung</span>
                  </div>
                </div>

                {/* Mobile back button */}
                <div className="lg:hidden flex items-center mb-6">
                  <Button
                    variant="ghost"
                    onClick={handleBackToCheckout}
                    className="mr-4 p-2 hover:bg-gray-100 -ml-2"
                  >
                    <ArrowLeft size={20} />
                  </Button>
                  <h1 className="text-lg font-medium text-gray-900">Bestellung abschließen</h1>
                </div>

                <div className="space-y-6">
                  {/* Contact */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900">Kontakt</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleBackToCheckout} 
                        className="text-blue-600 hover:bg-blue-50 text-sm h-auto p-1"
                      >
                        <Edit3 size={14} className="mr-1" />
                        Ändern
                      </Button>
                    </div>
                    <div className="text-sm text-gray-700">
                      {orderData.deliveryPhone}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900">Lieferadresse</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleBackToCheckout} 
                        className="text-blue-600 hover:bg-blue-50 text-sm h-auto p-1"
                      >
                        <Edit3 size={14} className="mr-1" />
                        Ändern
                      </Button>
                    </div>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div>{orderData.deliveryFirstName} {orderData.deliveryLastName}</div>
                      <div>{orderData.deliveryStreet}</div>
                      <div>{orderData.deliveryPostcode} {orderData.deliveryCity}</div>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900">Rechnungsadresse</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleBackToCheckout} 
                        className="text-blue-600 hover:bg-blue-50 text-sm h-auto p-1"
                      >
                        <Edit3 size={14} className="mr-1" />
                        Ändern
                      </Button>
                    </div>
                    <div className="text-sm text-gray-700">
                      {orderData.useSameAddress ? (
                        <span>Identisch mit Lieferadresse</span>
                      ) : (
                        <div className="space-y-1">
                          <div>{orderData.billingFirstName} {orderData.billingLastName}</div>
                          <div>{orderData.billingStreet}</div>
                          <div>{orderData.billingPostcode} {orderData.billingCity}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900">Zahlungsart</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleBackToCheckout} 
                        className="text-blue-600 hover:bg-blue-50 text-sm h-auto p-1"
                      >
                        <Edit3 size={14} className="mr-1" />
                        Ändern
                      </Button>
                    </div>
                    <div className="text-sm text-gray-700">
                      <div className="font-medium">
                        {orderData.paymentMethod === 'vorkasse' ? 'Vorkasse' : 'Rechnung'}
                      </div>
                      <div className="text-gray-500 mt-1">
                        {orderData.paymentMethod === 'vorkasse' 
                          ? 'Überweisung vor Lieferung' 
                          : 'Zahlung nach Lieferung'
                        }
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">AGB und Widerrufsbelehrung</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2 text-sm">Widerrufsbelehrung</h4>
                        <p className="text-yellow-700 text-xs">
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
                        <label htmlFor="acceptTerms" className="text-xs text-gray-700 cursor-pointer">
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
                  </div>

                  {/* Security Notice */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Lock className="text-gray-600 flex-shrink-0" size={16} />
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Sichere Bestellung</span>
                        <span className="text-gray-500 ml-2">SSL-verschlüsselt</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary (Shopify style) */}
            <div className="lg:col-span-5 order-1 lg:order-2 bg-gray-50 border-b lg:border-b-0 border-gray-200">
              <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
                <div className="p-6 lg:p-8">
                  <CheckoutSummary
                    orderData={{
                      product: {
                        id: 'standard',
                        name: orderData.product,
                        price: orderData.pricePerLiter,
                        description: 'Qualitäts-Heizöl nach DIN 51603-1'
                      },
                      amount: orderData.amount,
                      postcode: orderData.deliveryPostcode,
                      basePrice: vatBreakdown.netPrice,
                      deliveryFee: orderData.deliveryFee,
                      totalPrice: orderData.total,
                      savings: orderData.discount
                    }}
                  />

                  {/* Complete Order Button */}
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={!acceptTerms}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium rounded-lg disabled:bg-gray-400 mb-4 mt-6"
                  >
                    Zahlungspflichtig bestellen
                  </Button>

                  {/* Terms */}
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    Mit der Bestellung akzeptieren Sie unsere{' '}
                    <a href="/agb" className="underline hover:no-underline">AGB</a>
                    {' '}und{' '}
                    <a href="/widerrufsrecht" className="underline hover:no-underline">Widerrufsbelehrung</a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Minimal Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="/datenschutz" className="hover:text-gray-900 transition-colors">
                Datenschutz
              </a>
              <a href="/agb" className="hover:text-gray-900 transition-colors">
                AGB
              </a>
              <a href="/impressum" className="hover:text-gray-900 transition-colors">
                Impressum
              </a>
            </div>
            <div className="text-sm text-gray-500">
              © 2024 HeizölDirekt. Alle Rechte vorbehalten.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Summary;
