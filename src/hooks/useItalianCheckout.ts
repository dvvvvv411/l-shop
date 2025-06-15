
import { useMemo } from 'react';
import { useDomainShop } from './useDomainShop';
import { useBankAccounts } from './useBankAccounts';

export interface ItalianCheckoutConfig {
  isItalianCheckout: boolean;
  customerLanguage: string;
  bankAccountId: string | null;
  bankAccountDetails: any | null;
  shouldSendInvoice: boolean;
  shouldSendOrderConfirmation: boolean;
}

export const useItalianCheckout = (): ItalianCheckoutConfig => {
  const shopConfig = useDomainShop();
  const { bankAccounts } = useBankAccounts();

  return useMemo(() => {
    const isItalianCheckout = shopConfig.shopType === 'italy';
    
    // Enhanced Italian bank account finding with multiple strategies
    let italianBankAccount = null;
    
    if (isItalianCheckout && bankAccounts?.length > 0) {
      // Strategy 1: Exact match for GasolioCasa
      italianBankAccount = bankAccounts.find(account => 
        account.system_name === 'GasolioCasa' && account.is_active
      );
      
      // Strategy 2: Case-insensitive search for gasoliocasa variations
      if (!italianBankAccount) {
        italianBankAccount = bankAccounts.find(account => 
          account.system_name.toLowerCase().includes('gasoliocasa') && account.is_active
        );
      }
      
      // Strategy 3: Search for gasolio-related accounts
      if (!italianBankAccount) {
        italianBankAccount = bankAccounts.find(account => 
          account.system_name.toLowerCase().includes('gasolio') && account.is_active
        );
      }
      
      // Strategy 4: Search for Italy/Italian-related accounts
      if (!italianBankAccount) {
        italianBankAccount = bankAccounts.find(account => 
          (account.system_name.toLowerCase().includes('italia') || 
           account.system_name.toLowerCase().includes('italy') ||
           account.system_name.toLowerCase().includes('it')) && account.is_active
        );
      }
    }

    console.log('Italian checkout configuration:', {
      isItalianCheckout,
      shopType: shopConfig.shopType,
      pathname: typeof window !== 'undefined' ? window.location.pathname : 'N/A',
      domain: typeof window !== 'undefined' ? window.location.hostname : 'N/A',
      availableBankAccounts: bankAccounts?.map(acc => ({
        id: acc.id,
        system_name: acc.system_name,
        is_active: acc.is_active
      })),
      selectedItalianAccount: italianBankAccount ? {
        id: italianBankAccount.id,
        system_name: italianBankAccount.system_name,
        bank_name: italianBankAccount.bank_name
      } : null
    });

    return {
      isItalianCheckout,
      customerLanguage: isItalianCheckout ? 'it' : 'de',
      bankAccountId: italianBankAccount?.id || null,
      bankAccountDetails: italianBankAccount || null,
      shouldSendInvoice: isItalianCheckout,
      shouldSendOrderConfirmation: !isItalianCheckout
    };
  }, [shopConfig.shopType, bankAccounts]);
};
