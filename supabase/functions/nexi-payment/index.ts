
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

async function generateMacSignature(params: Record<string, any>, macKey: string): Promise<string> {
  const encoder = new TextEncoder();
  
  // Create signature string with specific order for Nexi Italy
  // The order is critical for Italian Nexi MAC verification
  const signatureParams = [
    'id',
    'password',
    'action',
    'amt',
    'currencycode',
    'trackid'
  ];
  
  const signatureString = signatureParams
    .filter(key => params[key] !== undefined && params[key] !== '')
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  console.log('MAC signature string (Italy format):', signatureString);
  
  // Create HMAC-SHA1 signature (Nexi Italy uses SHA1, not SHA256)
  const keyData = encoder.encode(macKey);
  const messageData = encoder.encode(signatureString);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  
  // Convert to hex string
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  console.log('Generated MAC signature (SHA1):', hashHex);
  return hashHex;
}

async function initiatePayment(supabaseClient: any, request: NexiPaymentRequest) {
  console.log('=== INITIATING NEXI PAYMENT (ITALY) ===');
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
    has_password: !!config.password,
    is_sandbox: config.is_sandbox,
    has_alias: !!config.alias,
    has_mac_key: !!config.mac_key
  });

  // Validate required fields for Italian Nexi
  if (!config.password) {
    console.error('Password is required for Italian Nexi');
    throw new Error('Nexi password configuration is missing. Please contact support.');
  }

  // Generate unique payment ID
  const paymentId = `nexi_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  console.log('Generated payment ID:', paymentId);

  // Determine the correct API base URL for Italian Nexi
  const nexiBaseUrl = config.is_sandbox 
    ? 'https://int-ecommerce.nexi.it' // Italian sandbox URL
    : 'https://ecommerce.nexi.it'; // Italian production URL

  console.log('Using Italian Nexi base URL:', nexiBaseUrl);
  
  // Prepare Italian Nexi API request parameters
  const nexiParams = {
    id: config.merchant_id,
    password: config.password, // Use dedicated password field
    action: 'payment',
    amt: request.amount.toString(),
    currencycode: request.currency === 'EUR' ? '978' : '840', // ISO currency codes
    trackid: request.orderId,
    udf1: request.description || `Order ${request.orderId}`,
    responseURL: request.returnUrl,
    errorURL: request.cancelUrl,
    langid: 'DE'
  };

  // Add alias if available
  if (config.alias) {
    nexiParams.alias = config.alias;
  }

  console.log('Italian Nexi API request parameters:', {
    ...nexiParams,
    password: '[REDACTED]'
  });

  let redirectUrl: string;
  let paymentUrl: string;

  // Generate MAC signature if MAC key is available (recommended for production)
  if (config.mac_key) {
    console.log('Using MAC key authentication for Italian Nexi API');
    
    try {
      // Generate MAC signature using SHA1 (Italian Nexi standard)
      const macSignature = await generateMacSignature(nexiParams, config.mac_key);
      
      // Add MAC to parameters as 'trandata' (Italian Nexi parameter name)
      const authenticatedParams = {
        ...nexiParams,
        trandata: macSignature
      };

      // Use the Italian Nexi payment gateway endpoint
      paymentUrl = `${nexiBaseUrl}/IPGateway/payment/payment.jsp`;
      
      console.log('Making authenticated request to Italian Nexi API:', paymentUrl);
      
      // Create the payment URL with parameters for Italian Nexi
      const urlParams = new URLSearchParams(authenticatedParams);
      redirectUrl = `${paymentUrl}?${urlParams.toString()}`;
      
      console.log('Generated authenticated payment URL for Italian Nexi');
      
    } catch (error) {
      console.error('Error with MAC authentication:', error);
      throw new Error(`MAC authentication failed: ${error.message}`);
    }
  } else {
    console.log('⚠️  No MAC key available - using basic integration (not recommended for production)');
    
    // Basic integration without MAC authentication
    paymentUrl = `${nexiBaseUrl}/IPGateway/payment/payment.jsp`;
    const urlParams = new URLSearchParams(nexiParams);
    redirectUrl = `${paymentUrl}?${urlParams.toString()}`;
  }

  console.log('Final redirect URL generated (domain only):', redirectUrl.split('?')[0]);

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

  // Create payment log entry
  console.log('Fetching order ID for logging...');
  const { data: orderData, error: orderError } = await supabaseClient
    .from('orders')
    .select('id')
    .eq('order_number', request.orderId)
    .single();

  if (!orderError && orderData) {
    console.log('Creating payment log entry...');
    const { error: logError } = await supabaseClient
      .from('nexi_payment_logs')
      .insert({
        order_id: orderData.id,
        payment_id: paymentId,
        transaction_type: 'payment',
        status: 'initiated',
        amount: request.amount,
        currency: request.currency || 'EUR',
        request_data: {
          ...nexiParams,
          password: '[REDACTED]',
          mac_key: config.mac_key ? '[REDACTED]' : undefined,
          base_url: nexiBaseUrl,
          integration_type: 'italian_nexi'
        }
      });

    if (logError) {
      console.error('Failed to create payment log:', logError);
      // Continue anyway, logging is not critical
    } else {
      console.log('✅ Payment log created successfully');
    }
  } else if (orderError) {
    console.error('Failed to fetch order ID for logging:', orderError);
  }

  const responseData = {
    paymentId,
    redirectUrl,
    status: 'initiated',
    environment: config.is_sandbox ? 'sandbox' : 'production',
    nexiBaseUrl,
    integration: 'italian_nexi'
  };

  console.log('=== PAYMENT INITIATION SUCCESS ===');
  console.log('Response data:', {
    ...responseData,
    redirectUrl: '[URL_GENERATED]' // Don't log full URL for security
  });

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

  const { payment_id, status, order_id, result, tranid } = webhookData;

  if (!payment_id && !tranid) {
    throw new Error('Invalid webhook data: missing payment_id or tranid');
  }

  const actualPaymentId = payment_id || tranid;
  const paymentStatus = status || (result === 'CAPTURED' ? 'completed' : 'failed');

  // Update order status based on webhook
  console.log('Updating order status from webhook...');
  const { error: updateError } = await supabaseClient
    .from('orders')
    .update({
      nexi_transaction_status: paymentStatus,
      nexi_webhook_data: webhookData,
      status: paymentStatus === 'completed' ? 'confirmed' : 'pending'
    })
    .eq('nexi_payment_id', actualPaymentId);

  if (updateError) {
    console.error('Failed to update order from webhook:', updateError);
    throw new Error(`Failed to update order: ${updateError.message}`);
  }

  console.log('✅ Order updated from webhook');

  // Log webhook
  const { data: orderData, error: orderError } = await supabaseClient
    .from('orders')
    .select('id')
    .eq('nexi_payment_id', actualPaymentId)
    .single();

  if (!orderError && orderData) {
    const { error: logError } = await supabaseClient
      .from('nexi_payment_logs')
      .insert({
        order_id: orderData.id,
        payment_id: actualPaymentId,
        transaction_type: 'webhook',
        status: paymentStatus,
        webhook_data: webhookData
      });

    if (logError) {
      console.error('Failed to log webhook:', logError);
    } else {
      console.log('✅ Webhook logged successfully');
    }
  }

  console.log('=== WEBHOOK PROCESSING COMPLETE ===');

  return new Response(
    JSON.stringify({ success: true, status: paymentStatus }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}
