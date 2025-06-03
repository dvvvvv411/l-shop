
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { Resend } from 'npm:resend@4.0.0'

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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { orderId, invoiceNumber, invoiceFileUrl } = await req.json()
    
    console.log('Sending invoice email for order:', orderId, 'invoice:', invoiceNumber);

    // Fetch order details
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      console.error('Order fetch error:', orderError);
      throw new Error('Order not found')
    }

    // Get SMTP configuration based on order domain
    let smtpConfig = null
    if (order.origin_domain) {
      const { data: smtpData, error: smtpError } = await supabaseClient
        .from('smtp_domains')
        .select(`
          smtp_configurations (
            *,
            shops (
              id,
              name,
              company_name
            )
          )
        `)
        .eq('domain', order.origin_domain)
        .eq('smtp_configurations.is_active', true)
        .single()

      if (!smtpError && smtpData?.smtp_configurations) {
        smtpConfig = smtpData.smtp_configurations
      }
    }

    // Fallback to default SMTP config if domain-specific not found
    if (!smtpConfig) {
      console.log('No domain-specific SMTP config found, using default');
      const { data: defaultSmtpData, error: defaultSmtpError } = await supabaseClient
        .from('smtp_configurations')
        .select(`
          *,
          shops (
            id,
            name,
            company_name
          )
        `)
        .eq('is_active', true)
        .limit(1)
        .single()

      if (!defaultSmtpError && defaultSmtpData) {
        smtpConfig = defaultSmtpData
      }
    }

    if (!smtpConfig) {
      console.error('No SMTP configuration found');
      throw new Error('No SMTP configuration available')
    }

    console.log('Using SMTP config:', smtpConfig.sender_email);

    // Get bank account information
    let bankAccount = null
    if (order.bank_account_id) {
      const { data: bankData, error: bankError } = await supabaseClient
        .from('bank_accounts')
        .select('*')
        .eq('id', order.bank_account_id)
        .single()

      if (!bankError && bankData) {
        bankAccount = bankData
      }
    }

    // Download the PDF file from Supabase Storage
    let pdfBuffer = null
    if (invoiceFileUrl) {
      try {
        // Extract filename from URL
        const urlParts = invoiceFileUrl.split('/')
        const filename = urlParts[urlParts.length - 1]
        
        const { data: pdfData, error: downloadError } = await supabaseClient.storage
          .from('invoices')
          .download(filename)

        if (downloadError) {
          console.error('Error downloading PDF:', downloadError)
        } else {
          pdfBuffer = await pdfData.arrayBuffer()
          console.log('PDF downloaded successfully, size:', pdfBuffer.byteLength)
        }
      } catch (downloadError) {
        console.error('Error processing PDF download:', downloadError)
      }
    }

    // Initialize Resend with the SMTP config's API key
    const resend = new Resend(smtpConfig.resend_api_key)

    // Create email content
    const shop = smtpConfig.shops || { company_name: 'Heizöl-Express GmbH', name: 'Heizöl-Express' }
    const emailSubject = `Ihre Rechnung ${invoiceNumber} - Bestellung ${order.order_number}`

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rechnung ${invoiceNumber}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background-color: #2ed573; color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { padding: 30px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #333; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #2ed573; padding-bottom: 5px; }
        .order-details { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .detail-label { font-weight: bold; color: #666; }
        .detail-value { color: #333; }
        .bank-info { background-color: #e3f2fd; padding: 20px; border-radius: 5px; border-left: 4px solid #2196f3; }
        .important { background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin: 20px 0; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
        .total-amount { font-size: 24px; font-weight: bold; color: #2ed573; text-align: center; padding: 20px; background-color: #f0f9f4; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Ihre Rechnung ist bereit!</h1>
            <p>Vielen Dank für Ihre Bestellung bei ${shop.company_name}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>📋 Bestelldetails</h2>
                <div class="order-details">
                    <div class="detail-row">
                        <span class="detail-label">Bestellnummer:</span>
                        <span class="detail-value">${order.order_number}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Rechnungsnummer:</span>
                        <span class="detail-value">${invoiceNumber}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Kunde:</span>
                        <span class="detail-value">${order.customer_name}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Produkt:</span>
                        <span class="detail-value">${order.product || 'Heizöl Standard'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Menge:</span>
                        <span class="detail-value">${order.liters.toLocaleString('de-DE')} Liter</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Lieferadresse:</span>
                        <span class="detail-value">${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}</span>
                    </div>
                </div>
                
                <div class="total-amount">
                    Gesamtbetrag: €${order.total_amount.toFixed(2)}
                </div>
            </div>

            ${bankAccount ? `
            <div class="section">
                <h2>💳 Zahlungsinformationen</h2>
                <div class="bank-info">
                    <h3 style="margin-top: 0; color: #1976d2;">Bankverbindung für Überweisung</h3>
                    <div class="detail-row">
                        <span class="detail-label">Bank:</span>
                        <span class="detail-value">${bankAccount.bank_name}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Kontoinhaber:</span>
                        <span class="detail-value">${bankAccount.account_holder}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">IBAN:</span>
                        <span class="detail-value">${bankAccount.iban}</span>
                    </div>
                    ${bankAccount.bic ? `
                    <div class="detail-row">
                        <span class="detail-label">BIC:</span>
                        <span class="detail-value">${bankAccount.bic}</span>
                    </div>
                    ` : ''}
                    <div class="detail-row">
                        <span class="detail-label">Verwendungszweck:</span>
                        <span class="detail-value"><strong>${order.order_number}</strong></span>
                    </div>
                </div>
                
                <div class="important">
                    <strong>Wichtiger Hinweis:</strong> Bitte geben Sie bei der Überweisung unbedingt die Bestellnummer <strong>${order.order_number}</strong> als Verwendungszweck an, damit wir Ihre Zahlung korrekt zuordnen können.
                </div>
            </div>
            ` : ''}

            <div class="section">
                <h2>📞 Nächste Schritte</h2>
                <ol>
                    <li><strong>Telefonischer Kontakt:</strong> Wir rufen Sie in den nächsten 24 Stunden an, um Ihre Bestellung zu bestätigen.</li>
                    <li><strong>Zahlung:</strong> Nach unserem Anruf überweisen Sie bitte den Betrag von <strong>€${order.total_amount.toFixed(2)}</strong> auf unser Konto.</li>
                    <li><strong>Lieferung:</strong> Nach Zahlungseingang erfolgt die Lieferung in 4-7 Werktagen${order.delivery_date_display ? ` am ${order.delivery_date_display}` : ''}.</li>
                </ol>
            </div>

            <div class="section">
                <h2>📎 Rechnung im Anhang</h2>
                <p>Ihre vollständige Rechnung finden Sie als PDF-Datei im Anhang dieser E-Mail. Bitte bewahren Sie diese für Ihre Unterlagen auf.</p>
            </div>

            <div class="section">
                <h2>❓ Fragen?</h2>
                <p>Bei Fragen zu Ihrer Bestellung oder Rechnung stehen wir Ihnen gerne zur Verfügung:</p>
                <ul>
                    <li>E-Mail: ${smtpConfig.sender_email}</li>
                    ${shop.company_phone ? `<li>Telefon: ${shop.company_phone}</li>` : ''}
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p>${shop.company_name}<br>
            Vielen Dank für Ihr Vertrauen!</p>
            <p style="margin-top: 10px; font-size: 10px;">
                Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
            </p>
        </div>
    </div>
</body>
</html>
    `

    // Prepare email attachments
    const attachments = []
    if (pdfBuffer) {
      // Extract filename from URL for attachment
      const urlParts = invoiceFileUrl.split('/')
      const filename = urlParts[urlParts.length - 1]
      
      attachments.push({
        filename: filename,
        content: Array.from(new Uint8Array(pdfBuffer)),
        type: 'application/pdf',
        disposition: 'attachment'
      })
    }

    console.log('Sending email to:', order.customer_email);
    console.log('From:', smtpConfig.sender_email);
    console.log('Attachments:', attachments.length);

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: `${smtpConfig.sender_name} <${smtpConfig.sender_email}>`,
      to: [order.customer_email],
      subject: emailSubject,
      html: emailHtml,
      attachments: attachments.length > 0 ? attachments : undefined
    })

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error);
      throw new Error(`Failed to send email: ${emailResponse.error.message}`)
    }

    console.log('Email sent successfully:', emailResponse.data?.id);

    // Log the email sending
    await supabaseClient
      .from('email_sending_logs')
      .insert({
        order_id: orderId,
        recipient_email: order.customer_email,
        subject: emailSubject,
        status: 'sent',
        sent_at: new Date().toISOString(),
        smtp_config_id: smtpConfig.id
      })

    return new Response(
      JSON.stringify({
        success: true,
        emailId: emailResponse.data?.id,
        message: 'Invoice email sent successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error sending invoice email:', error)
    
    // Log the failed email attempt
    try {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )
      
      const { orderId } = await req.json().catch(() => ({}))
      
      if (orderId) {
        await supabaseClient
          .from('email_sending_logs')
          .insert({
            order_id: orderId,
            recipient_email: 'unknown',
            subject: 'Invoice Email Failed',
            status: 'failed',
            error_message: error.message
          })
      }
    } catch (logError) {
      console.error('Failed to log email error:', logError)
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
