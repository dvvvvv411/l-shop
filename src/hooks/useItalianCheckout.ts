
import { useMemo } from 'react';
import { useDomainShop } from './useDomainShop';
import { useBankAccounts } from './useBankAccounts';

export interface ItalianCheckoutConfig {
  isItalianCheckout: boolean;
  customerLanguage: string;
  bankAccountId: string | null;
  shouldSendInvoice: boolean;
  shouldSendOrderConfirmation: boolean;
}

export const useItalianCheckout = (): ItalianCheckoutConfig => {
  const shopConfig = useDomainShop();
  const { data: bankAccounts } = useBankAccounts();

  return useMemo(() => {
    const isItalianCheckout = shopConfig.shopType === 'italy';
    
    // Find Italian bank account if available
    const italianBankAccount = bankAccounts?.find(account => 
      account.system_name.toLowerCase().includes('italia') || 
      account.system_name.toLowerCase().includes('italy') ||
      account.system_name.toLowerCase().includes('gasolio')
    );

    console.log('Italian checkout configuration:', {
      isItalianCheckout,
      availableBankAccounts: bankAccounts?.map(acc => acc.system_name),
      selectedItalianAccount: italianBankAccount?.system_name
    });

    return {
      isItalianCheckout,
      customerLanguage: isItalianCheckout ? 'it' : 'de',
      bankAccountId: italianBankAccount?.id || null,
      shouldSendInvoice: isItalianCheckout,
      shouldSendOrderConfirmation: !isItalianCheckout
    };
  }, [shopConfig.shopType, bankAccounts]);
};
