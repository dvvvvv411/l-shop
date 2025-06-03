
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

  // Try direct form submission first (most reliable)
  console.log('Attempting direct form submission...');
  
  try {
    submitFormDirectly({
      action,
      method,
      inputs: cleanInputs,
      onSubmissionStart,
      onSubmissionError
    });
    
    console.log('Direct form submission initiated');
    
  } catch (error) {
    console.error('Direct form submission failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Form submission failed';
    onSubmissionError(`Direct submission failed: ${errorMessage}`);
  }
};

// Export alternative methods for manual retry
export const retryWithStrategy = async (
  strategyName: string,
  props: FormSubmitterProps
) => {
  console.log(`=== MANUAL RETRY WITH STRATEGY: ${strategyName} ===`);
  
  const validation = validateFormData(props.action, props.method, props.inputs);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
  }
  
  const cleanInputs = sanitizeInputs(props.inputs);
  const cleanProps = { ...props, inputs: cleanInputs };
  
  switch (strategyName) {
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
    'Direct Form Submission',
    'Window Location Redirect', 
    'Fetch Submission'
  ];
};
