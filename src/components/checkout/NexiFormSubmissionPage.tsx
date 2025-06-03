
import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Shield, AlertCircle, Bug, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NexiFormSubmissionPageProps {
  formHtml: string;
  onBack: () => void;
  orderNumber: string;
  environment?: string;
}

const NexiFormSubmissionPage = ({ 
  formHtml, 
  onBack, 
  orderNumber, 
  environment 
}: NexiFormSubmissionPageProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showManualSubmit, setShowManualSubmit] = useState(false);
  const [autoSubmitAttempted, setAutoSubmitAttempted] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [formParsed, setFormParsed] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const autoSubmitTimeoutRef = useRef<NodeJS.Timeout>();

  // Parse and validate the form HTML
  useEffect(() => {
    try {
      console.log('=== NEXI FORM SUBMISSION DEBUG ===');
      console.log('Form HTML length:', formHtml.length);
      console.log('Environment:', environment);
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(formHtml, 'text/html');
      const form = doc.getElementById('nexiForm') as HTMLFormElement;
      
      if (!form) {
        console.error('Nexi form not found in HTML');
        setDebugInfo({
          error: 'Form not found in HTML',
          htmlPreview: formHtml.substring(0, 500) + '...',
          timestamp: new Date().toISOString()
        });
        return;
      }

      const inputs = form.querySelectorAll('input[type="hidden"]');
      const formData = {};
      
      inputs.forEach((input) => {
        const hiddenInput = input as HTMLInputElement;
        formData[hiddenInput.name] = hiddenInput.value;
      });

      console.log('Form action:', form.action);
      console.log('Form method:', form.method);
      console.log('Hidden inputs found:', inputs.length);
      console.log('Form data:', formData);

      setDebugInfo({
        formAction: form.action,
        formMethod: form.method,
        inputCount: inputs.length,
        formData: formData,
        environment: environment,
        timestamp: new Date().toISOString()
      });

      setFormParsed(true);

      // Auto-submit after 3 seconds if not already attempted
      if (!autoSubmitAttempted) {
        console.log('Setting up auto-submit timer (3 seconds)...');
        autoSubmitTimeoutRef.current = setTimeout(() => {
          console.log('Auto-submit timer triggered');
          handleAutoSubmit();
        }, 3000);
      }

    } catch (error) {
      console.error('Error parsing form HTML:', error);
      setDebugInfo({
        error: error.message,
        htmlPreview: formHtml.substring(0, 500) + '...',
        timestamp: new Date().toISOString()
      });
    }

    return () => {
      if (autoSubmitTimeoutRef.current) {
        clearTimeout(autoSubmitTimeoutRef.current);
      }
    };
  }, [formHtml, environment, autoSubmitAttempted]);

  // Show manual submit after 8 seconds if auto-submit hasn't worked
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isSubmitting) {
        console.log('Showing manual submit button after timeout');
        setShowManualSubmit(true);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [isSubmitting]);

  const handleAutoSubmit = () => {
    if (autoSubmitAttempted || isSubmitting) {
      console.log('Auto-submit already attempted or currently submitting');
      return;
    }

    console.log('Attempting auto-submit...');
    setAutoSubmitAttempted(true);
    setIsSubmitting(true);

    try {
      // Render form directly in a hidden container and submit
      if (formContainerRef.current) {
        formContainerRef.current.innerHTML = formHtml;
        const form = formContainerRef.current.querySelector('#nexiForm') as HTMLFormElement;
        
        if (form) {
          console.log('Auto-submitting form to:', form.action);
          form.submit();
          return;
        }
      }

      // Fallback: create form programmatically
      submitFormProgrammatically();

    } catch (error) {
      console.error('Auto-submit failed:', error);
      setIsSubmitting(false);
      setShowManualSubmit(true);
    }
  };

  const handleManualSubmit = () => {
    console.log('Manual submit triggered by user');
    setIsSubmitting(true);
    
    try {
      // First try to submit the rendered form
      if (formContainerRef.current) {
        const form = formContainerRef.current.querySelector('#nexiForm') as HTMLFormElement;
        if (form) {
          console.log('Manual submit: submitting rendered form');
          form.submit();
          return;
        }
      }

      // Fallback: create form programmatically
      submitFormProgrammatically();

    } catch (error) {
      console.error('Manual submit failed:', error);
      setIsSubmitting(false);
    }
  };

  const submitFormProgrammatically = () => {
    console.log('Creating form programmatically...');
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(formHtml, 'text/html');
    const originalForm = doc.getElementById('nexiForm') as HTMLFormElement;
    
    if (!originalForm) {
      console.error('Could not parse form from HTML');
      setIsSubmitting(false);
      return;
    }

    // Create new form element
    const newForm = document.createElement('form');
    newForm.method = originalForm.method || 'POST';
    newForm.action = originalForm.action;
    newForm.style.display = 'none';
    newForm.target = '_self'; // Ensure it submits in the same window

    // Copy all hidden inputs
    const inputs = originalForm.querySelectorAll('input[type="hidden"]');
    console.log('Copying', inputs.length, 'hidden inputs');
    
    inputs.forEach((input) => {
      const hiddenInput = input as HTMLInputElement;
      const newInput = document.createElement('input');
      newInput.type = 'hidden';
      newInput.name = hiddenInput.name;
      newInput.value = hiddenInput.value;
      newForm.appendChild(newInput);
      console.log(`Copied input: ${newInput.name} = ${newInput.value}`);
    });

    // Add form to document and submit
    document.body.appendChild(newForm);
    console.log('Submitting programmatic form to:', newForm.action);
    
    // Submit immediately
    newForm.submit();
    
    // Clean up after delay
    setTimeout(() => {
      if (document.body.contains(newForm)) {
        document.body.removeChild(newForm);
      }
    }, 2000);
  };

  const handleRetry = () => {
    console.log('Retrying form submission...');
    setIsSubmitting(false);
    setAutoSubmitAttempted(false);
    setShowManualSubmit(false);
    
    // Clear and re-render form
    if (formContainerRef.current) {
      formContainerRef.current.innerHTML = '';
    }
    
    // Trigger auto-submit again
    setTimeout(() => {
      handleAutoSubmit();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Zurück
            </Button>
            <div className="text-sm text-gray-600">
              Bestellung: {orderNumber}
              {environment && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {environment}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="text-blue-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sichere Zahlung
            </h2>
            <p className="text-gray-600">
              Sie werden zur sicheren Nexi-Zahlung weitergeleitet
            </p>
          </div>

          {/* Loading State */}
          {!showManualSubmit && !autoSubmitAttempted ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-sm text-gray-500">
                Weiterleitung wird vorbereitet...
              </p>
              <p className="text-xs text-gray-400">
                Automatische Weiterleitung in wenigen Sekunden
              </p>
            </div>
          ) : isSubmitting ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-sm text-gray-500">
                Weiterleitung zur Nexi-Zahlung...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-amber-800">
                  <AlertCircle size={20} />
                  <span className="font-medium">Manuelle Weiterleitung erforderlich</span>
                </div>
                <p className="text-sm text-amber-700 mt-1">
                  Die automatische Weiterleitung war nicht erfolgreich. 
                  Bitte verwenden Sie einen der Buttons unten.
                </p>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={handleManualSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  Zur Nexi-Zahlung
                </Button>
                
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  disabled={isSubmitting}
                  className="w-full flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Erneut versuchen
                </Button>
              </div>
            </div>
          )}

          {/* Debug Information */}
          {debugInfo && (
            <div className="mt-6 p-3 bg-gray-50 rounded-lg border text-left">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Bug size={16} />
                Debug-Information
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div><strong>Zeitstempel:</strong> {debugInfo.timestamp}</div>
                {debugInfo.formAction && (
                  <div><strong>Form Action:</strong> {debugInfo.formAction}</div>
                )}
                {debugInfo.formMethod && (
                  <div><strong>Form Method:</strong> {debugInfo.formMethod}</div>
                )}
                {debugInfo.inputCount !== undefined && (
                  <div><strong>Form Felder:</strong> {debugInfo.inputCount}</div>
                )}
                {debugInfo.environment && (
                  <div><strong>Umgebung:</strong> {debugInfo.environment}</div>
                )}
                {debugInfo.error && (
                  <div className="text-red-600">
                    <strong>Fehler:</strong> {debugInfo.error}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Security Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Shield size={16} />
              <span>256-Bit SSL-Verschlüsselung</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Ihre Zahlungsdaten werden sicher übertragen
            </p>
          </div>
        </div>
      </div>

      {/* Hidden form container for direct rendering */}
      <div
        ref={formContainerRef}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      
      {/* Fallback: hidden iframe with form */}
      {formParsed && (
        <div style={{ display: 'none' }} aria-hidden="true">
          <div dangerouslySetInnerHTML={{ __html: formHtml }} />
        </div>
      )}
    </div>
  );
};

export default NexiFormSubmissionPage;
