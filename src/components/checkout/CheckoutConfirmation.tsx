import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Truck, Package, Phone, Mail, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/contexts/OrderContext';
import { useCheckoutTranslations } from '@/hooks/useCheckoutTranslations';
import { useItalianCheckoutTranslations } from '@/hooks/useItalianCheckoutTranslations';
import { useDomainShop } from '@/hooks/useDomainShop';
import { useBankAccounts } from '@/hooks/useBankAccounts';
import { useShops } from '@/hooks/useShops';
import { formatIban } from '@/utils/ibanFormatter';

interface PriceCalculatorData {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
  amount: number;
  postcode: string;
  basePrice: number;
  deliveryFee: number;
  totalPrice: number;
  savings: number;
}

interface CheckoutConfirmationProps {
  orderData: PriceCalculatorData;
  orderNumber: string;
  onNewOrder: () => void;
}

const CheckoutConfirmation = ({
  orderData,
  orderNumber,
  onNewOrder
}: CheckoutConfirmationProps) => {
  const {
    orderData: contextOrderData
  } = useOrder();
  const germanTranslations = useCheckoutTranslations();
  const italianTranslations = useItalianCheckoutTranslations();
  const shopConfig = useDomainShop();
  const isItalianShop = shopConfig.shopType === 'italy';
  const { bankAccounts } = useBankAccounts();
  const { shops } = useShops();
  const [bankAccountDetails, setBankAccountDetails] = useState<any>(null);
  const [displayAccountHolder, setDisplayAccountHolder] = useState<string>('');

  // Use the correct translations based on shop type
  const t = isItalianShop ? italianTranslations : germanTranslations;

  console.log('CheckoutConfirmation - Shop detection:', {
    shopType: shopConfig.shopType,
    isItalianShop,
    domain: typeof window !== 'undefined' ? window.location.hostname : 'N/A',
    pathname: typeof window !== 'undefined' ? window.location.pathname : 'N/A'
  });

  // Fetch bank account details for Italian shop
  useEffect(() => {
    if (isItalianShop) {
      console.log('CheckoutConfirmation - Available bank accounts:', bankAccounts.map(acc => ({
        id: acc.id,
        system_name: acc.system_name,
        bank_name: acc.bank_name,
        is_active: acc.is_active
      })));

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
      
      console.log('CheckoutConfirmation - Italian account search result:', {
        found: !!italianAccount,
        account: italianAccount ? {
          id: italianAccount.id,
          system_name: italianAccount.system_name,
          bank_name: italianAccount.bank_name
        } : null
      });
      
      if (italianAccount) {
        setBankAccountDetails(italianAccount);
        setDisplayAccountHolder('Gasolio Casa');
        console.log('CheckoutConfirmation - Using Italian account holder: Gasolio Casa');
      } else {
        console.warn('CheckoutConfirmation - No active Italian bank account found. Available accounts:', 
          bankAccounts.filter(acc => acc.is_active).map(acc => acc.system_name)
        );
      }
    }
  }, [isItalianShop, bankAccounts, shops]);

  if (!contextOrderData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          {isItalianShop ? 'Dati di ordine non disponibili' : 'Bestelldaten nicht verfügbar'}
        </p>
      </div>
    );
  }

  // VAT calculations (19% VAT for Germany, 22% for Italy)
  const vatRate = isItalianShop ? 0.22 : 0.19;
  const netPrice = orderData.totalPrice / (1 + vatRate);
  const vatAmount = orderData.totalPrice - netPrice;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Confirmation Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Order Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-8 shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t.confirmation.title}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {t.confirmation.subtitle}
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
            <div className="text-sm text-red-600 font-medium">
              {t.confirmation.orderNumber}
            </div>
            <div className="text-2xl font-bold text-red-700">{orderNumber}</div>
          </div>
        </motion.div>

        {/* Bank Account Details for Italian Shop - Show prominently */}
        {isItalianShop && bankAccountDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="bg-green-50 border-2 border-green-300 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Building2 className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-900">{t.confirmation.bankAccountTitle}</h3>
                <p className="text-green-700">{t.confirmation.bankAccountSubtitle}</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">{t.confirmation.accountHolder}</div>
                  <div className="text-green-900 font-bold">{displayAccountHolder}</div>
                </div>
                
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">{t.confirmation.bankName}</div>
                  <div className="text-green-900 font-bold">{bankAccountDetails.bank_name}</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">IBAN</div>
                  <div className="text-green-900 font-mono text-sm font-bold break-all">{formatIban(bankAccountDetails.iban)}</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">BIC</div>
                  <div className="text-green-900 font-mono font-bold">{bankAccountDetails.bic}</div>
                </div>
                
                <div className="bg-green-100 p-3 rounded-lg border border-green-200">
                  <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">{t.confirmation.reference}</div>
                  <div className="text-green-900 font-bold text-lg">{orderNumber}</div>
                </div>
                
                <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                  <div className="text-red-800 font-semibold text-xs uppercase tracking-wide">{t.confirmation.transferAmount}</div>
                  <div className="text-red-900 font-bold text-xl">{contextOrderData.total.toFixed(2)}€</div>
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
            transition={{ duration: 0.6, delay: 0.05 }}
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

        {/* Payment Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <CreditCard className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {t.confirmation.paymentInstructions}
              </h3>
              <p className="text-gray-600">
                {t.confirmation.howToPay}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3">
                {t.confirmation.nextSteps}
              </h4>
              <div className="space-y-2 text-sm">
                {!isItalianShop && (
                  <div className="flex items-start space-x-3">
                    <Phone className="text-blue-600 mt-1" size={16} />
                    <div>
                      <div className="font-semibold text-blue-900">
                        {t.confirmation.phoneContact}
                      </div>
                      <div className="text-blue-700">
                        {t.confirmation.phoneContactDesc}
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-start space-x-3">
                  <CreditCard className="text-blue-600 mt-1" size={16} />
                  <div>
                    <div className="font-semibold text-blue-900">
                      {isItalianShop ? '1. Bonifico bancario' : '2. Überweisung'}
                    </div>
                    <div className="text-blue-700">
                      {isItalianShop 
                        ? `Si prega di trasferire l'importo di ${contextOrderData.total.toFixed(2)}€ con il riferimento ${orderNumber}.`
                        : t.confirmation.bankTransferDesc.replace('{amount}', contextOrderData.total.toFixed(2))
                      }
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Truck className="text-blue-600 mt-1" size={16} />
                  <div>
                    <div className="font-semibold text-blue-900">
                      {isItalianShop ? '2. Consegna' : '3. Lieferung'}
                    </div>
                    <div className="text-blue-700">
                      {t.confirmation.deliveryDesc}
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-6">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <Truck className="text-orange-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {t.confirmation.deliveryInformation}
              </h3>
              <p className="text-gray-600">
                {t.confirmation.deliveryDetails}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Calendar className="text-orange-600 mr-2" size={18} />
                <span className="font-semibold text-orange-900">
                  {t.confirmation.deliveryTerm}
                </span>
              </div>
              <div className="text-orange-800 font-bold">
                {isItalianShop ? '3-5 giorni lavorativi' : t.summary.workdays}
              </div>
              <div className="text-orange-700 text-sm">
                {t.summary.afterPayment}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-2">
                {t.confirmation.deliveryAddress}
              </div>
              <div className="text-gray-700 text-sm space-y-1">
                <div>{contextOrderData.deliveryFirstName} {contextOrderData.deliveryLastName}</div>
                <div>{contextOrderData.deliveryStreet}</div>
                <div>{contextOrderData.deliveryPostcode} {contextOrderData.deliveryCity}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">
              📞 {t.confirmation.importantNote}
            </h4>
            <p className="text-yellow-700 text-sm">
              {t.confirmation.importantNoteDesc.replace('{phone}', contextOrderData.deliveryPhone)}
            </p>
          </div>
        </motion.div>

        {/* Contact Support - Only show for non-Italian orders */}
        {!isItalianShop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t.confirmation.questionsAboutOrder}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="text-red-600" size={20} />
                <div>
                  <div className="font-semibold text-gray-900">
                    {t.confirmation.phone}
                  </div>
                  <div className="text-gray-600 text-sm">+39 02 1234 5678</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="text-red-600" size={20} />
                <div>
                  <div className="font-semibold text-gray-900">{t.confirmation.email}</div>
                  <div className="text-gray-600 text-sm">info@gasoliocasa.com</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Button
                onClick={onNewOrder}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold"
              >
                {t.confirmation.newOrder}
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border sticky top-4"
        >
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Package className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t.summary.orderSummary}
              </h3>
              <p className="text-sm text-gray-600">
                {t.summary.confirmedOrder}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">
                {t.summary.product}
              </span>
              <span className="font-semibold">{orderData.product.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">
                {t.summary.quantity}
              </span>
              <span className="font-semibold">{orderData.amount.toLocaleString(isItalianShop ? 'it-IT' : 'de-DE')} Litri</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">
                {t.summary.pricePerLiter}
              </span>
              <span className="font-semibold">{orderData.product.price.toFixed(3)}€</span>
            </div>
            
            <hr className="border-gray-200" />
            
            <div className="flex justify-between">
              <span className="text-gray-600">
                {t.confirmation.basePrice}
              </span>
              <span className="font-semibold">{orderData.basePrice.toFixed(2)}€</span>
            </div>
            
            <div className="flex justify-between text-green-600">
              <span>{t.confirmation.deliveryLabel}</span>
              <span className="font-semibold">
                {orderData.deliveryFee === 0 ? t.summary.free : `${orderData.deliveryFee.toFixed(2)}€`}
              </span>
            </div>
            
            <hr className="border-gray-200" />
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {t.summary.net}
              </span>
              <span className="font-semibold">{netPrice.toFixed(2)}€</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {isItalianShop ? 'IVA (22%)' : t.summary.vat}
              </span>
              <span className="font-semibold">{vatAmount.toFixed(2)}€</span>
            </div>
            
            <hr className="border-gray-200" />
            
            <div className="flex justify-between text-xl font-bold">
              <span>{t.summary.total}</span>
              <span className="text-blue-600">{orderData.totalPrice.toFixed(2)}€</span>
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              {t.summary.ofWhichVat.replace('{amount}', vatAmount.toFixed(2))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
