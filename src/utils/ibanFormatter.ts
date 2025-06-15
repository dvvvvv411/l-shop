
/**
 * Formats IBANs with spaces after every 4 characters
 * Supports German and Italian IBANs
 * Example: DE09300209005360966328 -> DE09 3002 0900 5360 9663 28
 * Example: IT60X0542811101000000123456 -> IT60 X054 2811 1010 0000 0012 3456
 */
export const formatIban = (iban: string): string => {
  if (!iban) return iban;
  
  // Check if it's a supported IBAN (starts with DE or IT)
  const upperIban = iban.toUpperCase();
  if (!upperIban.startsWith('DE') && !upperIban.startsWith('IT')) {
    return iban;
  }
  
  // Remove existing spaces and format with spaces after every 4 characters
  const cleanIban = iban.replace(/\s/g, '');
  const formatted = cleanIban.replace(/(.{4})/g, '$1 ').trim();
  
  return formatted;
};

/**
 * Validates Italian IBAN format
 * Italian IBANs: IT + 2 check digits + 1 check character + 10 digits (ABI) + 5 digits (CAB) + 12 alphanumeric (account)
 */
export const validateItalianIban = (iban: string): boolean => {
  if (!iban) return false;
  
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  
  // Check if it starts with IT and has correct length (27 characters)
  if (!cleanIban.startsWith('IT') || cleanIban.length !== 27) {
    return false;
  }
  
  // Basic format validation: IT + 2 digits + 1 character + 22 alphanumeric
  const italianIbanPattern = /^IT\d{2}[A-Z]\d{22}$/;
  return italianIbanPattern.test(cleanIban);
};

/**
 * Legacy function for backward compatibility
 * @deprecated Use formatIban instead
 */
export const formatGermanIban = (iban: string): string => {
  return formatIban(iban);
};
