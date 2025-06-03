
interface ParsedFormData {
  action: string;
  method: string;
  inputs: Record<string, string>;
  isValid: boolean;
  error?: string;
  warnings?: string[];
}

export const parseNexiForm = (formHtml: string): ParsedFormData => {
  try {
    console.log('=== ENHANCED FORM PARSER ===');
    console.log('Form HTML length:', formHtml.length);
    console.log('Form HTML preview:', formHtml.substring(0, 300) + '...');

    if (!formHtml || formHtml.trim().length === 0) {
      return {
        action: '',
        method: '',
        inputs: {},
        isValid: false,
        error: 'Empty form HTML received'
      };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(formHtml, 'text/html');
    
    // Enhanced form detection
    let form = doc.getElementById('nexiForm') as HTMLFormElement;
    if (!form) {
      console.log('nexiForm not found, trying alternative selectors...');
      form = doc.querySelector('form[method]') as HTMLFormElement ||
             doc.querySelector('form[action]') as HTMLFormElement ||
             doc.querySelector('form') as HTMLFormElement;
    }
    
    if (!form) {
      console.error('No form element found in HTML');
      // Try to find form manually in HTML string
      const formMatch = formHtml.match(/<form[^>]*>/i);
      if (formMatch) {
        console.log('Found form tag in HTML string:', formMatch[0]);
      }
      
      return {
        action: '',
        method: '',
        inputs: {},
        isValid: false,
        error: 'No form element found in HTML response'
      };
    }

    console.log('Form element found:', form.tagName, 'with id:', form.id || 'no-id');

    // Enhanced attribute extraction
    const action = form.getAttribute('action') || form.action;
    const method = (form.getAttribute('method') || form.method || 'POST').toUpperCase();
    
    console.log('Raw form action:', action);
    console.log('Raw form method:', method);

    if (!action || typeof action !== 'string' || action.trim().length === 0) {
      return {
        action: action || '',
        method: method,
        inputs: {},
        isValid: false,
        error: 'Form action is missing or empty'
      };
    }

    const trimmedAction = action.trim();
    console.log('Cleaned form action:', trimmedAction);

    // Enhanced input extraction
    const inputs = form.querySelectorAll('input');
    const formData: Record<string, string> = {};
    const warnings: string[] = [];
    
    console.log('Found', inputs.length, 'total inputs');
    
    inputs.forEach((input, index) => {
      const inputElement = input as HTMLInputElement;
      const name = inputElement.name || inputElement.getAttribute('name');
      const value = inputElement.value || inputElement.getAttribute('value');
      const type = inputElement.type || 'text';
      
      console.log(`Input ${index + 1}: [${type}] ${name} = ${value}`);
      
      if (name && value !== null && value !== undefined) {
        formData[name] = String(value);
      } else {
        const warning = `Skipping input ${index + 1}: missing name or value (name: ${name}, value: ${value})`;
        console.warn(warning);
        warnings.push(warning);
      }
    });

    const inputCount = Object.keys(formData).length;
    console.log('Total valid inputs extracted:', inputCount);

    // Enhanced validation
    if (inputCount === 0) {
      return {
        action: trimmedAction,
        method: method,
        inputs: formData,
        isValid: false,
        error: 'No valid inputs found in form',
        warnings
      };
    }

    // Validate required Nexi fields
    const requiredFields = ['id', 'password', 'action', 'amt', 'currencycode', 'trackid'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      const error = `Missing required Nexi fields: ${missingFields.join(', ')}`;
      console.error(error);
      return {
        action: trimmedAction,
        method: method,
        inputs: formData,
        isValid: false,
        error,
        warnings
      };
    }

    console.log('=== FORM PARSING SUCCESS ===');
    console.log('Final parsed data:', {
      action: trimmedAction,
      method: method,
      inputCount: inputCount,
      hasRequiredFields: true
    });

    return {
      action: trimmedAction,
      method: method,
      inputs: formData,
      isValid: true,
      warnings
    };

  } catch (error) {
    console.error('=== FORM PARSING ERROR ===');
    console.error('Error details:', error);
    return {
      action: '',
      method: '',
      inputs: {},
      isValid: false,
      error: error instanceof Error ? error.message : 'Unknown parsing error occurred'
    };
  }
};
