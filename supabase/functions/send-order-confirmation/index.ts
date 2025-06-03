
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
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 640px;
            margin: 0 auto;
            background-color: #f9fafb;
            padding: 24px;
        }
        .header-card {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            margin-bottom: 24px;
            overflow: hidden;
        }
        .header-content {
            padding: 32px;
            text-align: center;
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
        }
        .header-title {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        .header-subtitle {
            color: #ffffff;
            font-size: 16px;
            font-weight: 400;
            opacity: 0.95;
        }
        .main-card {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            margin-bottom: 24px;
            padding: 32px;
        }
        .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
        .section-title::before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 20px;
            background-color: #dc2626;
            margin-right: 12px;
            border-radius: 2px;
        }
        .greeting {
            font-size: 18px;
            color: #1f2937;
            margin-bottom: 20px;
            font-weight: 500;
        }
        .intro-text {
            color: #6b7280;
            margin-bottom: 24px;
            font-size: 16px;
            line-height: 1.6;
        }
        .order-details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 20px;
        }
        .detail-item {
            padding: 16px;
            background-color: #f9fafb;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        .detail-label {
            font-size: 14px;
            color: #6b7280;
            font-weight: 500;
            margin-bottom: 4px;
        }
        .detail-value {
            font-size: 16px;
            color: #1f2937;
            font-weight: 600;
        }
        .total-card {
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            margin: 24px 0;
        }
        .total-label {
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 8px;
        }
        .total-amount {
            color: #ffffff;
            font-size: 32px;
            font-weight: 700;
        }
        .notice-card {
            background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            color: #1f2937;
        }
        .notice-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
        }
        .notice-title::before {
            content: '📞';
            margin-right: 8px;
            font-size: 20px;
        }
        .notice-text {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 12px;
            line-height: 1.5;
        }
        .phone-highlight {
            background-color: #ffffff;
            padding: 12px 16px;
            border-radius: 8px;
            font-weight: 700;
            color: #1f2937;
            display: inline-block;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-top: 8px;
        }
        .address-section {
            background-color: #f9fafb;
            border-radius: 8px;
            padding: 20px;
            border: 1px solid #e5e7eb;
        }
        .address-text {
            color: #1f2937;
            font-size: 16px;
            line-height: 1.6;
        }
        .address-text strong {
            color: #1f2937;
            font-weight: 600;
        }
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
            margin-top: 16px;
        }
        .contact-item {
            padding: 16px;
            background-color: #f9fafb;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        .contact-label {
            font-size: 14px;
            color: #6b7280;
            font-weight: 500;
            margin-bottom: 4px;
        }
        .contact-value {
            font-size: 16px;
            color: #1f2937;
            font-weight: 600;
        }
        .closing-section {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 2px solid #e5e7eb;
        }
        .closing-text {
            color: #6b7280;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .signature {
            color: #1f2937;
            font-size: 16px;
            font-weight: 500;
        }
        .signature strong {
            color: #1f2937;
            font-weight: 600;
        }
        .footer-card {
            background-color: #1f2937;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            padding: 32px;
            text-align: center;
        }
        .footer-company {
            color: #ffffff;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 16px;
        }
        .footer-details {
            color: #d1d5db;
            font-size: 14px;
            margin: 8px 0;
        }
        .footer-link {
            color: #dc2626;
            text-decoration: none;
            font-weight: 500;
        }
        .footer-link:hover {
            text-decoration: underline;
        }
        @media (max-width: 640px) {
            .email-container {
                padding: 16px;
            }
            .main-card {
                padding: 24px;
            }
            .header-content {
                padding: 24px;
            }
            .header-title {
                font-size: 24px;
            }
            .total-amount {
                font-size: 28px;
            }
            .order-details-grid {
                grid-template-columns: 1fr;
            }
            .contact-grid {
                grid-template-columns: 1fr;
            }
            .notice-card {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header Card -->
        <div class="header-card">
            <div class="header-content">
                <h1 class="header-title">Bestellbestätigung</h1>
                <p class="header-subtitle">Vielen Dank für Ihre Bestellung!</p>
            </div>
        </div>
        
        <!-- Main Content Card -->
        <div class="main-card">
            <div class="greeting">
                Liebe/r ${order.delivery_first_name} ${order.delivery_last_name},
            </div>
            
            <div class="intro-text">
                vielen Dank für Ihre Bestellung bei ${companyName}. Wir haben Ihre Bestellung erfolgreich erhalten und werden diese schnellstmöglich bearbeiten.
            </div>
            
            <h2 class="section-title">Ihre Bestelldetails</h2>
            <div class="order-details-grid">
                <div class="detail-item">
                    <div class="detail-label">Bestellnummer</div>
                    <div class="detail-value">${order.order_number}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Bestelldatum</div>
                    <div class="detail-value">${new Date(order.created_at).toLocaleDateString('de-DE')}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Produkt</div>
                    <div class="detail-value">${order.product}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Menge</div>
                    <div class="detail-value">${order.liters.toLocaleString()} Liter</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Preis pro Liter</div>
                    <div class="detail-value">€${Number(order.price_per_liter).toFixed(2)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Lieferkosten</div>
                    <div class="detail-value">${order.delivery_fee === 0 ? 'Kostenlos' : `€${Number(order.delivery_fee).toFixed(2)}`}</div>
                </div>
            </div>
        </div>

        <!-- Total Card -->
        <div class="total-card">
            <div class="total-label">Gesamtbetrag</div>
            <div class="total-amount">€${Number(order.total_amount).toFixed(2)}</div>
        </div>
        
        <!-- Delivery Address Card -->
        <div class="main-card">
            <h2 class="section-title">Lieferadresse</h2>
            <div class="address-section">
                <div class="address-text">
                    <strong>${order.delivery_first_name} ${order.delivery_last_name}</strong><br>
                    ${order.delivery_street}<br>
                    ${order.delivery_postcode} ${order.delivery_city}
                </div>
            </div>
        </div>
        
        <!-- Important Notice Card -->
        <div class="notice-card">
            <div class="notice-title">Wichtiger Hinweis zur Lieferung</div>
            <div class="notice-text">
                <strong>Wir werden Sie innerhalb der nächsten 24 Stunden telefonisch kontaktieren</strong>, um die Details Ihrer Lieferung zu besprechen und einen Liefertermin zu vereinbaren.
            </div>
            <div class="notice-text">Bitte halten Sie Ihre Telefonnummer bereit:</div>
            <div class="phone-highlight">${order.delivery_phone}</div>
        </div>
        
        <!-- Contact Information Card -->
        <div class="main-card">
            <h2 class="section-title">Ihre Kontaktdaten</h2>
            <div class="contact-grid">
                <div class="contact-item">
                    <div class="contact-label">E-Mail</div>
                    <div class="contact-value">${order.customer_email_actual}</div>
                </div>
                <div class="contact-item">
                    <div class="contact-label">Telefon</div>
                    <div class="contact-value">${order.delivery_phone}</div>
                </div>
            </div>
            
            <div class="closing-section">
                <div class="closing-text">
                    Bei Fragen können Sie uns jederzeit kontaktieren. Wir freuen uns darauf, Sie bald beliefern zu dürfen!
                </div>
                
                <div class="signature">
                    Mit freundlichen Grüßen<br>
                    <strong>Ihr ${companyName} Team</strong>
                </div>
            </div>
        </div>
        
        <!-- Footer Card -->
        <div class="footer-card">
            <div class="footer-company">${companyName}</div>
            ${companyAddress ? `<div class="footer-details">${companyAddress}, ${companyPostcode} ${companyCity}</div>` : ''}
            ${companyPhone ? `<div class="footer-details">Tel: ${companyPhone}</div>` : ''}
            ${companyEmail ? `<div class="footer-details">E-Mail: <a href="mailto:${companyEmail}" class="footer-link">${companyEmail}</a></div>` : ''}
            ${companyWebsite ? `<div class="footer-details">Web: <a href="${companyWebsite}" class="footer-link">${companyWebsite}</a></div>` : ''}
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
