
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

    // Generate unique payment ID with timestamp for uniqueness
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 15);
    const paymentId = `nexi_${timestamp}_${randomSuffix}`;
    
    // Calculate expiration time (24 hours from now)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // Build Nexi Pay by Link request data
    const nexiRequest = {
      merchant_id: config.merchant_id,
      terminal_id: config.terminal_id,
      amount: request.amount,
      currency: request.currency || 'EUR',
      order_id: request.orderId,
      payment_id: paymentId,
      description: request.description || `Heizöl-Bestellung ${request.orderId}`,
      return_url: request.returnUrl,
      cancel_url: request.cancelUrl,
      customer_email: request.customerEmail,
      language: 'de',
      expires_at: expiresAt,
      payment_type: 'pay_by_link'
    };

    console.log('Nexi Pay by Link request:', nexiRequest);

    // For sandbox/testing environment, create a mock payment link
    // In production, this would be replaced with actual Nexi API calls
    const baseUrl = config.is_sandbox 
      ? 'https://test.nexi.it/ecomm/api/hostedfields'
      : 'https://ecomm.nexi.it/ecomm/api/hostedfields';
      
    const redirectUrl = `${baseUrl}/payment?payment_id=${paymentId}&order_id=${request.orderId}&amount=${request.amount}&currency=${request.currency || 'EUR'}`;

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

    // Log the payment initiation for tracking
    const { error: logError } = await supabaseClient
      .from('nexi_payment_logs')
      .insert({
        order_id: request.orderId,
        payment_id: paymentId,
        transaction_type: 'payment_initiation',
        status: 'initiated',
        amount: request.amount,
        currency: request.currency || 'EUR',
        request_data: nexiRequest,
        notes: 'Pay by Link payment initiated'
      });

    if (logError) {
      console.error('Failed to log payment initiation:', logError);
      // Don't throw error here as payment initiation was successful
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
    
    // Log the error for debugging
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

    // In a real implementation, you would query the Nexi API here
    // For now, we'll return the current status from our database
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
    const { payment_id, status, order_id, amount, transaction_id } = webhookData;

    if (!payment_id || !status) {
      throw new Error('Invalid webhook data: missing payment_id or status');
    }

    // Map Nexi status to our internal status
    let internalStatus = 'pending';
    switch (status.toLowerCase()) {
      case 'completed':
      case 'authorized':
      case 'captured':
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

    // Update order status based on webhook
    const { error: updateError } = await supabaseClient
      .from('orders')
      .update({
        nexi_transaction_status: status,
        nexi_webhook_data: webhookData,
        status: internalStatus,
        updated_at: new Date().toISOString()
      })
      .eq('nexi_payment_id', payment_id);

    if (updateError) {
      console.error('Failed to update order from webhook:', updateError);
      throw new Error('Failed to update order');
    }

    // Log the webhook for audit trail
    const { error: logError } = await supabaseClient
      .from('nexi_payment_logs')
      .insert({
        order_id: order_id || null,
        payment_id,
        transaction_type: 'webhook',
        status,
        amount: amount || null,
        currency: 'EUR',
        webhook_data: webhookData,
        notes: `Webhook received with status: ${status}`
      });

    if (logError) {
      console.error('Failed to log webhook:', logError);
      // Don't throw error here as webhook processing was successful
    }

    // Add order status history entry
    if (order_id) {
      try {
        await supabaseClient
          .from('order_status_history')
          .insert({
            order_id: order_id,
            old_status: 'pending',
            new_status: internalStatus,
            changed_by: 'Nexi Webhook',
            notes: `Payment ${status} via Nexi. Transaction ID: ${transaction_id || 'N/A'}`
          });
      } catch (historyError) {
        console.error('Failed to add status history:', historyError);
      }
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
          order_id: webhookData.order_id || null,
          payment_id: webhookData.payment_id || null,
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
