
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Webhook, CheckCircle, XCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const PaymentWebhook = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'failed' | 'error' | 'checking'>('processing');
  const [message, setMessage] = useState('Webhook wird verarbeitet...');
  const [orderData, setOrderData] = useState<any>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isManualCheck, setIsManualCheck] = useState(false);
  
  usePageMeta('payment-webhook');

  const trackid = searchParams.get('trackid');
  const result = searchParams.get('result');
  const tranid = searchParams.get('tranid');
  const responsecode = searchParams.get('responsecode');
  const auth = searchParams.get('auth');

  const checkOrderStatus = async (orderNumber: string, attempt = 1) => {
    try {
      console.log(`Checking order status (attempt ${attempt}):`, orderNumber);
      
      const { data: order, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single();

      if (error) {
        console.error('Error fetching order:', error);
        return null;
      }

      console.log('Order data:', order);
      setOrderData(order);
      
      return order;
    } catch (error) {
      console.error('Error checking order status:', error);
      return null;
    }
  };

  const handleManualStatusCheck = async () => {
    if (!trackid) return;
    
    setIsManualCheck(true);
    setStatus('checking');
    setMessage('Status wird manuell überprüft...');
    
    const order = await checkOrderStatus(trackid, retryCount + 1);
    
    if (order) {
      if (order.nexi_transaction_status === 'completed' || order.status === 'confirmed') {
        setStatus('success');
        setMessage('Zahlung erfolgreich bestätigt');
        setTimeout(() => {
          window.location.href = `/checkout/success?order=${trackid}&payment_id=${order.nexi_transaction_id || tranid}`;
        }, 2000);
      } else if (order.nexi_transaction_status === 'failed' || order.status === 'cancelled') {
        setStatus('failed');
        setMessage('Zahlung fehlgeschlagen');
      } else {
        setStatus('processing');
        setMessage('Zahlung wird noch verarbeitet...');
        setRetryCount(prev => prev + 1);
      }
    } else {
      setStatus('error');
      setMessage('Bestellung konnte nicht gefunden werden');
    }
    
    setIsManualCheck(false);
  };

  useEffect(() => {
    console.log('PaymentWebhook mounted with params:', {
      trackid,
      result,
      tranid,
      responsecode,
      auth
    });

    // Process webhook parameters from Nexi redirect
    if (result || responsecode) {
      const finalResult = result || (responsecode === '00' ? 'SUCCESS' : 'FAILED');
      
      switch (finalResult.toUpperCase()) {
        case 'CAPTURED':
        case 'SUCCESS':
        case 'APPROVED':
        case 'PAID':
          setStatus('success');
          setMessage('Zahlung erfolgreich abgeschlossen');
          // Check order status before redirecting
          if (trackid) {
            checkOrderStatus(trackid).then((order) => {
              setTimeout(() => {
                window.location.href = `/checkout/success?order=${trackid}&payment_id=${order?.nexi_transaction_id || tranid}`;
              }, 2000);
            });
          } else {
            setTimeout(() => {
              window.location.href = `/checkout/success?payment_id=${tranid}`;
            }, 2000);
          }
          break;
        case 'FAILED':
        case 'DECLINED':
        case 'ERROR':
        case 'CANCELLED':
          setStatus('failed');
          setMessage('Zahlung fehlgeschlagen');
          setTimeout(() => {
            window.location.href = `/checkout/cancel?order=${trackid}&payment_id=${tranid}&reason=${finalResult}`;
          }, 2000);
          break;
        case 'PENDING':
        case 'PROCESSING':
        case 'INITIATED':
          setStatus('processing');
          setMessage('Zahlung wird noch verarbeitet...');
          // Start polling for status updates
          if (trackid) {
            const pollInterval = setInterval(async () => {
              const order = await checkOrderStatus(trackid, retryCount + 1);
              if (order && (order.nexi_transaction_status === 'completed' || order.nexi_transaction_status === 'failed')) {
                clearInterval(pollInterval);
                if (order.nexi_transaction_status === 'completed') {
                  setStatus('success');
                  setMessage('Zahlung erfolgreich bestätigt');
                  setTimeout(() => {
                    window.location.href = `/checkout/success?order=${trackid}&payment_id=${order.nexi_transaction_id || tranid}`;
                  }, 2000);
                } else {
                  setStatus('failed');
                  setMessage('Zahlung fehlgeschlagen');
                  setTimeout(() => {
                    window.location.href = `/checkout/cancel?order=${trackid}&payment_id=${tranid}`;
                  }, 2000);
                }
              }
              setRetryCount(prev => prev + 1);
              
              // Stop polling after 10 attempts (5 minutes)
              if (retryCount >= 10) {
                clearInterval(pollInterval);
                setStatus('error');
                setMessage('Timeout: Status konnte nicht bestätigt werden');
              }
            }, 30000); // Check every 30 seconds
            
            // Cleanup interval on unmount
            return () => clearInterval(pollInterval);
          }
          break;
        default:
          setStatus('error');
          setMessage(`Unbekannter Zahlungsstatus: ${finalResult}`);
      }
    } else if (trackid && !result && !responsecode) {
      // Direct return without explicit result - check order status
      setStatus('checking');
      setMessage('Zahlungsstatus wird überprüft...');
      
      checkOrderStatus(trackid).then((order) => {
        if (order) {
          if (order.nexi_transaction_status === 'completed' || order.status === 'confirmed') {
            setStatus('success');
            setMessage('Zahlung erfolgreich bestätigt');
            setTimeout(() => {
              window.location.href = `/checkout/success?order=${trackid}&payment_id=${order.nexi_transaction_id}`;
            }, 2000);
          } else if (order.nexi_transaction_status === 'failed' || order.status === 'cancelled') {
            setStatus('failed');
            setMessage('Zahlung fehlgeschlagen');
            setTimeout(() => {
              window.location.href = `/checkout/cancel?order=${trackid}&payment_id=${order.nexi_transaction_id}`;
            }, 2000);
          } else {
            setStatus('processing');
            setMessage('Zahlung wird noch verarbeitet...');
          }
        } else {
          setStatus('error');
          setMessage('Bestellung konnte nicht gefunden werden');
        }
      });
    } else {
      setStatus('error');
      setMessage('Keine Zahlungsinformationen erhalten');
    }
  }, [result, trackid, tranid, responsecode, retryCount]);

  const getIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-600" size={48} />;
      case 'failed':
        return <XCircle className="text-red-600" size={48} />;
      case 'processing':
      case 'checking':
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
      case 'checking':
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
          {(tranid || orderData?.nexi_transaction_id) && (
            <>
              <br />
              <span className="text-sm text-gray-500">
                Transaktions-ID: {tranid || orderData?.nexi_transaction_id}
              </span>
            </>
          )}
          {orderData && (
            <>
              <br />
              <span className="text-sm text-gray-500">
                Status: {orderData.nexi_transaction_status || orderData.status}
              </span>
            </>
          )}
        </p>
        
        {(status === 'processing' || status === 'checking') && (
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Manual check button for stuck payments */}
        {(status === 'processing' || status === 'error') && trackid && (
          <div className="mb-4">
            <Button
              onClick={handleManualStatusCheck}
              disabled={isManualCheck}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isManualCheck ? 'animate-spin' : ''}`} />
              Status erneut prüfen
            </Button>
          </div>
        )}
        
        <div className="text-xs text-gray-500 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Webhook size={16} />
            <span>Webhook-Verarbeitung</span>
          </div>
          <div className="text-gray-400">
            {status === 'processing' || status === 'checking' 
              ? 'Sie werden automatisch weitergeleitet...' 
              : 'Weiterleitung erfolgt in Kürze...'}
          </div>
          {retryCount > 0 && (
            <div className="text-gray-400 mt-1">
              Prüfung {retryCount}/10
            </div>
          )}
        </div>

        {/* Enhanced debug information */}
        {(trackid || tranid || result || responsecode) && (
          <div className="mt-6 p-3 bg-gray-50 rounded-lg text-left">
            <div className="text-xs text-gray-600 space-y-1">
              <div className="font-medium text-gray-700 mb-2">Payment-Parameter:</div>
              {trackid && <div><strong>TrackID:</strong> {trackid}</div>}
              {tranid && <div><strong>TranID:</strong> {tranid}</div>}
              {result && <div><strong>Result:</strong> {result}</div>}
              {responsecode && <div><strong>Response Code:</strong> {responsecode}</div>}
              {auth && <div><strong>Auth Code:</strong> {auth}</div>}
              <div><strong>Status:</strong> {status}</div>
              {orderData?.nexi_webhook_received_at && (
                <div><strong>Webhook empfangen:</strong> {new Date(orderData.nexi_webhook_received_at).toLocaleTimeString()}</div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentWebhook;
