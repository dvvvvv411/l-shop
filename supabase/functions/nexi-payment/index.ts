
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NexiConfig {
  id: string
  merchant_id: string
  terminal_id: string
  password: string
  alias?: string
  mac_key?: string
  api_key?: string
  is_sandbox: boolean
  test_mode: boolean
  integration_method: string
  base_url?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { action, orderId, amount, currency = 'EUR', description, customerEmail, returnUrl, cancelUrl, paymentId } = await req.json()

    console.log('Nexi payment request:', { action, orderId, amount, currency })

    // Get active Nexi configuration
    const { data: config, error: configError } = await supabaseClient
      .from('nexi_payment_configs')
      .select('*')
      .eq('is_active', true)
      .single()

    if (configError || !config) {
      console.error('No active Nexi config found:', configError)
      throw new Error('Nexi payment configuration not found')
    }

    const nexiConfig = config as NexiConfig

    // Determine the correct base URL based on environment
    const baseUrl = nexiConfig.test_mode 
      ? 'https://int-ecommerce.nexi.it'
      : 'https://ecommerce.nexi.it'

    console.log('Using Nexi config:', {
      merchant_id: nexiConfig.merchant_id,
      terminal_id: nexiConfig.terminal_id,
      test_mode: nexiConfig.test_mode,
      integration_method: nexiConfig.integration_method,
      base_url: baseUrl
    })

    if (action === 'initiate') {
      // Create payment using Pay by Link method for test environment
      const paymentData = {
        order: {
          orderId: orderId,
          amount: Math.round(amount * 100), // Convert to cents
          currency: currency,
          description: description || `Order ${orderId}`,
          customField: orderId
        },
        paymentSession: {
          actionType: 'PAY',
          amount: Math.round(amount * 100),
          language: 'DEU',
          resultUrl: returnUrl,
          cancelUrl: cancelUrl,
          notificationUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/nexi-webhook`
        }
      }

      console.log('Creating Nexi payment with data:', paymentData)

      // For test environment, create a simplified payment request
      const paymentResponse = {
        paymentId: `test_${orderId}_${Date.now()}`,
        formHtml: null,
        status: 'initiated',
        environment: nexiConfig.test_mode ? 'test' : 'production',
        nexiBaseUrl: baseUrl,
        integration: nexiConfig.integration_method,
        debug: {
          config: {
            merchant_id: nexiConfig.merchant_id,
            terminal_id: nexiConfig.terminal_id,
            test_mode: nexiConfig.test_mode,
            base_url: baseUrl
          },
          request: paymentData
        }
      }

      // Log the payment initiation
      await supabaseClient
        .from('nexi_payment_logs')
        .insert({
          payment_id: paymentResponse.paymentId,
          order_id: orderId,
          transaction_type: 'payment_initiated',
          status: 'initiated',
          amount: amount,
          currency: currency,
          request_data: paymentData,
          response_data: paymentResponse,
          notes: `Test payment initiated for order ${orderId}`
        })

      // Update order with Nexi payment ID
      if (orderId) {
        await supabaseClient
          .from('orders')
          .update({
            nexi_payment_id: paymentResponse.paymentId,
            nexi_transaction_status: 'initiated'
          })
          .eq('order_number', orderId)
      }

      return new Response(
        JSON.stringify(paymentResponse),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )

    } else if (action === 'status') {
      // Check payment status
      console.log('Checking payment status for:', paymentId)

      const { data: order } = await supabaseClient
        .from('orders')
        .select('*')
        .eq('nexi_payment_id', paymentId)
        .single()

      const statusResponse = {
        paymentId: paymentId,
        status: order?.nexi_transaction_status || 'unknown',
        orderId: order?.order_number,
        environment: nexiConfig.test_mode ? 'test' : 'production'
      }

      return new Response(
        JSON.stringify(statusResponse),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    throw new Error(`Unknown action: ${action}`)

  } catch (error) {
    console.error('Nexi payment error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Check edge function logs for more information'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
