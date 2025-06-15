
/**
 * Formats German IBANs with spaces after every 4 characters
 * Example: DE09300209005360966328 -> DE09 3002 0900 5360 9663 28
 */
export const formatGermanIban = (iban: string): string => {
  if (!iban) return iban;
  
  // Check if it's a German IBAN (starts with DE)
  if (!iban.toUpperCase().startsWith('DE')) {
    return iban;
  }
  
  // Remove existing spaces and format with spaces after every 4 characters
  const cleanIban = iban.replace(/\s/g, '');
  const formatted = cleanIban.replace(/(.{4})/g, '$1 ').trim();
  
  return formatted;
};
