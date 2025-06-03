
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderConfirmationRequest {
  orderId: string;
  customerEmail: string;
  orderNumber: string;
  customerName: string;
  product: string;
  liters: number;
  totalAmount: number;
  deliveryDate?: string;
  originDomain?: string;
}

const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
};

const getSMTPConfigForDomain = async (supabase: any, domain: string) => {
  try {
    console.log('Looking up SMTP config for domain:', domain);
    
    // First try exact domain match
    let { data, error } = await supabase
      .from('smtp_domains')
      .select(`
        smtp_configurations (
          id,
          resend_api_key,
          sender_email,
          sender_name,
          is_active
        )
      `)
      .eq('domain', domain)
      .eq('smtp_configurations.is_active', true)
      .single();

    if (error && error.code === 'PGRST116') {
      // Try without protocol if domain includes it
      const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/:\d+$/, '');
      console.log('Trying with clean domain:', cleanDomain);
      
      const { data: cleanData, error: cleanError } = await supabase
        .from('smtp_domains')
        .select(`
          smtp_configurations (
            id,
            resend_api_key,
            sender_email,
            sender_name,
            is_active
          )
        `)
        .eq('domain', cleanDomain)
        .eq('smtp_configurations.is_active', true)
        .single();

      if (cleanError && cleanError.code === 'PGRST116') {
        // If still not found, try to get a primary domain configuration
        console.log('No domain match found, looking for primary domain');
        
        const { data: primaryData, error: primaryError } = await supabase
          .from('smtp_domains')
          .select(`
            smtp_configurations (
              id,
              resend_api_key,
              sender_email,
              sender_name,
              is_active
            )
          `)
          .eq('is_primary', true)
          .eq('smtp_configurations.is_active', true)
          .single();

        if (primaryError) {
          console.error('No SMTP configuration found:', primaryError);
          return null;
        }
        
        return primaryData?.smtp_configurations;
      }
      
      return cleanData?.smtp_configurations;
    }

    if (error) {
      console.error('Error fetching SMTP config:', error);
      return null;
    }

    return data?.smtp_configurations;
  } catch (error) {
    console.error('Error in getSMTPConfigForDomain:', error);
    return null;
  }
};

const logEmailSending = async (supabase: any, logData: any) => {
  try {
    const { error } = await supabase
      .from('email_sending_logs')
      .insert(logData);
    
    if (error) {
      console.error('Error logging email sending:', error);
    }
  } catch (error) {
    console.error('Error in logEmailSending:', error);
  }
};

const generateOrderConfirmationHTML = (orderData: OrderConfirmationRequest) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Bestellbestätigung</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .order-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Bestellbestätigung</h1>
          <p>Vielen Dank für Ihre Bestellung!</p>
        </div>
        
        <div class="content">
          <p>Liebe/r ${orderData.customerName},</p>
          
          <p>wir haben Ihre Bestellung erfolgreich erhalten und freuen uns, Ihnen diese hiermit zu bestätigen.</p>
          
          <div class="order-details">
            <h3>Ihre Bestelldetails:</h3>
            <p><strong>Bestellnummer:</strong> ${orderData.orderNumber}</p>
            <p><strong>Produkt:</strong> ${orderData.product || 'Standard Heizöl'}</p>
            <p><strong>Menge:</strong> ${orderData.liters.toLocaleString()} Liter</p>
            <p><strong>Gesamtbetrag:</strong> ${formatCurrency(orderData.totalAmount)}</p>
            ${orderData.deliveryDate ? `<p><strong>Gewünschter Liefertermin:</strong> ${orderData.deliveryDate}</p>` : ''}
          </div>
          
          <p>Wir werden Ihre Bestellung zeitnah bearbeiten und Sie über den weiteren Verlauf informieren.</p>
          
          <p>Bei Fragen zu Ihrer Bestellung können Sie uns gerne kontaktieren.</p>
          
          <p>Mit freundlichen Grüßen<br>Ihr Heizöl-Team</p>
        </div>
        
        <div class="footer">
          <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese E-Mail.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const supabase = getSupabaseClient();
    const requestData: OrderConfirmationRequest = await req.json();
    
    console.log('Processing order confirmation email for:', requestData.orderId);
    
    // Get SMTP configuration for the domain
    const smtpConfig = await getSMTPConfigForDomain(supabase, requestData.originDomain || 'localhost');
    
    if (!smtpConfig) {
      console.error('No SMTP configuration found for domain:', requestData.originDomain);
      
      // Log the failed attempt
      await logEmailSending(supabase, {
        order_id: requestData.orderId,
        recipient_email: requestData.customerEmail,
        subject: 'Bestellbestätigung',
        status: 'failed',
        error_message: 'No SMTP configuration found for domain'
      });
      
      return new Response(
        JSON.stringify({ error: 'No SMTP configuration found for domain' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Using SMTP config:', smtpConfig.id);
    
    // Initialize Resend with the configuration's API key
    const resend = new Resend(smtpConfig.resend_api_key);
    
    // Generate email content
    const htmlContent = generateOrderConfirmationHTML(requestData);
    const subject = `Bestellbestätigung - ${requestData.orderNumber}`;
    
    // Send the email
    const emailResponse = await resend.emails.send({
      from: `${smtpConfig.sender_name} <${smtpConfig.sender_email}>`,
      to: [requestData.customerEmail],
      subject: subject,
      html: htmlContent,
    });

    console.log('Email sent successfully:', emailResponse);

    // Log successful sending
    await logEmailSending(supabase, {
      order_id: requestData.orderId,
      smtp_config_id: smtpConfig.id,
      recipient_email: requestData.customerEmail,
      subject: subject,
      status: 'sent',
      sent_at: new Date().toISOString()
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailResponse.data?.id,
        smtpConfigId: smtpConfig.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error sending order confirmation email:', error);
    
    // Try to log the error if we have the order ID
    try {
      const supabase = getSupabaseClient();
      const requestData = await req.clone().json();
      
      await logEmailSending(supabase, {
        order_id: requestData.orderId,
        recipient_email: requestData.customerEmail,
        subject: 'Bestellbestätigung',
        status: 'failed',
        error_message: error.message
      });
    } catch (logError) {
      console.error('Error logging failed email attempt:', logError);
    }
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);
