
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, User, Mail, Phone, MapPin } from 'lucide-react';
import { SupplierByPostcode } from '@/hooks/useSuppliers';

interface SupplierInfoProps {
  supplier: SupplierByPostcode | null;
  isLoading?: boolean;
  className?: string;
}

const SupplierInfo = ({ supplier, isLoading, className = '' }: SupplierInfoProps) => {
  if (isLoading) {
    return (
      <div className={`bg-blue-50 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-3 mb-3">
          <Building2 className="text-blue-600" size={20} />
          <span className="font-semibold text-blue-900">Ihr Lieferant wird ermittelt...</span>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-blue-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-blue-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-3 mb-2">
          <Building2 className="text-yellow-600" size={20} />
          <span className="font-semibold text-yellow-800">Lieferant</span>
        </div>
        <p className="text-yellow-700 text-sm">
          Bitte geben Sie eine gültige PLZ ein, um Ihren Lieferanten zu ermitteln.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center space-x-3 mb-3">
        <Building2 className="text-blue-600" size={20} />
        <span className="font-semibold text-blue-900">Ihr Lieferant</span>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="font-semibold text-blue-900">{supplier.supplier_name}</div>
        
        {supplier.contact_person && (
          <div className="flex items-center space-x-2 text-blue-700">
            <User size={14} />
            <span>{supplier.contact_person}</span>
          </div>
        )}
        
        {supplier.phone && (
          <div className="flex items-center space-x-2 text-blue-700">
            <Phone size={14} />
            <span>{supplier.phone}</span>
          </div>
        )}
        
        {supplier.email && (
          <div className="flex items-center space-x-2 text-blue-700">
            <Mail size={14} />
            <span>{supplier.email}</span>
          </div>
        )}
        
        {supplier.address && (
          <div className="flex items-center space-x-2 text-blue-700">
            <MapPin size={14} />
            <span>{supplier.address}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SupplierInfo;
