
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NexiPaymentRequest {
  orderId: string;
  amount: number;
  currency?: string;
  description?: string;
  customerEmail?: string;
  returnUrl: string;
  cancelUrl: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { action, ...body } = await req.json();
    console.log('Nexi payment function called with action:', action, 'body:', body);

    switch (action) {
      case 'initiate':
        return await initiatePayment(supabaseClient, body as NexiPaymentRequest);
      case 'status':
        return await checkPaymentStatus(supabaseClient, body.paymentId);
      case 'webhook':
        return await handleWebhook(supabaseClient, body);
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error('Nexi payment function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function initiatePayment(supabaseClient: any, request: NexiPaymentRequest) {
  console.log('Initiating Nexi payment for order:', request.orderId);

  // Get Nexi configuration
  const { data: config, error: configError } = await supabaseClient
    .from('nexi_payment_configs')
    .select('*')
    .eq('is_active', true)
    .single();

  if (configError || !config) {
    console.error('No active Nexi configuration found:', configError);
    throw new Error('Nexi payment configuration not found');
  }

  // Generate unique payment ID
  const paymentId = `nexi_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  
  // Build Nexi API request with new fields
  const nexiRequest = {
    merchant_id: config.merchant_id,
    terminal_id: config.terminal_id,
    alias: config.alias,
    mac_key: config.mac_key ? '***HIDDEN***' : undefined, // Don't log the actual MAC key
    amount: request.amount,
    currency: request.currency || 'EUR',
    order_id: request.orderId,
    payment_id: paymentId,
    description: request.description || `Order ${request.orderId}`,
    return_url: request.returnUrl,
    cancel_url: request.cancelUrl,
    customer_email: request.customerEmail,
    language: 'de'
  };

  console.log('Nexi API request (sanitized):', nexiRequest);

  // For sandbox/testing, create a mock redirect URL
  // In a real implementation, you would make an API call to Nexi here
  const baseUrl = config.is_sandbox 
    ? 'https://test.nexi.it/ecomm/api/hostedfields'
    : 'https://ecomm.nexi.it/ecomm/api/hostedfields';
    
  const redirectUrl = `${baseUrl}/payment?payment_id=${paymentId}&order_id=${request.orderId}`;

  // If we have ALIAS and MAC Key, we could implement proper MAC signature generation here
  if (config.alias && config.mac_key) {
    console.log('Configuration has ALIAS and MAC Key - ready for production integration');
    // TODO: Implement proper MAC signature generation when integrating with real Nexi API
  }

  // Update order with Nexi payment information
  const { error: updateError } = await supabaseClient
    .from('orders')
    .update({
      nexi_payment_id: paymentId,
      nexi_transaction_status: 'initiated',
      nexi_redirect_url: redirectUrl,
      payment_method: 'nexi_card'
    })
    .eq('order_number', request.orderId);

  if (updateError) {
    console.error('Failed to update order with Nexi payment info:', updateError);
    throw new Error('Failed to update order');
  }

  // Log the payment initiation (without sensitive data)
  await supabaseClient
    .from('nexi_payment_logs')
    .insert({
      order_id: request.orderId,
      payment_id: paymentId,
      transaction_type: 'payment',
      status: 'initiated',
      amount: request.amount,
      currency: request.currency || 'EUR',
      request_data: {
        ...nexiRequest,
        mac_key: config.mac_key ? '[REDACTED]' : undefined
      }
    });

  console.log('Nexi payment initiated successfully:', { paymentId, redirectUrl });

  return new Response(
    JSON.stringify({
      paymentId,
      redirectUrl,
      status: 'initiated'
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}

async function checkPaymentStatus(supabaseClient: any, paymentId: string) {
  console.log('Checking Nexi payment status for:', paymentId);

  // Get payment information from database
  const { data: order, error } = await supabaseClient
    .from('orders')
    .select('*')
    .eq('nexi_payment_id', paymentId)
    .single();

  if (error || !order) {
    console.error('Order not found for payment ID:', paymentId, error);
    throw new Error('Payment not found');
  }

  // For testing purposes, return the current status
  // In a real implementation, you would query the Nexi API here
  return new Response(
    JSON.stringify({
      paymentId,
      status: order.nexi_transaction_status || 'pending',
      orderId: order.order_number
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}

async function handleWebhook(supabaseClient: any, webhookData: any) {
  console.log('Handling Nexi webhook:', webhookData);

  const { payment_id, status, order_id } = webhookData;

  if (!payment_id || !status) {
    throw new Error('Invalid webhook data');
  }

  // Update order status based on webhook
  const { error: updateError } = await supabaseClient
    .from('orders')
    .update({
      nexi_transaction_status: status,
      nexi_webhook_data: webhookData,
      status: status === 'completed' ? 'confirmed' : 'pending'
    })
    .eq('nexi_payment_id', payment_id);

  if (updateError) {
    console.error('Failed to update order from webhook:', updateError);
    throw new Error('Failed to update order');
  }

  // Log the webhook
  await supabaseClient
    .from('nexi_payment_logs')
    .insert({
      order_id,
      payment_id,
      transaction_type: 'webhook',
      status,
      webhook_data: webhookData
    });

  console.log('Nexi webhook processed successfully');

  return new Response(
    JSON.stringify({ success: true }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}
