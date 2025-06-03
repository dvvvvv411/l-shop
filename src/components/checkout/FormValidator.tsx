
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
  
  console.log('=== FORM VALIDATION ===');
  console.log('Validating action:', action);
  console.log('Validating method:', method);
  console.log('Validating inputs:', Object.keys(inputs).length, 'fields');
  
  // Validate action URL
  if (!action || typeof action !== 'string' || action.trim().length === 0) {
    errors.push('Form action URL is missing or empty');
  } else {
    const trimmedAction = action.trim();
    
    // Check for invalid patterns
    if (trimmedAction.includes('[object') || trimmedAction === window.location.href) {
      errors.push(`Invalid form action URL pattern: ${trimmedAction}`);
    }
    
    // Validate URL format
    try {
      const url = new URL(trimmedAction);
      
      // Check for HTTPS in production
      if (url.protocol !== 'https:' && !url.hostname.includes('localhost')) {
        warnings.push('Form action URL is not using HTTPS');
      }
      
      // Check domain
      if (!url.hostname.includes('nexi.it')) {
        warnings.push('Form action URL does not appear to be a Nexi domain');
      }
      
    } catch (urlError) {
      // Check if it's a relative path
      if (!trimmedAction.startsWith('/') && !trimmedAction.startsWith('http')) {
        errors.push(`Invalid URL format: ${trimmedAction}`);
      }
    }
  }
  
  // Validate method
  const validMethods = ['GET', 'POST'];
  if (!method || !validMethods.includes(method.toUpperCase())) {
    errors.push(`Invalid HTTP method: ${method}. Must be GET or POST`);
  }
  
  // Validate inputs
  if (!inputs || Object.keys(inputs).length === 0) {
    errors.push('No form inputs provided');
  } else {
    const inputCount = Object.keys(inputs).length;
    console.log(`Validating ${inputCount} form inputs:`);
    
    Object.entries(inputs).forEach(([name, value]) => {
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push(`Invalid input name: ${name}`);
      }
      
      if (value === undefined || value === null) {
        errors.push(`Input ${name} has undefined or null value`);
      }
      
      if (typeof value !== 'string') {
        warnings.push(`Input ${name} value is not a string: ${typeof value}`);
      }
      
      console.log(`  ${name}: ${String(value).substring(0, 50)}${String(value).length > 50 ? '...' : ''}`);
    });
    
    // Check for required Nexi fields
    const requiredFields = ['id', 'password', 'action', 'amt', 'currencycode', 'trackid'];
    const missingFields = requiredFields.filter(field => !inputs[field]);
    
    if (missingFields.length > 0) {
      errors.push(`Missing required Nexi fields: ${missingFields.join(', ')}`);
    }
  }
  
  const isValid = errors.length === 0;
  
  console.log('Validation result:', {
    isValid,
    errors: errors.length,
    warnings: warnings.length
  });
  
  if (errors.length > 0) {
    console.error('Validation errors:', errors);
  }
  
  if (warnings.length > 0) {
    console.warn('Validation warnings:', warnings);
  }
  
  return {
    isValid,
    errors,
    warnings
  };
};

export const sanitizeInputs = (inputs: Record<string, string>): Record<string, string> => {
  const sanitized: Record<string, string> = {};
  
  Object.entries(inputs).forEach(([name, value]) => {
    if (name && value) {
      // Sanitize name and value
      const cleanName = name.trim();
      const cleanValue = String(value).trim();
      
      if (cleanName && cleanValue) {
        sanitized[cleanName] = cleanValue;
      }
    }
  });
  
  return sanitized;
};
