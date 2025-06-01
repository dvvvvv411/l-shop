
// VAT calculation utilities for German tax system
export const VAT_RATE = 0.19; // 19% VAT rate for Germany

export interface VATBreakdown {
  netPrice: number;
  vatAmount: number;
  grossPrice: number;
}

export const calculateVATFromGross = (grossPrice: number): VATBreakdown => {
  const netPrice = grossPrice / (1 + VAT_RATE);
  const vatAmount = grossPrice - netPrice;
  
  return {
    netPrice,
    vatAmount,
    grossPrice
  };
};

export const calculateVATFromNet = (netPrice: number): VATBreakdown => {
  const vatAmount = netPrice * VAT_RATE;
  const grossPrice = netPrice + vatAmount;
  
  return {
    netPrice,
    vatAmount,
    grossPrice
  };
};

export const formatCurrency = (amount: number): string => {
  return `${amount.toFixed(2)}€`;
};
