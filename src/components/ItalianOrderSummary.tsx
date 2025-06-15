
import React from 'react';
import { Building2 } from 'lucide-react';
import { useDomainShop } from '@/hooks/useDomainShop';
import { useItalianCheckoutTranslations } from '@/hooks/useItalianCheckoutTranslations';
import { formatIban } from '@/utils/ibanFormatter';

type Props = {
  orderData: any;
  bankAccountDetails?: any;
  orderNumber?: string;
};

const ItalianOrderSummary = ({ orderData, bankAccountDetails, orderNumber }: Props) => {
  const t = useItalianCheckoutTranslations();

  // VAT calculations (22% for Italy)
  const vatRate = 0.22;
  const netPrice = orderData.totalPrice / (1 + vatRate);
  const vatAmount = orderData.totalPrice - netPrice;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow border">
        <h3 className="text-lg font-semibold text-green-700 mb-2">{t.summary.orderSummary}</h3>
        <div className="flex justify-between">
          <span>{t.summary.product}</span>
          <span className="font-semibold">{orderData.product.name}</span>
        </div>
        <div className="flex justify-between">
          <span>{t.summary.quantity}</span>
          <span className="font-semibold">{orderData.amount.toLocaleString('it-IT')} Litri</span>
        </div>
        <div className="flex justify-between">
          <span>{t.summary.pricePerLiter}</span>
          <span className="font-semibold">{orderData.product.price.toFixed(2)}€</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between">
          <span>{t.summary.subtotal}</span>
          <span className="font-semibold">{orderData.basePrice.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between text-green-700">
          <span>{t.summary.shipping}</span>
          <span>{orderData.deliveryFee === 0 ? t.summary.free : `${orderData.deliveryFee.toFixed(2)}€`}</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between text-sm">
          <span>{t.summary.net}</span>
          <span>{netPrice.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>{t.summary.vat}</span>
          <span>{vatAmount.toFixed(2)}€</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between text-xl font-bold">
          <span>{t.summary.total}</span>
          <span className="text-blue-600">{orderData.totalPrice.toFixed(2)}€</span>
        </div>
        <div className="text-xs text-gray-500 text-center">
          {t.summary.inclVat.replace('{amount}', vatAmount.toFixed(2))}
        </div>
        {orderNumber && (
          <div className="mt-4 p-2 bg-green-50 border border-green-300 rounded-xl text-center">
            <div className="text-sm text-green-700 font-medium">{t.confirmation.orderNumber}</div>
            <div className="text-lg font-bold text-green-800">{orderNumber}</div>
          </div>
        )}
      </div>
      {/* Bank Account Details if available */}
      {bankAccountDetails && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-3">
          <div className="flex items-center mb-2">
            <div className="bg-green-100 p-2 rounded-lg mr-2">
              <Building2 className="text-green-600" size={18} />
            </div>
            <span className="font-semibold text-green-700">{t.confirmation.paymentInstructions}</span>
          </div>
          <div className="text-green-900">
            <div className="mb-1"><strong>Intestatario:</strong> GasolioCasa</div>
            <div className="mb-1"><strong>Banca:</strong> {bankAccountDetails.bank_name}</div>
            <div className="mb-1"><strong>IBAN:</strong> {formatIban(bankAccountDetails.iban)}</div>
            <div className="mb-1"><strong>BIC:</strong> {bankAccountDetails.bic}</div>
            <div className="mt-2 p-2 bg-white border border-green-100 rounded-md">
              <strong>Importo da trasferire:&nbsp;</strong>
              {orderData.totalPrice.toFixed(2)}€
              {orderNumber && (
                <div className="text-xs text-green-700 mt-1">Riferimento: {orderNumber}</div>
              )}
            </div>
          </div>
          <div className="text-xs text-green-700 text-center mt-2">
            {t.confirmation.howToPay}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItalianOrderSummary;
