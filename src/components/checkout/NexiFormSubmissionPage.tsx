
import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Shield, AlertCircle, Bug, RefreshCw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { parseNexiForm } from './FormParser';
import { createAndSubmitForm, retryWithStrategy, getAvailableStrategies } from './FormSubmitter';

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
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [autoSubmitAttempted, setAutoSubmitAttempted] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [parsedForm, setParsedForm] = useState<any>(null);
  const [submissionErrors, setSubmissionErrors] = useState<string[]>([]);
  const autoSubmitTimeoutRef = useRef<NodeJS.Timeout>();

  // Parse and validate the form HTML
  useEffect(() => {
    console.log('=== NEXI FORM SUBMISSION DEBUG ===');
    console.log('Form HTML length:', formHtml.length);
    console.log('Environment:', environment);
    console.log('Order Number:', orderNumber);
    
    const formData = parseNexiForm(formHtml);
    
    console.log('Parsed form data:', {
      isValid: formData.isValid,
      action: formData.action,
      method: formData.method,
      inputCount: Object.keys(formData.inputs).length,
      error: formData.error
    });

    if (!formData.isValid) {
      console.error('Form parsing failed:', formData.error);
      setDebugInfo({
        parseError: formData.error,
        htmlPreview: formHtml.substring(0, 500) + '...',
        htmlLength: formHtml.length,
        timestamp: new Date().toISOString()
      });
      setShowManualSubmit(true);
      setShowAdvancedOptions(true);
      return;
    }

    setParsedForm(formData);
    setDebugInfo({
      formAction: formData.action,
      formMethod: formData.method,
      inputCount: Object.keys(formData.inputs).length,
      formData: formData.inputs,
      environment: environment,
      timestamp: new Date().toISOString()
    });

    // Auto-submit after 2 seconds if not already attempted
    if (!autoSubmitAttempted) {
      console.log('Setting up auto-submit timer (2 seconds)...');
      autoSubmitTimeoutRef.current = setTimeout(() => {
        console.log('Auto-submit timer triggered');
        handleAutoSubmit();
      }, 2000);
    }

    return () => {
      if (autoSubmitTimeoutRef.current) {
        clearTimeout(autoSubmitTimeoutRef.current);
      }
    };
  }, [formHtml, environment, autoSubmitAttempted]);

  // Show manual submit after 10 seconds if auto-submit hasn't worked
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isSubmitting) {
        console.log('Showing manual submit button after timeout');
        setShowManualSubmit(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isSubmitting]);

  const handleAutoSubmit = () => {
    if (autoSubmitAttempted || isSubmitting || !parsedForm) {
      console.log('Auto-submit conditions not met');
      return;
    }

    console.log('Attempting auto-submit...');
    setAutoSubmitAttempted(true);

    createAndSubmitForm({
      action: parsedForm.action,
      method: parsedForm.method,
      inputs: parsedForm.inputs,
      onSubmissionStart: () => {
        setIsSubmitting(true);
        console.log('Auto-submit started');
      },
      onSubmissionError: (error) => {
        console.error('Auto-submit failed:', error);
        setIsSubmitting(false);
        setShowManualSubmit(true);
        setShowAdvancedOptions(true);
        setSubmissionErrors(prev => [...prev, `Auto-submit: ${error}`]);
        setDebugInfo(prev => ({ ...prev, autoSubmitError: error }));
      }
    });
  };

  const handleManualSubmit = () => {
    if (!parsedForm) {
      console.error('No parsed form data available for manual submit');
      return;
    }

    console.log('Manual submit triggered by user');
    
    createAndSubmitForm({
      action: parsedForm.action,
      method: parsedForm.method,
      inputs: parsedForm.inputs,
      onSubmissionStart: () => {
        setIsSubmitting(true);
        console.log('Manual submit started');
      },
      onSubmissionError: (error) => {
        console.error('Manual submit failed:', error);
        setIsSubmitting(false);
        setShowAdvancedOptions(true);
        setSubmissionErrors(prev => [...prev, `Manual submit: ${error}`]);
        setDebugInfo(prev => ({ ...prev, manualSubmitError: error }));
      }
    });
  };

  const handleStrategyRetry = async (strategyName: string) => {
    if (!parsedForm) {
      console.error('No parsed form data available for strategy retry');
      return;
    }

    console.log(`Retrying with strategy: ${strategyName}`);
    setIsSubmitting(true);
    
    try {
      await retryWithStrategy(strategyName, {
        action: parsedForm.action,
        method: parsedForm.method,
        inputs: parsedForm.inputs,
        onSubmissionStart: () => console.log(`${strategyName} started`),
        onSubmissionError: (error) => {
          console.error(`${strategyName} failed:`, error);
          setSubmissionErrors(prev => [...prev, `${strategyName}: ${error}`]);
          setDebugInfo(prev => ({ ...prev, [`${strategyName}Error`]: error }));
        }
      });
    } catch (error) {
      console.error(`Strategy ${strategyName} failed:`, error);
      setSubmissionErrors(prev => [...prev, `${strategyName}: ${error instanceof Error ? error.message : 'Unknown error'}`]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    console.log('Retrying form submission...');
    setIsSubmitting(false);
    setAutoSubmitAttempted(false);
    setShowManualSubmit(false);
    setShowAdvancedOptions(false);
    setSubmissionErrors([]);
    
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
                  disabled={isSubmitting || !parsedForm}
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

                <Button
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  variant="ghost"
                  size="sm"
                  className="w-full flex items-center gap-2"
                >
                  <Settings size={16} />
                  Erweiterte Optionen
                </Button>
              </div>

              {/* Advanced Options */}
              {showAdvancedOptions && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-medium text-gray-700 mb-3">Alternative Methoden</h4>
                  <div className="space-y-2">
                    {getAvailableStrategies().map((strategy) => (
                      <Button
                        key={strategy}
                        onClick={() => handleStrategyRetry(strategy)}
                        disabled={isSubmitting || !parsedForm}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                      >
                        {strategy}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Log */}
              {submissionErrors.length > 0 && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-700 mb-2">Fehlerverlauf</h4>
                  <div className="text-xs text-red-600 space-y-1 max-h-24 overflow-y-auto">
                    {submissionErrors.map((error, index) => (
                      <div key={index}>• {error}</div>
                    ))}
                  </div>
                </div>
              )}
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
                {debugInfo.parseError && (
                  <div className="text-red-600">
                    <strong>Parse-Fehler:</strong> {debugInfo.parseError}
                  </div>
                )}
                {debugInfo.autoSubmitError && (
                  <div className="text-red-600">
                    <strong>Auto-Submit Fehler:</strong> {debugInfo.autoSubmitError}
                  </div>
                )}
                {debugInfo.manualSubmitError && (
                  <div className="text-red-600">
                    <strong>Manueller Submit Fehler:</strong> {debugInfo.manualSubmitError}
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
    </div>
  );
};

export default NexiFormSubmissionPage;
