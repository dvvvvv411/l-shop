
interface ParsedFormData {
  action: string;
  method: string;
  inputs: Record<string, string>;
  isValid: boolean;
  error?: string;
}

export const parseNexiForm = (formHtml: string): ParsedFormData => {
  try {
    console.log('=== FORM PARSER DEBUG ===');
    console.log('Form HTML length:', formHtml.length);
    console.log('Form HTML preview:', formHtml.substring(0, 200) + '...');

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
    
    // Look for form with id 'nexiForm' first, then any form as fallback
    let form = doc.getElementById('nexiForm') as HTMLFormElement;
    if (!form) {
      console.log('nexiForm not found, looking for any form element...');
      form = doc.querySelector('form') as HTMLFormElement;
    }
    
    if (!form) {
      console.error('No form element found in HTML');
      return {
        action: '',
        method: '',
        inputs: {},
        isValid: false,
        error: 'No form element found in HTML response'
      };
    }

    console.log('Form element found:', form.tagName, 'with id:', form.id);

    // Use getAttribute to get raw attribute values
    const action = form.getAttribute('action');
    const method = form.getAttribute('method') || 'POST';
    
    console.log('Form action (raw):', action);
    console.log('Form method:', method);

    if (!action || typeof action !== 'string' || action.trim().length === 0) {
      return {
        action: action || '',
        method: method,
        inputs: {},
        isValid: false,
        error: 'Form action is missing or empty'
      };
    }

    // Validate action URL format
    const trimmedAction = action.trim();
    if (trimmedAction.includes('[object') || trimmedAction === window.location.href) {
      return {
        action: trimmedAction,
        method: method,
        inputs: {},
        isValid: false,
        error: `Invalid form action URL detected: ${trimmedAction}`
      };
    }

    // Validate that action looks like a valid URL
    try {
      new URL(trimmedAction);
    } catch (urlError) {
      // If it's not a full URL, check if it's a relative path
      if (!trimmedAction.startsWith('/') && !trimmedAction.startsWith('http')) {
        return {
          action: trimmedAction,
          method: method,
          inputs: {},
          isValid: false,
          error: `Invalid URL format: ${trimmedAction}`
        };
      }
    }

    // Extract hidden inputs
    const inputs = form.querySelectorAll('input[type="hidden"]');
    const formData: Record<string, string> = {};
    
    console.log('Found', inputs.length, 'hidden inputs');
    
    inputs.forEach((input, index) => {
      const hiddenInput = input as HTMLInputElement;
      const name = hiddenInput.name;
      const value = hiddenInput.value;
      
      console.log(`Input ${index + 1}: ${name} = ${value}`);
      
      if (name && value) {
        formData[name] = value;
      } else {
        console.warn(`Skipping input ${index + 1}: missing name or value`);
      }
    });

    const inputCount = Object.keys(formData).length;
    console.log('Total valid inputs extracted:', inputCount);

    if (inputCount === 0) {
      return {
        action: trimmedAction,
        method: method,
        inputs: formData,
        isValid: false,
        error: 'No valid hidden inputs found in form'
      };
    }

    console.log('=== FORM PARSING SUCCESS ===');
    return {
      action: trimmedAction,
      method: method,
      inputs: formData,
      isValid: true
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
