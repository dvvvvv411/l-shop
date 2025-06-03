
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

  useEffect(() => {
    // Show manual submit button after 5 seconds if auto-submit hasn't worked
    const timer = setTimeout(() => {
      setShowManualSubmit(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleManualSubmit = () => {
    setIsSubmitting(true);
    console.log('Manual submit triggered');
    
    // Parse the form HTML to extract the action URL and form data
    const parser = new DOMParser();
    const doc = parser.parseFromString(formHtml, 'text/html');
    const form = doc.getElementById('nexiForm') as HTMLFormElement;
    
    if (!form) {
      console.error('Nexi form not found in HTML');
      setIsSubmitting(false);
      return;
    }

    console.log('Form action URL:', form.action);
    console.log('Form method:', form.method);

    // Create a new form element in the current document
    const newForm = document.createElement('form');
    newForm.method = form.method || 'POST';
    newForm.action = form.action;
    newForm.style.display = 'none';

    // Copy all form inputs to the new form
    const inputs = form.querySelectorAll('input[type="hidden"]');
    console.log('Found', inputs.length, 'hidden inputs');
    
    inputs.forEach((input) => {
      const hiddenInput = input as HTMLInputElement;
      const newInput = document.createElement('input');
      newInput.type = 'hidden';
      newInput.name = hiddenInput.name;
      newInput.value = hiddenInput.value;
      newForm.appendChild(newInput);
      console.log(`Added input: ${newInput.name} = ${newInput.value}`);
    });

    // Append form to document and submit
    document.body.appendChild(newForm);
    console.log('Submitting form to:', newForm.action);
    newForm.submit();
    
    // Clean up after a delay
    setTimeout(() => {
      if (document.body.contains(newForm)) {
        document.body.removeChild(newForm);
      }
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
          {!showManualSubmit ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-sm text-gray-500">
                Automatische Weiterleitung wird vorbereitet...
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
