
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
          company_name
        )
      `)
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error('Order fetch error:', orderError);
      throw new Error(`Order not found: ${orderError?.message}`);
    }

    console.log('Order found:', {
      id: order.id,
      number: order.order_number,
      shop: order.shops?.name,
      companyName: order.shops?.company_name,
      customerEmail: order.customer_email
    });

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
      .select('*')
      .eq('is_active', true);

    if (languageData.isFrench) {
      smtpEmailQuery = smtpEmailQuery.eq('sender_email', 'info@fioul-rapide.fr');
    } else if (languageData.isItalian) {
      smtpEmailQuery = smtpEmailQuery.eq('sender_email', 'info@gasoliocasa.com');
    } else {
      smtpEmailQuery = smtpEmailQuery.eq('sender_email', 'info@heizoeldirekt.de');
    }

    const { data: smtpConfig, error: smtpError } = await smtpEmailQuery.single();

    if (smtpError || !smtpConfig) {
      console.error('SMTP configuration error:', smtpError);
      console.log('Available SMTP configurations:', await supabaseClient.from('smtp_configurations').select('*'));
      throw new Error(`SMTP configuration not found for language: ${languageData.isItalian ? 'Italian' : languageData.isFrench ? 'French' : 'German'}. Error: ${smtpError?.message}`);
    }

    console.log('Using SMTP config:', {
      id: smtpConfig.id,
      senderEmail: smtpConfig.sender_email,
      senderName: smtpConfig.sender_name
    });

    // Get bank account information for the order
    const { data: bankAccount, error: bankError } = await supabaseClient
      .from('bank_accounts')
      .select('*')
      .eq('id', order.bank_account_id)
      .single();

    if (bankError) {
      console.error('Bank account fetch error:', bankError);
    }

    // FIXED: Use order number for PDF filename instead of invoice number
    const pdfFilename = `${order.order_number}.pdf`;
    console.log('Attempting to download PDF with filename:', pdfFilename);

    // Download PDF from storage
    const { data: pdfData, error: downloadError } = await supabaseClient.storage
      .from('invoices')
      .download(pdfFilename);

    if (downloadError || !pdfData) {
      console.error('PDF download error:', downloadError);
      console.log('Attempted filename:', pdfFilename);
      
      // List files in the bucket to see what's actually available
      const { data: files, error: listError } = await supabaseClient.storage
        .from('invoices')
        .list();
      
      if (!listError && files) {
        console.log('Available files in invoices bucket:', files.map(f => f.name));
      }
      
      throw new Error(`PDF download failed: ${downloadError?.message}. Attempted to download: ${pdfFilename}`);
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
                  <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Bonjour ${order.customer_name || ''},</h2>
                  
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
                        <td style="padding: 8px 0; font-weight: bold; text-align: right;">${order.liters ? order.liters.toLocaleString('fr-FR') : ''} litres</td>
                      </tr>
                      <tr style="border-top: 2px solid #e2e8f0;">
                        <td style="padding: 15px 0 8px 0; color: #1f2937; font-size: 16px; font-weight: bold;">Montant total:</td>
                        <td style="padding: 15px 0 8px 0; font-weight: bold; text-align: right; font-size: 18px; color: #dc2626;">${order.total_amount ? order.total_amount.toFixed(2) : '0.00'}€</td>
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
                    ${bankAccount ? `
                    <div style="margin-top: 15px; padding: 15px; background-color: #ffffff; border-radius: 6px; border: 1px solid #e5e7eb;">
                      <h4 style="margin: 0 0 10px 0; color: #1f2937; font-size: 14px;">Coordonnées bancaires:</h4>
                      <p style="margin: 0 0 5px 0; font-size: 13px; color: #4b5563;"><strong>Titulaire:</strong> ${bankAccount.account_holder}</p>
                      <p style="margin: 0 0 5px 0; font-size: 13px; color: #4b5563;"><strong>IBAN:</strong> ${bankAccount.iban}</p>
                      <p style="margin: 0; font-size: 13px; color: #4b5563;"><strong>BIC:</strong> ${bankAccount.bic}</p>
                    </div>
                    ` : ''}
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
                <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px 20px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">GasolioCasa</h1>
                  <p style="color: #fee2e2; margin: 10px 0 0 0; font-size: 16px;">La tua fattura è pronta</p>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px;">
                  
                  <!-- Greeting -->
                  <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Ciao ${order.customer_name || ''},</h2>
                  
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
                        <td style="padding: 8px 0; font-weight: bold; text-align: right;">${order.liters ? order.liters.toLocaleString('it-IT') : ''} litri</td>
                      </tr>
                      <tr style="border-top: 2px solid #e2e8f0;">
                        <td style="padding: 15px 0 8px 0; color: #1f2937; font-size: 16px; font-weight: bold;">Importo totale:</td>
                        <td style="padding: 15px 0 8px 0; font-weight: bold; text-align: right; font-size: 18px; color: #dc2626;">${order.total_amount ? order.total_amount.toFixed(2) : '0.00'}€</td>
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
                    ${bankAccount ? `
                    <div style="margin-top: 15px; padding: 15px; background-color: #ffffff; border-radius: 6px; border: 1px solid #e5e7eb;">
                      <h4 style="margin: 0 0 10px 0; color: #1f2937; font-size: 14px;">Coordinate bancarie:</h4>
                      <p style="margin: 0 0 5px 0; font-size: 13px; color: #4b5563;"><strong>Intestatario:</strong> ${bankAccount.account_holder}</p>
                      <p style="margin: 0 0 5px 0; font-size: 13px; color: #4b5563;"><strong>IBAN:</strong> ${bankAccount.iban}</p>
                      <p style="margin: 0; font-size: 13px; color: #4b5563;"><strong>BIC:</strong> ${bankAccount.bic}</p>
                    </div>
                    ` : ''}
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
                    <strong>Il team GasolioCasa</strong>
                  </p>

                </div>

                <!-- Footer -->
                <div style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 12px; color: #6b7280;">
                    GasolioCasa - Consegna di gasolio domestico in Italia<br>
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
            <p>Sehr geehrte/r ${order.customer_name || ''},</p>
            <p>Ihre Rechnung für die Bestellung ${order.order_number} steht nun zur Verfügung.</p>
            <p>Rechnungsnummer: ${invoiceNumber}</p>
            <p>Bestellnummer: ${order.order_number}</p>
            <p>Produkt: ${order.product || 'Heizöl Standard'}</p>
            <p>Menge: ${order.liters ? order.liters.toLocaleString('de-DE') : ''} Liter</p>
            <p>Gesamtbetrag: ${order.total_amount ? order.total_amount.toFixed(2) : '0.00'}€</p>
            <p>Bitte überweisen Sie den Betrag mit der Referenz ${order.order_number}.</p>
            <p>Mit freundlichen Grüßen,<br>Ihr Heizöl-Team</p>
          `
        };
      }
    };

    const emailContent = getEmailContent();

    // Send email using SMTP configuration
    const emailData = {
      from: `${smtpConfig.sender_name} <${smtpConfig.sender_email}>`,
      to: order.customer_email,
      subject: emailContent.subject,
      html: emailContent.html,
      attachments: [
        {
          filename: pdfFilename,
          content: pdfBase64,
          encoding: 'base64',
          contentType: 'application/pdf'
        }
      ]
    };

    console.log('Sending email to:', order.customer_email);
    console.log('From:', `${smtpConfig.sender_name} <${smtpConfig.sender_email}>`);
    console.log('Language:', languageData.isItalian ? 'Italian' : languageData.isFrench ? 'French' : 'German');
    console.log('PDF attachment filename:', pdfFilename);
    console.log('Attachments:', emailData.attachments.length);

    // Check if we have the required Resend API key
    if (!smtpConfig.resend_api_key) {
      throw new Error('Resend API key not found in SMTP configuration');
    }

    // Send via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${smtpConfig.resend_api_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API error:', errorText);
      throw new Error(`Failed to send email via Resend: ${resendResponse.status} ${errorText}`);
    }

    const result = await resendResponse.json();
    console.log('Email sent successfully:', result.id);

    // Log the email sending attempt
    const { error: logError } = await supabaseClient
      .from('email_sending_logs')
      .insert({
        order_id: orderId,
        smtp_config_id: smtpConfig.id,
        recipient_email: order.customer_email,
        subject: emailContent.subject,
        status: 'sent',
        sent_at: new Date().toISOString()
      });

    if (logError) {
      console.error('Failed to log email sending:', logError);
    }

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error sending invoice email:', error);
    
    // Log the failed email attempt if we have order info
    try {
      const requestBody = await req.clone().json();
      const orderId = requestBody?.orderId;
      
      if (orderId) {
        const supabaseClient = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );
        
        await supabaseClient
          .from('email_sending_logs')
          .insert({
            order_id: orderId,
            recipient_email: 'unknown',
            subject: 'Invoice Email',
            status: 'failed',
            error_message: error.message
          });
      }
    } catch (logError) {
      console.error('Failed to log email error:', logError);
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
