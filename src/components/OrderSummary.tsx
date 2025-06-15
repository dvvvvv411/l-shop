
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
  const isItalianShop = shopConfig.shopType === 'italy';
  const isFrenchShop = shopConfig.shopType === 'france';
  const bankDetailsRef = useRef<HTMLDivElement>(null);

  // Show bank details for French and Italian shops when bank account details are available
  useEffect(() => {
    if ((isFrenchShop || isItalianShop) && bankAccountDetails) {
      setShowBankDetails(true);
    }
  }, [isFrenchShop, isItalianShop, bankAccountDetails]);

  // Auto scroll to bank details section for French and Italian checkout
  useEffect(() => {
    if (autoScrollToBankDetails && showBankDetails && bankDetailsRef.current) {
      const timer = setTimeout(() => {
        bankDetailsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [autoScrollToBankDetails, showBankDetails]);

  // VAT calculations (22% VAT for Italy, 19% for others)
  const vatRate = isItalianShop ? 0.22 : 0.19;
  const netPrice = orderData.totalPrice / (1 + vatRate);
  const vatAmount = orderData.totalPrice - netPrice;

  // Get translations based on shop type
  const getTranslations = () => {
    if (isItalianShop) {
      return {
        orderSummary: 'Riepilogo Ordine',
        product: 'Prodotto',
        quantity: 'Quantità',
        pricePerLiter: 'Prezzo per litro',
        basePrice: 'Prezzo base',
        delivery: 'Consegna',
        free: 'Gratuita',
        net: 'Netto',
        vat: 'IVA',
        total: 'Totale',
        inclVat: 'IVA inclusa',
        orderNumber: 'Numero Ordine',
        bankDetails: 'Coordinate Bancarie',
        accountHolder: 'Intestatario',
        bank: 'Banca',
        amountToTransfer: 'Importo da trasferire',
        reference: 'Riferimento',
        transferInstruction: 'Effettua il bonifico con questi dati per finalizzare il tuo ordine',
        paymentMethod: 'Metodo di Pagamento',
        bankTransfer: 'Bonifico Bancario',
        paymentDetails: [
          '• Pagamento prima della consegna',
          '• I dati bancari li riceverai via email',
          '• La consegna avviene dopo il pagamento'
        ]
      };
    } else if (isFrenchShop) {
      return {
        orderSummary: 'Résumé de commande',
        product: 'Produit',
        quantity: 'Quantité',
        pricePerLiter: 'Prix par litre',
        basePrice: 'Prix de base',
        delivery: 'Livraison',
        free: 'Gratuite',
        net: 'Net',
        vat: 'TVA',
        total: 'Total',
        inclVat: 'TVA incluse',
        orderNumber: 'Numéro de commande',
        bankDetails: 'Coordonnées bancaires',
        accountHolder: 'Titulaire du compte',
        bank: 'Banque',
        amountToTransfer: 'Montant à virer',
        reference: 'Référence',
        transferInstruction: 'Effectuez le virement avec ces informations pour finaliser votre commande',
        paymentMethod: 'Mode de paiement',
        bankTransfer: 'Virement bancaire',
        paymentDetails: [
          '• Paiement avant livraison',
          '• Coordonnées bancaires reçues par e-mail',
          '• Livraison après réception du paiement'
        ]
      };
    } else {
      return {
        orderSummary: 'Bestellübersicht',
        product: 'Produkt',
        quantity: 'Menge',
        pricePerLiter: 'Preis pro Liter',
        basePrice: 'Grundpreis',
        delivery: 'Lieferung',
        free: 'Kostenfrei',
        net: 'Netto',
        vat: 'MwSt.',
        total: 'Gesamt',
        inclVat: 'inkl. MwSt.',
        orderNumber: 'Bestellnummer',
        bankDetails: 'Bankverbindung',
        accountHolder: 'Kontoinhaber',
        bank: 'Bank',
        amountToTransfer: 'Zu überweisender Betrag',
        reference: 'Verwendungszweck',
        transferInstruction: 'Überweisen Sie mit diesen Daten zur Finalisierung Ihrer Bestellung',
        paymentMethod: 'Zahlungsart',
        bankTransfer: 'Vorkasse',
        paymentDetails: [
          '• Überweisung vor Lieferung',
          '• Bankverbindung erhalten Sie per E-Mail',
          '• Lieferung erfolgt nach Zahlungseingang'
        ]
      };
    }
  };

  const t = getTranslations();

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
            {t.orderSummary}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">{t.product}</span>
            <span className="font-semibold">{orderData.product.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">{t.quantity}</span>
            <span className="font-semibold">{orderData.amount.toLocaleString(isItalianShop ? 'it-IT' : isFrenchShop ? 'fr-FR' : 'de-DE')} Liter</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">{t.pricePerLiter}</span>
            <span className="font-semibold">{orderData.product.price.toFixed(2)}€</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between">
            <span className="text-gray-600">{t.basePrice}</span>
            <span className="font-semibold">{orderData.basePrice.toFixed(2)}€</span>
          </div>
          
          <div className="flex justify-between text-green-600">
            <span>{t.delivery}</span>
            <span className="font-semibold">
              {orderData.deliveryFee === 0 ? t.free : `${orderData.deliveryFee.toFixed(2)}€`}
            </span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t.net}</span>
            <span className="font-semibold">{netPrice.toFixed(2)}€</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t.vat}</span>
            <span className="font-semibold">{vatAmount.toFixed(2)}€</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between text-xl font-bold">
            <span>{t.total}</span>
            <span className="text-blue-600">{orderData.totalPrice.toFixed(2)}€</span>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            {t.inclVat} ({vatAmount.toFixed(2)}€)
          </div>

          {orderNumber && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
              <div className="text-sm text-red-600 font-medium">{t.orderNumber}</div>
              <div className="text-lg font-bold text-red-700">{orderNumber}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bank Details Card for French and Italian Shops */}
      {showBankDetails && bankAccountDetails && (
        <Card ref={bankDetailsRef} className="shadow-sm border border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-green-900">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <Building2 className="text-green-600" size={20} />
              </div>
              {t.bankDetails}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 space-y-3">
              <div>
                <div className="text-sm font-medium text-green-800 mb-1">{t.accountHolder}</div>
                <div className="text-green-900 font-semibold">
                  {isItalianShop ? 'GasolioCasa' : 'Fioul Rapide'}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-green-800 mb-1">{t.bank}</div>
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
              <div className="text-sm font-medium text-green-800 mb-1">{t.amountToTransfer}</div>
              <div className="text-2xl font-bold text-green-900">{orderData.totalPrice.toFixed(2)}€</div>
              {orderNumber && (
                <div className="text-sm text-green-700 mt-1">{t.reference}: {orderNumber}</div>
              )}
            </div>

            <div className="text-xs text-green-700 text-center">
              {t.transferInstruction}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Method Card for German Shop */}
      {!isFrenchShop && !isItalianShop && (
        <Card className="shadow-sm border">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <CreditCard className="text-green-600" size={20} />
              </div>
              {t.paymentMethod}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-2">{t.bankTransfer}</div>
              <div className="text-gray-700 text-sm space-y-1">
                {t.paymentDetails.map((detail, index) => (
                  <div key={index}>{detail}</div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default OrderSummary;
