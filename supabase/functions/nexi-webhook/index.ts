
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Nexi webhook received:', {
      method: req.method,
      url: req.url,
      headers: Object.fromEntries(req.headers.entries())
    })

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    let webhookData: any = {}
    let paymentId: string | null = null
    let trackId: string | null = null
    let result: string | null = null

    // Handle both GET (redirect) and POST (webhook) requests
    if (req.method === 'GET') {
      // Handle redirect from Nexi with URL parameters
      const url = new URL(req.url)
      webhookData = {
        method: 'GET',
        params: Object.fromEntries(url.searchParams.entries()),
        parsed_data: {}
      }

      // Extract common parameters
      trackId = url.searchParams.get('trackid')
      paymentId = url.searchParams.get('tranid') || url.searchParams.get('paymentId')
      result = url.searchParams.get('result') || url.searchParams.get('responsecode')

      console.log('GET webhook data:', { trackId, paymentId, result, allParams: webhookData.params })

    } else if (req.method === 'POST') {
      // Handle POST webhook from Nexi
      const contentType = req.headers.get('content-type') || ''
      
      if (contentType.includes('application/json')) {
        webhookData = await req.json()
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const formData = await req.formData()
        webhookData = {
          method: 'POST',
          form_data: Object.fromEntries(formData.entries()),
          parsed_data: {}
        }
      } else {
        webhookData = {
          method: 'POST',
          text: await req.text(),
          parsed_data: {}
        }
      }

      // Extract payment info from webhook data
      paymentId = webhookData.tranid || webhookData.paymentId || webhookData.form_data?.tranid
      trackId = webhookData.trackid || webhookData.orderId || webhookData.form_data?.trackid
      result = webhookData.result || webhookData.status || webhookData.form_data?.result

      console.log('POST webhook data:', { trackId, paymentId, result, data: webhookData })
    }

    // Use a fallback payment ID if none provided
    const finalPaymentId = paymentId || trackId || `unknown_${Date.now()}`

    // Log the webhook reception
    await supabaseClient
      .from('nexi_payment_logs')
      .insert({
        payment_id: finalPaymentId,
        transaction_type: 'webhook_received',
        status: result || 'unknown',
        webhook_data: webhookData,
        notes: `Webhook received via ${req.method} - trackId: ${trackId}, paymentId: ${paymentId}, result: ${result}`
      })

    let order = null
    
    // Try to find the order by tracking ID or payment ID
    if (trackId) {
      const { data: orderData } = await supabaseClient
        .from('orders')
        .select('*')
        .eq('order_number', trackId)
        .single()
      
      order = orderData
      console.log('Found order by trackId:', order?.id)
    }

    if (!order && paymentId) {
      const { data: orderData } = await supabaseClient
        .from('orders')
        .select('*')
        .eq('nexi_payment_id', paymentId)
        .single()
      
      order = orderData
      console.log('Found order by paymentId:', order?.id)
    }

    if (order) {
      // Determine transaction status based on result
      let transactionStatus = 'unknown'
      let orderStatus = order.status

      if (result) {
        const resultUpper = result.toString().toUpperCase()
        
        if (['SUCCESS', 'CAPTURED', 'APPROVED', 'PAID', '00'].includes(resultUpper)) {
          transactionStatus = 'completed'
          orderStatus = 'confirmed'
        } else if (['FAILED', 'DECLINED', 'ERROR', 'CANCELLED', 'TIMEOUT'].includes(resultUpper)) {
          transactionStatus = 'failed'
          orderStatus = 'cancelled'
        } else if (['PENDING', 'PROCESSING', 'INITIATED'].includes(resultUpper)) {
          transactionStatus = 'pending'
          orderStatus = 'processing'
        }
      }

      // Update order with webhook data
      const updateData = {
        nexi_transaction_status: transactionStatus,
        nexi_webhook_data: webhookData,
        status: orderStatus
      }

      if (paymentId && !order.nexi_payment_id) {
        updateData.nexi_payment_id = paymentId
      }

      const { error: updateError } = await supabaseClient
        .from('orders')
        .update(updateData)
        .eq('id', order.id)

      if (updateError) {
        console.error('Error updating order:', updateError)
      } else {
        console.log('Order updated successfully:', { orderId: order.id, status: orderStatus, transactionStatus })
      }

      // Log the webhook processing
      await supabaseClient
        .from('nexi_payment_logs')
        .insert({
          payment_id: finalPaymentId,
          order_id: order.id,
          transaction_type: 'webhook_processed',
          status: transactionStatus,
          webhook_data: webhookData,
          notes: `Webhook processed - Order status updated to ${orderStatus}, transaction status: ${transactionStatus}`
        })

    } else {
      console.log('No order found for webhook data')
      
      // Log orphaned webhook
      await supabaseClient
        .from('nexi_payment_logs')
        .insert({
          payment_id: finalPaymentId,
          transaction_type: 'webhook_orphaned',
          status: result || 'unknown',
          webhook_data: webhookData,
          notes: `Orphaned webhook - no order found for trackId: ${trackId}, paymentId: ${paymentId}`
        })
    }

    // For GET requests (redirects), we might want to redirect to a success/failure page
    if (req.method === 'GET') {
      const baseUrl = webhookData.params.baseUrl || 'http://localhost:3000'
      
      if (result && ['SUCCESS', 'CAPTURED', 'APPROVED', 'PAID', '00'].includes(result.toString().toUpperCase())) {
        return Response.redirect(`${baseUrl}/checkout/success?order=${trackId}&payment_id=${paymentId}`)
      } else if (result && ['FAILED', 'DECLINED', 'ERROR', 'CANCELLED'].includes(result.toString().toUpperCase())) {
        return Response.redirect(`${baseUrl}/checkout/cancel?order=${trackId}&payment_id=${paymentId}&reason=${result}`)
      } else {
        return Response.redirect(`${baseUrl}/payment/webhook?trackid=${trackId}&tranid=${paymentId}&result=${result}`)
      }
    }

    // For POST requests, return OK
    return new Response('OK', {
      headers: corsHeaders,
      status: 200,
    })

  } catch (error) {
    console.error('Webhook processing error:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
