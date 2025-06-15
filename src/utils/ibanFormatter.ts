
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
 * Legacy function for backward compatibility
 * @deprecated Use formatIban instead
 */
export const formatGermanIban = (iban: string): string => {
  return formatIban(iban);
};
