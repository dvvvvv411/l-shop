
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, FileText, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressIndicator from '@/components/ProgressIndicator';
import OrderSummary from '@/components/OrderSummary';
import SupplierInfo from '@/components/SupplierInfo';
import { useOrder } from '@/contexts/OrderContext';
import { useSuppliers, SupplierByPostcode } from '@/hooks/useSuppliers';
import { useDomainShop } from '@/hooks/useDomainShop';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import { Button } from '@/components/ui/button';

const Summary = () => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [supplier, setSupplier] = useState<SupplierByPostcode | null>(null);
  const [isLoadingSupplier, setIsLoadingSupplier] = useState(false);
  const { orderData } = useOrder();
  const { getSupplierByPostcode } = useSuppliers();
  const { bankAccounts } = useBankAccounts();
  const shopConfig = useDomainShop();
  const navigate = useNavigate();

  if (!orderData) {
    // Navigate to the correct order page based on shop type
    if (shopConfig.shopType === 'italy') {
      navigate('/ordina');
    } else if (shopConfig.shopType === 'france') {
      navigate('/commande');
    } else {
      navigate('/bestellen');
    }
    return null;
  }

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

  // Get bank account details - use GasolioCasa for Italian shops, Italien Champion for French shops
  const getBankAccountDetails = () => {
    if (shopConfig.shopType === 'italy') {
      const gasolioCasaAccount = bankAccounts.find(
        account => account.system_name === 'GasolioCasa'
      );
      return gasolioCasaAccount || null;
    } else if (shopConfig.shopType === 'france') {
      const italienChampionAccount = bankAccounts.find(
        account => account.system_name === 'Italien Champion'
      );
      
      // Override account holder to always show "Fioul Rapide" for French orders
      if (italienChampionAccount) {
        return {
          ...italienChampionAccount,
          account_holder: 'Fioul Rapide'
        };
      }
    }
    return null;
  };

  const bankAccountDetails = getBankAccountDetails();

  const handlePlaceOrder = () => {
    if (!acceptTerms) {
      let alertMessage = 'Bitte akzeptieren Sie die AGB und Widerrufsbelehrung.';
      if (shopConfig.shopType === 'france') {
        alertMessage = 'Veuillez accepter les conditions générales et la politique de rétractation.';
      } else if (shopConfig.shopType === 'italy') {
        alertMessage = 'Si prega di accettare i termini e condizioni e la politica di recesso.';
      }
      alert(alertMessage);
      return;
    }

    // Navigate to confirmation with the existing order number using the correct route
    if (shopConfig.shopType === 'italy') {
      navigate('/conferma', {
        state: {
          orderNumber: orderData.orderNumber
        }
      });
    } else if (shopConfig.shopType === 'france') {
      navigate('/confirmation', {
        state: {
          orderNumber: orderData.orderNumber
        }
      });
    } else {
      navigate('/bestaetigung', {
        state: {
          orderNumber: orderData.orderNumber
        }
      });
    }
  };

  // Get translations based on shop type
  const getTranslations = () => {
    if (shopConfig.shopType === 'italy') {
      return {
        supplier: 'Il tuo fornitore',
        deliveryAddress: 'Indirizzo di consegna',
        deliveryAddressDesc: 'I tuoi dati per la consegna',
        billingAddress: 'Indirizzo di fatturazione',
        billingAddressDesc: 'I tuoi dati per la fatturazione',
        sameAsDelivery: 'Identico all\'indirizzo di consegna',
        paymentMethod: 'Metodo di pagamento',
        paymentMethodDesc: 'Il metodo di pagamento scelto',
        prepayment: 'Bonifico anticipato',
        prepaymentDetails: [
          '• Bonifico prima della consegna',
          '• Riceverai i dati bancari via email',
          '• La consegna avviene dopo il pagamento'
        ],
        termsTitle: 'Termini e condizioni e diritto di recesso',
        withdrawalNotice: 'Informazioni sul diritto di recesso',
        withdrawalText: 'Hai il diritto di recedere da questo contratto entro quattordici giorni senza fornire motivazioni. Il periodo di recesso è di quattordici giorni dalla data di conclusione del contratto.',
        acceptTerms: 'Accetto i',
        termsLink: 'Termini e condizioni generali',
        and: 'e le',
        withdrawalLink: 'Informazioni sul diritto di recesso',
        oilWithdrawalNote: '. So che perdo il diritto di recesso non appena inizia la consegna del gasolio. *',
        orderButton: 'Ordina con pagamento vincolante',
        tel: 'Tel'
      };
    } else if (shopConfig.shopType === 'france') {
      return {
        supplier: 'Votre fournisseur',
        deliveryAddress: 'Adresse de livraison',
        deliveryAddressDesc: 'Vos informations de livraison',
        billingAddress: 'Adresse de facturation',
        billingAddressDesc: 'Vos informations de facturation',
        sameAsDelivery: 'Identique à l\'adresse de livraison',
        paymentMethod: 'Mode de paiement',
        paymentMethodDesc: 'Votre méthode de paiement choisie',
        prepayment: 'Paiement d\'avance',
        prepaymentDetails: [
          '• Virement avant livraison',
          '• Coordonnées bancaires reçues par e-mail',
          '• Livraison après réception du paiement'
        ],
        termsTitle: 'CGV et droit de rétractation',
        withdrawalNotice: 'Information sur le droit de rétractation',
        withdrawalText: 'Vous avez le droit de vous rétracter de ce contrat dans un délai de quatorze jours sans donner de motif. Le délai de rétractation expire quatorze jours après la date de conclusion du contrat.',
        acceptTerms: 'J\'accepte les',
        termsLink: 'Conditions générales de vente',
        and: 'et le',
        withdrawalLink: 'droit de rétractation',
        oilWithdrawalNote: '. Je sais que je perds mon droit de rétractation dès le début de la livraison du fioul. *',
        orderButton: 'Commander avec obligation de paiement',
        tel: 'Tél'
      };
    } else {
      return {
        supplier: 'Ihr Lieferant',
        deliveryAddress: 'Lieferadresse',
        deliveryAddressDesc: 'Ihre Angaben zur Lieferung',
        billingAddress: 'Rechnungsadresse',
        billingAddressDesc: 'Ihre Angaben zur Rechnung',
        sameAsDelivery: 'Identisch mit Lieferadresse',
        paymentMethod: 'Zahlungsart',
        paymentMethodDesc: 'Ihre gewählte Zahlungsmethode',
        prepayment: 'Vorkasse',
        prepaymentDetails: [
          '• Überweisung vor Lieferung',
          '• Bankverbindung erhalten Sie per E-Mail',
          '• Lieferung erfolgt nach Zahlungseingang'
        ],
        termsTitle: 'AGB und Widerrufsbelehrung',
        withdrawalNotice: 'Widerrufsbelehrung',
        withdrawalText: 'Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.',
        acceptTerms: 'Ich akzeptiere die',
        termsLink: 'Allgemeinen Geschäftsbedingungen',
        and: 'und die',
        withdrawalLink: 'Widerrufsbelehrung',
        oilWithdrawalNote: '. Mir ist bekannt, dass ich bei einer Bestellung von Heizöl mein Widerrufsrecht verliere, sobald die Lieferung begonnen hat. *',
        orderButton: 'Zahlungspflichtig bestellen',
        tel: 'Tel'
      };
    }
  };

  const t = getTranslations();

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
                {/* Supplier Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.supplier}</h3>
                  <SupplierInfo supplier={supplier} isLoading={isLoadingSupplier} />
                </motion.div>

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
                      <h3 className="text-xl font-bold text-gray-900">{t.deliveryAddress}</h3>
                      <p className="text-gray-600">{t.deliveryAddressDesc}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">
                      {orderData.deliveryFirstName} {orderData.deliveryLastName}
                    </div>
                    <div className="text-gray-700 space-y-1">
                      <div>{orderData.deliveryStreet}</div>
                      <div>{orderData.deliveryPostcode} {orderData.deliveryCity}</div>
                      <div>{t.tel}: {orderData.deliveryPhone}</div>
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
                      <h3 className="text-xl font-bold text-gray-900">{t.billingAddress}</h3>
                      <p className="text-gray-600">{t.billingAddressDesc}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    {orderData.useSameAddress ? (
                      <div className="text-gray-700">
                        {t.sameAsDelivery}
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
                      <h3 className="text-xl font-bold text-gray-900">{t.paymentMethod}</h3>
                      <p className="text-gray-600">{t.paymentMethodDesc}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">{t.prepayment}</div>
                    <div className="text-gray-700 text-sm space-y-1">
                      {t.prepaymentDetails.map((detail, index) => (
                        <div key={index}>{detail}</div>
                      ))}
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
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{t.termsTitle}</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">{t.withdrawalNotice}</h4>
                      <p className="text-yellow-700 text-sm">
                        {t.withdrawalText}
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
                        {t.acceptTerms}{' '}
                        <a href="#" className="text-red-600 hover:underline">
                          {t.termsLink}
                        </a>{' '}
                        {t.and}{' '}
                        <a href="#" className="text-red-600 hover:underline">
                          {t.withdrawalLink}
                        </a>
                        {t.oilWithdrawalNote}
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={!acceptTerms}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {t.orderButton}
                  </Button>
                </motion.div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <OrderSummary
                  orderData={{
                    product: {
                      id: 'standard',
                      name: orderData.product,
                      price: orderData.pricePerLiter,
                      description: shopConfig.shopType === 'italy' 
                        ? 'Gasolio di qualità secondo EN 590'
                        : shopConfig.shopType === 'france'
                        ? 'Fioul de qualité selon DIN 51603-1'
                        : 'Qualitäts-Heizöl nach DIN 51603-1'
                    },
                    amount: orderData.amount,
                    postcode: orderData.deliveryPostcode,
                    basePrice: orderData.basePrice,
                    deliveryFee: orderData.deliveryFee,
                    totalPrice: orderData.total,
                    savings: orderData.discount
                  }}
                  bankAccountDetails={bankAccountDetails}
                  orderNumber={orderData.orderNumber}
                  autoScrollToBankDetails={shopConfig.shopType === 'france' || shopConfig.shopType === 'italy'}
                />
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
