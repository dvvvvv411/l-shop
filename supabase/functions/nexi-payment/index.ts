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
    // Use service role client for database operations
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
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
        details: 'Check edge function logs for more information',
        timestamp: new Date().toISOString()
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
    .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '')
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
    password: config.password,
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

  // Generate MAC signature if MAC key is available (recommended for production)
  if (config.mac_key) {
    console.log('Using MAC key authentication for Italian Nexi API');
    
    try {
      // Generate MAC signature using SHA1 (Italian Nexi standard)
      const macSignature = await generateMacSignature(nexiParams, config.mac_key);
      
      // Add MAC to parameters as 'trandata' (Italian Nexi parameter name)
      nexiParams.trandata = macSignature;
      
    } catch (error) {
      console.error('Error with MAC authentication:', error);
      throw new Error(`MAC authentication failed: ${error.message}`);
    }
  } else {
    console.log('⚠️  No MAC key available - using basic integration (not recommended for production)');
  }

  // Use the Italian Nexi payment gateway endpoint for POST requests
  const paymentUrl = `${nexiBaseUrl}/IPGateway/payment/payment.jsp`;
  
  console.log('Payment form will POST to:', paymentUrl);

  // Generate HTML form that will auto-submit to Nexi
  const formHtml = generateNexiForm(paymentUrl, nexiParams);

  // Update order with Nexi payment information
  console.log('Updating order with Nexi payment info...');
  const { error: updateError } = await supabaseClient
    .from('orders')
    .update({
      nexi_payment_id: paymentId,
      nexi_transaction_status: 'initiated',
      nexi_redirect_url: paymentUrl,
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
    const logData = {
      order_id: orderData.id,
      payment_id: paymentId,
      transaction_type: 'payment',
      status: 'initiated',
      amount: request.amount,
      currency: request.currency || 'EUR',
      request_data: {
        merchant_id: config.merchant_id,
        terminal_id: config.terminal_id,
        has_password: !!config.password,
        has_alias: !!config.alias,
        has_mac_key: !!config.mac_key,
        base_url: nexiBaseUrl,
        integration_type: 'italian_nexi_form_post',
        order_id: request.orderId,
        amount: request.amount,
        currency: request.currency || 'EUR'
      }
    };

    const { error: logError } = await supabaseClient
      .from('nexi_payment_logs')
      .insert(logData);

    if (logError) {
      console.error('Failed to create payment log:', logError);
    } else {
      console.log('✅ Payment log created successfully');
    }
  }

  const responseData = {
    paymentId,
    formHtml,
    status: 'initiated',
    environment: config.is_sandbox ? 'sandbox' : 'production',
    nexiBaseUrl,
    integration: 'italian_nexi_form_post',
    debug: {
      order_id: request.orderId,
      amount: request.amount,
      currency: request.currency || 'EUR',
      has_mac_key: !!config.mac_key,
      form_fields_count: Object.keys(nexiParams).length
    }
  };

  console.log('=== PAYMENT INITIATION SUCCESS ===');
  console.log('Response data:', {
    ...responseData,
    formHtml: '[HTML_FORM_GENERATED]'
  });

  return new Response(
    JSON.stringify(responseData),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}

function generateNexiForm(actionUrl: string, params: Record<string, any>): string {
  console.log('Generating Nexi form HTML with', Object.keys(params).length, 'parameters');
  
  const formFields = Object.entries(params)
    .filter(([key, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `<input type="hidden" name="${key}" value="${value}">`)
    .join('\n    ');

  const formHtml = `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weiterleitung zur sicheren Zahlung</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
        }
        .container {
            text-align: center;
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .message {
            color: #666;
            margin-bottom: 1rem;
        }
        .security-info {
            font-size: 0.9rem;
            color: #888;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <div class="message">
            <h2>Weiterleitung zur sicheren Zahlung</h2>
            <p>Sie werden automatisch zu unserem sicheren Zahlungspartner Nexi weitergeleitet...</p>
            <p>Falls die Weiterleitung nicht automatisch erfolgt, klicken Sie bitte auf "Zur Zahlung".</p>
        </div>
        <form id="nexiForm" method="POST" action="${actionUrl}">
            ${formFields}
            <button type="submit" style="
                background-color: #007cba;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                margin-top: 1rem;
            ">Zur Zahlung</button>
        </form>
        <div class="security-info">
            🔒 Sichere Verbindung zu Nexi - Ihre Daten sind geschützt
        </div>
    </div>
    <script>
        // Auto-submit the form after a short delay
        setTimeout(function() {
            document.getElementById('nexiForm').submit();
        }, 2000);
    </script>
</body>
</html>`;

  return formHtml;
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
