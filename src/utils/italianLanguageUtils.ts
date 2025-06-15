import { useDomainShop } from '@/hooks/useDomainShop';

/**
 * Utility functions for Italian language detection and formatting
 */

export const detectItalianShop = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  
  // Check for Italian domain or Italian path
  return hostname === 'gasoliocasa.com' || pathname.startsWith('/5/');
};

export const getItalianCurrency = (amount: number): string => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const getItalianDate = (date: Date): string => {
  return new Intl.DateTimeFormat('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const getItalianDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('it-IT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const formatItalianPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Italian phone numbers (+39 XXX XXX XXXX)
  if (cleaned.startsWith('39')) {
    const number = cleaned.substring(2);
    if (number.length === 10) {
      return `+39 ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
    }
  }
  
  // If it doesn't start with 39, assume it's already a national number
  if (cleaned.length === 10) {
    return `+39 ${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
  }
  
  return phone; // Return original if we can't format it
};

export const validateItalianPostalCode = (postalCode: string): boolean => {
  // Italian postal codes are 5 digits
  const italianPostalCodePattern = /^\d{5}$/;
  return italianPostalCodePattern.test(postalCode.trim());
};

export const getItalianRegionFromPostalCode = (postalCode: string): string => {
  const code = parseInt(postalCode);
  
  if (code >= 10000 && code <= 10999) return 'Piemonte';
  if (code >= 11000 && code <= 11999) return 'Valle d\'Aosta';
  if (code >= 12000 && code <= 18999) return 'Liguria';
  if (code >= 20000 && code <= 23999) return 'Lombardia';
  if (code >= 24000 && code <= 26999) return 'Lombardia';
  if (code >= 27000 && code <= 28999) return 'Lombardia';
  if (code >= 30000 && code <= 32999) return 'Veneto';
  if (code >= 33000 && code <= 34999) return 'Friuli-Venezia Giulia';
  if (code >= 35000 && code <= 36999) return 'Veneto';
  if (code >= 37000 && code <= 37999) return 'Veneto';
  if (code >= 38000 && code <= 38999) return 'Trentino-Alto Adige';
  if (code >= 39000 && code <= 39999) return 'Trentino-Alto Adige';
  if (code >= 40000 && code <= 48999) return 'Emilia-Romagna';
  if (code >= 50000 && code <= 56999) return 'Toscana';
  if (code >= 57000 && code <= 57999) return 'Toscana';
  if (code >= 58000 && code <= 58999) return 'Toscana';
  if (code >= 59000 && code <= 59999) return 'Toscana';
  if (code >= 60000 && code <= 63999) return 'Marche';
  if (code >= 64000 && code <= 67999) return 'Abruzzo';
  if (code >= 70000 && code <= 76999) return 'Puglia';
  if (code >= 80000 && code <= 84999) return 'Campania';
  if (code >= 85000 && code <= 87999) return 'Basilicata';
  if (code >= 88000 && code <= 89999) return 'Calabria';
  if (code >= 90000 && code <= 98999) return 'Sicilia';
  if (code >= 1000 && code <= 9999) return 'Sardegna';
  
  return 'Italia'; // Default fallback
};
