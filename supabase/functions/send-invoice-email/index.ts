import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { orderId, invoiceNumber } = await req.json();
    console.log('Sending invoice email for order:', orderId, 'invoice:', invoiceNumber);

    // Get order details with shop information
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select(`
        *,
        shops (
          id,
          name,
          company_name,
          bank_account_id
        )
      `)
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new Error(`Order not found: ${orderError?.message}`);
    }

    // Language detection based on shop name
    const languageData = {
      shopName: order.shops?.name || 'Unknown',
      companyName: order.shops?.company_name || 'Unknown',
      isFrench: order.shops?.name?.toLowerCase().includes('fioul'),
      isItalian: order.shops?.name?.toLowerCase().includes('gasolio') || order.shops?.company_name?.toLowerCase().includes('oil & oil')
    };

    console.log('Language detection:', languageData);

    // Get SMTP configuration based on language
    let smtpEmailQuery = supabaseClient
      .from('smtp_configurations')
      .select('*');

    if (languageData.isFrench) {
      smtpEmailQuery = smtpEmailQuery.eq('email', 'info@fioul-rapide.fr');
    } else if (languageData.isItalian) {
      smtpEmailQuery = smtpEmailQuery.eq('email', 'info@gasoliocasa.com');
    } else {
      smtpEmailQuery = smtpEmailQuery.eq('email', 'info@heizoeldirekt.de');
    }

    const { data: smtpConfig, error: smtpError } = await smtpEmailQuery.single();

    if (smtpError || !smtpConfig) {
      throw new Error(`SMTP configuration not found: ${smtpError?.message}`);
    }

    console.log('Using SMTP config:', smtpConfig.email);

    // Download PDF from storage
    const { data: pdfData, error: downloadError } = await supabaseClient.storage
      .from('invoices')
      .download(`${invoiceNumber}.pdf`);

    if (downloadError || !pdfData) {
      throw new Error(`PDF download failed: ${downloadError?.message}`);
    }

    console.log('PDF downloaded successfully, size:', pdfData.size);

    // Convert PDF to base64
    const pdfBuffer = await pdfData.arrayBuffer();
    const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));

    // Email templates
    const getEmailContent = () => {
      if (languageData.isFrench) {
        return {
          subject: `Facture ${invoiceNumber} - Votre commande de fioul`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Facture ${invoiceNumber}</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px 20px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Fioul Rapide</h1>
                  <p style="color: #fee2e2; margin: 10px 0 0 0; font-size: 16px;">Votre facture est prête</p>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px;">
                  
                  <!-- Greeting -->
                  <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Bonjour ${order.customer_first_name || ''} ${order.customer_last_name || ''},</h2>
                  
                  <p style="margin: 0 0 25px 0; font-size: 16px; color: #4b5563;">
                    Votre facture pour la commande <strong>${order.order_number}</strong> est maintenant disponible.
                  </p>

                  <!-- Order Summary Box -->
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin: 25px 0;">
                    <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">Résumé de votre commande</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Numéro de facture:</td>
                        <td style="padding: 8px 0; font-weight: bold; text-align: right;">${invoiceNumber}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Numéro de commande:</td>
                        <td style="padding: 8px 0; font-weight: bold; text-align: right;">${order.order_number}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Produit:</td>
                        <td style="padding: 8px 0; font-weight: bold; text-align: right;">${order.product || 'Fioul standard'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Quantité:</td>
                        <td style="padding: 8px 0; font-weight: bold; text-align: right;">${order.amount ? order.amount.toLocaleString('fr-FR') : ''} litres</td>
                      </tr>
                      <tr style="border-top: 2px solid #e2e8f0;">
                        <td style="padding: 15px 0 8px 0; color: #1f2937; font-size: 16px; font-weight: bold;">Montant total:</td>
                        <td style="padding: 15px 0 8px 0; font-weight: bold; text-align: right; font-size: 18px; color: #dc2626;">${order.total ? order.total.toFixed(2) : '0.00'}€</td>
                      </tr>
                    </table>
                  </div>

                  <!-- Payment Instructions -->
                  <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 16px;">⚠️ Action requise - Paiement</h3>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #78350f;">
                      Veuillez effectuer le virement bancaire pour finaliser votre commande. Les coordonnées bancaires sont incluses dans la facture ci-jointe.
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #78350f;">
                      <strong>Référence à indiquer:</strong> ${order.order_number}
                    </p>
                  </div>

                  <!-- Next Steps -->
                  <div style="margin: 30px 0;">
                    <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Prochaines étapes</h3>
                    <ol style="margin: 0; padding-left: 20px; color: #4b5563;">
                      <li style="margin: 0 0 8px 0;">Effectuez le virement bancaire avec la référence ${order.order_number}</li>
                      <li style="margin: 0 0 8px 0;">Nous traiterons votre commande dès réception du paiement</li>
                      <li style="margin: 0;">La livraison aura lieu sous 2-4 jours ouvrables</li>
                    </ol>
                  </div>

                  <!-- Contact -->
                  <div style="background-color: #f1f5f9; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">Des questions?</h3>
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #475569;">
                      📧 Email: info@fioul-rapide.fr<br>
                      📞 Téléphone: +33 1 23 45 67 89
                    </p>
                  </div>

                  <p style="margin: 25px 0 0 0; font-size: 16px; color: #4b5563;">
                    Merci de votre confiance,<br>
                    <strong>L'équipe Fioul Rapide</strong>
                  </p>

                </div>

                <!-- Footer -->
                <div style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 12px; color: #6b7280;">
                    Fioul Rapide - Livraison de fioul domestique en France<br>
                    Cet email a été envoyé automatiquement, merci de ne pas y répondre directement.
                  </p>
                </div>

              </div>
            </body>
            </html>
          `
        };
      } else if (languageData.isItalian) {
        return {
          subject: `Fattura ${invoiceNumber} - Il tuo ordine di gasolio`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Fattura ${invoiceNumber}</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 30px 20px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">OIL & OIL</h1>
                  <p style="color: #dcfce7; margin: 10px 0 0 0; font-size: 16px;">La tua fattura è pronta</p>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px;">
                  
                  <!-- Greeting -->
                  <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Ciao ${order.customer_first_name || ''} ${order.customer_last_name || ''},</h2>
                  
                  <p style="margin: 0 0 25px 0; font-size: 16px; color: #4b5563;">
                    La tua fattura per l'ordine <strong>${order.order_number}</strong> è ora disponibile.
                  </p>

                  <!-- Order Summary Box -->
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin: 25px 0;">
                    <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">Riepilogo del tuo ordine</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Numero fattura:</td>
                        <td style="padding: 8px 0; font-weight: bold; text-align: right;">${invoiceNumber}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Numero ordine:</td>
                        <td style="padding: 8px 0; font-weight: bold; text-align: right;">${order.order_number}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Prodotto:</td>
                        <td style="padding: 8px 0; font-weight: bold; text-align: right;">${order.product || 'Gasolio standard'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Quantità:</td>
                        <td style="padding: 8px 0; font-weight: bold; text-align: right;">${order.amount ? order.amount.toLocaleString('it-IT') : ''} litri</td>
                      </tr>
                      <tr style="border-top: 2px solid #e2e8f0;">
                        <td style="padding: 15px 0 8px 0; color: #1f2937; font-size: 16px; font-weight: bold;">Importo totale:</td>
                        <td style="padding: 15px 0 8px 0; font-weight: bold; text-align: right; font-size: 18px; color: #16a34a;">${order.total ? order.total.toFixed(2) : '0.00'}€</td>
                      </tr>
                    </table>
                  </div>

                  <!-- Payment Instructions -->
                  <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 16px;">⚠️ Azione richiesta - Pagamento</h3>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #78350f;">
                      Effettua il bonifico bancario per finalizzare il tuo ordine. I dettagli bancari sono inclusi nella fattura allegata.
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #78350f;">
                      <strong>Causale da indicare:</strong> ${order.order_number}
                    </p>
                  </div>

                  <!-- Next Steps -->
                  <div style="margin: 30px 0;">
                    <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Prossimi passi</h3>
                    <ol style="margin: 0; padding-left: 20px; color: #4b5563;">
                      <li style="margin: 0 0 8px 0;">Effettua il bonifico bancario con causale ${order.order_number}</li>
                      <li style="margin: 0 0 8px 0;">Elaboreremo il tuo ordine non appena ricevuto il pagamento</li>
                      <li style="margin: 0;">La consegna avverrà entro 2-4 giorni lavorativi</li>
                    </ol>
                  </div>

                  <!-- Contact -->
                  <div style="background-color: #f1f5f9; border-radius: 8px; padding: 20px; margin: 25px 0;">
                    <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">Hai domande?</h3>
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #475569;">
                      📧 Email: info@gasoliocasa.com<br>
                      📞 Telefono: +39 06 1234 5678
                    </p>
                  </div>

                  <p style="margin: 25px 0 0 0; font-size: 16px; color: #4b5563;">
                    Grazie per la tua fiducia,<br>
                    <strong>Il team OIL & OIL</strong>
                  </p>

                </div>

                <!-- Footer -->
                <div style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 12px; color: #6b7280;">
                    OIL & OIL - Consegna di gasolio domestico in Italia<br>
                    Questa email è stata inviata automaticamente, si prega di non rispondere direttamente.
                  </p>
                </div>

              </div>
            </body>
            </html>
          `
        };
      } else {
        // German template (existing)
        return {
          subject: `Rechnung ${invoiceNumber} - Ihre Heizölbestellung`,
          html: `
            <h1>Ihre Rechnung ist bereit</h1>
            <p>Sehr geehrte/r ${order.customer_first_name || ''} ${order.customer_last_name || ''},</p>
            <p>Ihre Rechnung für die Bestellung ${order.order_number} steht nun zur Verfügung.</p>
            <p>Rechnungsnummer: ${invoiceNumber}</p>
            <p>Bestellnummer: ${order.order_number}</p>
            <p>Produkt: ${order.product || 'Heizöl Standard'}</p>
            <p>Menge: ${order.amount ? order.amount.toLocaleString('de-DE') : ''} Liter</p>
            <p>Gesamtbetrag: ${order.total ? order.total.toFixed(2) : '0.00'}€</p>
            <p>Bitte überweisen Sie den Betrag mit der Referenz ${order.order_number}.</p>
            <p>Mit freundlichen Grüßen,<br>Ihr Heizöl-Team</p>
          `
        };
      }
    };

    const emailContent = getEmailContent();

    // Send email using SMTP configuration
    const emailData = {
      from: smtpConfig.email,
      to: order.customer_email,
      subject: emailContent.subject,
      html: emailContent.html,
      attachments: [
        {
          filename: `${invoiceNumber}.pdf`,
          content: pdfBase64,
          encoding: 'base64',
          contentType: 'application/pdf'
        }
      ]
    };

    console.log('Sending email to:', order.customer_email);
    console.log('From:', smtpConfig.email);
    console.log('Language:', languageData.isItalian ? 'Italian' : languageData.isFrench ? 'French' : 'German');
    console.log('Attachments:', emailData.attachments.length);

    // Send via SMTP (using the nodemailer-like API that your SMTP config supports)
    const nodemailer = await import('npm:nodemailer@6.9.7');
    
    const transporter = nodemailer.createTransport({
      host: smtpConfig.smtp_host,
      port: smtpConfig.smtp_port,
      secure: smtpConfig.smtp_port === 465,
      auth: {
        user: smtpConfig.email,
        pass: smtpConfig.password
      }
    });

    const result = await transporter.sendMail(emailData);
    console.log('Email sent successfully:', result.messageId);

    return new Response(
      JSON.stringify({ success: true, messageId: result.messageId }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error sending invoice email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
