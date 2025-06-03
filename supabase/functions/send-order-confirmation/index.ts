
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderConfirmationRequest {
  orderId: string;
  customerEmail: string;
  originDomain: string;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Send order confirmation function called');
    
    const { orderId, customerEmail, originDomain }: OrderConfirmationRequest = await req.json();
    console.log('Request data:', { orderId, customerEmail, originDomain });

    // Get the order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error('Error fetching order:', orderError);
      throw new Error('Order not found');
    }

    console.log('Order found:', order.order_number);

    // Get SMTP configuration based on domain
    const { data: smtpDomains, error: domainError } = await supabase
      .from('smtp_domains')
      .select(`
        smtp_configurations (
          *,
          shops (
            id,
            name,
            company_name,
            company_address,
            company_postcode,
            company_city,
            company_phone,
            company_email,
            company_website
          )
        )
      `)
      .eq('domain', originDomain)
      .eq('smtp_configurations.is_active', true)
      .single();

    if (domainError || !smtpDomains?.smtp_configurations) {
      console.error('No SMTP config found for domain:', originDomain, domainError);
      throw new Error(`No active SMTP configuration found for domain: ${originDomain}`);
    }

    const smtpConfig = smtpDomains.smtp_configurations;
    const shop = smtpConfig.shops;
    console.log('Using SMTP config:', smtpConfig.id, 'for shop:', shop?.name);

    // Initialize Resend with the API key from SMTP config
    const resend = new Resend(smtpConfig.resend_api_key);

    // Generate email content
    const emailHtml = generateOrderConfirmationEmail(order, shop);
    const emailText = generateOrderConfirmationText(order, shop);

    // Send the email
    console.log('Sending email to:', customerEmail);
    const emailResponse = await resend.emails.send({
      from: `${smtpConfig.sender_name} <${smtpConfig.sender_email}>`,
      to: [customerEmail],
      subject: `Bestellbestätigung ${order.order_number}`,
      html: emailHtml,
      text: emailText,
    });

    console.log('Email sent successfully:', emailResponse);

    // Log the email sending
    const { error: logError } = await supabase
      .from('email_sending_logs')
      .insert({
        order_id: orderId,
        recipient_email: customerEmail,
        subject: `Bestellbestätigung ${order.order_number}`,
        status: 'sent',
        smtp_config_id: smtpConfig.id,
        sent_at: new Date().toISOString()
      });

    if (logError) {
      console.error('Error logging email:', logError);
    }

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error in send-order-confirmation function:', error);
    
    // Log the error
    try {
      const requestData = await req.clone().json();
      await supabase
        .from('email_sending_logs')
        .insert({
          order_id: requestData.orderId || null,
          recipient_email: requestData.customerEmail || 'unknown',
          subject: 'Bestellbestätigung (failed)',
          status: 'failed',
          error_message: error.message,
        });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

function generateOrderConfirmationEmail(order: any, shop: any): string {
  const companyName = shop?.company_name || 'Heizöl Team';
  const companyAddress = shop?.company_address || '';
  const companyPostcode = shop?.company_postcode || '';
  const companyCity = shop?.company_city || '';
  const companyPhone = shop?.company_phone || '';
  const companyEmail = shop?.company_email || '';
  const companyWebsite = shop?.company_website || '';

  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bestellbestätigung ${order.order_number}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
        }
        .order-info {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .order-info h3 {
            margin-top: 0;
            color: #495057;
        }
        .order-details {
            display: flex;
            justify-content: space-between;
            margin: 15px 0;
            padding: 10px 0;
            border-bottom: 1px solid #dee2e6;
        }
        .order-details:last-child {
            border-bottom: none;
            font-weight: 600;
            font-size: 18px;
            color: #28a745;
        }
        .callback-notice {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .callback-notice h3 {
            color: #856404;
            margin-top: 0;
        }
        .contact-info {
            background-color: #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .footer {
            background-color: #343a40;
            color: #adb5bd;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }
        .footer a {
            color: #6c757d;
            text-decoration: none;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 0;
            }
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Bestellbestätigung</h1>
            <p>Vielen Dank für Ihre Bestellung!</p>
        </div>
        
        <div class="content">
            <p>Liebe/r ${order.delivery_first_name} ${order.delivery_last_name},</p>
            
            <p>vielen Dank für Ihre Bestellung bei ${companyName}. Wir haben Ihre Bestellung erfolgreich erhalten und werden diese schnellstmöglich bearbeiten.</p>
            
            <div class="order-info">
                <h3>📦 Ihre Bestelldetails</h3>
                <div class="order-details">
                    <span>Bestellnummer:</span>
                    <span><strong>${order.order_number}</strong></span>
                </div>
                <div class="order-details">
                    <span>Bestelldatum:</span>
                    <span>${new Date(order.created_at).toLocaleDateString('de-DE')}</span>
                </div>
                <div class="order-details">
                    <span>Produkt:</span>
                    <span>${order.product}</span>
                </div>
                <div class="order-details">
                    <span>Menge:</span>
                    <span>${order.liters.toLocaleString()} Liter</span>
                </div>
                <div class="order-details">
                    <span>Preis pro Liter:</span>
                    <span>€${Number(order.price_per_liter).toFixed(2)}</span>
                </div>
                <div class="order-details">
                    <span>Lieferkosten:</span>
                    <span>€${Number(order.delivery_fee).toFixed(2)}</span>
                </div>
                <div class="order-details">
                    <span>Gesamtbetrag:</span>
                    <span>€${Number(order.total_amount).toFixed(2)}</span>
                </div>
            </div>
            
            <div class="order-info">
                <h3>🚚 Lieferadresse</h3>
                <p>
                    ${order.delivery_first_name} ${order.delivery_last_name}<br>
                    ${order.delivery_street}<br>
                    ${order.delivery_postcode} ${order.delivery_city}
                </p>
            </div>
            
            <div class="callback-notice">
                <h3>📞 Wichtiger Hinweis</h3>
                <p><strong>Wir werden Sie innerhalb der nächsten 24 Stunden telefonisch kontaktieren</strong>, um die Details Ihrer Lieferung zu besprechen und einen Liefertermin zu vereinbaren.</p>
                <p>Bitte halten Sie Ihre Telefonnummer <strong>${order.delivery_phone}</strong> bereit.</p>
            </div>
            
            <div class="contact-info">
                <h3>📋 Ihre Kontaktdaten</h3>
                <p>
                    <strong>E-Mail:</strong> ${order.customer_email_actual}<br>
                    <strong>Telefon:</strong> ${order.delivery_phone}
                </p>
            </div>
            
            <p>Bei Fragen können Sie uns jederzeit kontaktieren. Wir freuen uns darauf, Sie bald beliefern zu dürfen!</p>
            
            <p>Mit freundlichen Grüßen<br>
            Ihr ${companyName} Team</p>
        </div>
        
        <div class="footer">
            <p><strong>${companyName}</strong></p>
            ${companyAddress ? `<p>${companyAddress}<br>${companyPostcode} ${companyCity}</p>` : ''}
            ${companyPhone ? `<p>Tel: ${companyPhone}</p>` : ''}
            ${companyEmail ? `<p>E-Mail: <a href="mailto:${companyEmail}">${companyEmail}</a></p>` : ''}
            ${companyWebsite ? `<p>Web: <a href="${companyWebsite}">${companyWebsite}</a></p>` : ''}
        </div>
    </div>
</body>
</html>`;
}

function generateOrderConfirmationText(order: any, shop: any): string {
  const companyName = shop?.company_name || 'Heizöl Team';
  
  return `
Bestellbestätigung ${order.order_number}

Liebe/r ${order.delivery_first_name} ${order.delivery_last_name},

vielen Dank für Ihre Bestellung bei ${companyName}. Wir haben Ihre Bestellung erfolgreich erhalten.

BESTELLDETAILS:
- Bestellnummer: ${order.order_number}
- Bestelldatum: ${new Date(order.created_at).toLocaleDateString('de-DE')}
- Produkt: ${order.product}
- Menge: ${order.liters.toLocaleString()} Liter
- Preis pro Liter: €${Number(order.price_per_liter).toFixed(2)}
- Lieferkosten: €${Number(order.delivery_fee).toFixed(2)}
- Gesamtbetrag: €${Number(order.total_amount).toFixed(2)}

LIEFERADRESSE:
${order.delivery_first_name} ${order.delivery_last_name}
${order.delivery_street}
${order.delivery_postcode} ${order.delivery_city}

WICHTIGER HINWEIS:
Wir werden Sie innerhalb der nächsten 24 Stunden telefonisch unter ${order.delivery_phone} kontaktieren, um die Lieferdetails zu besprechen.

IHRE KONTAKTDATEN:
E-Mail: ${order.customer_email_actual}
Telefon: ${order.delivery_phone}

Bei Fragen können Sie uns jederzeit kontaktieren.

Mit freundlichen Grüßen
Ihr ${companyName} Team
`;
}

serve(handler);
