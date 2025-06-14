
/**
 * Formats IBANs with spaces after every 4 characters
 * Example: DE09300209005360966328 -> DE09 3002 0900 5360 9663 28
 * Example: IT43J0760115900001074705730 -> IT43 J076 0115 9000 0107 4705 730
 */
export const formatIban = (iban: string): string => {
  if (!iban) return iban;
  
  // Remove existing spaces and format with spaces after every 4 characters
  const cleanIban = iban.replace(/\s/g, '');
  const formatted = cleanIban.replace(/(.{4})/g, '$1 ').trim();
  
  return formatted;
};

/**
 * @deprecated Use formatIban instead
 * Formats German IBANs with spaces after every 4 characters
 * Example: DE09300209005360966328 -> DE09 3002 0900 5360 9663 28
 */
export const formatGermanIban = (iban: string): string => {
  return formatIban(iban);
};
