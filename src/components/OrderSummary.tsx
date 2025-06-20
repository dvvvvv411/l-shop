import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Truck, Shield, Calculator, Building2 } from 'lucide-react';
import { useDomainShop } from '@/hooks/useDomainShop';
import { useCheckoutTranslations } from '@/hooks/useCheckoutTranslations';
import { useItalianCheckoutTranslations } from '@/hooks/useItalianCheckoutTranslations';

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

interface BankAccountDetails {
  account_holder: string;
  bank_name: string;
  iban: string;
  bic: string;
}

interface OrderSummaryProps {
  orderData?: PriceCalculatorData | null;
  bankAccountDetails?: BankAccountDetails | null;
  orderNumber?: string;
}

const OrderSummary = ({ orderData, bankAccountDetails, orderNumber }: OrderSummaryProps) => {
  const shopConfig = useDomainShop();
  const isFrenchShop = shopConfig.shopType === 'france';
  const isItalianShop = shopConfig.shopType === 'italy';

  // Use the proper translation systems
  const germanFrenchTranslations = useCheckoutTranslations();
  const italianTranslations = useItalianCheckoutTranslations();
  
  // Use Italian translations for Italian shop, German/French for others
  const t = isItalianShop ? italianTranslations : germanFrenchTranslations;

  // Fallback to mock data if no orderData is provided (for backwards compatibility)
  const fallbackData = {
    product: { name: 'Standard Heizöl', price: 0.70 },
    amount: 3000,
    basePrice: 2100.00,
    deliveryFee: 0,
    savings: 0,
    totalPrice: 2100.00,
    postcode: '12345'
  };

  const data = orderData || fallbackData;
  const finalPrice = data.totalPrice;

  console.log('OrderSummary - Bank account details received:', bankAccountDetails);

  // Format IBAN for French shop
  const formatIbanForShop = (iban: string) => {
    if (isFrenchShop && iban) {
      // For French checkout, format as "IT43 J0760 1159 0000 1074 7057 30"
      const cleanIban = iban.replace(/\s/g, '');
      if (cleanIban.startsWith('IT') && cleanIban.length >= 27) {
        return `${cleanIban.slice(0, 4)} ${cleanIban.slice(4, 5)}${cleanIban.slice(5, 9)} ${cleanIban.slice(9, 13)} ${cleanIban.slice(13, 17)} ${cleanIban.slice(17, 21)} ${cleanIban.slice(21, 25)} ${cleanIban.slice(25)}`;
      }
    }
    // For Italian and other shops, use regular formatting with spaces every 4 characters
    return iban.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div className="space-y-6">
      {/* Bank Account Details for French Shop and Italian Shop - Show prominently at top */}
      {(isFrenchShop || isItalianShop) && bankAccountDetails && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-green-50 border-2 border-green-300 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Building2 className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900">
                {isItalianShop ? italianTranslations.confirmation.bankAccountTitle : (isFrenchShop ? 'Détails du compte bancaire' : 'Bankverbindung')}
              </h3>
              <p className="text-green-700">
                {isItalianShop ? italianTranslations.confirmation.bankAccountSubtitle : (isFrenchShop ? 'Pour effectuer le virement' : 'Für die Überweisung')}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white p-3 rounded-lg">
                <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">
                  {isItalianShop ? italianTranslations.confirmation.accountHolder : (isFrenchShop ? 'Titulaire du compte' : 'Kontoinhaber')}
                </div>
                <div className="text-green-900 font-bold">
                  {isItalianShop ? 'Gasolio Casa' : bankAccountDetails.account_holder}
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-lg">
                <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">
                  {isItalianShop ? italianTranslations.confirmation.bankName : (isFrenchShop ? 'Nom de la banque' : 'Bank')}
                </div>
                <div className="text-green-900 font-bold">{bankAccountDetails.bank_name}</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">IBAN</div>
                <div className="text-green-900 font-mono text-sm font-bold break-all">{formatIbanForShop(bankAccountDetails.iban)}</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">BIC</div>
                <div className="text-green-900 font-mono font-bold">{bankAccountDetails.bic}</div>
              </div>
              
              {orderNumber && (
                <div className="bg-green-100 p-3 rounded-lg border border-green-200">
                  <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">
                    {isItalianShop ? italianTranslations.confirmation.reference : (isFrenchShop ? 'Référence' : 'Verwendungszweck')}
                  </div>
                  <div className="text-green-900 font-bold text-lg">{orderNumber}</div>
                </div>
              )}
              
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                <div className="text-red-800 font-semibold text-xs uppercase tracking-wide">
                  {isItalianShop ? italianTranslations.confirmation.transferAmount : (isFrenchShop ? 'Montant à virer' : 'Überweisungsbetrag')}
                </div>
                <div className="text-red-900 font-bold text-xl">{finalPrice.toFixed(2)}€</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-lg sticky top-4"
      >
        <div className="flex items-center mb-6">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <Calculator className="text-red-600" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {t.summary.orderSummary}
            </h3>
            <p className="text-gray-600">
              {isItalianShop ? 'La tua selezione in sintesi' : (isFrenchShop ? 'Votre sélection en résumé' : 'Ihre Auswahl im Überblick')}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {t.summary.product}
            </span>
            <span className="font-semibold">{data.product.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">
              {t.summary.quantity}
            </span>
            <span className="font-semibold">
              {data.amount.toLocaleString(isItalianShop ? 'it-IT' : (isFrenchShop ? 'fr-FR' : 'de-DE'))} Liter
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">
              {t.summary.pricePerLiter}
            </span>
            <span className="font-semibold">{data.product.price.toFixed(2)}€</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between">
            <span className="text-gray-600">
              {t.summary.subtotal}
            </span>
            <span className="font-semibold">{data.basePrice.toFixed(2)}€</span>
          </div>
          
          <div className="flex justify-between text-green-600">
            <span>
              {t.summary.shipping}
            </span>
            <span className="font-semibold">
              {data.deliveryFee === 0 ? t.summary.free : `${data.deliveryFee.toFixed(2)}€`}
            </span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between text-xl font-bold">
            <span>
              {t.summary.total}
            </span>
            <span className="text-red-600">{finalPrice.toFixed(2)}€</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-3">
            <Clock className="text-blue-600 mr-2" size={18} />
            <span className="font-semibold text-gray-900">
              {t.confirmation.deliveryTerm}
            </span>
          </div>
          <p className="text-gray-700 font-semibold">
            {t.summary.workdays}
          </p>
          <p className="text-sm text-gray-600">
            {t.summary.afterPayment}
          </p>
        </div>

        {/* Trust Badges */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <Shield className="text-green-600" size={16} />
            <span className="text-gray-700">
              {t.summary.securePayment}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Truck className="text-blue-600" size={16} />
            <span className="text-gray-700">
              {t.summary.timelyDelivery}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Calculator className="text-red-600" size={16} />
            <span className="text-gray-700">
              {t.summary.fairPrices}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSummary;
