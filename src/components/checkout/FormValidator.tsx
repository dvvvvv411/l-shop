
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const validateFormData = (
  action: string,
  method: string,
  inputs: Record<string, string>
): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  console.log('=== ENHANCED FORM VALIDATION ===');
  console.log('Validating action:', action);
  console.log('Validating method:', method);
  console.log('Validating inputs:', Object.keys(inputs).length, 'fields');
  
  // Enhanced action URL validation
  if (!action || typeof action !== 'string' || action.trim().length === 0) {
    errors.push('Form action URL is missing or empty');
  } else {
    const trimmedAction = action.trim();
    
    // Check for invalid patterns with enhanced detection
    if (trimmedAction.includes('[object') || 
        trimmedAction === window.location.href ||
        trimmedAction.includes('undefined') ||
        trimmedAction.includes('null')) {
      errors.push(`Invalid form action URL pattern: ${trimmedAction}`);
    }
    
    // Enhanced URL format validation
    try {
      const url = new URL(trimmedAction);
      
      // Check for HTTPS in production with enhanced rules
      if (url.protocol !== 'https:' && 
          !url.hostname.includes('localhost') && 
          !url.hostname.includes('127.0.0.1') &&
          !url.hostname.includes('int-ecommerce') && // Allow Nexi sandbox
          url.hostname !== 'ecommerce.nexi.it') {
        warnings.push('Form action URL is not using HTTPS');
      }
      
      // Enhanced domain validation for Nexi
      if (!url.hostname.includes('nexi.it') && 
          !url.hostname.includes('localhost') &&
          !url.hostname.includes('127.0.0.1')) {
        warnings.push('Form action URL does not appear to be a Nexi domain');
      }
      
      // Check for proper Nexi endpoint structure
      if (url.hostname.includes('nexi.it') && 
          !url.pathname.includes('/IPGateway/payment/payment.jsp')) {
        warnings.push('URL path does not match expected Nexi payment endpoint');
      }
      
    } catch (urlError) {
      // Enhanced relative path checking
      if (!trimmedAction.startsWith('/') && 
          !trimmedAction.startsWith('http') &&
          !trimmedAction.includes('://')) {
        errors.push(`Invalid URL format: ${trimmedAction}`);
      }
    }
  }
  
  // Enhanced method validation
  const validMethods = ['GET', 'POST'];
  if (!method || !validMethods.includes(method.toUpperCase())) {
    errors.push(`Invalid HTTP method: ${method}. Must be GET or POST`);
  }
  
  // Enhanced inputs validation
  if (!inputs || Object.keys(inputs).length === 0) {
    errors.push('No form inputs provided');
  } else {
    const inputCount = Object.keys(inputs).length;
    console.log(`Enhanced validation for ${inputCount} form inputs:`);
    
    Object.entries(inputs).forEach(([name, value]) => {
      // Enhanced name validation
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push(`Invalid input name: ${name}`);
      } else if (name.includes(' ') || name.includes('\n') || name.includes('\t')) {
        warnings.push(`Input name contains whitespace: "${name}"`);
      }
      
      // Enhanced value validation
      if (value === undefined || value === null) {
        errors.push(`Input ${name} has undefined or null value`);
      } else if (typeof value !== 'string') {
        warnings.push(`Input ${name} value is not a string: ${typeof value}`);
      } else if (value.trim().length === 0) {
        warnings.push(`Input ${name} has empty value`);
      }
      
      // Enhanced security checks
      if (typeof value === 'string') {
        if (value.includes('<script') || value.includes('javascript:')) {
          errors.push(`Input ${name} contains potentially malicious content`);
        }
        if (value.length > 10000) {
          warnings.push(`Input ${name} value is very long (${value.length} characters)`);
        }
      }
      
      console.log(`  ${name}: ${String(value).substring(0, 50)}${String(value).length > 50 ? '...' : ''} (${typeof value})`);
    });
    
    // Enhanced Nexi field validation with more specific checks
    const requiredNexiFields = ['id', 'password', 'action', 'amt', 'currencycode', 'trackid'];
    const missingFields = requiredNexiFields.filter(field => !inputs[field]);
    
    if (missingFields.length > 0) {
      errors.push(`Missing required Nexi fields: ${missingFields.join(', ')}`);
    }
    
    // Enhanced specific field validation
    if (inputs.amt) {
      const amount = parseInt(inputs.amt);
      if (isNaN(amount) || amount <= 0) {
        errors.push('Amount (amt) must be a positive number');
      }
      if (amount > 999999999) {
        warnings.push('Amount is very large, please verify');
      }
    }
    
    if (inputs.currencycode) {
      const validCurrencies = ['978', '840']; // EUR, USD
      if (!validCurrencies.includes(inputs.currencycode)) {
        warnings.push(`Unusual currency code: ${inputs.currencycode}`);
      }
    }
    
    if (inputs.trackid) {
      if (!/^[A-Z]\d{6}$/.test(inputs.trackid)) {
        warnings.push('TrackID format does not match expected pattern (H + 6 digits)');
      }
    }
    
    // Check for MAC signature presence
    if (inputs.hash) {
      console.log('MAC signature (hash) found');
      if (inputs.hash.length !== 40) {
        warnings.push('MAC signature length is not 40 characters (SHA1 expected)');
      }
    } else {
      warnings.push('No MAC signature (hash) found - authentication may be weaker');
    }
  }
  
  const isValid = errors.length === 0;
  
  console.log('Enhanced validation result:', {
    isValid,
    errors: errors.length,
    warnings: warnings.length
  });
  
  if (errors.length > 0) {
    console.error('Enhanced validation errors:', errors);
  }
  
  if (warnings.length > 0) {
    console.warn('Enhanced validation warnings:', warnings);
  }
  
  return {
    isValid,
    errors,
    warnings
  };
};

