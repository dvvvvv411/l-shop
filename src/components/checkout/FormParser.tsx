
interface ParsedFormData {
  action: string;
  method: string;
  inputs: Record<string, string>;
  isValid: boolean;
  error?: string;
}

export const parseNexiForm = (formHtml: string): ParsedFormData => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(formHtml, 'text/html');
    const form = doc.getElementById('nexiForm') as HTMLFormElement;
    
    if (!form) {
      return {
        action: '',
        method: '',
        inputs: {},
        isValid: false,
        error: 'Form not found in HTML'
      };
    }

    // Use getAttribute instead of form.action to avoid object conversion
    const action = form.getAttribute('action');
    const method = form.getAttribute('method') || 'POST';
    
    if (!action || typeof action !== 'string') {
      return {
        action: '',
        method: method,
        inputs: {},
        isValid: false,
        error: 'Invalid or missing form action'
      };
    }

    // Validate action URL
    if (action.includes('[object') || action === window.location.href) {
      return {
        action: action,
        method: method,
        inputs: {},
        isValid: false,
        error: 'Invalid form action URL detected'
      };
    }

    const inputs = form.querySelectorAll('input[type="hidden"]');
    const formData: Record<string, string> = {};
    
    inputs.forEach((input) => {
      const hiddenInput = input as HTMLInputElement;
      if (hiddenInput.name && hiddenInput.value) {
        formData[hiddenInput.name] = hiddenInput.value;
      }
    });

    return {
      action: action,
      method: method,
      inputs: formData,
      isValid: true
    };

  } catch (error) {
    return {
      action: '',
      method: '',
      inputs: {},
      isValid: false,
      error: error instanceof Error ? error.message : 'Unknown parsing error'
    };
  }
};
