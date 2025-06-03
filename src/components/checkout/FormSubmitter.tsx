
interface FormSubmitterProps {
  action: string;
  method: string;
  inputs: Record<string, string>;
  onSubmissionStart: () => void;
  onSubmissionError: (error: string) => void;
}

export const createAndSubmitForm = ({ 
  action, 
  method, 
  inputs, 
  onSubmissionStart, 
  onSubmissionError 
}: FormSubmitterProps) => {
  try {
    onSubmissionStart();
    
    console.log('Creating form with action:', action);
    console.log('Form inputs:', Object.keys(inputs).length, 'fields');

    // Validate action URL before proceeding
    if (!action || typeof action !== 'string') {
      throw new Error('Invalid form action: must be a string');
    }

    if (action.includes('[object') || action === window.location.href) {
      throw new Error('Invalid form action URL format');
    }

    // Create new form element
    const form = document.createElement('form');
    form.method = method;
    form.action = action;
    form.style.display = 'none';
    form.target = '_self';

    // Add all hidden inputs
    Object.entries(inputs).forEach(([name, value]) => {
      if (name && value) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = String(value); // Ensure string conversion
        form.appendChild(input);
        console.log(`Added input: ${name} = ${value}`);
      }
    });

    // Add form to document and submit
    document.body.appendChild(form);
    
    console.log('Submitting form to:', form.action);
    form.submit();
    
    // Clean up after delay
    setTimeout(() => {
      if (document.body.contains(form)) {
        document.body.removeChild(form);
      }
    }, 2000);

  } catch (error) {
    console.error('Form submission failed:', error);
    onSubmissionError(error instanceof Error ? error.message : 'Form submission failed');
  }
};
