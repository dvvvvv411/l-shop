
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Supplier {
  id: string;
  name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  bundesland: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SupplierByPostcode {
  supplier_id: string;
  supplier_name: string;
  address: string;
}

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all suppliers
  const fetchSuppliers = async () => {
    try {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .order('name');

      if (error) throw error;
      setSuppliers(data || []);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      toast({
        title: 'Fehler',
        description: 'Lieferanten konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get supplier by postcode
  const getSupplierByPostcode = async (postcode: string): Promise<SupplierByPostcode | null> => {
    try {
      console.log('Fetching supplier for postcode:', postcode);
      
      const { data, error } = await supabase
        .rpc('get_supplier_by_postcode', { input_postcode: postcode });

      if (error) {
        console.error('Error fetching supplier by postcode:', error);
        throw error;
      }

      console.log('Supplier data received:', data);

      if (data && data.length > 0) {
        const supplier = data[0];
        return {
          supplier_id: supplier.supplier_id,
          supplier_name: supplier.supplier_name,
          address: supplier.address || 'Adresse nicht verfügbar'
        };
      }

      return null;
    } catch (error) {
      console.error('Error in getSupplierByPostcode:', error);
      toast({
        title: 'Fehler',
        description: 'Lieferant konnte nicht ermittelt werden.',
        variant: 'destructive',
      });
      return null;
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return {
    suppliers,
    isLoading,
    fetchSuppliers,
    getSupplierByPostcode,
  };
};
