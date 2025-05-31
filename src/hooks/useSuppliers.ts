
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Supplier {
  id: string;
  name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  bundesland: string;
  is_active: boolean;
}

export interface SupplierByPostcode {
  supplier_id: string;
  supplier_name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export const useSupplierByPostcode = (postcode: string) => {
  return useQuery({
    queryKey: ['supplier', postcode],
    queryFn: async () => {
      if (!postcode || postcode.length !== 5) {
        return null;
      }

      console.log('Fetching supplier for postcode:', postcode);
      
      const { data, error } = await supabase.rpc('get_supplier_by_postcode', {
        input_postcode: postcode
      });

      if (error) {
        console.error('Error fetching supplier:', error);
        throw error;
      }

      console.log('Supplier data received:', data);
      return data?.[0] || null;
    },
    enabled: !!postcode && postcode.length === 5,
  });
};

export const useSuppliers = () => {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error('Error fetching suppliers:', error);
        throw error;
      }

      return data as Supplier[];
    },
  });
};
