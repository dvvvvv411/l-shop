
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, CreditCard, Calendar, Truck, Phone, Mail, Building2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressIndicator from '@/components/ProgressIndicator';
import OrderSummary from '@/components/OrderSummary';
import SupplierInfo from '@/components/SupplierInfo';
import { useOrder } from '@/contexts/OrderContext';
import { useSuppliers, SupplierByPostcode } from '@/hooks/useSuppliers';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import { useDomainShop } from '@/hooks/useDomainShop';
import { useShops } from '@/hooks/useShops';
import { Button } from '@/components/ui/button';

const Confirmation = () => {
  const [supplier, setSupplier] = useState<SupplierByPostcode | null>(null);
  const [isLoadingSupplier, setIsLoadingSupplier] = useState(false);
  const [bankAccountDetails, setBankAccountDetails] = useState<any>(null);
  const [displayAccountHolder, setDisplayAccountHolder] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData, clearOrderData } = useOrder();
  const { getSupplierByPostcode } = useSuppliers();
  const { bankAccounts } = useBankAccounts();
  const { shops } = useShops();
  const shopConfig = useDomainShop();
  const orderNumber = location.state?.orderNumber || 'HÖ12345678';

  const isFrenchShop = shopConfig.shopType === 'france';
  const isItalianShop = shopConfig.shopType === 'italy';

  console.log('Confirmation - Shop detection:', {
    shopType: shopConfig.shopType,
    isFrenchShop,
    isItalianShop,
    domain: typeof window !== 'undefined' ? window.location.hostname : 'N/A',
    pathname: typeof window !== 'undefined' ? window.location.pathname : 'N/A'
  });

  if (!orderData) {
    navigate('/');
    return null;
  }

  // Fetch supplier information and bank account details when component mounts
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

    // Enhanced bank account detection for French and Italian shops
    const fetchBankAccountDetails = () => {
      console.log('Confirmation - Available bank accounts:', bankAccounts.map(acc => ({
        id: acc.id,
        system_name: acc.system_name,
        bank_name: acc.bank_name,
        is_active: acc.is_active
      })));

      if (isFrenchShop) {
        // Look for French bank account
        const frenchAccount = bankAccounts.find(
          account => account.system_name === 'Italien Champion' && account.is_active
        );
        
        console.log('Confirmation - Found French account:', frenchAccount);
        
        if (frenchAccount) {
          setBankAccountDetails(frenchAccount);
          setDisplayAccountHolder('Fioul Rapide');
          console.log('Confirmation - Using French account holder: Fioul Rapide');
        } else {
          console.warn('Confirmation - No active French bank account found');
        }
      } else if (isItalianShop) {
        // Enhanced search for Italian bank account with multiple fallback strategies
        let italianAccount = null;
        
        // Strategy 1: Exact match for GasolioCasa
        italianAccount = bankAccounts.find(account => 
          account.system_name === 'GasolioCasa' && account.is_active
        );
        
        // Strategy 2: Case-insensitive search for gasoliocasa variations
        if (!italianAccount) {
          italianAccount = bankAccounts.find(account => 
            account.system_name.toLowerCase().includes('gasoliocasa') && account.is_active
          );
        }
        
        // Strategy 3: Search for gasolio-related accounts
        if (!italianAccount) {
          italianAccount = bankAccounts.find(account => 
            account.system_name.toLowerCase().includes('gasolio') && account.is_active
          );
        }
        
        // Strategy 4: Search for Italy/Italian-related accounts
        if (!italianAccount) {
          italianAccount = bankAccounts.find(account => 
            (account.system_name.toLowerCase().includes('italia') || 
             account.system_name.toLowerCase().includes('italy') ||
             account.system_name.toLowerCase().includes('it')) && account.is_active
          );
        }
        
        console.log('Confirmation - Italian account search result:', {
          found: !!italianAccount,
          account: italianAccount ? {
            id: italianAccount.id,
            system_name: italianAccount.system_name,
            bank_name: italianAccount.bank_name
          } : null
        });
        
        if (italianAccount) {
          setBankAccountDetails(italianAccount);
          setDisplayAccountHolder('Gasolio Veloce');
          console.log('Confirmation - Using Italian account holder: Gasolio Veloce');
        } else {
          console.warn('Confirmation - No active Italian bank account found. Available accounts:', 
            bankAccounts.filter(acc => acc.is_active).map(acc => acc.system_name)
          );
        }
      }
    };

    fetchSupplier();
    fetchBankAccountDetails();
  }, [orderData.deliveryPostcode, getSupplierByPostcode, isFrenchShop, isItalianShop, bankAccounts, shops]);

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
                    {isItalianShop 
                      ? 'Ordine confermato!'
                      : isFrenchShop 
                        ? 'Commande confirmée !' 
                        : 'Vielen Dank für Ihre Bestellung!'
                    }
                  </h1>
                  
                  <p className="text-gray-600 text-lg mb-6">
                    {isItalianShop 
                      ? 'Grazie per il tuo ordine di gasolio'
                      : isFrenchShop 
                        ? 'Votre commande de fioul a été enregistrée avec succès et est en cours de traitement.'
                        : 'Ihre Heizölbestellung wurde erfolgreich aufgenommen und wird bearbeitet.'
                    }
                  </p>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
                    <div className="text-sm text-red-600 font-medium">
                      {isItalianShop 
                        ? 'Il tuo numero d\'ordine'
                        : isFrenchShop 
                          ? 'Votre numéro de commande' 
                          : 'Ihre Bestellnummer'
                      }
                    </div>
                    <div className="text-2xl font-bold text-red-700">{orderNumber}</div>
                  </div>

                  {/* Email confirmation notice */}
                  {orderData.customerEmail && !isFrenchShop && !isItalianShop && (
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

                  {/* Invoice notice for French and Italian shops */}
                  {(isFrenchShop || isItalianShop) && orderData.customerEmail && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 text-green-700">
                        <Mail size={20} />
                        <span className="font-medium">
                          {isItalianShop 
                            ? 'Fattura inviata'
                            : 'Facture envoyée'
                          }
                        </span>
                      </div>
                      <p className="text-green-600 text-sm mt-2">
                        {isItalianShop 
                          ? `La tua fattura è stata automaticamente inviata a ${orderData.customerEmail} con i dati bancari.`
                          : `Votre facture a été automatiquement envoyée à ${orderData.customerEmail} avec les coordonnées bancaires.`
                        }
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Bank Account Details for French and Italian Shops */}
                {(isFrenchShop || isItalianShop) && bankAccountDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-l-green-500"
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <Building2 className="text-green-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {isItalianShop 
                            ? 'Dati bancari per il pagamento'
                            : 'Coordonnées bancaires'
                          }
                        </h3>
                        <p className="text-gray-600">
                          {isItalianShop 
                            ? 'Effettua il bonifico con queste informazioni'
                            : 'Effectuez votre virement avec ces informations'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-green-800 mb-1">
                            {isItalianShop ? 'Intestatario del conto' : 'Titulaire du compte'}
                          </div>
                          <div className="text-green-900 font-semibold">{displayAccountHolder}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-green-800 mb-1">
                            {isItalianShop ? 'Banca' : 'Banque'}
                          </div>
                          <div className="text-green-900 font-semibold">{bankAccountDetails.bank_name}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-green-800 mb-1">IBAN</div>
                          <div className="text-green-900 font-mono text-lg">{bankAccountDetails.iban}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-green-800 mb-1">BIC</div>
                          <div className="text-green-900 font-mono text-lg">{bankAccountDetails.bic}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-green-100 rounded-lg">
                        <div className="text-sm font-medium text-green-800 mb-1">
                          {isItalianShop ? 'Importo da trasferire' : 'Montant à virer'}
                        </div>
                        <div className="text-2xl font-bold text-green-900">{orderData.total.toFixed(2)}€</div>
                        <div className="text-sm text-green-700 mt-1">
                          {isItalianShop ? 'Riferimento' : 'Référence'}: {orderNumber}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Debug info for Italian shop when no bank account found */}
                {isItalianShop && !bankAccountDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-bold text-yellow-800 mb-2">
                      Debug: Conto bancario non trovato
                    </h3>
                    <p className="text-yellow-700 text-sm mb-2">
                      Conti bancari disponibili: {bankAccounts.length > 0 ? bankAccounts.map(acc => acc.system_name).join(', ') : 'Nessuno'}
                    </p>
                    <p className="text-yellow-700 text-sm">
                      Shop Type: {shopConfig.shopType} | Domain: {typeof window !== 'undefined' ? window.location.hostname : 'N/A'}
                    </p>
                  </motion.div>
                )}

                {/* Supplier Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {isItalianShop 
                      ? 'Il tuo fornitore'
                      : isFrenchShop 
                        ? 'Votre fournisseur' 
                        : 'Ihr Lieferant'
                    }
                  </h3>
                  <SupplierInfo supplier={supplier} isLoading={isLoadingSupplier} />
                </motion.div>

                {/* Payment Instructions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <CreditCard className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {isItalianShop 
                          ? 'Istruzioni di pagamento'
                          : isFrenchShop 
                            ? 'Instructions de paiement' 
                            : 'Zahlungshinweise'
                        }
                      </h3>
                      <p className="text-gray-600">
                        {isItalianShop 
                          ? 'Come pagare il tuo ordine'
                          : isFrenchShop 
                            ? 'Comment payer votre commande' 
                            : 'So zahlen Sie Ihre Bestellung'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-3">
                        {isItalianShop 
                          ? 'Prossimi passi'
                          : isFrenchShop 
                            ? 'Prochaines étapes' 
                            : 'Nächste Schritte'
                        }
                      </h4>
                      <div className="space-y-2 text-sm">
                        {!isFrenchShop && !isItalianShop && (
                          <div className="flex items-start space-x-3">
                            <Phone className="text-blue-600 mt-1" size={16} />
                            <div>
                              <div className="font-semibold text-blue-900">
                                1. Telefonischer Kontakt
                              </div>
                              <div className="text-blue-700">
                                Wir rufen Sie in den nächsten 24 Stunden an, um Ihre Bestellung zu bestätigen und Ihnen unsere Bankverbindung mitzuteilen.
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex items-start space-x-3">
                          <CreditCard className="text-blue-600 mt-1" size={16} />
                          <div>
                            <div className="font-semibold text-blue-900">
                              {isItalianShop 
                                ? '1. Bonifico bancario'
                                : isFrenchShop 
                                  ? '1. Virement bancaire' 
                                  : '2. Überweisung'
                              }
                            </div>
                            <div className="text-blue-700">
                              {isItalianShop 
                                ? `Si prega di trasferire l'importo di ${orderData.total.toFixed(2)}€ con il riferimento ${orderNumber}.`
                                : isFrenchShop 
                                  ? `Veuillez virer le montant de ${orderData.total.toFixed(2)}€ avec la référence ${orderNumber}.`
                                  : `Nach unserem Anruf überweisen Sie den Betrag von ${orderData.total.toFixed(2)}€ auf unser Konto.`
                              }
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Truck className="text-blue-600 mt-1" size={16} />
                          <div>
                            <div className="font-semibold text-blue-900">
                              {isItalianShop 
                                ? '2. Consegna'
                                : isFrenchShop 
                                  ? '2. Livraison' 
                                  : '3. Lieferung'
                              }
                            </div>
                            <div className="text-blue-700">
                              {isItalianShop 
                                ? 'Dopo il ricevimento del pagamento, la consegna avviene in 3-5 giorni lavorativi.'
                                : isFrenchShop 
                                  ? 'Après réception du paiement, la livraison s\'effectue en 2-4 jours ouvrables.'
                                  : 'Nach Zahlungseingang erfolgt die Lieferung in 4-7 Werktagen.'
                              }
                            </div>
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
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <Truck className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {isItalianShop 
                          ? 'Informazioni sulla consegna'
                          : isFrenchShop 
                            ? 'Informations de livraison' 
                            : 'Lieferinformationen'
                        }
                      </h3>
                      <p className="text-gray-600">
                        {isItalianShop 
                          ? 'Dettagli importanti sulla tua consegna'
                          : isFrenchShop 
                            ? 'Détails importants sur votre livraison' 
                            : 'Wichtige Details zu Ihrer Lieferung'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Calendar className="text-orange-600 mr-2" size={18} />
                        <span className="font-semibold text-orange-900">
                          {isItalianShop 
                            ? 'Data di consegna'
                            : isFrenchShop 
                              ? 'Date de livraison' 
                              : 'Liefertermin'
                          }
                        </span>
                      </div>
                      <div className="text-orange-800 font-bold">
                        {isItalianShop 
                          ? '3-5 giorni lavorativi'
                          : isFrenchShop 
                            ? '2-4 jours ouvrables' 
                            : orderData.deliveryDate
                        }
                      </div>
                      <div className="text-orange-700 text-sm">
                        {isItalianShop 
                          ? 'dopo il ricevimento del pagamento'
                          : isFrenchShop 
                            ? 'Après réception du paiement' 
                            : 'Nach Zahlungseingang'
                        }
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-semibold text-gray-900 mb-2">
                        {isItalianShop 
                          ? 'Indirizzo di consegna'
                          : isFrenchShop 
                            ? 'Adresse de livraison' 
                            : 'Lieferadresse'
                        }
                      </div>
                      <div className="text-gray-700 text-sm space-y-1">
                        <div>{orderData.deliveryFirstName} {orderData.deliveryLastName}</div>
                        <div>{orderData.deliveryStreet}</div>
                        <div>{orderData.deliveryPostcode} {orderData.deliveryCity}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      📞 {isItalianShop 
                        ? 'Nota importante sulla consegna'
                        : isFrenchShop 
                          ? 'Remarque importante sur la livraison' 
                          : 'Wichtiger Hinweis zur Lieferung'
                      }
                    </h4>
                    <p className="text-yellow-700 text-sm">
                      {isItalianShop 
                        ? `Il nostro autista ti contatterà telefonicamente il giorno della consegna. Assicurati di essere raggiungibile al ${orderData.deliveryPhone}.`
                        : isFrenchShop 
                          ? `Notre chauffeur vous contactera par téléphone le jour de la livraison. Assurez-vous d'être joignable au ${orderData.deliveryPhone}.`
                          : `Unser Fahrer wird Sie am Liefertag telefonisch kontaktieren. Bitte stellen Sie sicher, dass Sie unter ${orderData.deliveryPhone} erreichbar sind.`
                      }
                    </p>
                  </div>
                </motion.div>

                {/* Contact Support */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {isItalianShop 
                      ? 'Domande sul tuo ordine?'
                      : isFrenchShop 
                        ? 'Questions sur votre commande?' 
                        : 'Fragen zu Ihrer Bestellung?'
                    }
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="text-red-600" size={20} />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {isItalianShop ? 'Telefono' : isFrenchShop ? 'Téléphone' : 'Telefon'}
                        </div>
                        <div className="text-gray-600 text-sm">0800 123 456 7</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="text-red-600" size={20} />
                      <div>
                        <div className="font-semibold text-gray-900">E-Mail</div>
                        <div className="text-gray-600 text-sm">
                          {isItalianShop 
                            ? 'servizio@gasoliocasa.com'
                            : isFrenchShop 
                              ? 'service@fioul-rapide.fr' 
                              : 'service@heizoeldirekt.de'
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button
                      onClick={handleNewOrder}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold"
                    >
                      {isItalianShop 
                        ? 'Nuovo ordine'
                        : isFrenchShop 
                          ? 'Nouvelle commande' 
                          : 'Neue Bestellung aufgeben'
                      }
                    </Button>
                  </div>
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
                      description: isItalianShop 
                        ? 'Gasolio di qualità secondo norma DIN 51603-1'
                        : isFrenchShop 
                          ? 'Fioul de qualité selon norme DIN 51603-1' 
                          : 'Qualitäts-Heizöl nach DIN 51603-1'
                    },
                    amount: orderData.amount,
                    postcode: orderData.deliveryPostcode,
                    basePrice: orderData.basePrice,
                    deliveryFee: orderData.deliveryFee,
                    totalPrice: orderData.total,
                    savings: orderData.discount
                  }}
                  bankAccountDetails={bankAccountDetails ? {
                    ...bankAccountDetails,
                    account_holder: displayAccountHolder
                  } : null}
                  orderNumber={orderNumber}
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

export default Confirmation;
