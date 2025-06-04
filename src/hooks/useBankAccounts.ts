
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
        .order('is_active', { ascending: false })
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

  const getDailyUsage = async (accountId: string, date?: string) => {
    try {
      const { data, error } = await supabase
        .rpc('get_daily_bank_account_usage', {
          account_id: accountId,
          check_date: date || new Date().toISOString().split('T')[0]
        });

      if (error) throw error;
      return data || 0;
    } catch (error) {
      console.error('Error fetching daily usage:', error);
      return 0;
    }
  };

  const checkDailyLimit = async (accountId: string, amount: number, date?: string) => {
    try {
      const { data, error } = await supabase
        .rpc('check_daily_limit', {
          account_id: accountId,
          transaction_amount: amount,
          check_date: date || new Date().toISOString().split('T')[0]
        });

      if (error) throw error;
      return data || false;
    } catch (error) {
      console.error('Error checking daily limit:', error);
      return false;
    }
  };

  const toggleBankAccountStatus = async (accountId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('bank_accounts')
        .update({ is_active: isActive })
        .eq('id', accountId);

      if (error) throw error;

      // Update local state
      setBankAccounts(prev => prev.map(account => 
        account.id === accountId ? { ...account, is_active: isActive } : account
      ));

      toast({
        title: 'Erfolg',
        description: `Bankkonto wurde ${isActive ? 'aktiviert' : 'deaktiviert'}.`,
      });
    } catch (error) {
      console.error('Error toggling bank account status:', error);
      toast({
        title: 'Fehler',
        description: `Fehler beim ${isActive ? 'Aktivieren' : 'Deaktivieren'} des Bankkontos.`,
        variant: 'destructive',
      });
    }
  };

  const getBankAccountSystemName = (bankAccountId: string | null) => {
    if (!bankAccountId) return '-';
    const bankAccount = bankAccounts.find(ba => ba.id === bankAccountId);
    return bankAccount ? bankAccount.system_name : 'Unbekannt';
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
    getDailyUsage,
    checkDailyLimit,
    getBankAccountSystemName,
    toggleBankAccountStatus,
  };
};
