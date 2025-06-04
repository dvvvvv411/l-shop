
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

async function initiatePayment(supabaseClient: any, request: NexiPaymentRequest): Promise<Response> {
  console.log('Initiating Nexi payment for order:', request.orderId);

  try {
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

    if (!config.api_key) {
      console.error('API key is missing in config:', config);
      throw new Error('Nexi API key not configured');
    }

    console.log('Using Nexi configuration:', {
      merchant_id: config.merchant_id,
      terminal_id: config.terminal_id,
      environment: config.environment,
      has_api_key: !!config.api_key
    });

    // Generate unique payment reference
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 15);
    const paymentReference = `${config.merchant_id}_${timestamp}_${randomSuffix}`;
    
    // Calculate expiration time (30 minutes from now)
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    // Determine the correct Nexi API base URL
    const baseUrl = config.environment === 'production' 
      ? 'https://xpay.nexigroup.com'
      : 'https://int-ecomm.nexi.it';

    // Build proper Nexi Pay by Link request according to documentation
    const nexiPayload = {
      apikey: config.api_key,
      alias: config.merchant_id,
      importo: request.amount.toString(), // Amount in cents
      divisa: request.currency || 'EUR',
      codTrans: paymentReference,
      url: request.returnUrl,
      url_back: request.cancelUrl,
      urlpost: config.webhook_url || `${Deno.env.get('SUPABASE_URL')}/functions/v1/nexi-payment`,
      mail: request.customerEmail || '',
      descrizione: request.description || `Order ${request.orderId}`,
      languageId: 'DE'
    };

    console.log('Nexi API request payload:', nexiPayload);
    console.log('Using API base URL:', baseUrl);

    // Make API call to Nexi Pay by Link - use POST with form data
    const formData = new URLSearchParams();
    Object.entries(nexiPayload).forEach(([key, value]) => {
      if (value) formData.append(key, value.toString());
    });

    console.log('Form data being sent:', formData.toString());

    const nexiResponse = await fetch(`${baseUrl}/ecomm/ecomm/DispatcherServlet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    console.log('Nexi API response status:', nexiResponse.status);
    
    if (!nexiResponse.ok) {
      const errorText = await nexiResponse.text();
      console.error('Nexi API error response:', nexiResponse.status, errorText);
      throw new Error(`Nexi API error: ${nexiResponse.status} - ${errorText}`);
    }

    const responseText = await nexiResponse.text();
    console.log('Nexi API raw response:', responseText);

    // Parse Nexi response - it returns form parameters, not JSON
    const responseParams = new URLSearchParams(responseText);
    const esito = responseParams.get('esito');
    const idOperazione = responseParams.get('idOperazione');
    const redirectUrl = responseParams.get('url');

    console.log('Parsed Nexi response:', {
      esito,
      idOperazione,
      redirectUrl
    });

    if (esito !== 'OK' || !redirectUrl) {
      const errore = responseParams.get('errore') || 'Unknown error';
      console.error('Nexi payment creation failed:', errore);
      throw new Error(`Nexi payment creation failed: ${errore}`);
    }

    // Update order with Nexi payment information
    const { error: updateError } = await supabaseClient
      .from('orders')
      .update({
        nexi_payment_id: idOperazione || paymentReference,
        nexi_transaction_status: 'initiated',
        nexi_redirect_url: redirectUrl,
        payment_method: 'nexi_card',
        updated_at: new Date().toISOString()
      })
      .eq('order_number', request.orderId);

    if (updateError) {
      console.error('Failed to update order with Nexi payment info:', updateError);
      throw new Error('Failed to update order with payment information');
    }

    // Log the payment initiation
    const { error: logError } = await supabaseClient
      .from('nexi_payment_logs')
      .insert({
        order_id: request.orderId,
        payment_id: idOperazione || paymentReference,
        transaction_type: 'payment_initiation',
        status: 'initiated',
        amount: request.amount,
        currency: request.currency || 'EUR',
        request_data: nexiPayload,
        response_data: Object.fromEntries(responseParams.entries()),
        notes: 'Pay by Link payment initiated via Nexi API'
      });

    if (logError) {
      console.error('Failed to log payment initiation:', logError);
    }

    const response: NexiPaymentLinkResponse = {
      paymentId: idOperazione || paymentReference,
      redirectUrl,
      status: 'initiated',
      expiresAt
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
    const { codTrans, esito, importo, divisa, data, orario } = webhookData;

    if (!codTrans) {
      throw new Error('Invalid webhook data: missing codTrans');
    }

    // Find order by payment ID
    const { data: order, error } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('nexi_payment_id', codTrans)
      .single();

    if (error || !order) {
      console.error('Order not found for webhook data:', webhookData, error);
      throw new Error('Order not found');
    }

    // Map Nexi status to internal status
    let internalStatus = 'pending';
    let nexiStatus = 'pending';
    
    switch (esito) {
      case 'OK':
        internalStatus = 'confirmed';
        nexiStatus = 'completed';
        break;
      case 'KO':
        internalStatus = 'failed';
        nexiStatus = 'failed';
        break;
      case 'ANNULLO':
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
        payment_id: codTrans,
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
          notes: `Payment ${esito} via Nexi. Transaction: ${codTrans}`
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
          order_id: webhookData.orderId || null,
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
