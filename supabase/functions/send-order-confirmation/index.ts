
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  orderId: string;
  customerEmail: string;
  originDomain?: string;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const handler = async (req: Request): Promise<Response> => {
  console.log('Send order confirmation function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, customerEmail, originDomain }: OrderConfirmationRequest = await req.json();
    console.log('Request data:', { orderId, customerEmail, originDomain });

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error('Order not found:', orderError);
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { 
          status: 404, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    console.log('Order found:', order.order_number);

    // Determine language based on domain and customer language
    const isItalianDomain = originDomain === 'gasoliocasa.com';
    const isFrenchDomain = originDomain === 'fioul-rapide.fr';
    const isItalianOrder = order.customer_language === 'it' || isItalianDomain;
    const isFrenchOrder = order.customer_language === 'fr' || isFrenchDomain;

    console.log('Language detection:', {
      originDomain,
      customerLanguage: order.customer_language,
      isItalianDomain,
      isFrenchDomain,
      isItalianOrder,
      isFrenchOrder
    });

    // Get appropriate SMTP configuration based on domain/language
    let smtpQuery = supabase
      .from('smtp_configurations')
      .select(`
        *,
        smtp_domains(domain, is_primary)
      `)
      .eq('is_active', true);

    // Try to find domain-specific SMTP config first
    if (originDomain) {
      const { data: domainSmtp } = await supabase
        .from('smtp_configurations')
        .select(`
          *,
          smtp_domains!inner(domain, is_primary)
        `)
        .eq('smtp_domains.domain', originDomain)
        .eq('is_active', true)
        .single();

      if (domainSmtp) {
        console.log('Using domain-specific SMTP config for:', originDomain);
      } else {
        // Fallback to any active SMTP configuration
        const { data: fallbackSmtp } = await supabase
          .from('smtp_configurations')
          .select(`
            *,
            smtp_domains(domain, is_primary)
          `)
          .eq('is_active', true)
          .limit(1)
          .single();

        if (fallbackSmtp) {
          console.log('Using fallback SMTP config');
        }
      }
    }

    // Get SMTP configuration
    const { data: smtpConfigs, error: smtpError } = await smtpQuery;

    if (smtpError || !smtpConfigs || smtpConfigs.length === 0) {
      console.error('No SMTP configuration found:', smtpError);
      return new Response(
        JSON.stringify({ error: 'No SMTP configuration available' }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    const smtpConfig = smtpConfigs[0];
    console.log('Using SMTP config:', smtpConfig.sender_email);

    // Initialize Resend with the API key
    const resend = new Resend(smtpConfig.resend_api_key);

    // Format order details for email
    const deliveryAddress = `${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}`;
    const formattedTotal = `€${Number(order.total_amount).toFixed(2)}`;
    const formattedDate = new Date(order.created_at).toLocaleDateString(
      isItalianOrder ? 'it-IT' : isFrenchOrder ? 'fr-FR' : 'de-DE'
    );

    // Email content based on language
    let subject: string;
    let htmlContent: string;
    let textContent: string;
    let senderEmail: string;

    if (isItalianOrder) {
      // Italian email template
      subject = `Conferma ordine ${order.order_number} - OIL & OIL`;
      senderEmail = `noreply@gasoliocasa.com`;
      
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Conferma Ordine</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #16a34a, #15803d); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">OIL & OIL</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Gasolio per riscaldamento di qualità</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #16a34a; margin-top: 0;">Conferma dell'ordine</h2>
            <p>Gentile ${order.delivery_first_name} ${order.delivery_last_name},</p>
            <p>Grazie per il suo ordine! Abbiamo ricevuto la sua richiesta e la contatteremo presto per confermare i dettagli.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
              <h3 style="margin-top: 0; color: #16a34a;">Dettagli dell'ordine</h3>
              <p><strong>Numero ordine:</strong> ${order.order_number}</p>
              <p><strong>Data:</strong> ${formattedDate}</p>
              <p><strong>Prodotto:</strong> ${order.product}</p>
              <p><strong>Quantità:</strong> ${order.liters.toLocaleString()} litri</p>
              <p><strong>Totale:</strong> ${formattedTotal}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #16a34a;">Indirizzo di consegna</h3>
              <p>${deliveryAddress}</p>
              ${order.delivery_phone ? `<p><strong>Telefono:</strong> ${order.delivery_phone}</p>` : ''}
            </div>
            
            <div style="background: #e1f5fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #0277bd;">Prossimi passi</h3>
              <ol style="margin: 10px 0; padding-left: 20px;">
                <li><strong>Contatto telefonico:</strong> La chiameremo entro 24 ore per confermare l'ordine</li>
                <li><strong>Pagamento:</strong> Riceverà i dettagli per il bonifico bancario</li>
                <li><strong>Consegna:</strong> La consegna avverrà entro 3-5 giorni lavorativi dopo il pagamento</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="margin: 5px 0; color: #666; font-size: 14px;">Hai domande? Contattaci:</p>
              <p style="margin: 5px 0; color: #16a34a; font-weight: bold;">info@gasoliocasa.com</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>OIL & OIL - Gasolio di qualità per la sua casa</p>
            <p>Questa email è stata generata automaticamente, si prega di non rispondere.</p>
          </div>
        </body>
        </html>
      `;

      textContent = `
        OIL & OIL - Conferma dell'ordine

        Gentile ${order.delivery_first_name} ${order.delivery_last_name},

        Grazie per il suo ordine! Abbiamo ricevuto la sua richiesta e la contatteremo presto per confermare i dettagli.

        DETTAGLI DELL'ORDINE:
        Numero ordine: ${order.order_number}
        Data: ${formattedDate}
        Prodotto: ${order.product}
        Quantità: ${order.liters.toLocaleString()} litri
        Totale: ${formattedTotal}

        INDIRIZZO DI CONSEGNA:
        ${deliveryAddress}
        ${order.delivery_phone ? `Telefono: ${order.delivery_phone}` : ''}

        PROSSIMI PASSI:
        1. Contatto telefonico: La chiameremo entro 24 ore per confermare l'ordine
        2. Pagamento: Riceverà i dettagli per il bonifico bancario
        3. Consegna: La consegna avverrà entro 3-5 giorni lavorativi dopo il pagamento

        Hai domande? Contattaci: info@gasoliocasa.com

        OIL & OIL - Gasolio di qualità per la sua casa
        Questa email è stata generata automaticamente, si prega di non rispondere.
      `;
    } else if (isFrenchOrder) {
      // French email template
      subject = `Confirmation de commande ${order.order_number} - Fioul Rapide`;
      senderEmail = `noreply@fioul-rapide.fr`;
      
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Confirmation de Commande</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Fioul Rapide</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Livraison rapide de fioul domestique</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #dc2626; margin-top: 0;">Confirmation de votre commande</h2>
            <p>Cher/Chère ${order.delivery_first_name} ${order.delivery_last_name},</p>
            <p>Merci pour votre commande ! Nous avons bien reçu votre demande et nous vous contacterons bientôt pour confirmer les détails.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="margin-top: 0; color: #dc2626;">Détails de la commande</h3>
              <p><strong>Numéro de commande :</strong> ${order.order_number}</p>
              <p><strong>Date :</strong> ${formattedDate}</p>
              <p><strong>Produit :</strong> ${order.product}</p>
              <p><strong>Quantité :</strong> ${order.liters.toLocaleString()} litres</p>
              <p><strong>Total :</strong> ${formattedTotal}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #dc2626;">Adresse de livraison</h3>
              <p>${deliveryAddress}</p>
              ${order.delivery_phone ? `<p><strong>Téléphone :</strong> ${order.delivery_phone}</p>` : ''}
            </div>
            
            <div style="background: #e1f5fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #0277bd;">Prochaines étapes</h3>
              <ol style="margin: 10px 0; padding-left: 20px;">
                <li><strong>Contact téléphonique :</strong> Nous vous appellerons dans les 24 heures pour confirmer votre commande</li>
                <li><strong>Paiement :</strong> Vous recevrez les détails pour le virement bancaire</li>
                <li><strong>Livraison :</strong> La livraison aura lieu dans 3-5 jours ouvrables après réception du paiement</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="margin: 5px 0; color: #666; font-size: 14px;">Des questions ? Contactez-nous :</p>
              <p style="margin: 5px 0; color: #dc2626; font-weight: bold;">info@fioul-rapide.fr</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>Fioul Rapide - Votre partenaire fioul de confiance</p>
            <p>Cet email a été généré automatiquement, merci de ne pas y répondre.</p>
          </div>
        </body>
        </html>
      `;

      textContent = `
        Fioul Rapide - Confirmation de votre commande

        Cher/Chère ${order.delivery_first_name} ${order.delivery_last_name},

        Merci pour votre commande ! Nous avons bien reçu votre demande et nous vous contacterons bientôt pour confirmer les détails.

        DÉTAILS DE LA COMMANDE :
        Numéro de commande : ${order.order_number}
        Date : ${formattedDate}
        Produit : ${order.product}
        Quantité : ${order.liters.toLocaleString()} litres
        Total : ${formattedTotal}

        ADRESSE DE LIVRAISON :
        ${deliveryAddress}
        ${order.delivery_phone ? `Téléphone : ${order.delivery_phone}` : ''}

        PROCHAINES ÉTAPES :
        1. Contact téléphonique : Nous vous appellerons dans les 24 heures pour confirmer votre commande
        2. Paiement : Vous recevrez les détails pour le virement bancaire
        3. Livraison : La livraison aura lieu dans 3-5 jours ouvrables après réception du paiement

        Des questions ? Contactez-nous : info@fioul-rapide.fr

        Fioul Rapide - Votre partenaire fioul de confiance
        Cet email a été généré automatiquement, merci de ne pas y répondre.
      `;
    } else {
      // German email template (default)
      subject = `Bestellbestätigung ${order.order_number} - Heizöl Service`;
      senderEmail = smtpConfig.sender_email;
      
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Bestellbestätigung</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Heizöl Service</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Zuverlässige Heizöl-Lieferung</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #dc2626; margin-top: 0;">Bestätigung Ihrer Bestellung</h2>
            <p>Liebe/r ${order.delivery_first_name} ${order.delivery_last_name},</p>
            <p>vielen Dank für Ihre Bestellung! Wir haben Ihre Anfrage erhalten und werden Sie bald kontaktieren, um die Details zu bestätigen.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="margin-top: 0; color: #dc2626;">Bestelldetails</h3>
              <p><strong>Bestellnummer:</strong> ${order.order_number}</p>
              <p><strong>Datum:</strong> ${formattedDate}</p>
              <p><strong>Produkt:</strong> ${order.product}</p>
              <p><strong>Menge:</strong> ${order.liters.toLocaleString()} Liter</p>
              <p><strong>Gesamtsumme:</strong> ${formattedTotal}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #dc2626;">Lieferadresse</h3>
              <p>${deliveryAddress}</p>
              ${order.delivery_phone ? `<p><strong>Telefon:</strong> ${order.delivery_phone}</p>` : ''}
            </div>
            
            <div style="background: #e1f5fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #0277bd;">Nächste Schritte</h3>
              <ol style="margin: 10px 0; padding-left: 20px;">
                <li><strong>Telefonkontakt:</strong> Wir rufen Sie innerhalb von 24 Stunden an, um Ihre Bestellung zu bestätigen</li>
                <li><strong>Zahlung:</strong> Sie erhalten die Details für die Banküberweisung</li>
                <li><strong>Lieferung:</strong> Die Lieferung erfolgt 3-5 Werktage nach Zahlungseingang</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="margin: 5px 0; color: #666; font-size: 14px;">Haben Sie Fragen? Kontaktieren Sie uns:</p>
              <p style="margin: 5px 0; color: #dc2626; font-weight: bold;">${smtpConfig.sender_email}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>Heizöl Service - Ihr zuverlässiger Partner für Heizöl</p>
            <p>Diese E-Mail wurde automatisch generiert, bitte antworten Sie nicht darauf.</p>
          </div>
        </body>
        </html>
      `;

      textContent = `
        Heizöl Service - Bestätigung Ihrer Bestellung

        Liebe/r ${order.delivery_first_name} ${order.delivery_last_name},

        vielen Dank für Ihre Bestellung! Wir haben Ihre Anfrage erhalten und werden Sie bald kontaktieren, um die Details zu bestätigen.

        BESTELLDETAILS:
        Bestellnummer: ${order.order_number}
        Datum: ${formattedDate}
        Produkt: ${order.product}
        Menge: ${order.liters.toLocaleString()} Liter
        Gesamtsumme: ${formattedTotal}

        LIEFERADRESSE:
        ${deliveryAddress}
        ${order.delivery_phone ? `Telefon: ${order.delivery_phone}` : ''}

        NÄCHSTE SCHRITTE:
        1. Telefonkontakt: Wir rufen Sie innerhalb von 24 Stunden an, um Ihre Bestellung zu bestätigen
        2. Zahlung: Sie erhalten die Details für die Banküberweisung
        3. Lieferung: Die Lieferung erfolgt 3-5 Werktage nach Zahlungseingang

        Haben Sie Fragen? Kontaktieren Sie uns: ${smtpConfig.sender_email}

        Heizöl Service - Ihr zuverlässiger Partner für Heizöl
        Diese E-Mail wurde automatisch generiert, bitte antworten Sie nicht darauf.
      `;
    }

    console.log('Sending email to:', customerEmail);
    console.log('From:', senderEmail);
    console.log('Language:', isItalianOrder ? 'Italian' : isFrenchOrder ? 'French' : 'German');

    // Send the email
    const emailResponse = await resend.emails.send({
      from: `${smtpConfig.sender_name} <${senderEmail}>`,
      to: [customerEmail],
      subject: subject,
      html: htmlContent,
      text: textContent,
    });

    if (emailResponse.error) {
      console.error('Failed to send email:', emailResponse.error);
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: emailResponse.error }),
        { 
          status: 500, 
          headers: { "Content-Type": "application/json", ...corsHeaders } 
        }
      );
    }

    console.log('Email sent successfully:', emailResponse.data?.id);

    // Log the email sending
    const { error: logError } = await supabase
      .from('email_sending_logs')
      .insert({
        recipient_email: customerEmail,
        subject: subject,
        status: 'sent',
        sent_at: new Date().toISOString(),
        smtp_config_id: smtpConfig.id,
        order_id: orderId,
      });

    if (logError) {
      console.error('Failed to log email:', logError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailResponse.data?.id,
        language: isItalianOrder ? 'Italian' : isFrenchOrder ? 'French' : 'German'
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );

  } catch (error: any) {
    console.error('Error in send-order-confirmation function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
};

serve(handler);
