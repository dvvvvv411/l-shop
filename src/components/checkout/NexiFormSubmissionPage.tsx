
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Shield, AlertCircle } from 'lucide-react';
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
  const [formData, setFormData] = useState<{action: string, fields: Record<string, string>} | null>(null);

  useEffect(() => {
    // Parse the form HTML to extract action URL and form fields for debugging
    const parser = new DOMParser();
    const doc = parser.parseFromString(formHtml, 'text/html');
    const form = doc.getElementById('nexiForm') as HTMLFormElement;
    
    if (form) {
      const action = form.action;
      const inputs = form.querySelectorAll('input[type="hidden"]');
      const fields: Record<string, string> = {};
      
      inputs.forEach((input) => {
        const inputElement = input as HTMLInputElement;
        if (inputElement.name && inputElement.value) {
          fields[inputElement.name] = inputElement.value;
        }
      });
      
      setFormData({ action, fields });
      console.log('Parsed Nexi form data:', { action, fieldCount: Object.keys(fields).length });
    }

    // Auto-submit the form after a short delay
    const autoSubmitTimer = setTimeout(() => {
      console.log('Auto-submitting Nexi form...');
      submitNexiForm();
    }, 2000);

    // Show manual submit button after 8 seconds if auto-submit hasn't worked
    const manualTimer = setTimeout(() => {
      console.log('Auto-submit timeout - showing manual submit button');
      setShowManualSubmit(true);
    }, 8000);

    return () => {
      clearTimeout(autoSubmitTimer);
      clearTimeout(manualTimer);
    };
  }, [formHtml]);

  const submitNexiForm = () => {
    console.log('Submitting Nexi form via direct POST...');
    setIsSubmitting(true);
    
    try {
      // Create a temporary iframe to load and submit the form
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = 'nexiSubmissionFrame';
      document.body.appendChild(iframe);
      
      // Create the form HTML and inject it into the iframe
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(formHtml);
        iframeDoc.close();
        
        // Find and submit the form in the iframe
        const form = iframeDoc.getElementById('nexiForm') as HTMLFormElement;
        if (form) {
          console.log('Form found, submitting to:', form.action);
          console.log('Form method:', form.method);
          
          // Set the parent window as the target for the form submission
          form.target = '_top';
          
          // Submit the form - this will redirect the parent window
          form.submit();
          
          console.log('Form submitted successfully');
        } else {
          console.error('Nexi form not found in iframe');
          throw new Error('Nexi form not found');
        }
      } else {
        console.error('Could not access iframe document');
        throw new Error('Could not access iframe document');
      }
      
      // Clean up the iframe after a delay
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting Nexi form:', error);
      setIsSubmitting(false);
      setShowManualSubmit(true);
    }
  };

  const handleManualSubmit = () => {
    console.log('Manual submit triggered');
    submitNexiForm();
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
          {!showManualSubmit ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-sm text-gray-500">
                {isSubmitting ? 'Weiterleitung läuft...' : 'Automatische Weiterleitung wird vorbereitet...'}
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
                  Die automatische Weiterleitung hat nicht funktioniert. 
                  Bitte klicken Sie auf den Button unten.
                </p>
              </div>
              
              <Button
                onClick={handleManualSubmit}
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Weiterleitung...
                  </div>
                ) : (
                  'Zur Nexi-Zahlung'
                )}
              </Button>
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

          {/* Debug Info */}
          {formData && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border text-left">
              <div className="text-xs text-gray-600 space-y-1">
                <div><strong>Ziel-URL:</strong> {formData.action}</div>
                <div><strong>Felder:</strong> {Object.keys(formData.fields).length}</div>
                <div><strong>Umgebung:</strong> {environment || 'production'}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden iframe for form submission */}
      <div
        dangerouslySetInnerHTML={{ __html: formHtml }}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default NexiFormSubmissionPage;
