
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const resendApiKey = Deno.env.get('RESEND_API_KEY');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId } = await req.json();
    
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    console.log('Processing email for order:', orderId);

    // Fetch order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new Error(`Order not found: ${orderError?.message}`);
    }

    // Determine shop based on origin_domain
    let shopId = order.shop_id;
    
    if (!shopId && order.origin_domain) {
      // Map domain to shop
      if (order.origin_domain.includes('/1/') || order.origin_domain.includes('shop1')) {
        // Get first shop (shop 1)
        const { data: shops } = await supabase
          .from('shops')
          .select('id')
          .order('created_at', { ascending: true })
          .limit(1);
        shopId = shops?.[0]?.id;
      } else if (order.origin_domain.includes('/2/') || order.origin_domain.includes('shop2')) {
        // Get second shop (shop 2)
        const { data: shops } = await supabase
          .from('shops')
          .select('id')
          .order('created_at', { ascending: true })
          .limit(2);
        shopId = shops?.[1]?.id;
      }
    }

    if (!shopId) {
      // Fallback to default shop
      const { data: defaultShop } = await supabase
        .from('shops')
        .select('id')
        .eq('is_default', true)
        .single();
      shopId = defaultShop?.id;
    }

    if (!shopId) {
      throw new Error('No shop configuration found');
    }

    // Fetch email configuration for the shop
    const { data: emailConfig, error: configError } = await supabase
      .from('email_configurations')
      .select(`
        *,
        order_confirmation_template:order_confirmation_template_id(*)
      `)
      .eq('shop_id', shopId)
      .eq('is_active', true)
      .single();

    if (configError || !emailConfig || !emailConfig.send_order_confirmation) {
      console.log('Email not configured or disabled for shop:', shopId);
      return new Response(JSON.stringify({ success: true, message: 'Email not configured' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch shop details
    const { data: shop, error: shopError } = await supabase
      .from('shops')
      .select('*')
      .eq('id', shopId)
      .single();

    if (shopError || !shop) {
      throw new Error(`Shop not found: ${shopError?.message}`);
    }

    // Get email template
    let template = emailConfig.order_confirmation_template;
    if (!template) {
      // Fallback to default template
      const { data: defaultTemplate } = await supabase
        .from('email_templates')
        .select('*')
        .eq('name', 'default_order_confirmation')
        .single();
      template = defaultTemplate;
    }

    if (!template) {
      throw new Error('No email template found');
    }

    // Prepare template variables
    const templateVars = {
      shop_name: shop.name,
      customer_name: order.customer_name,
      order_number: order.order_number,
      liters: order.liters.toLocaleString('de-DE'),
      total_amount: order.total_amount.toLocaleString('de-DE', { minimumFractionDigits: 2 }),
      delivery_address: order.customer_address,
      delivery_date: order.delivery_date ? new Date(order.delivery_date).toLocaleDateString('de-DE') : 'Nach Absprache',
      company_address: `${shop.company_address}, ${shop.company_postcode} ${shop.company_city}`,
      company_email: shop.company_email || emailConfig.from_email,
      company_phone: shop.company_phone || ''
    };

    // Replace template variables in content
    let htmlContent = template.html_content;
    let textContent = template.text_content || '';
    let subject = template.subject;

    Object.entries(templateVars).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), value);
      textContent = textContent.replace(new RegExp(placeholder, 'g'), value);
      subject = subject.replace(new RegExp(placeholder, 'g'), value);
    });

    // Log email attempt
    const { data: emailLog } = await supabase
      .from('email_logs')
      .insert({
        order_id: orderId,
        email_type: 'order_confirmation',
        recipient_email: order.customer_email,
        subject: subject,
        status: 'pending'
      })
      .select()
      .single();

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY not configured, skipping actual email send');
      
      // Update log as sent (for testing)
      await supabase
        .from('email_logs')
        .update({ 
          status: 'sent',
          sent_at: new Date().toISOString()
        })
        .eq('id', emailLog.id);

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Email simulated (RESEND_API_KEY not configured)' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send email via Resend
    const emailPayload = {
      from: `${emailConfig.from_name} <${emailConfig.from_email}>`,
      to: [order.customer_email],
      subject: subject,
      html: htmlContent,
      text: textContent,
      reply_to: emailConfig.reply_to || emailConfig.from_email
    };

    console.log('Sending email to:', order.customer_email);

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      throw new Error(`Resend API error: ${emailResult.message || 'Unknown error'}`);
    }

    // Update email log as sent
    await supabase
      .from('email_logs')
      .update({ 
        status: 'sent',
        sent_at: new Date().toISOString()
      })
      .eq('id', emailLog.id);

    console.log('Email sent successfully:', emailResult.id);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResult.id,
      message: 'Order confirmation email sent successfully' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error sending order email:', error);

    // Update email log as failed if we have the log ID
    try {
      const { orderId } = await req.json();
      if (orderId) {
        await supabase
          .from('email_logs')
          .update({ 
            status: 'failed',
            error_message: error.message
          })
          .eq('order_id', orderId)
          .eq('status', 'pending');
      }
    } catch (logError) {
      console.error('Error updating email log:', logError);
    }

    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
