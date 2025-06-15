
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Package, Building2, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface ItalianOrderSummaryProps {
  orderData: PriceCalculatorData;
  bankAccountDetails?: any;
  orderNumber?: string;
  autoScrollToBankDetails?: boolean;
}

const ItalianOrderSummary = ({ 
  orderData, 
  bankAccountDetails, 
  orderNumber,
  autoScrollToBankDetails = false 
}: ItalianOrderSummaryProps) => {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const bankDetailsRef = useRef<HTMLDivElement>(null);

  // Show bank details when bank account details are available
  useEffect(() => {
    if (bankAccountDetails) {
      setShowBankDetails(true);
    }
  }, [bankAccountDetails]);

  // Auto scroll to bank details section
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

  // VAT calculations (22% VAT for Italy)
  const vatRate = 0.22;
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
            Riepilogo Ordine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Prodotto</span>
            <span className="font-semibold">{orderData.product.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Quantità</span>
            <span className="font-semibold">{orderData.amount.toLocaleString('it-IT')} Litri</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Prezzo per litro</span>
            <span className="font-semibold">{orderData.product.price.toFixed(2)}€</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between">
            <span className="text-gray-600">Prezzo base</span>
            <span className="font-semibold">{orderData.basePrice.toFixed(2)}€</span>
          </div>
          
          <div className="flex justify-between text-green-600">
            <span>Consegna</span>
            <span className="font-semibold">
              {orderData.deliveryFee === 0 ? 'Gratuita' : `${orderData.deliveryFee.toFixed(2)}€`}
            </span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Netto</span>
            <span className="font-semibold">{netPrice.toFixed(2)}€</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">IVA</span>
            <span className="font-semibold">{vatAmount.toFixed(2)}€</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between text-xl font-bold">
            <span>Totale</span>
            <span className="text-blue-600">{orderData.totalPrice.toFixed(2)}€</span>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            IVA inclusa ({vatAmount.toFixed(2)}€)
          </div>

          {orderNumber && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
              <div className="text-sm text-red-600 font-medium">Numero Ordine</div>
              <div className="text-lg font-bold text-red-700">{orderNumber}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bank Details Card */}
      {showBankDetails && bankAccountDetails && (
        <Card ref={bankDetailsRef} className="shadow-sm border border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-green-900">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <Building2 className="text-green-600" size={20} />
              </div>
              Coordinate Bancarie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 space-y-3">
              <div>
                <div className="text-sm font-medium text-green-800 mb-1">Intestatario</div>
                <div className="text-green-900 font-semibold">GasolioCasa</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-green-800 mb-1">Banca</div>
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
              <div className="text-sm font-medium text-green-800 mb-1">Importo da trasferire</div>
              <div className="text-2xl font-bold text-green-900">{orderData.totalPrice.toFixed(2)}€</div>
              {orderNumber && (
                <div className="text-sm text-green-700 mt-1">Riferimento: {orderNumber}</div>
              )}
            </div>

            <div className="text-xs text-green-700 text-center">
              Effettua il bonifico con questi dati per finalizzare il tuo ordine
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Method Card */}
      <Card className="shadow-sm border">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <CreditCard className="text-green-600" size={20} />
            </div>
            Metodo di Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="font-semibold text-gray-900 mb-2">Bonifico Bancario</div>
            <div className="text-gray-700 text-sm space-y-1">
              <div>• Pagamento prima della consegna</div>
              <div>• I dati bancari li riceverai via email</div>
              <div>• La consegna avviene dopo il pagamento</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ItalianOrderSummary;
