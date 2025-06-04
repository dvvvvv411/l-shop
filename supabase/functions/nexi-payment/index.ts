
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
      throw new Error('Nexi API key not configured');
    }

    // Generate unique payment ID
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 15);
    const paymentId = `${request.orderId}_${timestamp}_${randomSuffix}`;
    
    // Calculate expiration time (24 hours from now)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // Determine the correct Nexi API base URL
    const baseUrl = config.environment === 'production' 
      ? 'https://ecomm.nexi.it'
      : 'https://int-ecomm.nexi.it';

    // Build Nexi Pay by Link request
    const nexiPayload = {
      order: {
        orderId: request.orderId,
        amount: request.amount.toString(),
        currency: request.currency || 'EUR'
      },
      paymentSession: {
        actionType: 'PAY',
        amount: request.amount.toString(),
        language: 'de',
        resultUrl: request.returnUrl,
        cancelUrl: request.cancelUrl,
        notificationUrl: config.webhook_url || `${Deno.env.get('SUPABASE_URL')}/functions/v1/nexi-payment`
      },
      customer: {
        email: request.customerEmail || ''
      }
    };

    console.log('Nexi API request payload:', nexiPayload);
    console.log('Using API base URL:', baseUrl);

    // Make API call to Nexi Pay by Link
    const nexiResponse = await fetch(`${baseUrl}/ecomm/api/hostedfields`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.api_key}`,
        'X-Api-Key': config.api_key
      },
      body: JSON.stringify(nexiPayload)
    });

    if (!nexiResponse.ok) {
      const errorText = await nexiResponse.text();
      console.error('Nexi API error response:', nexiResponse.status, errorText);
      throw new Error(`Nexi API error: ${nexiResponse.status} - ${errorText}`);
    }

    const nexiData = await nexiResponse.json();
    console.log('Nexi API response:', nexiData);

    // Extract redirect URL from Nexi response
    let redirectUrl = '';
    if (nexiData.hostedPage && nexiData.hostedPage.url) {
      redirectUrl = nexiData.hostedPage.url;
    } else if (nexiData.redirectUrl) {
      redirectUrl = nexiData.redirectUrl;
    } else {
      // Fallback: construct a payment URL if no direct URL is provided
      redirectUrl = `${baseUrl}/ecomm/hostedpage?paymentId=${paymentId}`;
    }

    // Update order with Nexi payment information
    const { error: updateError } = await supabaseClient
      .from('orders')
      .update({
        nexi_payment_id: paymentId,
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
        payment_id: paymentId,
        transaction_type: 'payment_initiation',
        status: 'initiated',
        amount: request.amount,
        currency: request.currency || 'EUR',
        request_data: nexiPayload,
        response_data: nexiData,
        notes: 'Pay by Link payment initiated via Nexi API'
      });

    if (logError) {
      console.error('Failed to log payment initiation:', logError);
    }

    const response: NexiPaymentLinkResponse = {
      paymentId,
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

    // Get Nexi configuration for API call
    const { data: config, error: configError } = await supabaseClient
      .from('nexi_payment_configs')
      .select('*')
      .eq('is_active', true)
      .single();

    if (config && config.api_key) {
      // Make API call to check status with Nexi
      const baseUrl = config.environment === 'production' 
        ? 'https://ecomm.nexi.it'
        : 'https://int-ecomm.nexi.it';

      try {
        const statusResponse = await fetch(`${baseUrl}/ecomm/api/orders/${order.order_number}/status`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${config.api_key}`,
            'X-Api-Key': config.api_key
          }
        });

        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          console.log('Nexi status API response:', statusData);

          // Update order status if changed
          if (statusData.status && statusData.status !== order.nexi_transaction_status) {
            await supabaseClient
              .from('orders')
              .update({
                nexi_transaction_status: statusData.status,
                updated_at: new Date().toISOString()
              })
              .eq('nexi_payment_id', paymentId);
          }
        }
      } catch (apiError) {
        console.error('Failed to check status with Nexi API:', apiError);
      }
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
    const { paymentId, status, orderId, amount, transactionId } = webhookData;

    if (!paymentId && !orderId) {
      throw new Error('Invalid webhook data: missing paymentId or orderId');
    }

    // Find order by payment ID or order ID
    let query = supabaseClient.from('orders').select('*');
    if (paymentId) {
      query = query.eq('nexi_payment_id', paymentId);
    } else {
      query = query.eq('order_number', orderId);
    }

    const { data: order, error } = await query.single();

    if (error || !order) {
      console.error('Order not found for webhook data:', webhookData, error);
      throw new Error('Order not found');
    }

    // Map Nexi status to internal status
    let internalStatus = 'pending';
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'authorized':
      case 'captured':
      case 'success':
        internalStatus = 'confirmed';
        break;
      case 'failed':
      case 'declined':
      case 'error':
        internalStatus = 'failed';
        break;
      case 'cancelled':
      case 'expired':
        internalStatus = 'cancelled';
        break;
      default:
        internalStatus = 'pending';
    }

    // Update order status
    const { error: updateError } = await supabaseClient
      .from('orders')
      .update({
        nexi_transaction_status: status,
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
        payment_id: paymentId || order.nexi_payment_id,
        transaction_type: 'webhook',
        status: status || 'unknown',
        amount: amount || order.total_amount,
        currency: 'EUR',
        webhook_data: webhookData,
        notes: `Webhook received with status: ${status}`
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
          notes: `Payment ${status} via Nexi. Transaction ID: ${transactionId || 'N/A'}`
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
          payment_id: webhookData.paymentId || null,
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
