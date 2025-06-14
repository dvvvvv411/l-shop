
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, Truck, Shield, Calculator, Building2 } from 'lucide-react';
import { useDomainShop } from '@/hooks/useDomainShop';
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
  autoScrollToBankDetails?: boolean;
}

const OrderSummary = ({ orderData, bankAccountDetails, orderNumber, autoScrollToBankDetails }: OrderSummaryProps) => {
  const shopConfig = useDomainShop();
  const isFrenchShop = shopConfig.shopType === 'france';
  const isItalianShop = shopConfig.shopType === 'italy';
  const bankDetailsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bank details for French shop orders
  useEffect(() => {
    if (autoScrollToBankDetails && isFrenchShop && bankAccountDetails && bankDetailsRef.current) {
      const timer = setTimeout(() => {
        bankDetailsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoScrollToBankDetails, isFrenchShop, bankAccountDetails]);

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

  // Get the appropriate account holder name - ALWAYS show "Fioul Rapide" for French shop
  const getAccountHolderName = () => {
    if (isFrenchShop) {
      return 'Fioul Rapide';
    }
    if (isItalianShop) {
      return 'Gasolio Veloce';
    }
    return bankAccountDetails?.account_holder || '';
  };

  return (
    <div className="space-y-6">
      {/* Bank Account Details for French Shop and Italian Shop - Show prominently at top */}
      {(isFrenchShop || isItalianShop) && bankAccountDetails && (
        <motion.div
          ref={bankDetailsRef}
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
                {isItalianShop ? 'Dati bancari' : 'Coordonnées bancaires'}
              </h3>
              <p className="text-green-700">
                {isItalianShop ? 'Per il tuo bonifico' : 'Pour votre virement'}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white p-3 rounded-lg">
                <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">
                  {isItalianShop ? 'Intestatario' : 'Titulaire'}
                </div>
                <div className="text-green-900 font-bold">
                  {getAccountHolderName()}
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-lg">
                <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">
                  {isItalianShop ? 'Banca' : 'Banque'}
                </div>
                <div className="text-green-900 font-bold">{bankAccountDetails.bank_name}</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">IBAN</div>
                <div className="text-green-900 font-mono text-sm font-bold break-all">
                  {formatIban(bankAccountDetails.iban)}
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">BIC</div>
                <div className="text-green-900 font-mono font-bold">{bankAccountDetails.bic}</div>
              </div>
              
              {orderNumber && (
                <div className="bg-green-100 p-3 rounded-lg border border-green-200">
                  <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">
                    {isItalianShop ? 'Riferimento' : 'Référence'}
                  </div>
                  <div className="text-green-900 font-bold text-lg">{orderNumber}</div>
                </div>
              )}
              
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                <div className="text-red-800 font-semibold text-xs uppercase tracking-wide">
                  {isItalianShop ? 'Importo da trasferire' : 'Montant à virer'}
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
              {isItalianShop ? 'Riepilogo ordine' : (isFrenchShop ? 'Résumé de commande' : 'Bestellübersicht')}
            </h3>
            <p className="text-gray-600">
              {isItalianShop ? 'La tua selezione in sintesi' : (isFrenchShop ? 'Votre sélection en résumé' : 'Ihre Auswahl im Überblick')}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {isItalianShop ? 'Prodotto' : (isFrenchShop ? 'Produit' : 'Produkt')}
            </span>
            <span className="font-semibold">{data.product.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">
              {isItalianShop ? 'Quantità' : (isFrenchShop ? 'Quantité' : 'Menge')}
            </span>
            <span className="font-semibold">
              {data.amount.toLocaleString(isItalianShop ? 'it-IT' : (isFrenchShop ? 'fr-FR' : 'de-DE'))} Liter
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">
              {isItalianShop ? 'Prezzo per litro' : (isFrenchShop ? 'Prix par litre' : 'Preis pro Liter')}
            </span>
            <span className="font-semibold">{data.product.price.toFixed(2)}€</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between">
            <span className="text-gray-600">
              {isItalianShop ? 'Prezzo base' : (isFrenchShop ? 'Prix de base' : 'Grundpreis')}
            </span>
            <span className="font-semibold">{data.basePrice.toFixed(2)}€</span>
          </div>
          
          <div className="flex justify-between text-green-600">
            <span>
              {isItalianShop ? 'Consegna' : (isFrenchShop ? 'Livraison' : 'Lieferung')}
            </span>
            <span className="font-semibold">
              {data.deliveryFee === 0 ? 
                (isItalianShop ? 'Gratuita' : (isFrenchShop ? 'Gratuite' : 'Kostenlos')) : 
                `${data.deliveryFee.toFixed(2)}€`
              }
            </span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between text-xl font-bold">
            <span>
              {isItalianShop ? 'Prezzo totale' : (isFrenchShop ? 'Prix total' : 'Gesamtpreis')}
            </span>
            <span className="text-red-600">{finalPrice.toFixed(2)}€</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-3">
            <Clock className="text-blue-600 mr-2" size={18} />
            <span className="font-semibold text-gray-900">
              {isItalianShop ? 'Data di consegna' : (isFrenchShop ? 'Date de livraison' : 'Liefertermin')}
            </span>
          </div>
          <p className="text-gray-700 font-semibold">
            {isItalianShop ? '3-5 giorni lavorativi' : (isFrenchShop ? '4-7 jours ouvrables' : '4-7 Werktage')}
          </p>
          <p className="text-sm text-gray-600">
            {isItalianShop ? 'Dopo il ricevimento del pagamento' : (isFrenchShop ? 'Après réception du paiement' : 'Nach Zahlungseingang')}
          </p>
        </div>

        {/* Trust Badges */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <Shield className="text-green-600" size={16} />
            <span className="text-gray-700">
              {isItalianShop ? 'Pagamento sicuro' : (isFrenchShop ? 'Paiement sécurisé' : 'Sichere Zahlung')}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Truck className="text-blue-600" size={16} />
            <span className="text-gray-700">
              {isItalianShop ? 'Consegna puntuale' : (isFrenchShop ? 'Livraison ponctuelle' : 'Pünktliche Lieferung')}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Calculator className="text-red-600" size={16} />
            <span className="text-gray-700">
              {isItalianShop ? 'Prezzi trasparenti' : (isFrenchShop ? 'Prix transparents' : 'Transparente Preise')}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-blue-50 rounded-xl p-6"
      >
        <h4 className="font-bold text-blue-900 mb-3">
          {isItalianShop ? 'Domande sull\'ordine?' : (isFrenchShop ? 'Questions sur la commande?' : 'Fragen zur Bestellung?')}
        </h4>
        <p className="text-blue-800 text-sm mb-4">
          {isItalianShop 
            ? 'Il nostro servizio clienti ti aiuta volentieri.'
            : (isFrenchShop 
                ? 'Notre service client vous aide volontiers.'
                : 'Unser Kundenservice hilft Ihnen gerne weiter.'
            )
          }
        </p>
        <div className="space-y-2 text-sm">
          <div className="text-blue-800">
            <strong>{isItalianShop ? 'Telefono:' : (isFrenchShop ? 'Téléphone:' : 'Telefon:')}</strong> 0800 123 456 7
          </div>
          <div className="text-blue-800">
            <strong>E-Mail:</strong> {isItalianShop ? 'servizio@gasoliocasa.it' : (isFrenchShop ? 'service@fioul-rapide.fr' : 'service@heizoeldirekt.de')}
          </div>
          <div className="text-blue-700">
            {isItalianShop ? 'Lun-Ven: 8:00-18:00' : (isFrenchShop ? 'Lun-Ven: 8h00-18h00' : 'Mo-Fr: 8:00-18:00 Uhr')}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSummary;
