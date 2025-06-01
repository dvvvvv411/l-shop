
import React from 'react';
import { Building } from 'lucide-react';
import { SupplierByPostcode } from '@/hooks/useSuppliers';

interface SupplierInfoProps {
  supplier: SupplierByPostcode | null;
  isLoading: boolean;
}

const SupplierInfo: React.FC<SupplierInfoProps> = ({ supplier, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Building className="text-blue-600" size={20} />
          <div>
            <div className="font-semibold text-blue-900">Lieferant wird ermittelt...</div>
            <div className="text-blue-700 text-sm">Bitte warten</div>
          </div>
        </div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Building className="text-gray-600" size={20} />
          <div>
            <div className="font-semibold text-gray-900">Kein Lieferant verfügbar</div>
            <div className="text-gray-700 text-sm">Für diese Postleitzahl wurde kein Lieferant gefunden</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <Building className="text-blue-600" size={20} />
        <div>
          <div className="font-semibold text-blue-900">{supplier.supplier_name}</div>
          <div className="text-blue-700 text-sm">{supplier.address}</div>
        </div>
      </div>
    </div>
  );
};

export default SupplierInfo;
