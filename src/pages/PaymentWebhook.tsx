import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Webhook, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';

const PaymentWebhook = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'failed' | 'error'>('processing');
  const [message, setMessage] = useState('Webhook wird verarbeitet...');
  
  usePageMeta('payment-webhook');

  const trackid = searchParams.get('trackid');
  const result = searchParams.get('result');
  const tranid = searchParams.get('tranid');

  useEffect(() => {
    // Process webhook parameters from Nexi redirect
    if (result) {
      switch (result.toUpperCase()) {
        case 'CAPTURED':
        case 'SUCCESS':
        case 'APPROVED':
          setStatus('success');
          setMessage('Zahlung erfolgreich abgeschlossen');
          // Redirect to success page after a delay
          setTimeout(() => {
            window.location.href = `/checkout/success?order=${trackid}&payment_id=${tranid}`;
          }, 2000);
          break;
        case 'FAILED':
        case 'DECLINED':
        case 'ERROR':
          setStatus('failed');
          setMessage('Zahlung fehlgeschlagen');
          // Redirect to cancel page after a delay
          setTimeout(() => {
            window.location.href = `/checkout/cancel?order=${trackid}&payment_id=${tranid}`;
          }, 2000);
          break;
        case 'PENDING':
        case 'PROCESSING':
          setStatus('processing');
          setMessage('Zahlung wird noch verarbeitet...');
          // Keep checking status or redirect after timeout
          setTimeout(() => {
            window.location.href = `/checkout/success?order=${trackid}&payment_id=${tranid}`;
          }, 5000);
          break;
        default:
          setStatus('error');
          setMessage('Unbekannter Zahlungsstatus');
      }
    } else {
      setStatus('error');
      setMessage('Keine Zahlungsinformationen erhalten');
    }
  }, [result, trackid, tranid]);

  const getIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-600" size={48} />;
      case 'failed':
        return <XCircle className="text-red-600" size={48} />;
      case 'processing':
        return <Clock className="text-blue-600 animate-pulse" size={48} />;
      case 'error':
        return <AlertCircle className="text-orange-600" size={48} />;
      default:
        return <Webhook className="text-gray-600" size={48} />;
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-100';
      case 'failed':
        return 'bg-red-100';
      case 'processing':
        return 'bg-blue-100';
      case 'error':
        return 'bg-orange-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md mx-auto"
      >
        <div className={`${getBackgroundColor()} p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center`}>
          {getIcon()}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Zahlungsverarbeitung
        </h1>
        
        <p className="text-gray-600 mb-6">
          {message}
          {trackid && (
            <>
              <br />
              <span className="font-semibold">Bestellnummer: {trackid}</span>
            </>
          )}
          {tranid && (
            <>
              <br />
              <span className="text-sm text-gray-500">Transaktions-ID: {tranid}</span>
            </>
          )}
        </p>
        
        {status === 'processing' && (
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Webhook size={16} />
            <span>Webhook-Verarbeitung</span>
          </div>
          <div className="text-gray-400">
            Sie werden automatisch weitergeleitet...
          </div>
        </div>

        {/* Debug information */}
        {(trackid || tranid || result) && (
          <div className="mt-6 p-3 bg-gray-50 rounded-lg text-left">
            <div className="text-xs text-gray-600 space-y-1">
              <div className="font-medium text-gray-700 mb-2">Webhook-Parameter:</div>
              {trackid && <div><strong>TrackID:</strong> {trackid}</div>}
              {tranid && <div><strong>TranID:</strong> {tranid}</div>}
              {result && <div><strong>Result:</strong> {result}</div>}
              <div><strong>Status:</strong> {status}</div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentWebhook;
