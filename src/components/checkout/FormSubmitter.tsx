
import { submitFormDirectly, submitWithWindowLocation, submitWithFetch } from './SimpleFormSubmitter';
import { validateFormData, sanitizeInputs } from './FormValidator';

interface FormSubmitterProps {
  action: string;
  method: string;
  inputs: Record<string, string>;
  onSubmissionStart: () => void;
  onSubmissionError: (error: string) => void;
}

export const createAndSubmitForm = async ({ 
  action, 
  method, 
  inputs, 
  onSubmissionStart, 
  onSubmissionError 
}: FormSubmitterProps) => {
  console.log('=== ENHANCED FORM SUBMISSION HANDLER ===');
  console.log('Action:', action);
  console.log('Method:', method);
  console.log('Input count:', Object.keys(inputs).length);

  // Pre-submission validation
  const validation = validateFormData(action, method, inputs);
  
  if (!validation.isValid) {
    const error = `Form validation failed: ${validation.errors.join(', ')}`;
    console.error(error);
    onSubmissionError(error);
    return;
  }

  if (validation.warnings.length > 0) {
    console.warn('Form validation warnings:', validation.warnings);
  }

  // Sanitize inputs
  const cleanInputs = sanitizeInputs(inputs);
  console.log('Sanitized inputs count:', Object.keys(cleanInputs).length);

  // Enhanced form submission with better error handling
  console.log('Attempting enhanced form submission...');
  
  try {
    onSubmissionStart();
    
    // Create and submit form with improved reliability
    const form = document.createElement('form');
    form.method = method.toUpperCase();
    form.action = action;
    form.style.display = 'none';
    form.target = '_self';  // Changed from '_blank' to ensure same window
    form.acceptCharset = 'UTF-8';
    
    // Add timestamp to prevent caching issues
    const timestampInput = document.createElement('input');
    timestampInput.type = 'hidden';
    timestampInput.name = '_timestamp';
    timestampInput.value = Date.now().toString();
    form.appendChild(timestampInput);
    
    // Add all inputs with enhanced validation
    Object.entries(cleanInputs).forEach(([name, value]) => {
      if (name && value) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = String(value);
        
        // Add data attributes for debugging
        input.setAttribute('data-original-name', name);
        input.setAttribute('data-value-length', String(value).length.toString());
        
        form.appendChild(input);
        console.log(`Enhanced input: ${name} = ${value.substring(0, 50)}${value.length > 50 ? '...' : ''}`);
      }
    });
    
    // Add form to DOM
    document.body.appendChild(form);
    
    console.log('Enhanced form created with', form.querySelectorAll('input').length, 'inputs');
    console.log('Form target:', form.target);
    console.log('Form action:', form.action);
    console.log('Form method:', form.method);
    
    // Submit with error handling
    try {
      form.submit();
      console.log('Enhanced form submitted successfully');
    } catch (submitError) {
      console.error('Form submission error:', submitError);
      throw new Error(`Form submission failed: ${submitError.message}`);
    }
    
    // Enhanced cleanup with longer delay for slower connections
    setTimeout(() => {
      if (document.body.contains(form)) {
        try {
          document.body.removeChild(form);
          console.log('Enhanced form cleaned up');
        } catch (cleanupError) {
          console.warn('Form cleanup warning:', cleanupError);
        }
      }
    }, 5000);  // Increased from 3000 to 5000ms
    
  } catch (error) {
    console.error('Enhanced form submission failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Enhanced form submission failed';
    onSubmissionError(errorMessage);
  }
};

// Export enhanced alternative methods for manual retry
export const retryWithStrategy = async (
  strategyName: string,
  props: FormSubmitterProps
) => {
  console.log(`=== ENHANCED MANUAL RETRY WITH STRATEGY: ${strategyName} ===`);
  
  const validation = validateFormData(props.action, props.method, props.inputs);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
  }
  
  const cleanInputs = sanitizeInputs(props.inputs);
  const cleanProps = { ...props, inputs: cleanInputs };
  
  switch (strategyName) {
    case 'Enhanced Direct Form Submission':
      return createAndSubmitForm(cleanProps);  // Use the enhanced version
    case 'Direct Form Submission':
      return submitFormDirectly(cleanProps);
    case 'Window Location Redirect':
      return submitWithWindowLocation(cleanProps);
    case 'Fetch Submission':
      return submitWithFetch(cleanProps);
    default:
      throw new Error(`Unknown strategy: ${strategyName}`);
  }
};

export const getAvailableStrategies = (): string[] => {
  return [
    'Enhanced Direct Form Submission',
    'Direct Form Submission',
    'Window Location Redirect', 
    'Fetch Submission'
  ];
};
