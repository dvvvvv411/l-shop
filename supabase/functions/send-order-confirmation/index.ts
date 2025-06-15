
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderConfirmationRequest {
  orderId: string;
  customerEmail: string;
  originDomain?: string;
}

serve(async (req: Request): Promise<Response> => {
  console.log('Send order confirmation function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: OrderConfirmationRequest = await req.json();
    console.log('Request data:', JSON.stringify(requestData, null, 2));

    const { orderId, customerEmail, originDomain } = requestData;

    // Early return for Italian and French domains - they should only get invoice emails
    if (originDomain) {
      const isItalianDomain = originDomain.includes('gasoliocasa.com');
      const isFrenchDomain = originDomain.includes('fioul-rapide.fr');
      
      if (isItalianDomain) {
        console.log('Skipping order confirmation email for Italian domain:', originDomain);
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Order confirmation email skipped for Italian domain - invoice email will be sent instead',
            skipped: true,
            reason: 'italian_domain'
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      if (isFrenchDomain) {
        console.log('Skipping order confirmation email for French domain:', originDomain);
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Order confirmation email skipped for French domain - invoice email will be sent instead',
            skipped: true,
            reason: 'french_domain'
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch the order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new Error(`Order not found: ${orderError?.message}`);
    }

    console.log('Order found:', order.order_number);

    // Determine if this is a French domain based on origin_domain
    const isFrenchOrder = order.origin_domain?.includes('fioul-rapide.fr') || false;
    console.log('Is French domain:', isFrenchOrder);

    // Get the appropriate SMTP configuration
    const { data: smtpConfigs, error: smtpError } = await supabase
      .from('smtp_configurations')
      .select('*, shops!inner(*)')
      .eq('is_active', true);

    if (smtpError || !smtpConfigs || smtpConfigs.length === 0) {
      throw new Error(`No active SMTP configuration found: ${smtpError?.message}`);
    }

    // Find the appropriate SMTP config based on shop
    let smtpConfig;
    if (isFrenchOrder) {
      smtpConfig = smtpConfigs.find(config => 
        config.shops?.name === 'Fioul Rapide'
      );
    } else {
      smtpConfig = smtpConfigs.find(config => 
        config.shops?.name === 'Gasolio Casa'
      );
    }

    if (!smtpConfig) {
      // Fallback to first available config
      smtpConfig = smtpConfigs[0];
    }

    console.log(`Using SMTP config: ${smtpConfig.id} for shop: ${smtpConfig.shops?.name}`);

    // Initialize Resend with the API key from the SMTP config
    const resend = new Resend(smtpConfig.resend_api_key);

    // Prepare email content based on language/domain
    let subject, htmlContent;
    
    if (isFrenchOrder) {
      subject = `Confirmation de votre commande ${order.order_number}`;
      htmlContent = `
        <h1>Merci pour votre commande !</h1>
        <p>Bonjour ${order.customer_name},</p>
        <p>Nous avons bien reçu votre commande <strong>${order.order_number}</strong>.</p>
        
        <h2>Détails de la commande :</h2>
        <ul>
          <li><strong>Produit:</strong> ${order.product}</li>
          <li><strong>Quantité:</strong> ${order.liters} litres</li>
          <li><strong>Prix total:</strong> ${order.total_amount}€</li>
        </ul>
        
        <h2>Adresse de livraison :</h2>
        <p>
          ${order.delivery_first_name} ${order.delivery_last_name}<br>
          ${order.delivery_street}<br>
          ${order.delivery_postcode} ${order.delivery_city}
        </p>
        
        <p>Nous vous contacterons prochainement pour organiser la livraison.</p>
        
        <p>Cordialement,<br>L'équipe Fioul Rapide</p>
      `;
    } else {
      // Italian or German
      subject = `Conferma del tuo ordine ${order.order_number}`;
      htmlContent = `
        <h1>Grazie per il tuo ordine!</h1>
        <p>Ciao ${order.customer_name},</p>
        <p>Abbiamo ricevuto il tuo ordine <strong>${order.order_number}</strong>.</p>
        
        <h2>Dettagli dell'ordine:</h2>
        <ul>
          <li><strong>Prodotto:</strong> ${order.product}</li>
          <li><strong>Quantità:</strong> ${order.liters} litri</li>
          <li><strong>Prezzo totale:</strong> ${order.total_amount}€</li>
        </ul>
        
        <h2>Indirizzo di consegna:</h2>
        <p>
          ${order.delivery_first_name} ${order.delivery_last_name}<br>
          ${order.delivery_street}<br>
          ${order.delivery_postcode} ${order.delivery_city}
        </p>
        
        <p>Ti contatteremo presto per organizzare la consegna.</p>
        
        <p>Cordiali saluti,<br>Il team di Gasolio Casa</p>
      `;
    }

    console.log('Sending email to:', customerEmail);

    // Send the email
    const emailResult = await resend.emails.send({
      from: `${smtpConfig.sender_name} <${smtpConfig.sender_email}>`,
      to: [customerEmail],
      subject: subject,
      html: htmlContent,
    });

    if (emailResult.error) {
      throw new Error(`Failed to send email: ${emailResult.error.message}`);
    }

    console.log('Email sent successfully:', emailResult);

    // Log the email sending
    await supabase
      .from('email_sending_logs')
      .insert({
        recipient_email: customerEmail,
        subject: subject,
        status: 'sent',
        smtp_config_id: smtpConfig.id,
        order_id: orderId,
        sent_at: new Date().toISOString(),
      });

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: emailResult.data,
        message: 'Order confirmation email sent successfully'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in send-order-confirmation function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
