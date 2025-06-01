
import React from 'react';
import { CheckCircle, FileText, CreditCard } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import SupplierInfo from '@/components/SupplierInfo';
import { SupplierByPostcode } from '@/hooks/useSuppliers';

interface SummaryStepProps {
  orderData: any;
  supplier: SupplierByPostcode | null;
  isLoadingSupplier: boolean;
  acceptTerms: boolean;
  setAcceptTerms: (accept: boolean) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({
  orderData,
  supplier,
  isLoadingSupplier,
  acceptTerms,
  setAcceptTerms,
}) => {
  if (!orderData) return null;

  return (
    <div className="space-y-6">
      {/* Supplier Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ihr Lieferant</h3>
        <SupplierInfo supplier={supplier} isLoading={isLoadingSupplier} />
      </div>

      {/* Delivery Address */}
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-red-100 p-2 rounded-full mr-3">
            <CheckCircle className="text-red-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Lieferadresse</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="font-medium text-gray-900 mb-1">
            {orderData.deliveryFirstName} {orderData.deliveryLastName}
          </div>
          <div className="text-gray-700 space-y-1">
            <div>{orderData.deliveryStreet}</div>
            <div>{orderData.deliveryPostcode} {orderData.deliveryCity}</div>
            <div>Tel: {orderData.deliveryPhone}</div>
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <FileText className="text-blue-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Rechnungsadresse</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          {orderData.useSameAddress ? (
            <div className="text-gray-700">Identisch mit Lieferadresse</div>
          ) : (
            <div>
              <div className="font-medium text-gray-900 mb-1">
                {orderData.billingFirstName} {orderData.billingLastName}
              </div>
              <div className="text-gray-700 space-y-1">
                <div>{orderData.billingStreet}</div>
                <div>{orderData.billingPostcode} {orderData.billingCity}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <CreditCard className="text-green-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Zahlungsart</h3>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="font-medium text-gray-900 mb-2">Vorkasse</div>
          <div className="text-gray-700 text-sm space-y-1">
            <div>• Überweisung vor Lieferung</div>
            <div>• Bankverbindung erhalten Sie per E-Mail</div>
            <div>• Lieferung erfolgt nach Zahlungseingang</div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AGB und Widerrufsbelehrung</h3>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-yellow-800 mb-2">Widerrufsbelehrung</h4>
          <p className="text-yellow-700 text-sm">
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. 
            Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="acceptTerms"
            checked={acceptTerms}
            onCheckedChange={setAcceptTerms}
            className="mt-1"
          />
          <Label htmlFor="acceptTerms" className="text-sm text-gray-700 cursor-pointer">
            Ich akzeptiere die{' '}
            <a href="#" className="text-red-600 hover:underline">
              Allgemeinen Geschäftsbedingungen
            </a>{' '}
            und die{' '}
            <a href="#" className="text-red-600 hover:underline">
              Widerrufsbelehrung
            </a>
            . Mir ist bekannt, dass ich bei einer Bestellung von Heizöl mein Widerrufsrecht verliere, 
            sobald die Lieferung begonnen hat. *
          </Label>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;
