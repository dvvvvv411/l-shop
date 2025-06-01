
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

export type BankAccount = Tables<'bank_accounts'>;

export const useBankAccounts = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchBankAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('bank_accounts')
        .select('*')
        .order('is_default', { ascending: false })
        .order('bank_name', { ascending: true });

      if (error) throw error;
      setBankAccounts(data || []);
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
      toast({
        title: 'Fehler',
        description: 'Bankkonten konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBankAccounts();

    const channel = supabase
      .channel('bank-accounts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bank_accounts',
        },
        (payload) => {
          console.log('Real-time bank account update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setBankAccounts(prev => [payload.new as BankAccount, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setBankAccounts(prev => prev.map(account => 
              account.id === payload.new.id ? payload.new as BankAccount : account
            ));
          } else if (payload.eventType === 'DELETE') {
            setBankAccounts(prev => prev.filter(account => account.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    bankAccounts,
    isLoading,
    refetch: fetchBankAccounts,
  };
};
