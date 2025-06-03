
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
    console.log('=== NEXI EDGE FUNCTION START ===');
    console.log('Action:', action);
    console.log('Request body:', body);

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
    console.error('=== NEXI EDGE FUNCTION ERROR ===');
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
    console.error('=== END ERROR ===');
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Check edge function logs for more information'
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function initiatePayment(supabaseClient: any, request: NexiPaymentRequest) {
  console.log('=== INITIATING NEXI PAYMENT ===');
  console.log('Order ID:', request.orderId);
  console.log('Amount (cents):', request.amount);
  console.log('Currency:', request.currency);

  // Get Nexi configuration
  console.log('Fetching active Nexi configuration...');
  const { data: config, error: configError } = await supabaseClient
    .from('nexi_payment_configs')
    .select('*')
    .eq('is_active', true)
    .single();

  if (configError) {
    console.error('Database error fetching Nexi config:', configError);
    throw new Error(`Failed to fetch Nexi configuration: ${configError.message}`);
  }

  if (!config) {
    console.error('No active Nexi configuration found');
    throw new Error('No active Nexi payment configuration found. Please contact support.');
  }

  console.log('Found active Nexi config:', {
    id: config.id,
    merchant_id: config.merchant_id,
    terminal_id: config.terminal_id,
    is_sandbox: config.is_sandbox,
    has_alias: !!config.alias,
    has_mac_key: !!config.mac_key
  });

  // Generate unique payment ID
  const paymentId = `nexi_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  console.log('Generated payment ID:', paymentId);
  
  // Build Nexi API request
  const nexiRequest = {
    merchant_id: config.merchant_id,
    terminal_id: config.terminal_id,
    alias: config.alias,
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

  console.log('Nexi API request data:', {
    ...nexiRequest,
    mac_key: config.mac_key ? '[PRESENT]' : '[NOT SET]'
  });

  // For sandbox/testing, create a mock redirect URL
  // In a real implementation, you would make an API call to Nexi here
  const baseUrl = config.is_sandbox 
    ? 'https://test.nexi.it/ecomm/api/hostedfields'
    : 'https://ecomm.nexi.it/ecomm/api/hostedfields';
    
  const redirectUrl = `${baseUrl}/payment?payment_id=${paymentId}&order_id=${request.orderId}&merchant_id=${config.merchant_id}`;

  console.log('Generated redirect URL:', redirectUrl);

  // Configuration status
  if (config.alias && config.mac_key) {
    console.log('✅ Configuration has ALIAS and MAC Key - ready for production integration');
  } else {
    console.log('⚠️  Configuration missing ALIAS or MAC Key - using basic integration');
  }

  // Update order with Nexi payment information
  console.log('Updating order with Nexi payment info...');
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
    console.error('Failed to update order:', updateError);
    throw new Error(`Failed to update order: ${updateError.message}`);
  }

  console.log('✅ Order updated successfully');

  // Log the payment initiation
  console.log('Creating payment log entry...');
  const { error: logError } = await supabaseClient
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

  if (logError) {
    console.error('Failed to create payment log:', logError);
    // Don't throw here, just log the error
  } else {
    console.log('✅ Payment log created successfully');
  }

  const responseData = {
    paymentId,
    redirectUrl,
    status: 'initiated',
    environment: config.is_sandbox ? 'sandbox' : 'production'
  };

  console.log('=== PAYMENT INITIATION SUCCESS ===');
  console.log('Response data:', responseData);

  return new Response(
    JSON.stringify(responseData),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}

async function checkPaymentStatus(supabaseClient: any, paymentId: string) {
  console.log('=== CHECKING PAYMENT STATUS ===');
  console.log('Payment ID:', paymentId);

  // Get payment information from database
  const { data: order, error } = await supabaseClient
    .from('orders')
    .select('*')
    .eq('nexi_payment_id', paymentId)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    throw new Error(`Payment not found: ${error.message}`);
  }

  if (!order) {
    console.error('No order found for payment ID:', paymentId);
    throw new Error('Payment not found');
  }

  console.log('Found order:', {
    order_number: order.order_number,
    status: order.nexi_transaction_status,
    payment_method: order.payment_method
  });

  // For testing purposes, return the current status
  // In a real implementation, you would query the Nexi API here
  const responseData = {
    paymentId,
    status: order.nexi_transaction_status || 'pending',
    orderId: order.order_number,
    amount: order.total_amount
  };

  console.log('Payment status response:', responseData);

  return new Response(
    JSON.stringify(responseData),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}

async function handleWebhook(supabaseClient: any, webhookData: any) {
  console.log('=== HANDLING NEXI WEBHOOK ===');
  console.log('Webhook data:', webhookData);

  const { payment_id, status, order_id } = webhookData;

  if (!payment_id || !status) {
    throw new Error('Invalid webhook data: missing payment_id or status');
  }

  // Update order status based on webhook
  console.log('Updating order status from webhook...');
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
    throw new Error(`Failed to update order: ${updateError.message}`);
  }

  console.log('✅ Order updated from webhook');

  // Log the webhook
  const { error: logError } = await supabaseClient
    .from('nexi_payment_logs')
    .insert({
      order_id,
      payment_id,
      transaction_type: 'webhook',
      status,
      webhook_data: webhookData
    });

  if (logError) {
    console.error('Failed to log webhook:', logError);
  } else {
    console.log('✅ Webhook logged successfully');
  }

  console.log('=== WEBHOOK PROCESSING COMPLETE ===');

  return new Response(
    JSON.stringify({ success: true }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}
