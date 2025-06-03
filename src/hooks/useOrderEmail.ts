
import { useEffect } from 'react';
import { useSendOrderEmail } from './useEmailSystem';

export const useOrderEmail = (orderId: string | null, shouldSend: boolean = true) => {
  const sendOrderEmail = useSendOrderEmail();

  useEffect(() => {
    if (orderId && shouldSend) {
      console.log('Attempting to send order confirmation email for order:', orderId);
      
      // Send email after a short delay to ensure order is fully processed
      const timeoutId = setTimeout(() => {
        sendOrderEmail.mutate(orderId, {
          onSuccess: (result) => {
            console.log('Order confirmation email sent successfully:', result);
          },
          onError: (error) => {
            console.error('Failed to send order confirmation email:', error);
          }
        });
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [orderId, shouldSend, sendOrderEmail]);

  return {
    isLoading: sendOrderEmail.isPending,
    error: sendOrderEmail.error,
    success: sendOrderEmail.isSuccess
  };
};
