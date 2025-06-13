
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Truck, Package, Phone, Mail, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/contexts/OrderContext';
import { useCheckoutTranslations } from '@/hooks/useCheckoutTranslations';
import { useDomainShop } from '@/hooks/useDomainShop';
import { useBankAccounts } from '@/hooks/useBankAccounts';

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
  const t = useCheckoutTranslations();
  const shopConfig = useDomainShop();
  const isFrenchShop = shopConfig.shopType === 'france';
  const { bankAccounts } = useBankAccounts();
  const [bankAccountDetails, setBankAccountDetails] = useState<any>(null);

  // Fetch bank account details for French shop
  useEffect(() => {
    if (isFrenchShop) {
      const italienChampionAccount = bankAccounts.find(
        account => account.system_name === 'Italien Champion'
      );
      if (italienChampionAccount) {
        setBankAccountDetails(italienChampionAccount);
        console.log('Found Italien Champion bank account for French checkout');
      }
    }
  }, [isFrenchShop, bankAccounts]);

  if (!contextOrderData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          {isFrenchShop ? 'Données de commande non disponibles' : 'Bestelldaten nicht verfügbar'}
        </p>
      </div>
    );
  }

  // VAT calculations (19% VAT)
  const vatRate = 0.19;
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
            {isFrenchShop ? 'Commande confirmée !' : 'Bestellung bestätigt!'}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {isFrenchShop 
              ? 'Merci pour votre commande de fioul'
              : 'Vielen Dank für Ihre Heizöl-Bestellung'
            }
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
            <div className="text-sm text-red-600 font-medium">
              {isFrenchShop ? 'Votre numéro de commande' : t.confirmation.orderNumber}
            </div>
            <div className="text-2xl font-bold text-red-700">{orderNumber}</div>
          </div>
        </motion.div>

        {/* Bank Account Details for French Shop - Show prominently */}
        {isFrenchShop && bankAccountDetails && (
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
                <h3 className="text-xl font-bold text-green-900">Coordonnées bancaires</h3>
                <p className="text-green-700">Pour votre virement</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">Titulaire</div>
                  <div className="text-green-900 font-bold">{bankAccountDetails.account_holder}</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">Banque</div>
                  <div className="text-green-900 font-bold">{bankAccountDetails.bank_name}</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">IBAN</div>
                  <div className="text-green-900 font-mono text-sm font-bold break-all">{bankAccountDetails.iban}</div>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">BIC</div>
                  <div className="text-green-900 font-mono font-bold">{bankAccountDetails.bic}</div>
                </div>
                
                <div className="bg-green-100 p-3 rounded-lg border border-green-200">
                  <div className="text-green-800 font-semibold text-xs uppercase tracking-wide">Référence</div>
                  <div className="text-green-900 font-bold text-lg">{orderNumber}</div>
                </div>
                
                <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                  <div className="text-red-800 font-semibold text-xs uppercase tracking-wide">Montant à virer</div>
                  <div className="text-red-900 font-bold text-xl">{contextOrderData.total.toFixed(2)}€</div>
                </div>
              </div>
            </div>
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
                {isFrenchShop ? 'Instructions de paiement' : t.confirmation.paymentInstructions}
              </h3>
              <p className="text-gray-600">
                {isFrenchShop ? 'Comment payer votre commande' : t.confirmation.howToPay}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3">
                {isFrenchShop ? 'Prochaines étapes' : t.confirmation.nextSteps}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-3">
                  <Phone className="text-blue-600 mt-1" size={16} />
                  <div>
                    <div className="font-semibold text-blue-900">
                      {isFrenchShop ? '1. Contact téléphonique' : t.confirmation.phoneContact}
                    </div>
                    <div className="text-blue-700">
                      {isFrenchShop 
                        ? 'Nous vous appellerons dans les prochaines 24 heures pour confirmer votre commande.'
                        : t.confirmation.phoneContactDesc
                      }
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CreditCard className="text-blue-600 mt-1" size={16} />
                  <div>
                    <div className="font-semibold text-blue-900">
                      {isFrenchShop ? '2. Virement bancaire' : t.confirmation.bankTransfer}
                    </div>
                    <div className="text-blue-700">
                      {isFrenchShop 
                        ? `Veuillez virer le montant de ${contextOrderData.total.toFixed(2)}€ avec la référence ${orderNumber}.`
                        : t.confirmation.bankTransferDesc.replace('{amount}', contextOrderData.total.toFixed(2))
                      }
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Truck className="text-blue-600 mt-1" size={16} />
                  <div>
                    <div className="font-semibold text-blue-900">
                      {isFrenchShop ? '3. Livraison' : t.confirmation.delivery}
                    </div>
                    <div className="text-blue-700">
                      {isFrenchShop 
                        ? 'Après réception du paiement, la livraison s\'effectue en 4-7 jours ouvrables.'
                        : t.confirmation.deliveryDesc
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center mb-6">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <Truck className="text-orange-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {isFrenchShop ? 'Informations de livraison' : t.confirmation.deliveryInformation}
              </h3>
              <p className="text-gray-600">
                {isFrenchShop ? 'Détails importants sur votre livraison' : t.confirmation.deliveryDetails}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Calendar className="text-orange-600 mr-2" size={18} />
                <span className="font-semibold text-orange-900">
                  {isFrenchShop ? 'Date de livraison' : t.confirmation.deliveryTerm}
                </span>
              </div>
              <div className="text-orange-800 font-bold">
                {isFrenchShop ? '4-7 jours ouvrables' : t.summary.workdays}
              </div>
              <div className="text-orange-700 text-sm">
                {isFrenchShop ? 'Après réception du paiement' : t.summary.afterPayment}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-2">
                {isFrenchShop ? 'Adresse de livraison' : t.confirmation.deliveryAddress}
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
              📞 {isFrenchShop ? 'Remarque importante sur la livraison' : t.confirmation.importantNote}
            </h4>
            <p className="text-yellow-700 text-sm">
              {isFrenchShop 
                ? `Notre chauffeur vous contactera par téléphone le jour de la livraison. Assurez-vous d'être joignable au ${contextOrderData.deliveryPhone}.`
                : t.confirmation.importantNoteDesc.replace('{phone}', contextOrderData.deliveryPhone)
              }
            </p>
          </div>
        </motion.div>
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
                {isFrenchShop ? 'Résumé de commande' : t.summary.orderSummary}
              </h3>
              <p className="text-sm text-gray-600">
                {isFrenchShop ? 'Commande confirmée' : t.summary.confirmedOrder}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">
                {isFrenchShop ? 'Produit' : t.summary.product}
              </span>
              <span className="font-semibold">{orderData.product.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">
                {isFrenchShop ? 'Quantité' : t.summary.quantity}
              </span>
              <span className="font-semibold">{orderData.amount.toLocaleString(isFrenchShop ? 'fr-FR' : 'de-DE')} Liter</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">
                {isFrenchShop ? 'Prix par litre' : t.summary.pricePerLiter}
              </span>
              <span className="font-semibold">{orderData.product.price.toFixed(2)}€</span>
            </div>
            
            <hr className="border-gray-200" />
            
            <div className="flex justify-between">
              <span className="text-gray-600">
                {isFrenchShop ? 'Prix de base' : t.confirmation.basePrice}
              </span>
              <span className="font-semibold">{orderData.basePrice.toFixed(2)}€</span>
            </div>
            
            <div className="flex justify-between text-green-600">
              <span>{isFrenchShop ? 'Livraison' : t.confirmation.deliveryLabel}</span>
              <span className="font-semibold">
                {orderData.deliveryFee === 0 ? (isFrenchShop ? 'Gratuite' : t.summary.free) : `${orderData.deliveryFee.toFixed(2)}€`}
              </span>
            </div>
            
            <hr className="border-gray-200" />
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {isFrenchShop ? 'Net' : t.summary.net}
              </span>
              <span className="font-semibold">{netPrice.toFixed(2)}€</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {isFrenchShop ? 'TVA' : t.summary.vat}
              </span>
              <span className="font-semibold">{vatAmount.toFixed(2)}€</span>
            </div>
            
            <hr className="border-gray-200" />
            
            <div className="flex justify-between text-xl font-bold">
              <span>{isFrenchShop ? 'Total' : t.summary.total}</span>
              <span className="text-blue-600">{orderData.totalPrice.toFixed(2)}€</span>
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              {isFrenchShop 
                ? `TVA incluse (${vatAmount.toFixed(2)}€)`
                : t.summary.inclVat.replace('{amount}', vatAmount.toFixed(2))
              }
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
