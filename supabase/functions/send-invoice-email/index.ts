
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { Resend } from 'npm:resend@2.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Format IBAN for display (German format)
const formatGermanIban = (iban: string) => {
  if (!iban) return '';
  const cleanIban = iban.replace(/\s/g, '');
  return cleanIban.replace(/(.{4})/g, '$1 ').trim();
};

// Format IBAN for display (Italian format)
const formatItalianIban = (iban: string) => {
  if (!iban) return '';
  const cleanIban = iban.replace(/\s/g, '');
  return cleanIban.replace(/(.{4})/g, '$1 ').trim();
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { orderId, invoiceNumber } = await req.json()
    
    console.log('Sending invoice email for order:', orderId, 'invoice:', invoiceNumber)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Get order details
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select(`
        *,
        shops!inner(*),
        bank_accounts!inner(*)
      `)
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      throw new Error(`Order not found: ${orderError?.message}`)
    }

    // Get invoice details
    const { data: invoice, error: invoiceError } = await supabaseClient
      .from('invoices')
      .select('file_url, file_name')
      .eq('order_id', orderId)
      .eq('invoice_number', invoiceNumber)
      .single()

    if (invoiceError || !invoice) {
      throw new Error(`Invoice not found: ${invoiceError?.message}`)
    }

    // Get SMTP configuration based on shop
    const { data: smtpConfigs, error: smtpError } = await supabaseClient
      .from('smtp_configurations')
      .select('*')
      .eq('shop_id', order.shop_id)
      .eq('is_active', true)
      .limit(1)

    if (smtpError || !smtpConfigs || smtpConfigs.length === 0) {
      throw new Error(`No active SMTP configuration found for shop: ${smtpError?.message}`)
    }

    const smtpConfig = smtpConfigs[0]
    console.log('Using SMTP config:', smtpConfig.sender_email)

    // Language detection based on shop name or company name
    const shopName = order.shops.name || ''
    const companyName = order.shops.company_name || ''
    const languageDetection = {
      shopName,
      companyName,
      isFrench: shopName.toLowerCase().includes('fioul') || shopName.toLowerCase().includes('rapide'),
      isItalian: shopName.toLowerCase().includes('gasolio') || shopName.toLowerCase().includes('casa') || companyName.toLowerCase().includes('oil & oil')
    }
    
    console.log('Language detection:', languageDetection)

    const resend = new Resend(smtpConfig.resend_api_key)

    // Download the PDF file from Supabase Storage
    const { data: pdfData, error: downloadError } = await supabaseClient.storage
      .from('invoices')
      .download(invoice.file_name || `${invoiceNumber}.pdf`)

    if (downloadError || !pdfData) {
      throw new Error(`Failed to download PDF: ${downloadError?.message}`)
    }

    const pdfBuffer = await pdfData.arrayBuffer()
    console.log('PDF downloaded successfully, size:', pdfBuffer.byteLength)

    // Create email content based on language
    let subject: string
    let htmlContent: string
    let textContent: string

    if (languageDetection.isItalian) {
      subject = `Fattura ${invoiceNumber} - Il tuo ordine Gasolio Casa`
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .bank-details { background-color: #dcfce7; padding: 15px; margin: 20px 0; border-radius: 8px; }
            .footer { background-color: #1f2937; color: white; padding: 20px; text-align: center; font-size: 12px; }
            .important { background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Gasolio Casa</h1>
              <p>La tua fattura è pronta</p>
            </div>
            
            <div class="content">
              <h2>Caro/a ${order.delivery_first_name} ${order.delivery_last_name},</h2>
              
              <p>Grazie per il tuo ordine! In allegato trovi la fattura <strong>${invoiceNumber}</strong> per il tuo acquisto di gasolio.</p>
              
              <div class="important">
                <h3>📋 Dettagli dell'ordine:</h3>
                <ul>
                  <li><strong>Numero ordine:</strong> ${order.order_number}</li>
                  <li><strong>Numero fattura:</strong> ${invoiceNumber}</li>
                  <li><strong>Quantità:</strong> ${order.liters.toLocaleString('it-IT')} litri</li>
                  <li><strong>Importo totale:</strong> €${order.total_amount.toFixed(2)}</li>
                </ul>
              </div>

              <div class="bank-details">
                <h3>💳 Dati per il bonifico:</h3>
                <p><strong>Intestatario:</strong> ${order.bank_accounts.account_holder}</p>
                <p><strong>Banca:</strong> ${order.bank_accounts.bank_name}</p>
                <p><strong>IBAN:</strong> ${formatItalianIban(order.bank_accounts.iban)}</p>
                <p><strong>BIC:</strong> ${order.bank_accounts.bic}</p>
                <p><strong>Causale:</strong> ${order.order_number}</p>
                <p><strong>Importo:</strong> €${order.total_amount.toFixed(2)}</p>
              </div>

              <div class="important">
                <h3>⚠️ Importante:</h3>
                <p>Il gasolio verrà consegnato solo dopo aver ricevuto il pagamento. Ti preghiamo di effettuare il bonifico il prima possibile per velocizzare la consegna.</p>
                <p><strong>Tempo di consegna stimato:</strong> 3-5 giorni lavorativi dopo il ricevimento del pagamento</p>
              </div>

              <p>Se hai domande sul tuo ordine, non esitare a contattarci:</p>
              <ul>
                <li>📧 E-mail: servizio@gasoliocasa.it</li>
                <li>📞 Telefono: 0800 123 456 7</li>
                <li>🕒 Orari: Lun-Ven 8:00-18:00</li>
              </ul>

              <p>Grazie per aver scelto Gasolio Casa!</p>
              <p>Cordiali saluti,<br>Il team di Gasolio Casa</p>
            </div>
            
            <div class="footer">
              <p>Gasolio Casa - Il tuo partner affidabile per il gasolio da riscaldamento</p>
              <p>Questa è una e-mail automatica, ti preghiamo di non rispondere direttamente.</p>
            </div>
          </div>
        </body>
        </html>
      `
      
      textContent = `
Gasolio Casa - La tua fattura è pronta

Caro/a ${order.delivery_first_name} ${order.delivery_last_name},

Grazie per il tuo ordine! In allegato trovi la fattura ${invoiceNumber} per il tuo acquisto di gasolio.

DETTAGLI DELL'ORDINE:
- Numero ordine: ${order.order_number}
- Numero fattura: ${invoiceNumber}
- Quantità: ${order.liters.toLocaleString('it-IT')} litri
- Importo totale: €${order.total_amount.toFixed(2)}

DATI PER IL BONIFICO:
Intestatario: ${order.bank_accounts.account_holder}
Banca: ${order.bank_accounts.bank_name}
IBAN: ${formatItalianIban(order.bank_accounts.iban)}
BIC: ${order.bank_accounts.bic}
Causale: ${order.order_number}
Importo: €${order.total_amount.toFixed(2)}

IMPORTANTE:
Il gasolio verrà consegnato solo dopo aver ricevuto il pagamento. Ti preghiamo di effettuare il bonifico il prima possibile per velocizzare la consegna.
Tempo di consegna stimato: 3-5 giorni lavorativi dopo il ricevimento del pagamento

CONTATTI:
E-mail: servizio@gasoliocasa.it
Telefono: 0800 123 456 7
Orari: Lun-Ven 8:00-18:00

Grazie per aver scelto Gasolio Casa!

Il team di Gasolio Casa
      `
    } else if (languageDetection.isFrench) {
      subject = `Facture ${invoiceNumber} - Votre commande Fioul Rapide`
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .bank-details { background-color: #dcfce7; padding: 15px; margin: 20px 0; border-radius: 8px; }
            .footer { background-color: #1f2937; color: white; padding: 20px; text-align: center; font-size: 12px; }
            .important { background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Fioul Rapide</h1>
              <p>Votre facture est prête</p>
            </div>
            
            <div class="content">
              <h2>Cher/Chère ${order.delivery_first_name} ${order.delivery_last_name},</h2>
              
              <p>Merci pour votre commande ! Vous trouverez en pièce jointe la facture <strong>${invoiceNumber}</strong> pour votre achat de fioul.</p>
              
              <div class="important">
                <h3>📋 Détails de la commande :</h3>
                <ul>
                  <li><strong>Numéro de commande :</strong> ${order.order_number}</li>
                  <li><strong>Numéro de facture :</strong> ${invoiceNumber}</li>
                  <li><strong>Quantité :</strong> ${order.liters.toLocaleString('fr-FR')} litres</li>
                  <li><strong>Montant total :</strong> ${order.total_amount.toFixed(2)}€</li>
                </ul>
              </div>

              <div class="bank-details">
                <h3>💳 Coordonnées bancaires :</h3>
                <p><strong>Titulaire :</strong> ${order.bank_accounts.account_holder}</p>
                <p><strong>Banque :</strong> ${order.bank_accounts.bank_name}</p>
                <p><strong>IBAN :</strong> ${formatGermanIban(order.bank_accounts.iban)}</p>
                <p><strong>BIC :</strong> ${order.bank_accounts.bic}</p>
                <p><strong>Référence :</strong> ${order.order_number}</p>
                <p><strong>Montant :</strong> ${order.total_amount.toFixed(2)}€</p>
              </div>

              <div class="important">
                <h3>⚠️ Important :</h3>
                <p>Le fioul sera livré uniquement après réception du paiement. Veuillez effectuer le virement dans les plus brefs délais pour accélérer la livraison.</p>
                <p><strong>Délai de livraison estimé :</strong> 4-7 jours ouvrables après réception du paiement</p>
              </div>

              <p>Si vous avez des questions concernant votre commande, n'hésitez pas à nous contacter :</p>
              <ul>
                <li>📧 E-mail : service@fioul-rapide.fr</li>
                <li>📞 Téléphone : 0800 123 456 7</li>
                <li>🕒 Horaires : Lun-Ven 8h00-18h00</li>
              </ul>

              <p>Merci d'avoir choisi Fioul Rapide !</p>
              <p>Cordialement,<br>L'équipe Fioul Rapide</p>
            </div>
            
            <div class="footer">
              <p>Fioul Rapide - Votre partenaire de confiance pour le fioul domestique</p>
              <p>Ceci est un e-mail automatique, merci de ne pas répondre directement.</p>
            </div>
          </div>
        </body>
        </html>
      `
      
      textContent = `
Fioul Rapide - Votre facture est prête

Cher/Chère ${order.delivery_first_name} ${order.delivery_last_name},

Merci pour votre commande ! Vous trouverez en pièce jointe la facture ${invoiceNumber} pour votre achat de fioul.

DÉTAILS DE LA COMMANDE :
- Numéro de commande : ${order.order_number}
- Numéro de facture : ${invoiceNumber}
- Quantité : ${order.liters.toLocaleString('fr-FR')} litres
- Montant total : ${order.total_amount.toFixed(2)}€

COORDONNÉES BANCAIRES :
Titulaire : ${order.bank_accounts.account_holder}
Banque : ${order.bank_accounts.bank_name}
IBAN : ${formatGermanIban(order.bank_accounts.iban)}
BIC : ${order.bank_accounts.bic}
Référence : ${order.order_number}
Montant : ${order.total_amount.toFixed(2)}€

IMPORTANT :
Le fioul sera livré uniquement après réception du paiement. Veuillez effectuer le virement dans les plus brefs délais pour accélérer la livraison.
Délai de livraison estimé : 4-7 jours ouvrables après réception du paiement

CONTACT :
E-mail : service@fioul-rapide.fr
Téléphone : 0800 123 456 7
Horaires : Lun-Ven 8h00-18h00

Merci d'avoir choisi Fioul Rapide !

L'équipe Fioul Rapide
      `
    } else {
      // German (default)
      subject = `Rechnung ${invoiceNumber} - Ihre Heizöl-Bestellung`
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .bank-details { background-color: #dcfce7; padding: 15px; margin: 20px 0; border-radius: 8px; }
            .footer { background-color: #1f2937; color: white; padding: 20px; text-align: center; font-size: 12px; }
            .important { background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Heizöl Direkt</h1>
              <p>Ihre Rechnung ist bereit</p>
            </div>
            
            <div class="content">
              <h2>Liebe/r ${order.delivery_first_name} ${order.delivery_last_name},</h2>
              
              <p>vielen Dank für Ihre Bestellung! Anbei finden Sie die Rechnung <strong>${invoiceNumber}</strong> für Ihren Heizöl-Kauf.</p>
              
              <div class="important">
                <h3>📋 Bestelldetails:</h3>
                <ul>
                  <li><strong>Bestellnummer:</strong> ${order.order_number}</li>
                  <li><strong>Rechnungsnummer:</strong> ${invoiceNumber}</li>
                  <li><strong>Menge:</strong> ${order.liters.toLocaleString('de-DE')} Liter</li>
                  <li><strong>Gesamtbetrag:</strong> ${order.total_amount.toFixed(2)}€</li>
                </ul>
              </div>

              <div class="bank-details">
                <h3>💳 Überweisungsdaten:</h3>
                <p><strong>Empfänger:</strong> ${order.bank_accounts.account_holder}</p>
                <p><strong>Bank:</strong> ${order.bank_accounts.bank_name}</p>
                <p><strong>IBAN:</strong> ${formatGermanIban(order.bank_accounts.iban)}</p>
                <p><strong>BIC:</strong> ${order.bank_accounts.bic}</p>
                <p><strong>Verwendungszweck:</strong> ${order.order_number}</p>
                <p><strong>Betrag:</strong> ${order.total_amount.toFixed(2)}€</p>
              </div>

              <div class="important">
                <h3>⚠️ Wichtig:</h3>
                <p>Das Heizöl wird erst nach Zahlungseingang geliefert. Bitte überweisen Sie den Betrag schnellstmöglich, um die Lieferung zu beschleunigen.</p>
                <p><strong>Voraussichtliche Lieferzeit:</strong> 4-7 Werktage nach Zahlungseingang</p>
              </div>

              <p>Bei Fragen zu Ihrer Bestellung können Sie uns gerne kontaktieren:</p>
              <ul>
                <li>📧 E-Mail: service@heizoeldirekt.de</li>
                <li>📞 Telefon: 0800 123 456 7</li>
                <li>🕒 Öffnungszeiten: Mo-Fr 8:00-18:00 Uhr</li>
              </ul>

              <p>Vielen Dank, dass Sie sich für Heizöl Direkt entschieden haben!</p>
              <p>Mit freundlichen Grüßen,<br>Ihr Heizöl Direkt Team</p>
            </div>
            
            <div class="footer">
              <p>Heizöl Direkt - Ihr zuverlässiger Partner für Heizöl</p>
              <p>Dies ist eine automatische E-Mail, bitte antworten Sie nicht direkt darauf.</p>
            </div>
          </div>
        </body>
        </html>
      `
      
      textContent = `
Heizöl Direkt - Ihre Rechnung ist bereit

Liebe/r ${order.delivery_first_name} ${order.delivery_last_name},

vielen Dank für Ihre Bestellung! Anbei finden Sie die Rechnung ${invoiceNumber} für Ihren Heizöl-Kauf.

BESTELLDETAILS:
- Bestellnummer: ${order.order_number}
- Rechnungsnummer: ${invoiceNumber}
- Menge: ${order.liters.toLocaleString('de-DE')} Liter
- Gesamtbetrag: ${order.total_amount.toFixed(2)}€

ÜBERWEISUNGSDATEN:
Empfänger: ${order.bank_accounts.account_holder}
Bank: ${order.bank_accounts.bank_name}
IBAN: ${formatGermanIban(order.bank_accounts.iban)}
BIC: ${order.bank_accounts.bic}
Verwendungszweck: ${order.order_number}
Betrag: ${order.total_amount.toFixed(2)}€

WICHTIG:
Das Heizöl wird erst nach Zahlungseingang geliefert. Bitte überweisen Sie den Betrag schnellstmöglich, um die Lieferung zu beschleunigen.
Voraussichtliche Lieferzeit: 4-7 Werktage nach Zahlungseingang

KONTAKT:
E-Mail: service@heizoeldirekt.de
Telefon: 0800 123 456 7
Öffnungszeiten: Mo-Fr 8:00-18:00 Uhr

Vielen Dank, dass Sie sich für Heizöl Direkt entschieden haben!

Ihr Heizöl Direkt Team
      `
    }

    // Send email with PDF attachment
    const emailResponse = await resend.emails.send({
      from: `${smtpConfig.sender_name} <${smtpConfig.sender_email}>`,
      to: [order.customer_email_actual || order.customer_email],
      subject: subject,
      html: htmlContent,
      text: textContent,
      attachments: [
        {
          filename: `${invoiceNumber}.pdf`,
          content: new Uint8Array(pdfBuffer),
        },
      ],
    })

    if (emailResponse.error) {
      throw new Error(`Failed to send email: ${emailResponse.error.message}`)
    }

    // Log the email
    await supabaseClient
      .from('email_sending_logs')
      .insert({
        order_id: orderId,
        smtp_config_id: smtpConfig.id,
        recipient_email: order.customer_email_actual || order.customer_email,
        subject: subject,
        status: 'sent',
        sent_at: new Date().toISOString()
      })

    console.log('Invoice email sent successfully:', emailResponse)

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailResponse.data?.id,
        message: 'Invoice email sent successfully'
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    )

  } catch (error) {
    console.error('Error sending invoice email:', error)

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    )
  }
})
