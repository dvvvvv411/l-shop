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

    // Determine if this is a French domain
    const isFrenchDomain = originDomain === 'fioul-rapide.fr';
    console.log('Is French domain:', isFrenchDomain);

    // Initialize Resend with the API key from SMTP config
    const resend = new Resend(smtpConfig.resend_api_key);

    // Generate email content based on language
    const emailHtml = isFrenchDomain 
      ? generateFrenchOrderConfirmationEmail(order, shop)
      : generateOrderConfirmationEmail(order, shop);
    
    const emailText = isFrenchDomain 
      ? generateFrenchOrderConfirmationText(order, shop)
      : generateOrderConfirmationText(order, shop);

    const emailSubject = isFrenchDomain 
      ? `Confirmation de commande ${order.order_number}`
      : `Bestellbestätigung ${order.order_number}`;

    // Send the email
    console.log('Sending email to:', customerEmail);
    const emailResponse = await resend.emails.send({
      from: `${smtpConfig.sender_name} <${smtpConfig.sender_email}>`,
      to: [customerEmail],
      subject: emailSubject,
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
        subject: emailSubject,
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
          subject: 'Order confirmation (failed)',
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

// French email template
function generateFrenchOrderConfirmationEmail(order: any, shop: any): string {
  const companyName = shop?.company_name || 'Fioul Rapide';
  const companyAddress = shop?.company_address || '';
  const companyPostcode = shop?.company_postcode || '';
  const companyCity = shop?.company_city || '';
  const companyPhone = shop?.company_phone || '';
  const companyEmail = shop?.company_email || '';
  const companyWebsite = shop?.company_website || '';

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de commande ${order.order_number}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb;">
        <tr>
            <td align="center" style="padding: 24px;">
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" style="max-width: 640px; width: 100%;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #dc2626; border-radius: 12px 12px 0 0; padding: 32px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; font-family: Arial, sans-serif;">Confirmation de commande</h1>
                            <p style="color: #ffffff; font-size: 16px; margin: 0; font-family: Arial, sans-serif;">Merci pour votre commande !</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 32px; border-radius: 0 0 12px 12px;">
                            
                            <!-- Greeting -->
                            <div style="font-size: 18px; color: #1f2937; margin-bottom: 20px; font-weight: 500; font-family: Arial, sans-serif;">
                                Cher/Chère ${order.delivery_first_name} ${order.delivery_last_name},
                            </div>
                            
                            <!-- Intro Text -->
                            <div style="color: #6b7280; margin-bottom: 24px; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                                Merci pour votre commande chez ${companyName}. Nous avons bien reçu votre commande et nous la traiterons dans les plus brefs délais.
                            </div>
                            
                            <!-- Section Title -->
                            <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 20px 0; font-family: Arial, sans-serif; border-left: 4px solid #dc2626; padding-left: 12px;">Détails de votre commande</h2>
                            
                            <!-- Order Details Grid -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Numéro de commande</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.order_number}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Date de commande</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${new Date(order.created_at).toLocaleDateString('fr-FR')}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Produit</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.product}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Quantité</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.liters.toLocaleString()} litres</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Prix par litre</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${Number(order.price_per_liter).toFixed(2)} €</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Frais de livraison</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.delivery_fee === 0 ? 'Gratuit' : `${Number(order.delivery_fee).toFixed(2)} €`}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Total Card -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #dc2626; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 24px; text-align: center;">
                                        <div style="color: #ffffff; font-size: 16px; font-weight: 500; margin-bottom: 8px; font-family: Arial, sans-serif;">Montant total</div>
                                        <div style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0; font-family: Arial, sans-serif;">${Number(order.total_amount).toFixed(2)} €</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Delivery Address -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 32px;">
                                        <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 20px 0; font-family: Arial, sans-serif; border-left: 4px solid #dc2626; padding-left: 12px;">Adresse de livraison</h2>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <div style="color: #1f2937; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                                                        <strong>${order.delivery_first_name} ${order.delivery_last_name}</strong><br>
                                                        ${order.delivery_street}<br>
                                                        ${order.delivery_postcode} ${order.delivery_city}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Important Notice -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f59e0b; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <div style="font-size: 18px; font-weight: 700; margin-bottom: 12px; color: #1f2937; font-family: Arial, sans-serif;">📞 Information importante sur la livraison</div>
                                        <div style="font-size: 16px; font-weight: 500; margin-bottom: 12px; line-height: 1.5; color: #1f2937; font-family: Arial, sans-serif;">
                                            <strong>Nous vous contacterons par téléphone dans les prochaines 24 heures</strong> pour discuter des détails de votre livraison et convenir d'un créneau de livraison.
                                        </div>
                                        <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px; color: #1f2937; font-family: Arial, sans-serif;">Veuillez garder votre numéro de téléphone à portée de main :</div>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="background-color: #ffffff; padding: 12px 16px; border-radius: 8px; font-weight: 700; color: #1f2937; font-family: Arial, sans-serif; margin-top: 8px;">
                                                    ${order.delivery_phone}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Contact Information -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 32px;">
                                        <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 20px 0; font-family: Arial, sans-serif; border-left: 4px solid #dc2626; padding-left: 12px;">Vos coordonnées</h2>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                        <tr>
                                                            <td style="padding: 16px;">
                                                                <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">E-mail</div>
                                                                <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.customer_email_actual}</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                        <tr>
                                                            <td style="padding: 16px;">
                                                                <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Téléphone</div>
                                                                <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.delivery_phone}</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Closing Section -->
                                        <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid #e5e7eb;">
                                            <div style="color: #6b7280; font-size: 16px; line-height: 1.6; margin-bottom: 20px; font-family: Arial, sans-serif;">
                                                Si vous avez des questions, n'hésitez pas à nous contacter. Nous avons hâte de vous livrer bientôt !
                                            </div>
                                            
                                            <div style="color: #1f2937; font-size: 16px; font-weight: 500; font-family: Arial, sans-serif;">
                                                Cordialement<br>
                                                <strong>L'équipe ${companyName}</strong>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 12px 0 0 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1f2937; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 32px; text-align: center;">
                                        <div style="color: #ffffff; font-size: 20px; font-weight: 700; margin-bottom: 16px; font-family: Arial, sans-serif;">${companyName}</div>
                                        ${companyAddress ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">${companyAddress}, ${companyPostcode} ${companyCity}</div>` : ''}
                                        ${companyPhone ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">Tél : ${companyPhone}</div>` : ''}
                                        ${companyEmail ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">E-mail : <a href="mailto:${companyEmail}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${companyEmail}</a></div>` : ''}
                                        ${companyWebsite ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">Web : <a href="${companyWebsite}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${companyWebsite}</a></div>` : ''}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

function generateFrenchOrderConfirmationText(order: any, shop: any): string {
  const companyName = shop?.company_name || 'Fioul Rapide';
  
  return `
Confirmation de commande ${order.order_number}

Cher/Chère ${order.delivery_first_name} ${order.delivery_last_name},

Merci pour votre commande chez ${companyName}. Nous avons bien reçu votre commande.

DÉTAILS DE LA COMMANDE :
- Numéro de commande : ${order.order_number}
- Date de commande : ${new Date(order.created_at).toLocaleDateString('fr-FR')}
- Produit : ${order.product}
- Quantité : ${order.liters.toLocaleString()} litres
- Prix par litre : ${Number(order.price_per_liter).toFixed(2)} €
- Frais de livraison : ${Number(order.delivery_fee).toFixed(2)} €
- Montant total : ${Number(order.total_amount).toFixed(2)} €

ADRESSE DE LIVRAISON :
${order.delivery_first_name} ${order.delivery_last_name}
${order.delivery_street}
${order.delivery_postcode} ${order.delivery_city}

INFORMATION IMPORTANTE :
Nous vous contacterons par téléphone dans les prochaines 24 heures au ${order.delivery_phone} pour discuter des détails de livraison.

VOS COORDONNÉES :
E-mail : ${order.customer_email_actual}
Téléphone : ${order.delivery_phone}

Si vous avez des questions, n'hésitez pas à nous contacter.

Cordialement
L'équipe ${companyName}
`;
}

// ... keep existing code (German email templates)
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
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb;">
        <tr>
            <td align="center" style="padding: 24px;">
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" style="max-width: 640px; width: 100%;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #dc2626; border-radius: 12px 12px 0 0; padding: 32px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; font-family: Arial, sans-serif;">Bestellbestätigung</h1>
                            <p style="color: #ffffff; font-size: 16px; margin: 0; font-family: Arial, sans-serif;">Vielen Dank für Ihre Bestellung!</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 32px; border-radius: 0 0 12px 12px;">
                            
                            <!-- Greeting -->
                            <div style="font-size: 18px; color: #1f2937; margin-bottom: 20px; font-weight: 500; font-family: Arial, sans-serif;">
                                Liebe/r ${order.delivery_first_name} ${order.delivery_last_name},
                            </div>
                            
                            <!-- Intro Text -->
                            <div style="color: #6b7280; margin-bottom: 24px; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                                vielen Dank für Ihre Bestellung bei ${companyName}. Wir haben Ihre Bestellung erfolgreich erhalten und werden diese schnellstmöglich bearbeiten.
                            </div>
                            
                            <!-- Section Title -->
                            <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 20px 0; font-family: Arial, sans-serif; border-left: 4px solid #dc2626; padding-left: 12px;">Ihre Bestelldetails</h2>
                            
                            <!-- Order Details Grid -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Bestellnummer</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.order_number}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Bestelldatum</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${new Date(order.created_at).toLocaleDateString('de-DE')}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Produkt</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.product}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Menge</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.liters.toLocaleString()} Liter</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Preis pro Liter</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">€${Number(order.price_per_liter).toFixed(2)}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Lieferkosten</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.delivery_fee === 0 ? 'Kostenlos' : `€${Number(order.delivery_fee).toFixed(2)}`}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Total Card -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #dc2626; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 24px; text-align: center;">
                                        <div style="color: #ffffff; font-size: 16px; font-weight: 500; margin-bottom: 8px; font-family: Arial, sans-serif;">Gesamtbetrag</div>
                                        <div style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0; font-family: Arial, sans-serif;">€${Number(order.total_amount).toFixed(2)}</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Delivery Address -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 32px;">
                                        <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 20px 0; font-family: Arial, sans-serif; border-left: 4px solid #dc2626; padding-left: 12px;">Lieferadresse</h2>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <div style="color: #1f2937; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                                                        <strong>${order.delivery_first_name} ${order.delivery_last_name}</strong><br>
                                                        ${order.delivery_street}<br>
                                                        ${order.delivery_postcode} ${order.delivery_city}
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Important Notice -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f59e0b; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <div style="font-size: 18px; font-weight: 700; margin-bottom: 12px; color: #1f2937; font-family: Arial, sans-serif;">📞 Wichtiger Hinweis zur Lieferung</div>
                                        <div style="font-size: 16px; font-weight: 500; margin-bottom: 12px; line-height: 1.5; color: #1f2937; font-family: Arial, sans-serif;">
                                            <strong>Wir werden Sie innerhalb der nächsten 24 Stunden telefonisch kontaktieren</strong>, um die Details Ihrer Lieferung zu besprechen und einen Liefertermin zu vereinbaren.
                                        </div>
                                        <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px; color: #1f2937; font-family: Arial, sans-serif;">Bitte halten Sie Ihre Telefonnummer bereit:</div>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="background-color: #ffffff; padding: 12px 16px; border-radius: 8px; font-weight: 700; color: #1f2937; font-family: Arial, sans-serif; margin-top: 8px;">
                                                    ${order.delivery_phone}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Contact Information -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 32px;">
                                        <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 20px 0; font-family: Arial, sans-serif; border-left: 4px solid #dc2626; padding-left: 12px;">Ihre Kontaktdaten</h2>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                        <tr>
                                                            <td style="padding: 16px;">
                                                                <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">E-Mail</div>
                                                                <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.customer_email_actual}</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                        <tr>
                                                            <td style="padding: 16px;">
                                                                <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Telefon</div>
                                                                <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.delivery_phone}</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Closing Section -->
                                        <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid #e5e7eb;">
                                            <div style="color: #6b7280; font-size: 16px; line-height: 1.6; margin-bottom: 20px; font-family: Arial, sans-serif;">
                                                Bei Fragen können Sie uns jederzeit kontaktieren. Wir freuen uns darauf, Sie bald beliefern zu dürfen!
                                            </div>
                                            
                                            <div style="color: #1f2937; font-size: 16px; font-weight: 500; font-family: Arial, sans-serif;">
                                                Mit freundlichen Grüßen<br>
                                                <strong>Ihr ${companyName} Team</strong>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 12px 0 0 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1f2937; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 32px; text-align: center;">
                                        <div style="color: #ffffff; font-size: 20px; font-weight: 700; margin-bottom: 16px; font-family: Arial, sans-serif;">${companyName}</div>
                                        ${companyAddress ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">${companyAddress}, ${companyPostcode} ${companyCity}</div>` : ''}
                                        ${companyPhone ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">Tel: ${companyPhone}</div>` : ''}
                                        ${companyEmail ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">E-Mail: <a href="mailto:${companyEmail}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${companyEmail}</a></div>` : ''}
                                        ${companyWebsite ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">Web: <a href="${companyWebsite}" style="color: #dc2626; text-decoration: none; font-weight: 500;">${companyWebsite}</a></div>` : ''}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
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
