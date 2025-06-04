
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only accept POST requests for webhooks
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    console.log('=== NEXI WEBHOOK RECEIVED ===');
    console.log('Request method:', req.method);
    console.log('Request headers:', Object.fromEntries(req.headers.entries()));

    // Use service role client for database operations
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Parse webhook data - Nexi can send form data or JSON
    let webhookData: any = {};
    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      webhookData = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      webhookData = Object.fromEntries(formData.entries());
    } else {
      // Try to parse as text and then as form data
      const text = await req.text();
      console.log('Raw webhook data:', text);
      
      if (text.includes('=') && text.includes('&')) {
        // Parse as URL-encoded data
        const params = new URLSearchParams(text);
        webhookData = Object.fromEntries(params.entries());
      } else {
        try {
          webhookData = JSON.parse(text);
        } catch {
          webhookData = { raw_data: text };
        }
      }
    }

    console.log('Parsed webhook data:', webhookData);

    // Extract key fields from webhook (Nexi Italy webhook parameters)
    const {
      trackid,        // Order ID
      tranid,         // Transaction ID
      result,         // Payment result (CAPTURED, FAILED, etc.)
      auth,           // Authorization code
      ref,            // Reference number
      postdate,       // Transaction date
      amt,            // Amount
      hash,           // MAC signature from Nexi
      paymentid,      // Payment ID
      udf1,           // Custom field 1
      udf2,           // Custom field 2
      error,          // Error code if any
      error_text      // Error description if any
    } = webhookData;

    console.log('Key webhook fields:', {
      trackid,
      tranid,
      result,
      auth,
      ref,
      postdate,
      amt,
      hash: hash ? '[PRESENT]' : '[MISSING]',
      paymentid,
      error,
      error_text
    });

    // Validate required fields
    if (!trackid && !tranid && !paymentid) {
      console.error('Missing required identifier in webhook');
      return new Response(
        JSON.stringify({ 
          error: 'Missing required identifier (trackid, tranid, or paymentid)',
          received_data: Object.keys(webhookData)
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Determine payment status from result
    let paymentStatus = 'pending';
    let orderStatus = 'pending';
    
    if (result) {
      switch (result.toUpperCase()) {
        case 'CAPTURED':
        case 'SUCCESS':
        case 'APPROVED':
          paymentStatus = 'completed';
          orderStatus = 'confirmed';
          break;
        case 'FAILED':
        case 'DECLINED':
        case 'ERROR':
          paymentStatus = 'failed';
          orderStatus = 'cancelled';
          break;
        case 'PENDING':
        case 'PROCESSING':
          paymentStatus = 'pending';
          orderStatus = 'pending';
          break;
        default:
          paymentStatus = 'unknown';
          orderStatus = 'pending';
      }
    }

    console.log('Determined status:', { paymentStatus, orderStatus });

    // Find the order using multiple identifiers
    let order = null;
    let orderQuery = null;

    // Try to find by trackid (order number) first
    if (trackid) {
      console.log('Looking up order by trackid:', trackid);
      orderQuery = await supabaseClient
        .from('orders')
        .select('*')
        .eq('order_number', trackid)
        .single();
      
      if (!orderQuery.error && orderQuery.data) {
        order = orderQuery.data;
        console.log('Found order by trackid');
      }
    }

    // Try to find by nexi_payment_id if trackid didn't work
    if (!order && (tranid || paymentid)) {
      const searchId = tranid || paymentid;
      console.log('Looking up order by payment ID:', searchId);
      
      orderQuery = await supabaseClient
        .from('orders')
        .select('*')
        .eq('nexi_payment_id', searchId)
        .single();
      
      if (!orderQuery.error && orderQuery.data) {
        order = orderQuery.data;
        console.log('Found order by payment ID');
      }
    }

    if (!order) {
      console.error('Order not found for webhook data:', { trackid, tranid, paymentid });
      
      // Log the webhook attempt for debugging
      const { error: logError } = await supabaseClient
        .from('nexi_payment_logs')
        .insert({
          payment_id: tranid || paymentid || 'unknown',
          transaction_type: 'webhook_orphaned',
          status: 'error',
          webhook_data: webhookData,
          notes: `Order not found for identifiers: trackid=${trackid}, tranid=${tranid}, paymentid=${paymentid}`
        });

      if (logError) {
        console.error('Failed to log orphaned webhook:', logError);
      }

      return new Response(
        JSON.stringify({ 
          error: 'Order not found',
          searched_identifiers: { trackid, tranid, paymentid }
        }), 
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Processing webhook for order:', order.order_number);

    // Update order with webhook data
    const updateData: any = {
      nexi_transaction_status: paymentStatus,
      nexi_webhook_data: webhookData,
      nexi_webhook_received_at: new Date().toISOString(),
      status: orderStatus
    };

    // Add transaction details if available
    if (tranid) updateData.nexi_transaction_id = tranid;
    if (auth) updateData.nexi_auth_code = auth;
    if (ref) updateData.nexi_reference = ref;
    if (error) updateData.nexi_error_code = error;
    if (error_text) updateData.nexi_error_text = error_text;

    console.log('Updating order with data:', updateData);

    const { error: updateError } = await supabaseClient
      .from('orders')
      .update(updateData)
      .eq('id', order.id);

    if (updateError) {
      console.error('Failed to update order:', updateError);
      throw new Error(`Failed to update order: ${updateError.message}`);
    }

    console.log('✅ Order updated successfully');

    // Create detailed payment log
    const logData = {
      order_id: order.id,
      payment_id: tranid || paymentid || order.nexi_payment_id,
      transaction_type: 'webhook',
      status: paymentStatus,
      amount: amt ? parseInt(amt) : order.total_amount,
      currency: 'EUR',
      webhook_data: webhookData,
      notes: `Webhook processed: ${result} - Auth: ${auth} - Ref: ${ref}`
    };

    const { error: logError } = await supabaseClient
      .from('nexi_payment_logs')
      .insert(logData);

    if (logError) {
      console.error('Failed to create payment log:', logError);
      // Don't fail the webhook for logging errors
    } else {
      console.log('✅ Payment log created successfully');
    }

    // Send confirmation email for successful payments
    if (paymentStatus === 'completed' && order.customer_email) {
      console.log('Triggering order confirmation email...');
      
      try {
        const { error: emailError } = await supabaseClient.functions.invoke('send-order-confirmation', {
          body: {
            orderId: order.id,
            orderNumber: order.order_number,
            customerEmail: order.customer_email,
            totalAmount: order.total_amount,
            paymentMethod: 'nexi_card'
          }
        });

        if (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        } else {
          console.log('✅ Confirmation email triggered');
        }
      } catch (emailError) {
        console.error('Error triggering confirmation email:', emailError);
      }
    }

    console.log('=== WEBHOOK PROCESSING COMPLETE ===');

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        status: paymentStatus,
        order_number: order.order_number,
        message: 'Webhook processed successfully'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('=== WEBHOOK PROCESSING ERROR ===');
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);

    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Check webhook logs for more information',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
