
import React from 'react';

/**
 * Formats IBANs with spaces after every 4 characters and bold styling for display
 */
export const formatIban = (iban: string): string => {
  if (!iban) return iban;
  
  // Remove existing spaces and format with spaces after every 4 characters
  const cleanIban = iban.replace(/\s/g, '');
  const formatted = cleanIban.replace(/(.{4})/g, '$1 ').trim();
  
  return formatted;
};

/**
 * Formats German IBANs with spaces after every 4 characters
 * Example: DE09300209005360966328 -> DE09 3002 0900 5360 9663 28
 */
export const formatGermanIban = (iban: string): string => {
  if (!iban) return iban;
  
  // Check if it's a German IBAN (starts with DE)
  if (!iban.toUpperCase().startsWith('DE')) {
    return formatIban(iban);
  }
  
  return formatIban(iban);
};

/**
 * Returns JSX with formatted and styled IBAN
 */
export const formatIbanForDisplay = (iban: string): React.JSX.Element => {
  const formatted = formatIban(iban);
  
  return (
    <span className="font-mono font-bold text-sm break-all">
      {formatted}
    </span>
  );
};
