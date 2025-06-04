
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

interface NexiPaymentLinkResponse {
  paymentId: string;
  redirectUrl: string;
  status: string;
  expiresAt?: string;
}

// Updated Nexi API payload structure according to official documentation
interface NexiApiPayload {
  timeStamp: string;
  mac: string;
  alias: string;
  importo: string;
  divisa: string;
  codTrans: string;
  descrizione: string;
  mail?: string;
  languageId?: string;
  url: string;
  urlpost: string;
  urlback: string;
  tipoPagamento?: string;
  selectedcard?: string;
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

function generateCorrelationId(): string {
  return 'COR-' + Date.now() + '-' + Math.random().toString(36).substring(2, 15);
}

function generateMac(payload: Record<string, string>, macKey: string): string {
  // Create the string to be hashed by concatenating values in alphabetical order of keys
  const sortedKeys = Object.keys(payload).sort();
  const stringToHash = sortedKeys.map(key => payload[key]).join('') + macKey;
  
  // For now, use a simple hash - in production, you'd use SHA256
  // This is a simplified implementation - the actual MAC calculation should use SHA256
  return btoa(stringToHash).substring(0, 40);
}

async function initiatePayment(supabaseClient: any, request: NexiPaymentRequest): Promise<Response> {
  console.log('Initiating Nexi payment for order:', request.orderId);

  try {
    // Get Nexi configuration
    console.log('Fetching Nexi configuration from database...');
    const { data: config, error: configError } = await supabaseClient
      .from('nexi_payment_configs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1);

    console.log('Database query result:', { config, configError });

    if (configError) {
      console.error('Error fetching Nexi configuration:', configError);
      throw new Error(`Database error: ${configError.message}`);
    }

    if (!config || config.length === 0) {
      console.error('No active Nexi configuration found in database');
      throw new Error('No active Nexi payment configuration found');
    }

    const nexiConfig = config[0];
    console.log('Using Nexi configuration:', {
      id: nexiConfig.id,
      merchant_id: nexiConfig.merchant_id,
      terminal_id: nexiConfig.terminal_id,
      environment: nexiConfig.environment,
      has_api_key: !!nexiConfig.api_key,
      api_key_length: nexiConfig.api_key ? nexiConfig.api_key.length : 0
    });

    if (!nexiConfig.api_key || nexiConfig.api_key.trim() === '') {
      console.error('API key is missing or empty in config:', nexiConfig);
      throw new Error('Nexi API key not configured or empty');
    }

    if (!nexiConfig.merchant_id || nexiConfig.merchant_id.trim() === '') {
      console.error('Merchant ID is missing or empty in config:', nexiConfig);
      throw new Error('Nexi Merchant ID not configured or empty');
    }

    // Find order by order_number
    console.log('Looking up order by order_number:', request.orderId);
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('order_number', request.orderId)
      .single();

    if (orderError) {
      console.error('Error finding order:', orderError);
      throw new Error(`Order not found: ${orderError.message}`);
    }

    if (!order) {
      console.error('Order not found with order_number:', request.orderId);
      throw new Error(`Order ${request.orderId} not found`);
    }

    console.log('Found order:', {
      id: order.id,
      order_number: order.order_number,
      total_amount: order.total_amount
    });

    // Generate unique transaction code
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const codTrans = `${timestamp}_${randomSuffix}`;
    
    // Determine the correct Nexi API base URL
    const baseUrl = nexiConfig.environment === 'production' 
      ? 'https://ecomm.nexi.it/ecomm/ecomm/DispatcherServlet'
      : 'https://int-ecomm.nexi.it/ecomm/ecomm/DispatcherServlet';

    // Format current timestamp for Nexi API
    const timeStamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, '');

    // Build Nexi Pay by Link request according to official API documentation
    const nexiPayload: Record<string, string> = {
      timeStamp,
      alias: nexiConfig.merchant_id,
      importo: request.amount.toString(), // Amount in cents
      divisa: request.currency || 'EUR',
      codTrans,
      descrizione: request.description || `Order ${request.orderId}`,
      url: request.returnUrl,
      urlpost: request.returnUrl, // Success URL
      urlback: request.cancelUrl,
      tipoPagamento: 'CC' // Credit Card
    };

    // Add customer email if provided
    if (request.customerEmail) {
      nexiPayload.mail = request.customerEmail;
    }

    // Add language
    nexiPayload.languageId = 'ITA';

    // Generate MAC signature
    nexiPayload.mac = generateMac(nexiPayload, nexiConfig.api_key.trim());

    console.log('Nexi API request payload:', {
      ...nexiPayload,
      mac: '***HIDDEN***' // Hide MAC in logs for security
    });
    console.log('Using API base URL:', baseUrl);

    // Generate correlation ID for tracking
    const correlationId = generateCorrelationId();

    // Make API call to Nexi Pay by Link API
    const formData = new URLSearchParams();
    Object.entries(nexiPayload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log('Making Nexi API request with correlation ID:', correlationId);

    const nexiResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Heizoel-Shop/1.0',
        'Correlation-Id': correlationId,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      body: formData.toString()
    });

    console.log('Nexi API response status:', nexiResponse.status);
    console.log('Nexi API response headers:', Object.fromEntries(nexiResponse.headers.entries()));
    
    if (!nexiResponse.ok) {
      const errorText = await nexiResponse.text();
      console.error('Nexi API error response:', nexiResponse.status, errorText);
      throw new Error(`Nexi API error: ${nexiResponse.status} - ${errorText}`);
    }

    const responseText = await nexiResponse.text();
    console.log('Nexi API response text:', responseText);

    // Parse Nexi response - it might return HTML with redirect or payment parameters
    let redirectUrl: string;
    let paymentId = codTrans;

    // Check if response contains a redirect URL or is the payment page itself
    if (responseText.includes('http') && (responseText.includes('redirect') || responseText.includes('location'))) {
      // Extract redirect URL from response
      const urlMatch = responseText.match(/(?:location|href)=["']?(https?:\/\/[^"'\s>]+)/i);
      redirectUrl = urlMatch ? urlMatch[1] : nexiResponse.url;
    } else if (nexiResponse.url !== baseUrl) {
      // If we were redirected, use the final URL
      redirectUrl = nexiResponse.url;
    } else {
      // If no redirect found, construct the payment URL manually
      redirectUrl = `${baseUrl}?alias=${nexiConfig.merchant_id}&codTrans=${codTrans}`;
    }

    console.log('Parsed Nexi response:', {
      paymentId,
      redirectUrl,
      correlationId
    });

    if (!redirectUrl) {
      console.error('Nexi payment creation failed: No redirect URL received');
      throw new Error('Nexi payment creation failed: No payment link received');
    }

    // Update order with Nexi payment information
    console.log('Updating order with payment information:', order.id);
    const { error: updateError } = await supabaseClient
      .from('orders')
      .update({
        nexi_payment_id: paymentId,
        nexi_transaction_status: 'initiated',
        nexi_redirect_url: redirectUrl,
        payment_method: 'nexi_card',
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Failed to update order with Nexi payment info:', updateError);
      throw new Error('Failed to update order with payment information');
    }

    // Log the payment initiation
    const { error: logError } = await supabaseClient
      .from('nexi_payment_logs')
      .insert({
        order_id: request.orderId,
        payment_id: paymentId,
        transaction_type: 'payment_initiation',
        status: 'initiated',
        amount: request.amount,
        currency: request.currency || 'EUR',
        request_data: nexiPayload,
        response_data: { responseText, correlationId },
        notes: `Pay by Link payment initiated via Nexi API. Correlation ID: ${correlationId}`
      });

    if (logError) {
      console.error('Failed to log payment initiation:', logError);
      // Don't throw here, payment was successful
    }

    const response: NexiPaymentLinkResponse = {
      paymentId,
      redirectUrl,
      status: 'initiated'
    };

    console.log('Nexi payment initiated successfully:', response);

    return new Response(
      JSON.stringify(response),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Payment initiation failed:', error);
    
    // Log the error
    try {
      await supabaseClient
        .from('nexi_payment_logs')
        .insert({
          order_id: request.orderId,
          payment_id: null,
          transaction_type: 'payment_initiation',
          status: 'failed',
          amount: request.amount,
          currency: request.currency || 'EUR',
          request_data: request,
          notes: `Payment initiation failed: ${error.message}`
        });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    throw error;
  }
}

async function checkPaymentStatus(supabaseClient: any, paymentId: string): Promise<Response> {
  console.log('Checking Nexi payment status for:', paymentId);

  try {
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

    const response = {
      paymentId,
      status: order.nexi_transaction_status || 'pending',
      orderId: order.order_number,
      amount: order.total_amount,
      currency: 'EUR'
    };

    console.log('Nexi payment status check result:', response);

    return new Response(
      JSON.stringify(response),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Payment status check failed:', error);
    throw error;
  }
}

async function handleWebhook(supabaseClient: any, webhookData: any): Promise<Response> {
  console.log('Handling Nexi webhook:', webhookData);

  try {
    // Nexi webhooks use specific field names
    const { codTrans, esito, importo, divisa, data, orario } = webhookData;
    const transactionId = codTrans;

    if (!transactionId) {
      throw new Error('Invalid webhook data: missing transaction identifier');
    }

    // Find order by payment ID
    const { data: order, error } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('nexi_payment_id', transactionId)
      .single();

    if (error || !order) {
      console.error('Order not found for webhook data:', webhookData, error);
      throw new Error('Order not found');
    }

    // Map Nexi status to internal status
    let internalStatus = 'pending';
    let nexiStatus = 'pending';
    
    switch (esito?.toLowerCase()) {
      case 'ok':
      case 'authorized':
      case 'captured':
        internalStatus = 'confirmed';
        nexiStatus = 'completed';
        break;
      case 'ko':
      case 'failed':
      case 'declined':
        internalStatus = 'failed';
        nexiStatus = 'failed';
        break;
      case 'cancelled':
      case 'canceled':
        internalStatus = 'cancelled';
        nexiStatus = 'cancelled';
        break;
      default:
        internalStatus = 'pending';
        nexiStatus = 'pending';
    }

    // Update order status
    const { error: updateError } = await supabaseClient
      .from('orders')
      .update({
        nexi_transaction_status: nexiStatus,
        nexi_webhook_data: webhookData,
        status: internalStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Failed to update order from webhook:', updateError);
      throw new Error('Failed to update order');
    }

    // Log the webhook
    const { error: logError } = await supabaseClient
      .from('nexi_payment_logs')
      .insert({
        order_id: order.order_number,
        payment_id: transactionId,
        transaction_type: 'webhook',
        status: nexiStatus,
        amount: importo ? parseInt(importo) : order.total_amount,
        currency: divisa || 'EUR',
        webhook_data: webhookData,
        notes: `Webhook received with status: ${esito}`
      });

    if (logError) {
      console.error('Failed to log webhook:', logError);
    }

    // Add order status history
    try {
      await supabaseClient
        .from('order_status_history')
        .insert({
          order_id: order.order_number,
          old_status: order.status,
          new_status: internalStatus,
          changed_by: 'Nexi Webhook',
          notes: `Payment ${esito} via Nexi. Transaction: ${transactionId}`
        });
    } catch (historyError) {
      console.error('Failed to add status history:', historyError);
    }

    console.log('Nexi webhook processed successfully');

    return new Response(
      JSON.stringify({ success: true, status: 'processed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Webhook processing failed:', error);
    
    // Log the webhook error
    try {
      await supabaseClient
        .from('nexi_payment_logs')
        .insert({
          order_id: webhookData.codTrans || null,
          payment_id: webhookData.codTrans || null,
          transaction_type: 'webhook_error',
          status: 'failed',
          webhook_data: webhookData,
          notes: `Webhook processing failed: ${error.message}`
        });
    } catch (logError) {
      console.error('Failed to log webhook error:', logError);
    }

    throw error;
  }
}