export const sanitizeInputs = (inputs: Record<string, string>): Record<string, string> => {
  const sanitized: Record<string, string> = {};
  
  console.log('=== ENHANCED INPUT SANITIZATION ===');
  
  Object.entries(inputs).forEach(([name, value]) => {
    if (name && value) {
      // Enhanced name sanitization
      let cleanName = name.trim();
      cleanName = cleanName.replace(/[^\w\-_]/g, ''); // Keep only alphanumeric, dash, underscore
      
      // Enhanced value sanitization
      let cleanValue = String(value).trim();
      
      // Remove potentially dangerous characters but preserve necessary ones for payments
      cleanValue = cleanValue
        .replace(/[\r\n\t]/g, '') // Remove line breaks and tabs
        .replace(/\s+/g, ' '); // Normalize whitespace
      
      // Special handling for specific Nexi fields
      if (cleanName === 'amt') {
        // Ensure amount is numeric
        cleanValue = cleanValue.replace(/[^\d]/g, '');
      } else if (cleanName === 'trackid') {
        // Ensure trackid is alphanumeric
        cleanValue = cleanValue.replace(/[^A-Za-z0-9]/g, '');
      } else if (cleanName === 'currencycode') {
        // Ensure currency code is numeric
        cleanValue = cleanValue.replace(/[^\d]/g, '');
      } else if (cleanName === 'hash') {
        // Ensure hash is hexadecimal
        cleanValue = cleanValue.replace(/[^a-fA-F0-9]/g, '');
      }
      
      if (cleanName && cleanValue && cleanValue.length > 0) {
        sanitized[cleanName] = cleanValue;
        console.log(`Sanitized: ${cleanName} = ${cleanValue.substring(0, 50)}${cleanValue.length > 50 ? '...' : ''}`);
      } else {
        console.warn(`Dropped field after sanitization: ${name} = ${value}`);
      }
    }
  });
  
  console.log(`Enhanced sanitization complete: ${Object.keys(inputs).length} -> ${Object.keys(sanitized).length} fields`);
  
  return sanitized;
};
