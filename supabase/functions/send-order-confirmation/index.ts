
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderConfirmationRequest {
  orderId: string;
  customerEmail: string;
  originDomain?: string;
}

// Enhanced domain detection function
function getShopTypeFromDomain(domain: string): 'german' | 'italian' | 'french' | 'unknown' {
  if (!domain) return 'unknown';
  
  const lowerDomain = domain.toLowerCase();
  
  // German domains
  if (lowerDomain.includes('stanton-energie.de') || 
      lowerDomain.includes('greenoil-lieferung.de') || 
      lowerDomain.includes('heizoel-austria.com') ||
      lowerDomain.includes('localhost')) {
    return 'german';
  }
  
  // Italian domains
  if (lowerDomain.includes('gasoliocasa.com')) {
    return 'italian';
  }
  
  // French domains
  if (lowerDomain.includes('fioul-rapide.fr')) {
    return 'french';
  }
  
  return 'unknown';
}

// Professional HTML template for German order confirmations
function getGermanEmailTemplate(order: any): string {
  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bestellbestätigung ${order.order_number}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #dc2626; padding: 30px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
        .content { padding: 40px; }
        .order-info { background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #dc2626; }
        .order-details { margin: 25px 0; }
        .order-details h3 { color: #dc2626; margin-bottom: 15px; font-size: 18px; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { font-weight: 600; color: #555; }
        .detail-value { color: #333; }
        .address-section { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; }
        .footer { background-color: #f8f9fa; padding: 30px; text-align: center; font-size: 14px; color: #666; }
        .highlight { color: #dc2626; font-weight: bold; }
        .total-amount { font-size: 24px; font-weight: bold; color: #dc2626; }
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; }
          .content { padding: 20px !important; }
          .detail-row { flex-direction: column; }
          .detail-value { margin-top: 5px; font-weight: 600; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Bestellbestätigung</h1>
        </div>
        
        <div class="content">
          <p style="font-size: 18px; margin-bottom: 10px;">Hallo <strong>${order.customer_name}</strong>,</p>
          <p style="font-size: 16px; color: #555; margin-bottom: 30px;">
            vielen Dank für Ihre Bestellung! Wir haben Ihre Bestellung erfolgreich erhalten und werden sie schnellstmöglich bearbeiten.
          </p>
          
          <div class="order-info">
            <h2 style="margin: 0 0 15px 0; color: #dc2626;">Bestellnummer: <span class="highlight">${order.order_number}</span></h2>
            <p style="margin: 0; font-size: 14px; color: #666;">Bestelldatum: ${new Date(order.created_at).toLocaleDateString('de-DE', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>

          <div class="order-details">
            <h3>Bestelldetails</h3>
            <div class="detail-row">
              <span class="detail-label">Produkt:</span>
              <span class="detail-value">${order.product}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Menge:</span>
              <span class="detail-value">${order.liters.toLocaleString('de-DE')} Liter</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Gesamtbetrag:</span>
              <span class="detail-value total-amount">${order.total_amount.toFixed(2)}€</span>
            </div>
          </div>

          <div class="address-section">
            <h3 style="margin: 0 0 15px 0; color: #dc2626;">Lieferadresse</h3>
            <p style="margin: 0; line-height: 1.8;">
              <strong>${order.delivery_first_name} ${order.delivery_last_name}</strong><br>
              ${order.delivery_street}<br>
              ${order.delivery_postcode} ${order.delivery_city}
            </p>
          </div>

          <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #2196f3;">
            <h3 style="margin: 0 0 10px 0; color: #1976d2;">📦 Nächste Schritte</h3>
            <p style="margin: 0; color: #555;">
              Wir werden Sie in Kürze kontaktieren, um die Lieferung zu koordinieren. 
              Die Lieferung erfolgt normalerweise innerhalb von <strong>4-7 Werktagen</strong> nach Zahlungseingang.
            </p>
          </div>

          <div style="margin: 30px 0; padding: 20px; background-color: #f1f8e9; border-radius: 8px; border-left: 4px solid #4caf50;">
            <p style="margin: 0; color: #555;">
              <strong>Kostenlose Lieferung</strong> ab 3.000 Liter Bestellmenge.<br>
              <strong>Qualitätsgarantie:</strong> Alle unsere Heizölsorten entsprechen der DIN EN 590 Norm.
            </p>
          </div>

          <p style="margin: 30px 0 0 0; color: #555;">
            Bei Fragen zu Ihrer Bestellung können Sie uns jederzeit kontaktieren. 
            Wir freuen uns darauf, Sie mit qualitativ hochwertigem Heizöl zu beliefern!
          </p>

          <p style="margin: 30px 0 0 0;">
            Mit freundlichen Grüßen<br>
            <strong>Ihr Heizöl-Service Team</strong>
          </p>
        </div>

        <div class="footer">
          <p style="margin: 0 0 10px 0;">
            <strong>Heizöl-Service</strong><br>
            Ihr zuverlässiger Partner für Heizöllieferungen
          </p>
          <p style="margin: 0; font-size: 12px;">
            Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

serve(async (req: Request): Promise<Response> => {
  console.log('Send order confirmation function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: OrderConfirmationRequest = await req.json();
    console.log('Request data:', JSON.stringify(requestData, null, 2));

    const { orderId, customerEmail, originDomain } = requestData;

    // Determine shop type from domain
    const shopType = getShopTypeFromDomain(originDomain || '');
    console.log('Detected shop type:', shopType, 'from domain:', originDomain);

    // Early return for Italian and French domains - they should only get invoice emails
    if (shopType === 'italian') {
      console.log('Skipping order confirmation email for Italian domain:', originDomain);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Order confirmation email skipped for Italian domain - invoice email will be sent instead',
          skipped: true,
          reason: 'italian_domain'
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (shopType === 'french') {
      console.log('Skipping order confirmation email for French domain:', originDomain);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Order confirmation email skipped for French domain - invoice email will be sent instead',
          skipped: true,
          reason: 'french_domain'
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch the order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new Error(`Order not found: ${orderError?.message}`);
    }

    console.log('Order found:', order.order_number);

    // Get the appropriate SMTP configuration based on shop type
    const { data: smtpConfigs, error: smtpError } = await supabase
      .from('smtp_configurations')
      .select('*, shops!inner(*)')
      .eq('is_active', true);

    if (smtpError || !smtpConfigs || smtpConfigs.length === 0) {
      throw new Error(`No active SMTP configuration found: ${smtpError?.message}`);
    }

    // Improved SMTP config selection based on shop type
    let smtpConfig;
    
    if (shopType === 'german') {
      // For German shops, look for a German/default SMTP config
      smtpConfig = smtpConfigs.find(config => 
        config.shops?.name?.toLowerCase().includes('heizöl') ||
        config.shops?.name?.toLowerCase().includes('stanton') ||
        config.shops?.name?.toLowerCase().includes('green') ||
        config.shops?.name?.toLowerCase().includes('austria')
      );
      
      // If no German-specific config found, use the first available that's NOT Italian or French
      if (!smtpConfig) {
        smtpConfig = smtpConfigs.find(config => 
          !config.shops?.name?.toLowerCase().includes('gasolio') &&
          !config.shops?.name?.toLowerCase().includes('fioul')
        );
      }
    }

    // Fallback to first available config if none found
    if (!smtpConfig) {
      smtpConfig = smtpConfigs[0];
      console.log('Using fallback SMTP config:', smtpConfig.shops?.name);
    }

    console.log(`Using SMTP config: ${smtpConfig.id} for shop: ${smtpConfig.shops?.name}`);

    // Initialize Resend with the API key from the SMTP config
    const resend = new Resend(smtpConfig.resend_api_key);

    // Prepare email content based on shop type
    let subject, htmlContent;
    
    if (shopType === 'german') {
      subject = `Bestellbestätigung ${order.order_number} - Heizöl-Service`;
      htmlContent = getGermanEmailTemplate(order);
    } else {
      // Fallback for unknown domains - use German template
      subject = `Bestellbestätigung ${order.order_number}`;
      htmlContent = getGermanEmailTemplate(order);
    }

    console.log('Sending email to:', customerEmail);

    // Send the email
    const emailResult = await resend.emails.send({
      from: `${smtpConfig.sender_name} <${smtpConfig.sender_email}>`,
      to: [customerEmail],
      subject: subject,
      html: htmlContent,
    });

    if (emailResult.error) {
      throw new Error(`Failed to send email: ${emailResult.error.message}`);
    }

    console.log('Email sent successfully:', emailResult);

    // Log the email sending
    await supabase
      .from('email_sending_logs')
      .insert({
        recipient_email: customerEmail,
        subject: subject,
        status: 'sent',
        smtp_config_id: smtpConfig.id,
        order_id: orderId,
        sent_at: new Date().toISOString(),
      });

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: emailResult.data,
        message: 'Order confirmation email sent successfully',
        shopType: shopType
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in send-order-confirmation function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
