
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Truck, Shield, Calculator, Building2 } from 'lucide-react';
import { useDomainShop } from '@/hooks/useDomainShop';

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

  return (
    <div className="space-y-6">
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
              {isFrenchShop ? 'Résumé de commande' : 'Bestellübersicht'}
            </h3>
            <p className="text-gray-600">
              {isFrenchShop ? 'Votre sélection en résumé' : 'Ihre Auswahl im Überblick'}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {isFrenchShop ? 'Produit' : 'Produkt'}
            </span>
            <span className="font-semibold">{data.product.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">
              {isFrenchShop ? 'Quantité' : 'Menge'}
            </span>
            <span className="font-semibold">{data.amount.toLocaleString(isFrenchShop ? 'fr-FR' : 'de-DE')} Liter</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">
              {isFrenchShop ? 'Prix par litre' : 'Preis pro Liter'}
            </span>
            <span className="font-semibold">{data.product.price.toFixed(2)}€</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between">
            <span className="text-gray-600">
              {isFrenchShop ? 'Prix de base' : 'Grundpreis'}
            </span>
            <span className="font-semibold">{data.basePrice.toFixed(2)}€</span>
          </div>
          
          <div className="flex justify-between text-green-600">
            <span>{isFrenchShop ? 'Livraison' : 'Lieferung'}</span>
            <span className="font-semibold">
              {data.deliveryFee === 0 ? (isFrenchShop ? 'Gratuite' : 'Kostenlos') : `${data.deliveryFee.toFixed(2)}€`}
            </span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between text-xl font-bold">
            <span>{isFrenchShop ? 'Prix total' : 'Gesamtpreis'}</span>
            <span className="text-red-600">{finalPrice.toFixed(2)}€</span>
          </div>
        </div>

        {/* Bank Account Details for French Shop */}
        {isFrenchShop && bankAccountDetails && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Building2 className="text-green-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-green-900">Coordonnées bancaires</h4>
                <p className="text-sm text-green-700">Pour votre virement</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <div className="text-green-800 font-medium">Titulaire</div>
                <div className="text-green-900">{bankAccountDetails.account_holder}</div>
              </div>
              <div>
                <div className="text-green-800 font-medium">Banque</div>
                <div className="text-green-900">{bankAccountDetails.bank_name}</div>
              </div>
              <div>
                <div className="text-green-800 font-medium">IBAN</div>
                <div className="text-green-900 font-mono text-xs">{bankAccountDetails.iban}</div>
              </div>
              <div>
                <div className="text-green-800 font-medium">BIC</div>
                <div className="text-green-900 font-mono">{bankAccountDetails.bic}</div>
              </div>
              {orderNumber && (
                <div className="mt-3 p-2 bg-green-100 rounded">
                  <div className="text-green-800 font-medium text-xs">Référence</div>
                  <div className="text-green-900 font-semibold">{orderNumber}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delivery Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-3">
            <Clock className="text-blue-600 mr-2" size={18} />
            <span className="font-semibold text-gray-900">
              {isFrenchShop ? 'Date de livraison' : 'Liefertermin'}
            </span>
          </div>
          <p className="text-gray-700 font-semibold">
            {isFrenchShop ? '4-7 jours ouvrables' : '4-7 Werktage'}
          </p>
          <p className="text-sm text-gray-600">
            {isFrenchShop ? 'Après réception du paiement' : 'Nach Zahlungseingang'}
          </p>
        </div>

        {/* Trust Badges */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <Shield className="text-green-600" size={16} />
            <span className="text-gray-700">
              {isFrenchShop ? 'Paiement sécurisé' : 'Sichere Zahlung'}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Truck className="text-blue-600" size={16} />
            <span className="text-gray-700">
              {isFrenchShop ? 'Livraison ponctuelle' : 'Pünktliche Lieferung'}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Calculator className="text-red-600" size={16} />
            <span className="text-gray-700">
              {isFrenchShop ? 'Prix transparents' : 'Transparente Preise'}
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
          {isFrenchShop ? 'Questions sur la commande?' : 'Fragen zur Bestellung?'}
        </h4>
        <p className="text-blue-800 text-sm mb-4">
          {isFrenchShop 
            ? 'Notre service client vous aide volontiers.'
            : 'Unser Kundenservice hilft Ihnen gerne weiter.'
          }
        </p>
        <div className="space-y-2 text-sm">
          <div className="text-blue-800">
            <strong>{isFrenchShop ? 'Téléphone:' : 'Telefon:'}</strong> 0800 123 456 7
          </div>
          <div className="text-blue-800">
            <strong>E-Mail:</strong> {isFrenchShop ? 'service@fioul-rapide.fr' : 'service@heizoeldirekt.de'}
          </div>
          <div className="text-blue-700">
            {isFrenchShop ? 'Lun-Ven: 8h00-18h00' : 'Mo-Fr: 8:00-18:00 Uhr'}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSummary;
