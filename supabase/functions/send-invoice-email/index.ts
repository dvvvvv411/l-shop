
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, invoiceNumber } = await req.json();
    console.log(`Sending invoice email for order: ${orderId} invoice: ${invoiceNumber}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get order details with shop information
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        shops!left (
          name,
          company_name
        )
      `)
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new Error(`Order not found: ${orderError?.message}`);
    }

    // Get invoice details
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select('*')
      .eq('invoice_number', invoiceNumber)
      .single();

    if (invoiceError || !invoice) {
      throw new Error(`Invoice not found: ${invoiceError?.message}`);
    }

    // Determine language based on shop name and company name
    const shopName = order.shops?.name || '';
    const companyName = order.shops?.company_name || '';
    const isFrench = shopName.includes('Fioul Rapide') || companyName.includes('Fioul Rapide');
    const isItalian = shopName.includes('Gasolio Casa') || companyName.includes('OIL & OIL');

    console.log('Language detection:', {
      shopName,
      companyName,
      isFrench,
      isItalian
    });

    // Get appropriate SMTP configuration
    const { data: smtpConfigs, error: smtpError } = await supabase
      .from('smtp_configurations')
      .select('*')
      .eq('is_active', true);

    if (smtpError || !smtpConfigs || smtpConfigs.length === 0) {
      throw new Error('No active SMTP configuration found');
    }

    // Choose SMTP config based on shop type
    let smtpConfig;
    if (isFrench) {
      smtpConfig = smtpConfigs.find(config => config.sender_email.includes('fioul-rapide.fr'));
    } else if (isItalian) {
      smtpConfig = smtpConfigs.find(config => config.sender_email.includes('gasoliocasa.com'));
    }
    
    // Fallback to first available config
    if (!smtpConfig) {
      smtpConfig = smtpConfigs[0];
    }

    console.log(`Using SMTP config: ${smtpConfig.sender_email}`);

    // Download PDF from Supabase storage
    const { data: pdfData, error: downloadError } = await supabase.storage
      .from('invoices')
      .download(invoice.file_name);

    if (downloadError || !pdfData) {
      throw new Error(`Failed to download PDF: ${downloadError?.message}`);
    }

    console.log(`PDF downloaded successfully, size: ${pdfData.size}`);

    const resend = new Resend(smtpConfig.resend_api_key);

    let subject, htmlContent, language;

    if (isFrench) {
      language = 'French';
      subject = `Facture ${invoiceNumber} - Votre commande de fioul`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            .highlight { background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Fioul Rapide</h1>
            <p>Votre facture est prête</p>
          </div>
          <div class="content">
            <h2>Bonjour ${order.customer_name},</h2>
            <p>Merci pour votre commande de fioul. Veuillez trouver ci-joint votre facture <strong>${invoiceNumber}</strong>.</p>
            
            <div class="highlight">
              <h3>📋 Détails de votre commande :</h3>
              <ul>
                <li><strong>Numéro de commande :</strong> ${order.order_number}</li>
                <li><strong>Quantité :</strong> ${order.liters.toLocaleString('fr-FR')} litres</li>
                <li><strong>Montant total :</strong> ${order.total_amount.toFixed(2)}€</li>
                <li><strong>Adresse de livraison :</strong> ${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}</li>
              </ul>
            </div>

            <p><strong>Important :</strong> Veuillez effectuer le virement bancaire selon les coordonnées indiquées dans la facture ci-jointe. La livraison aura lieu après réception du paiement (2-4 jours ouvrables).</p>
            
            <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
            
            <p>Cordialement,<br>
            L'équipe Fioul Rapide</p>
          </div>
          <div class="footer">
            <p>Fioul Rapide - Livraison rapide de fioul domestique<br>
            Email: info@fioul-rapide.fr | Téléphone: 0800 123 456</p>
          </div>
        </body>
        </html>
      `;
    } else if (isItalian) {
      language = 'Italian';
      subject = `Fattura ${invoiceNumber} - Il tuo ordine di gasolio`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background-color: #16a34a; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            .highlight { background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>OIL & OIL</h1>
            <p>La tua fattura è pronta</p>
          </div>
          <div class="content">
            <h2>Ciao ${order.customer_name},</h2>
            <p>Grazie per il tuo ordine di gasolio. In allegato trovi la fattura <strong>${invoiceNumber}</strong>.</p>
            
            <div class="highlight">
              <h3>📋 Dettagli del tuo ordine:</h3>
              <ul>
                <li><strong>Numero ordine:</strong> ${order.order_number}</li>
                <li><strong>Quantità:</strong> ${order.liters.toLocaleString('it-IT')} litri</li>
                <li><strong>Importo totale:</strong> €${order.total_amount.toFixed(2)}</li>
                <li><strong>Indirizzo di consegna:</strong> ${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}</li>
              </ul>
            </div>

            <p><strong>Importante:</strong> Si prega di effettuare il bonifico bancario secondo le coordinate indicate nella fattura allegata. La consegna avverrà dopo la ricezione del pagamento (2-4 giorni lavorativi).</p>
            
            <p>Per qualsiasi domanda, non esitare a contattarci.</p>
            
            <p>Cordiali saluti,<br>
            Il team OIL & OIL</p>
          </div>
          <div class="footer">
            <p>OIL & OIL SRL - Consegna rapida di gasolio domestico<br>
            Email: info@gasoliocasa.com | Telefono: +39 06 1234 5678</p>
          </div>
        </body>
        </html>
      `;
    } else {
      // German (default)
      language = 'German';
      subject = `Rechnung ${invoiceNumber} - Ihre Heizöl-Bestellung`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            .highlight { background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Heizöl-Service</h1>
            <p>Ihre Rechnung ist bereit</p>
          </div>
          <div class="content">
            <h2>Hallo ${order.customer_name},</h2>
            <p>Vielen Dank für Ihre Heizöl-Bestellung. Anbei finden Sie Ihre Rechnung <strong>${invoiceNumber}</strong>.</p>
            
            <div class="highlight">
              <h3>📋 Details Ihrer Bestellung:</h3>
              <ul>
                <li><strong>Bestellnummer:</strong> ${order.order_number}</li>
                <li><strong>Menge:</strong> ${order.liters.toLocaleString('de-DE')} Liter</li>
                <li><strong>Gesamtbetrag:</strong> ${order.total_amount.toFixed(2)}€</li>
                <li><strong>Lieferadresse:</strong> ${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}</li>
              </ul>
            </div>

            <p><strong>Wichtig:</strong> Bitte überweisen Sie den Betrag gemäß den in der beigefügten Rechnung angegebenen Bankverbindung. Die Lieferung erfolgt nach Zahlungseingang (4-7 Werktage).</p>
            
            <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
            
            <p>Mit freundlichen Grüßen,<br>
            Ihr Heizöl-Service Team</p>
          </div>
          <div class="footer">
            <p>Heizöl-Service - Schnelle Heizöl-Lieferung<br>
            Email: service@heizoeldirekt.de | Telefon: 0800 123 456</p>
          </div>
        </body>
        </html>
      `;
    }

    console.log(`Language: ${language}`);

    // Convert PDF data to buffer for attachment
    const pdfBuffer = await pdfData.arrayBuffer();
    const pdfAttachment = {
      filename: invoice.file_name,
      content: Array.from(new Uint8Array(pdfBuffer))
    };

    console.log(`Sending email to: ${order.customer_email_actual || order.customer_email}`);
    console.log(`From: ${smtpConfig.sender_email}`);
    console.log(`Attachments: ${1}`);

    // Send email with invoice attachment
    const emailResponse = await resend.emails.send({
      from: `${smtpConfig.sender_name} <${smtpConfig.sender_email}>`,
      to: [order.customer_email_actual || order.customer_email],
      subject: subject,
      html: htmlContent,
      attachments: [pdfAttachment]
    });

    console.log('Email sent successfully:', emailResponse.id);

    // Log the email sending
    await supabase
      .from('email_sending_logs')
      .insert({
        order_id: orderId,
        recipient_email: order.customer_email_actual || order.customer_email,
        subject: subject,
        status: 'sent',
        smtp_config_id: smtpConfig.id,
        sent_at: new Date().toISOString()
      });

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailResponse.id,
        language: language
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error sending invoice email:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
