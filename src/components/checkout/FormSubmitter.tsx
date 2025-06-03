
interface FormSubmitterProps {
  action: string;
  method: string;
  inputs: Record<string, string>;
  onSubmissionStart: () => void;
  onSubmissionError: (error: string) => void;
}

interface SubmissionStrategy {
  name: string;
  execute: (props: FormSubmitterProps) => Promise<void>;
}

// Strategy 1: Standard form submission (current approach)
const standardFormSubmission: SubmissionStrategy = {
  name: 'Standard Form Submission',
  execute: async ({ action, method, inputs, onSubmissionStart, onSubmissionError }: FormSubmitterProps) => {
    return new Promise((resolve, reject) => {
      try {
        onSubmissionStart();
        
        console.log('=== STANDARD FORM SUBMISSION ===');
        console.log('Creating form with action:', action);
        console.log('Method:', method);
        console.log('Input count:', Object.keys(inputs).length);

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
            input.value = String(value);
            form.appendChild(input);
            console.log(`Added input: ${name} = ${value}`);
          }
        });

        // Add form to document
        document.body.appendChild(form);
        
        console.log('Form created, submitting to:', form.action);
        console.log('Form inputs count:', form.querySelectorAll('input').length);
        
        // Submit the form
        form.submit();
        
        // Clean up after delay
        setTimeout(() => {
          if (document.body.contains(form)) {
            document.body.removeChild(form);
          }
        }, 2000);

        resolve();
        
      } catch (error) {
        console.error('Standard form submission failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Standard form submission failed';
        onSubmissionError(errorMessage);
        reject(error);
      }
    });
  }
};

// Strategy 2: Window location redirect
const windowLocationRedirect: SubmissionStrategy = {
  name: 'Window Location Redirect',
  execute: async ({ action, method, inputs, onSubmissionStart, onSubmissionError }: FormSubmitterProps) => {
    return new Promise((resolve, reject) => {
      try {
        onSubmissionStart();
        
        console.log('=== WINDOW LOCATION REDIRECT ===');
        
        if (method.toUpperCase() === 'GET') {
          // For GET requests, append parameters to URL
          const url = new URL(action);
          Object.entries(inputs).forEach(([name, value]) => {
            if (name && value) {
              url.searchParams.set(name, value);
            }
          });
          
          console.log('Redirecting to GET URL:', url.toString());
          window.location.href = url.toString();
          resolve();
        } else {
          // For POST requests, this strategy isn't suitable
          throw new Error('Window location redirect not suitable for POST requests');
        }
        
      } catch (error) {
        console.error('Window location redirect failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Window location redirect failed';
        onSubmissionError(errorMessage);
        reject(error);
      }
    });
  }
};

// Strategy 3: Fetch with form data and follow redirect
const fetchFormSubmission: SubmissionStrategy = {
  name: 'Fetch Form Submission',
  execute: async ({ action, method, inputs, onSubmissionStart, onSubmissionError }: FormSubmitterProps) => {
    return new Promise(async (resolve, reject) => {
      try {
        onSubmissionStart();
        
        console.log('=== FETCH FORM SUBMISSION ===');
        
        // Create FormData object
        const formData = new FormData();
        Object.entries(inputs).forEach(([name, value]) => {
          if (name && value) {
            formData.append(name, value);
            console.log(`Added to FormData: ${name} = ${value}`);
          }
        });

        console.log('Submitting via fetch to:', action);
        
        const response = await fetch(action, {
          method: method,
          body: formData,
          redirect: 'follow',
          credentials: 'include'
        });

        console.log('Fetch response status:', response.status);
        console.log('Fetch response URL:', response.url);

        if (response.ok) {
          // If the response is successful, redirect to the response URL
          if (response.url && response.url !== window.location.href) {
            console.log('Redirecting to response URL:', response.url);
            window.location.href = response.url;
          } else {
            console.log('Response received but no redirect URL');
          }
          resolve();
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
      } catch (error) {
        console.error('Fetch form submission failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Fetch form submission failed';
        onSubmissionError(errorMessage);
        reject(error);
      }
    });
  }
};

const submissionStrategies: SubmissionStrategy[] = [
  standardFormSubmission,
  windowLocationRedirect,
  fetchFormSubmission
];

export const createAndSubmitForm = async ({ 
  action, 
  method, 
  inputs, 
  onSubmissionStart, 
  onSubmissionError 
}: FormSubmitterProps) => {
  console.log('=== FORM SUBMISSION HANDLER ===');
  console.log('Action:', action);
  console.log('Method:', method);
  console.log('Input count:', Object.keys(inputs).length);

  // Validate inputs before attempting submission
  if (!action || typeof action !== 'string') {
    const error = 'Invalid form action: must be a string';
    console.error(error);
    onSubmissionError(error);
    return;
  }

  if (action.includes('[object') || action === window.location.href) {
    const error = 'Invalid form action URL format';
    console.error(error);
    onSubmissionError(error);
    return;
  }

  if (Object.keys(inputs).length === 0) {
    const error = 'No form inputs provided';
    console.error(error);
    onSubmissionError(error);
    return;
  }

  // Try submission strategies in order
  for (let i = 0; i < submissionStrategies.length; i++) {
    const strategy = submissionStrategies[i];
    console.log(`Attempting strategy ${i + 1}: ${strategy.name}`);
    
    try {
      await strategy.execute({ action, method, inputs, onSubmissionStart, onSubmissionError });
      console.log(`Strategy ${strategy.name} succeeded`);
      return; // Success, exit the function
    } catch (error) {
      console.error(`Strategy ${strategy.name} failed:`, error);
      
      // If this is the last strategy, report the error
      if (i === submissionStrategies.length - 1) {
        const finalError = `All submission strategies failed. Last error: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.error(finalError);
        onSubmissionError(finalError);
      } else {
        console.log(`Trying next strategy...`);
        // Wait a bit before trying the next strategy
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
};

// Export individual strategies for manual retry
export const retryWithStrategy = async (
  strategyName: string,
  props: FormSubmitterProps
) => {
  const strategy = submissionStrategies.find(s => s.name === strategyName);
  if (!strategy) {
    throw new Error(`Strategy "${strategyName}" not found`);
  }
  
  console.log(`Manually retrying with strategy: ${strategyName}`);
  return strategy.execute(props);
};

export const getAvailableStrategies = (): string[] => {
  return submissionStrategies.map(s => s.name);
};
