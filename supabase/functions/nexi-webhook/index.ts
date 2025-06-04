
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

  // Enhanced webhook logging
  console.log('=== ENHANCED NEXI WEBHOOK RECEIVED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  console.log('User-Agent:', req.headers.get('user-agent') || 'unknown');
  console.log('Content-Type:', req.headers.get('content-type') || 'unknown');
  console.log('Content-Length:', req.headers.get('content-length') || 'unknown');
  console.log('All headers:', Object.fromEntries(req.headers.entries()));

  // Accept both POST and GET requests from Nexi
  if (!['POST', 'GET'].includes(req.method)) {
    console.log('❌ Method not allowed:', req.method);
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    // Use service role client for database operations
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    let webhookData: any = {};
    let rawData = '';
    
    // Enhanced data parsing for different content types and methods
    if (req.method === 'POST') {
      const contentType = req.headers.get('content-type') || '';
      console.log('Processing POST request with content-type:', contentType);
      
      if (contentType.includes('application/json')) {
        rawData = await req.text();
        console.log('Raw JSON data:', rawData);
        webhookData = JSON.parse(rawData);
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        rawData = await req.text();
        console.log('Raw form data:', rawData);
        const formData = new URLSearchParams(rawData);
        webhookData = Object.fromEntries(formData.entries());
      } else {
        // Fallback: try to parse as text first
        rawData = await req.text();
        console.log('Raw webhook data (unknown content-type):', rawData);
        
        if (rawData.includes('=') && rawData.includes('&')) {
          // Parse as URL-encoded data
          const params = new URLSearchParams(rawData);
          webhookData = Object.fromEntries(params.entries());
        } else if (rawData.trim().startsWith('{')) {
          // Try to parse as JSON
          try {
            webhookData = JSON.parse(rawData);
          } catch {
            webhookData = { raw_data: rawData };
          }
        } else {
          webhookData = { raw_data: rawData };
        }
      }
    } else if (req.method === 'GET') {
      // Parse GET parameters from URL
      const url = new URL(req.url);
      webhookData = Object.fromEntries(url.searchParams.entries());
      rawData = url.search;
      console.log('GET parameters:', webhookData);
    }

    console.log('Parsed webhook data:', webhookData);

    // Log all webhook attempts for debugging
    const { error: logError } = await supabaseClient
      .from('nexi_payment_logs')
      .insert({
        payment_id: webhookData.tranid || webhookData.paymentid || 'webhook_' + Date.now(),
        transaction_type: 'webhook_received',
        status: 'received',
        webhook_data: {
          method: req.method,
          headers: Object.fromEntries(req.headers.entries()),
          parsed_data: webhookData,
          raw_data: rawData,
          url: req.url,
          timestamp: new Date().toISOString()
        },
        notes: `Webhook received via ${req.method} from ${req.headers.get('user-agent') || 'unknown'}`
      });

    if (logError) {
      console.error('Failed to log webhook attempt:', logError);
    }

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
      error_text,     // Error description if any
      responsecode,   // Response code
      reason          // Reason text
    } = webhookData;

    console.log('Enhanced key webhook fields:', {
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
      error_text,
      responsecode,
      reason
    });

    // Validate required fields with more flexible matching
    if (!trackid && !tranid && !paymentid && !webhookData.orderid) {
      console.error('❌ Missing required identifier in webhook');
      return new Response(
        JSON.stringify({ 
          error: 'Missing required identifier (trackid, tranid, paymentid, or orderid)',
          received_data: Object.keys(webhookData),
          suggestion: 'Please ensure Nexi is configured to send trackid parameter'
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Enhanced payment status determination
    let paymentStatus = 'pending';
    let orderStatus = 'pending';
    
    if (result) {
      const resultUpper = result.toUpperCase();
      switch (resultUpper) {
        case 'CAPTURED':
        case 'SUCCESS':
        case 'APPROVED':
        case 'PAID':
        case 'COMPLETED':
          paymentStatus = 'completed';
          orderStatus = 'confirmed';
          break;
        case 'FAILED':
        case 'DECLINED':
        case 'ERROR':
        case 'REJECTED':
        case 'CANCELLED':
          paymentStatus = 'failed';
          orderStatus = 'cancelled';
          break;
        case 'PENDING':
        case 'PROCESSING':
        case 'INITIATED':
          paymentStatus = 'pending';
          orderStatus = 'pending';
          break;
        default:
          paymentStatus = 'unknown';
          orderStatus = 'pending';
          console.warn('Unknown payment result:', result);
      }
    } else if (responsecode) {
      // Fallback to response code if result is not available
      if (responsecode === '00' || responsecode === '000') {
        paymentStatus = 'completed';
        orderStatus = 'confirmed';
      } else {
        paymentStatus = 'failed';
        orderStatus = 'cancelled';
      }
    }

    console.log('Determined status:', { paymentStatus, orderStatus, basedOn: result ? 'result' : 'responsecode' });

    // Enhanced order lookup with multiple strategies
    let order = null;
    let searchStrategy = '';

    // Strategy 1: Try to find by trackid (order number) first
    if (trackid) {
      console.log('🔍 Strategy 1: Looking up order by trackid:', trackid);
      const { data, error } = await supabaseClient
        .from('orders')
        .select('*')
        .eq('order_number', trackid)
        .single();
      
      if (!error && data) {
        order = data;
        searchStrategy = 'trackid';
        console.log('✅ Found order by trackid');
      } else {
        console.log('❌ No order found by trackid:', error?.message);
      }
    }

    // Strategy 2: Try to find by nexi_payment_id
    if (!order && (tranid || paymentid)) {
      const searchId = tranid || paymentid;
      console.log('🔍 Strategy 2: Looking up order by payment ID:', searchId);
      
      const { data, error } = await supabaseClient
        .from('orders')
        .select('*')
        .eq('nexi_payment_id', searchId)
        .single();
      
      if (!error && data) {
        order = data;
        searchStrategy = 'payment_id';
        console.log('✅ Found order by payment ID');
      } else {
        console.log('❌ No order found by payment ID:', error?.message);
      }
    }

    // Strategy 3: Try to find by order number pattern matching
    if (!order && trackid && /^[A-Z]\d+$/.test(trackid)) {
      console.log('🔍 Strategy 3: Pattern matching for order number:', trackid);
      
      const { data, error } = await supabaseClient
        .from('orders')
        .select('*')
        .ilike('order_number', trackid)
        .single();
      
      if (!error && data) {
        order = data;
        searchStrategy = 'pattern_match';
        console.log('✅ Found order by pattern matching');
      }
    }

    if (!order) {
      console.error('❌ Order not found for webhook data:', { trackid, tranid, paymentid });
      
      // Enhanced logging for orphaned webhooks
      const { error: orphanError } = await supabaseClient
        .from('nexi_payment_logs')
        .insert({
          payment_id: tranid || paymentid || trackid || 'orphaned_' + Date.now(),
          transaction_type: 'webhook_orphaned',
          status: 'error',
          webhook_data: {
            ...webhookData,
            search_attempts: {
              trackid_attempted: !!trackid,
              payment_id_attempted: !!(tranid || paymentid),
              pattern_match_attempted: !!(trackid && /^[A-Z]\d+$/.test(trackid))
            }
          },
          notes: `Order not found for identifiers: trackid=${trackid}, tranid=${tranid}, paymentid=${paymentid}`
        });

      if (orphanError) {
        console.error('Failed to log orphaned webhook:', orphanError);
      }

      return new Response(
        JSON.stringify({ 
          error: 'Order not found',
          searched_identifiers: { trackid, tranid, paymentid },
          suggestion: 'Check if order exists in database and Nexi configuration sends correct trackid'
        }), 
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`✅ Processing webhook for order: ${order.order_number} (found via ${searchStrategy})`);

    // Update order with enhanced webhook data
    const updateData: any = {
      nexi_transaction_status: paymentStatus,
      nexi_webhook_data: {
        ...webhookData,
        processed_at: new Date().toISOString(),
        search_strategy: searchStrategy,
        webhook_method: req.method
      },
      nexi_webhook_received_at: new Date().toISOString(),
      status: orderStatus
    };

    // Add transaction details if available
    if (tranid) updateData.nexi_transaction_id = tranid;
    if (auth) updateData.nexi_auth_code = auth;
    if (ref) updateData.nexi_reference = ref;
    if (error) updateData.nexi_error_code = error;
    if (error_text) updateData.nexi_error_text = error_text;
    if (responsecode) updateData.nexi_response_code = responsecode;

    console.log('Updating order with enhanced data:', updateData);

    const { error: updateError } = await supabaseClient
      .from('orders')
      .update(updateData)
      .eq('id', order.id);

    if (updateError) {
      console.error('❌ Failed to update order:', updateError);
      throw new Error(`Failed to update order: ${updateError.message}`);
    }

    console.log('✅ Order updated successfully');

    // Create enhanced payment log
    const logData = {
      order_id: order.id,
      payment_id: tranid || paymentid || order.nexi_payment_id,
      transaction_type: 'webhook_processed',
      status: paymentStatus,
      amount: amt ? parseInt(amt) : order.total_amount,
      currency: 'EUR',
      webhook_data: {
        ...webhookData,
        processing_info: {
          search_strategy: searchStrategy,
          webhook_method: req.method,
          processed_at: new Date().toISOString(),
          user_agent: req.headers.get('user-agent'),
          content_type: req.headers.get('content-type')
        }
      },
      notes: `Webhook processed successfully: ${result || responsecode} - Auth: ${auth} - Ref: ${ref} - Found via ${searchStrategy}`
    };

    const { error: finalLogError } = await supabaseClient
      .from('nexi_payment_logs')
      .insert(logData);

    if (finalLogError) {
      console.error('Failed to create payment log:', finalLogError);
      // Don't fail the webhook for logging errors
    } else {
      console.log('✅ Payment log created successfully');
    }

    // Send confirmation email for successful payments
    if (paymentStatus === 'completed' && order.customer_email) {
      console.log('📧 Triggering order confirmation email...');
      
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

    console.log('=== ENHANCED WEBHOOK PROCESSING COMPLETE ===');

    // Return success response that Nexi expects
    return new Response(
      JSON.stringify({ 
        success: true, 
        status: paymentStatus,
        order_number: order.order_number,
        message: 'Webhook processed successfully',
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('=== ENHANCED WEBHOOK PROCESSING ERROR ===');
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);

    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Check enhanced webhook logs for more information',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
