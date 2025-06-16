
import { useState, useEffect } from 'react';
import { useDomainShop } from '@/hooks/useDomainShop';
import { useBankAccounts } from '@/hooks/useBankAccounts';

export const useBelgianCheckout = () => {
  const [isBelgianCheckout, setIsBelgianCheckout] = useState(false);
  const [bankAccountDetails, setBankAccountDetails] = useState<any>(null);
  const [bankAccountId, setBankAccountId] = useState<string | undefined>();
  const shopConfig = useDomainShop();
  const { bankAccounts } = useBankAccounts();

  useEffect(() => {
    // Check if this is Belgian checkout (path /7/home or shop type belgium)
    const orderReferrer = localStorage.getItem('orderReferrer');
    const isBelgian = orderReferrer === '/7/home' || shopConfig.shopType === 'belgium';
    
    console.log('Belgian checkout detection:', {
      orderReferrer,
      shopType: shopConfig.shopType,
      isBelgian,
      pathname: typeof window !== 'undefined' ? window.location.pathname : 'N/A'
    });

    setIsBelgianCheckout(isBelgian);

    if (isBelgian) {
      // Find MazoutVandaag bank account
      const belgianAccount = bankAccounts.find(account => 
        account.system_name === 'MazoutVandaag' && account.is_active
      );
      
      console.log('Belgian bank account search:', {
        found: !!belgianAccount,
        account: belgianAccount ? {
          id: belgianAccount.id,
          system_name: belgianAccount.system_name,
          bank_name: belgianAccount.bank_name
        } : null
      });
      
      if (belgianAccount) {
        setBankAccountDetails(belgianAccount);
        setBankAccountId(belgianAccount.id);
      }
    }
  }, [shopConfig.shopType, bankAccounts]);

  return {
    isBelgianCheckout,
    bankAccountDetails,
    bankAccountId,
    shouldSendOrderConfirmation: false, // Skip order confirmation for Belgian checkout
    shouldSendInvoice: true, // Send invoice immediately for Belgian checkout
    customerLanguage: 'nl' // Dutch for Belgian customers
  };
};
