
interface SimpleFormSubmissionProps {
  action: string;
  method: string;
  inputs: Record<string, string>;
  onSubmissionStart: () => void;
  onSubmissionError: (error: string) => void;
}

export const submitFormDirectly = ({ 
  action, 
  method, 
  inputs, 
  onSubmissionStart, 
  onSubmissionError 
}: SimpleFormSubmissionProps) => {
  console.log('=== DIRECT FORM SUBMISSION ===');
  console.log('Action URL:', action);
  console.log('Method:', method);
  console.log('Input count:', Object.keys(inputs).length);
  
  try {
    onSubmissionStart();
    
    // Validate inputs
    if (!action || typeof action !== 'string') {
      throw new Error('Invalid form action URL');
    }
    
    if (Object.keys(inputs).length === 0) {
      throw new Error('No form inputs provided');
    }
    
    // Validate action URL format
    try {
      new URL(action);
    } catch (urlError) {
      throw new Error(`Invalid URL format: ${action}`);
    }
    
    console.log('Creating and submitting form...');
    
    // Create form element
    const form = document.createElement('form');
    form.method = method.toUpperCase();
    form.action = action;
    form.style.display = 'none';
    form.target = '_self';
    form.acceptCharset = 'UTF-8';
    
    // Add all inputs with validation
    Object.entries(inputs).forEach(([name, value]) => {
      if (name && value) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = String(value);
        form.appendChild(input);
        console.log(`Added input: ${name} = ${value.substring(0, 50)}${value.length > 50 ? '...' : ''}`);
      }
    });
    
    // Add to DOM
    document.body.appendChild(form);
    
    console.log('Form created with', form.querySelectorAll('input').length, 'inputs');
    console.log('Submitting to:', form.action);
    
    // Submit immediately
    form.submit();
    
    // Cleanup after delay
    setTimeout(() => {
      if (document.body.contains(form)) {
        document.body.removeChild(form);
        console.log('Form cleaned up');
      }
    }, 3000);
    
    console.log('Form submitted successfully');
    
  } catch (error) {
    console.error('Direct form submission failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Form submission failed';
    onSubmissionError(errorMessage);
  }
};

export const submitWithWindowLocation = ({ 
  action, 
  method, 
  inputs, 
  onSubmissionStart, 
  onSubmissionError 
}: SimpleFormSubmissionProps) => {
  console.log('=== WINDOW LOCATION SUBMISSION ===');
  
  try {
    onSubmissionStart();
    
    if (method.toUpperCase() !== 'GET') {
      throw new Error('Window location method only supports GET requests');
    }
    
    const url = new URL(action);
    Object.entries(inputs).forEach(([name, value]) => {
      if (name && value) {
        url.searchParams.set(name, value);
      }
    });
    
    console.log('Redirecting to:', url.toString());
    window.location.href = url.toString();
    
  } catch (error) {
    console.error('Window location submission failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Window redirect failed';
    onSubmissionError(errorMessage);
  }
};

export const submitWithFetch = async ({ 
  action, 
  method, 
  inputs, 
  onSubmissionStart, 
  onSubmissionError 
}: SimpleFormSubmissionProps) => {
  console.log('=== FETCH SUBMISSION ===');
  
  try {
    onSubmissionStart();
    
    const formData = new FormData();
    Object.entries(inputs).forEach(([name, value]) => {
      if (name && value) {
        formData.append(name, value);
      }
    });
    
    console.log('Submitting via fetch to:', action);
    
    const response = await fetch(action, {
      method: method.toUpperCase(),
      body: method.toUpperCase() === 'GET' ? undefined : formData,
      redirect: 'follow',
      credentials: 'include',
      headers: method.toUpperCase() === 'GET' ? {} : undefined
    });
    
    console.log('Fetch response:', response.status, response.url);
    
    if (response.ok && response.url !== window.location.href) {
      console.log('Redirecting to response URL:', response.url);
      window.location.href = response.url;
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
  } catch (error) {
    console.error('Fetch submission failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Fetch request failed';
    onSubmissionError(errorMessage);
  }
};
