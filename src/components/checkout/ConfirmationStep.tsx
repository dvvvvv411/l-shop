
import React from 'react';
import { CheckCircle, CreditCard, Calendar, Truck, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SupplierInfo from '@/components/SupplierInfo';
import { SupplierByPostcode } from '@/hooks/useSuppliers';

interface ConfirmationStepProps {
  orderNumber: string | null;
  orderData: any;
  supplier: SupplierByPostcode | null;
  onNewOrder: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  orderNumber,
  orderData,
  supplier,
  onNewOrder,
}) => {
  return (
    <div className="space-y-6">
      {/* Thank You Message */}
      <div className="text-center py-8">
        <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
          <CheckCircle className="text-green-600" size={48} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Vielen Dank für Ihre Bestellung!
        </h1>
        
        <p className="text-gray-600 text-lg mb-6">
          Ihre Heizölbestellung wurde erfolgreich aufgenommen und wird bearbeitet.
        </p>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
          <div className="text-sm text-red-600 font-medium">Ihre Bestellnummer</div>
          <div className="text-2xl font-bold text-red-700">{orderNumber || 'HÖ12345678'}</div>
        </div>
      </div>

      {/* Supplier Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ihr Lieferant</h3>
        <SupplierInfo supplier={supplier} isLoading={false} />
      </div>

      {/* Payment Instructions */}
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <CreditCard className="text-blue-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Zahlungshinweise</h3>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-3">Nächste Schritte</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <Phone className="text-blue-600 mt-1 flex-shrink-0" size={16} />
              <div>
                <div className="font-medium text-blue-900">1. Telefonischer Kontakt</div>
                <div className="text-blue-700">Wir rufen Sie in den nächsten 24 Stunden an, um Ihre Bestellung zu bestätigen und Ihnen unsere Bankverbindung mitzuteilen.</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CreditCard className="text-blue-600 mt-1 flex-shrink-0" size={16} />
              <div>
                <div className="font-medium text-blue-900">2. Überweisung</div>
                <div className="text-blue-700">Nach unserem Anruf überweisen Sie den Betrag von <strong>{orderData?.total?.toFixed(2)}€</strong> auf unser Konto.</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Truck className="text-blue-600 mt-1 flex-shrink-0" size={16} />
              <div>
                <div className="font-medium text-blue-900">3. Lieferung</div>
                <div className="text-blue-700">Nach Zahlungseingang erfolgt die Lieferung in 4-7 Werktagen.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-orange-100 p-2 rounded-full mr-3">
            <Truck className="text-orange-600" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Lieferinformationen</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Calendar className="text-orange-600 mr-2" size={18} />
              <span className="font-medium text-orange-900">Liefertermin</span>
            </div>
            <div className="text-orange-800 font-bold">{orderData?.deliveryDate || 'Nach Zahlungseingang'}</div>
            <div className="text-orange-700 text-sm">4-7 Werktage</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="font-medium text-gray-900 mb-2">Lieferadresse</div>
            <div className="text-gray-700 text-sm space-y-1">
              <div>{orderData?.deliveryFirstName} {orderData?.deliveryLastName}</div>
              <div>{orderData?.deliveryStreet}</div>
              <div>{orderData?.deliveryPostcode} {orderData?.deliveryCity}</div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">📞 Wichtiger Hinweis zur Lieferung</h4>
          <p className="text-yellow-700 text-sm">
            Unser Fahrer wird Sie am Liefertag telefonisch kontaktieren. 
            Bitte stellen Sie sicher, dass Sie unter {orderData?.deliveryPhone} erreichbar sind.
          </p>
        </div>
      </div>

      {/* Contact Support */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fragen zu Ihrer Bestellung?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="text-red-600" size={20} />
            <div>
              <div className="font-medium text-gray-900">Telefon</div>
              <div className="text-gray-600 text-sm">0800 123 456 7</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="text-red-600" size={20} />
            <div>
              <div className="font-medium text-gray-900">E-Mail</div>
              <div className="text-gray-600 text-sm">service@heizoeldirekt.de</div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button
            onClick={onNewOrder}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Neue Bestellung aufgeben
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
