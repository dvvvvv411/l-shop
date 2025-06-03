
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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
            color: #ffffff;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0 0 10px 0;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -0.5px;
            color: #ffffff;
        }
        .header p {
            margin: 0;
            font-size: 18px;
            opacity: 0.95;
            font-weight: 400;
            color: #ffffff;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            color: #1f2937;
            margin-bottom: 24px;
            font-weight: 500;
        }
        .intro-text {
            color: #4b5563;
            margin-bottom: 32px;
            font-size: 16px;
            line-height: 1.7;
        }
        .info-section {
            background-color: #f9fafb;
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            border-left: 4px solid #dc2626;
        }
        .info-section h3 {
            margin: 0 0 16px 0;
            color: #1f2937;
            font-size: 18px;
            font-weight: 600;
            display: flex;
            align-items: center;
        }
        .order-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-top: 16px;
        }
        .order-item {
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .order-item:last-child {
            border-bottom: none;
            font-weight: 600;
            font-size: 18px;
            color: #dc2626;
            background-color: #ffffff;
            padding: 16px;
            border-radius: 8px;
            margin-top: 8px;
            box-shadow: 0 2px 8px rgba(220, 38, 38, 0.1);
        }
        .order-label {
            color: #6b7280;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 4px;
        }
        .order-value {
            color: #1f2937;
            font-size: 16px;
            font-weight: 600;
        }
        .total-section {
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
            color: #ffffff;
            padding: 20px;
            border-radius: 12px;
            margin: 24px 0;
            text-align: center;
        }
        .total-section .total-amount {
            font-size: 28px;
            font-weight: 700;
            margin: 8px 0;
            color: #ffffff;
        }
        .callback-notice {
            background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
            color: #1f2937;
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            border: 2px solid #f59e0b;
            box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
        }
        .callback-notice h3 {
            color: #1f2937;
            margin: 0 0 12px 0;
            font-size: 18px;
            font-weight: 700;
            display: flex;
            align-items: center;
        }
        .callback-notice p {
            margin: 8px 0;
            font-weight: 500;
            color: #1f2937;
        }
        .callback-notice .phone-highlight {
            background-color: rgba(255, 255, 255, 0.4);
            padding: 4px 8px;
            border-radius: 6px;
            font-weight: 700;
            color: #1f2937;
        }
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-top: 16px;
        }
        .contact-item {
            color: #4b5563;
        }
        .contact-label {
            font-weight: 600;
            color: #1f2937;
        }
        .address-text {
            margin-top: 12px;
            color: #1f2937;
            font-size: 16px;
            line-height: 1.6;
        }
        .address-text strong {
            color: #1f2937;
        }
        .closing-text {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 2px solid #f3f4f6;
            color: #4b5563;
            line-height: 1.7;
        }
        .signature {
            margin-top: 24px;
            color: #1f2937;
            font-weight: 500;
        }
        .signature strong {
            color: #1f2937;
        }
        .footer {
            background-color: #1f2937;
            color: #d1d5db;
            padding: 32px 30px;
            text-align: center;
        }
        .footer .company-name {
            font-size: 20px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 16px;
        }
        .footer .company-details {
            margin: 8px 0;
            font-size: 14px;
            color: #d1d5db;
        }
        .footer a {
            color: #dc2626;
            text-decoration: none;
            font-weight: 500;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 8px;
            }
            .content {
                padding: 24px 20px;
            }
            .header {
                padding: 30px 20px;
            }
            .order-grid,
            .contact-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }
            .header h1 {
                font-size: 24px;
            }
            .total-section .total-amount {
                font-size: 24px;
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
            <div class="greeting">
                Liebe/r ${order.delivery_first_name} ${order.delivery_last_name},
            </div>
            
            <div class="intro-text">
                vielen Dank für Ihre Bestellung bei ${companyName}. Wir haben Ihre Bestellung erfolgreich erhalten und werden diese schnellstmöglich bearbeiten.
            </div>
            
            <div class="info-section">
                <h3>🚀 Ihre Bestelldetails</h3>
                <div class="order-grid">
                    <div class="order-item">
                        <div class="order-label">Bestellnummer</div>
                        <div class="order-value">${order.order_number}</div>
                    </div>
                    <div class="order-item">
                        <div class="order-label">Bestelldatum</div>
                        <div class="order-value">${new Date(order.created_at).toLocaleDateString('de-DE')}</div>
                    </div>
                    <div class="order-item">
                        <div class="order-label">Produkt</div>
                        <div class="order-value">${order.product}</div>
                    </div>
                    <div class="order-item">
                        <div class="order-label">Menge</div>
                        <div class="order-value">${order.liters.toLocaleString()} Liter</div>
                    </div>
                    <div class="order-item">
                        <div class="order-label">Preis pro Liter</div>
                        <div class="order-value">€${Number(order.price_per_liter).toFixed(2)}</div>
                    </div>
                    <div class="order-item">
                        <div class="order-label">Lieferkosten</div>
                        <div class="order-value">${order.delivery_fee === 0 ? 'Kostenlos' : `€${Number(order.delivery_fee).toFixed(2)}`}</div>
                    </div>
                </div>
            </div>

            <div class="total-section">
                <div>Gesamtbetrag</div>
                <div class="total-amount">€${Number(order.total_amount).toFixed(2)}</div>
            </div>
            
            <div class="info-section">
                <h3>🏠 Lieferadresse</h3>
                <div class="address-text">
                    <strong>${order.delivery_first_name} ${order.delivery_last_name}</strong><br>
                    ${order.delivery_street}<br>
                    ${order.delivery_postcode} ${order.delivery_city}
                </div>
            </div>
            
            <div class="callback-notice">
                <h3>📞 Wichtiger Hinweis zur Lieferung</h3>
                <p><strong>Wir werden Sie innerhalb der nächsten 24 Stunden telefonisch kontaktieren</strong>, um die Details Ihrer Lieferung zu besprechen und einen Liefertermin zu vereinbaren.</p>
                <p>Bitte halten Sie Ihre Telefonnummer <span class="phone-highlight">${order.delivery_phone}</span> bereit.</p>
            </div>
            
            <div class="info-section">
                <h3>📋 Ihre Kontaktdaten</h3>
                <div class="contact-grid">
                    <div class="contact-item">
                        <span class="contact-label">E-Mail:</span><br>
                        ${order.customer_email_actual}
                    </div>
                    <div class="contact-item">
                        <span class="contact-label">Telefon:</span><br>
                        ${order.delivery_phone}
                    </div>
                </div>
            </div>
            
            <div class="closing-text">
                Bei Fragen können Sie uns jederzeit kontaktieren. Wir freuen uns darauf, Sie bald beliefern zu dürfen!
            </div>
            
            <div class="signature">
                Mit freundlichen Grüßen<br>
                <strong>Ihr ${companyName} Team</strong>
            </div>
        </div>
        
        <div class="footer">
            <div class="company-name">${companyName}</div>
            ${companyAddress ? `<div class="company-details">${companyAddress}, ${companyPostcode} ${companyCity}</div>` : ''}
            ${companyPhone ? `<div class="company-details">Tel: ${companyPhone}</div>` : ''}
            ${companyEmail ? `<div class="company-details">E-Mail: <a href="mailto:${companyEmail}">${companyEmail}</a></div>` : ''}
            ${companyWebsite ? `<div class="company-details">Web: <a href="${companyWebsite}">${companyWebsite}</a></div>` : ''}
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
