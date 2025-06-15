
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Package, Building2, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

interface OrderSummaryProps {
  orderData: PriceCalculatorData;
  bankAccountDetails?: any;
  orderNumber?: string;
  autoScrollToBankDetails?: boolean;
}

const OrderSummary = ({ 
  orderData, 
  bankAccountDetails, 
  orderNumber,
  autoScrollToBankDetails = false 
}: OrderSummaryProps) => {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const shopConfig = useDomainShop();
  const isFrenchShop = shopConfig.shopType === 'france';
  const bankDetailsRef = useRef<HTMLDivElement>(null);

  // Show bank details for French shop when bank account details are available
  useEffect(() => {
    if (isFrenchShop && bankAccountDetails) {
      setShowBankDetails(true);
    }
  }, [isFrenchShop, bankAccountDetails]);

  // Auto scroll to bank details section for French checkout
  useEffect(() => {
    if (autoScrollToBankDetails && showBankDetails && bankDetailsRef.current) {
      const timer = setTimeout(() => {
        bankDetailsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 500); // Small delay to ensure content is rendered

      return () => clearTimeout(timer);
    }
  }, [autoScrollToBankDetails, showBankDetails]);

  // VAT calculations (19% VAT)
  const vatRate = 0.19;
  const netPrice = orderData.totalPrice / (1 + vatRate);
  const vatAmount = orderData.totalPrice - netPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-6"
    >
      {/* Order Summary Card */}
      <Card className="shadow-sm border">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <Package className="text-blue-600" size={20} />
            </div>
            {isFrenchShop ? 'Résumé de commande' : 'Bestellübersicht'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {isFrenchShop ? 'Produit' : 'Produkt'}
            </span>
            <span className="font-semibold">{orderData.product.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">
              {isFrenchShop ? 'Quantité' : 'Menge'}
            </span>
            <span className="font-semibold">{orderData.amount.toLocaleString(isFrenchShop ? 'fr-FR' : 'de-DE')} Liter</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">
              {isFrenchShop ? 'Prix par litre' : 'Preis pro Liter'}
            </span>
            <span className="font-semibold">{orderData.product.price.toFixed(2)}€</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between">
            <span className="text-gray-600">
              {isFrenchShop ? 'Prix de base' : 'Grundpreis'}
            </span>
            <span className="font-semibold">{orderData.basePrice.toFixed(2)}€</span>
          </div>
          
          <div className="flex justify-between text-green-600">
            <span>{isFrenchShop ? 'Livraison' : 'Lieferung'}</span>
            <span className="font-semibold">
              {orderData.deliveryFee === 0 ? (isFrenchShop ? 'Gratuite' : 'Kostenfrei') : `${orderData.deliveryFee.toFixed(2)}€`}
            </span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {isFrenchShop ? 'Net' : 'Netto'}
            </span>
            <span className="font-semibold">{netPrice.toFixed(2)}€</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {isFrenchShop ? 'TVA' : 'MwSt.'}
            </span>
            <span className="font-semibold">{vatAmount.toFixed(2)}€</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between text-xl font-bold">
            <span>{isFrenchShop ? 'Total' : 'Gesamt'}</span>
            <span className="text-blue-600">{orderData.totalPrice.toFixed(2)}€</span>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            {isFrenchShop 
              ? `TVA incluse (${vatAmount.toFixed(2)}€)`
              : `inkl. MwSt. (${vatAmount.toFixed(2)}€)`
            }
          </div>

          {orderNumber && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
              <div className="text-sm text-red-600 font-medium">
                {isFrenchShop ? 'Numéro de commande' : 'Bestellnummer'}
              </div>
              <div className="text-lg font-bold text-red-700">{orderNumber}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bank Details Card for French Shop */}
      {showBankDetails && bankAccountDetails && (
        <Card ref={bankDetailsRef} className="shadow-sm border border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-green-900">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <Building2 className="text-green-600" size={20} />
              </div>
              Coordonnées bancaires
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 space-y-3">
              <div>
                <div className="text-sm font-medium text-green-800 mb-1">Titulaire du compte</div>
                <div className="text-green-900 font-semibold">Fioul Rapide</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-green-800 mb-1">Banque</div>
                <div className="text-green-900 font-semibold">{bankAccountDetails.bank_name}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-green-800 mb-1">IBAN</div>
                <div className="text-green-900 font-mono text-sm break-all">{formatIban(bankAccountDetails.iban)}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-green-800 mb-1">BIC</div>
                <div className="text-green-900 font-mono">{bankAccountDetails.bic}</div>
              </div>
            </div>

            <div className="bg-green-100 rounded-lg p-4 border border-green-200">
              <div className="text-sm font-medium text-green-800 mb-1">Montant à virer</div>
              <div className="text-2xl font-bold text-green-900">{orderData.totalPrice.toFixed(2)}€</div>
              {orderNumber && (
                <div className="text-sm text-green-700 mt-1">Référence: {orderNumber}</div>
              )}
            </div>

            <div className="text-xs text-green-700 text-center">
              Effectuez le virement avec ces informations pour finaliser votre commande
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Method Card for German Shop */}
      {!isFrenchShop && (
        <Card className="shadow-sm border">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <CreditCard className="text-green-600" size={20} />
              </div>
              Zahlungsart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-2">Vorkasse</div>
              <div className="text-gray-700 text-sm space-y-1">
                <div>• Überweisung vor Lieferung</div>
                <div>• Bankverbindung erhalten Sie per E-Mail</div>
                <div>• Lieferung erfolgt nach Zahlungseingang</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default OrderSummary;
