
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";
import jsPDF from "npm:jspdf@2.5.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ItalianOrderRequest {
  orderData: any;
  orderNumber: string;
  bankAccountDetails: any;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Italian invoice function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderData, orderNumber, bankAccountDetails }: ItalianOrderRequest = await req.json();

    console.log('Processing Italian order:', {
      orderNumber,
      customerEmail: orderData.customerEmail,
      total: orderData.total,
      bankAccount: bankAccountDetails?.system_name
    });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Initialize Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }
    const resend = new Resend(resendApiKey);

    // Generate Italian invoice PDF
    const doc = new jsPDF();
    
    // Invoice header
    doc.setFontSize(20);
    doc.text('FATTURA', 20, 30);
    
    doc.setFontSize(12);
    doc.text(`Numero: ${orderNumber}`, 20, 50);
    doc.text(`Data: ${new Date().toLocaleDateString('it-IT')}`, 20, 60);
    
    // Company details
    doc.text('Gasolio Veloce S.r.l.', 20, 80);
    doc.text('Via Roma 123', 20, 90);
    doc.text('00100 Roma (RM)', 20, 100);
    doc.text('P.IVA: IT12345678901', 20, 110);
    
    // Customer details
    doc.text('Fatturato a:', 20, 130);
    doc.text(`${orderData.deliveryFirstName} ${orderData.deliveryLastName}`, 20, 140);
    doc.text(orderData.deliveryStreet, 20, 150);
    doc.text(`${orderData.deliveryPostcode} ${orderData.deliveryCity}`, 20, 160);
    
    // Order details
    doc.text('Descrizione', 20, 180);
    doc.text('Quantità', 80, 180);
    doc.text('Prezzo', 120, 180);
    doc.text('Totale', 160, 180);
    
    doc.text(`Gasolio da riscaldamento`, 20, 200);
    doc.text(`${orderData.amount.toLocaleString('it-IT')} L`, 80, 200);
    doc.text(`€${orderData.pricePerLiter.toFixed(2)}`, 120, 200);
    doc.text(`€${orderData.total.toFixed(2)}`, 160, 200);
    
    // Bank details
    if (bankAccountDetails) {
      doc.text('Dati bancari per il pagamento:', 20, 220);
      doc.text(`Intestatario: Gasolio Veloce`, 20, 230);
      doc.text(`Banca: ${bankAccountDetails.bank_name}`, 20, 240);
      doc.text(`IBAN: ${bankAccountDetails.iban}`, 20, 250);
      doc.text(`BIC: ${bankAccountDetails.bic}`, 20, 260);
      doc.text(`Riferimento: ${orderNumber}`, 20, 270);
    }
    
    // Generate PDF as buffer
    const pdfBuffer = doc.output('arraybuffer');
    const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)));

    // Save order to database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: `${orderData.deliveryFirstName} ${orderData.deliveryLastName}`,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.deliveryPhone,
        customer_address: `${orderData.deliveryStreet}, ${orderData.deliveryPostcode} ${orderData.deliveryCity}`,
        customer_language: 'it',
        delivery_first_name: orderData.deliveryFirstName,
        delivery_last_name: orderData.deliveryLastName,
        delivery_street: orderData.deliveryStreet,
        delivery_postcode: orderData.deliveryPostcode,
        delivery_city: orderData.deliveryCity,
        delivery_phone: orderData.deliveryPhone,
        billing_first_name: orderData.useSameAddress ? orderData.deliveryFirstName : orderData.billingFirstName,
        billing_last_name: orderData.useSameAddress ? orderData.deliveryLastName : orderData.billingLastName,
        billing_street: orderData.useSameAddress ? orderData.deliveryStreet : orderData.billingStreet,
        billing_postcode: orderData.useSameAddress ? orderData.deliveryPostcode : orderData.billingPostcode,
        billing_city: orderData.useSameAddress ? orderData.deliveryCity : orderData.billingCity,
        use_same_address: orderData.useSameAddress,
        product: orderData.product,
        liters: orderData.amount,
        price_per_liter: orderData.pricePerLiter,
        amount: orderData.amount,
        base_price: orderData.basePrice,
        delivery_fee: orderData.deliveryFee,
        discount: orderData.discount || 0,
        total_amount: orderData.total,
        payment_method: 'vorkasse',
        status: 'pending',
        bank_account_id: bankAccountDetails?.id,
        origin_domain: 'gasoliocasa.com',
        delivery_date_display: '3-5 giorni lavorativi'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error saving order:', orderError);
      throw new Error(`Failed to save order: ${orderError.message}`);
    }

    console.log('Order saved successfully:', order.id);

    // Send invoice email
    const emailResponse = await resend.emails.send({
      from: 'Gasolio Veloce <noreply@gasoliocasa.com>',
      to: [orderData.customerEmail],
      subject: `Fattura ordine ${orderNumber} - Gasolio Veloce`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #16a34a;">Conferma ordine - Gasolio Veloce</h1>
          
          <p>Gentile ${orderData.deliveryFirstName} ${orderData.deliveryLastName},</p>
          
          <p>Grazie per il vostro ordine di gasolio. La fattura è allegata a questa email.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Dettagli dell'ordine</h3>
            <p><strong>Numero ordine:</strong> ${orderNumber}</p>
            <p><strong>Quantità:</strong> ${orderData.amount.toLocaleString('it-IT')} litri</p>
            <p><strong>Prezzo per litro:</strong> €${orderData.pricePerLiter.toFixed(2)}</p>
            <p><strong>Totale:</strong> €${orderData.total.toFixed(2)}</p>
          </div>
          
          ${bankAccountDetails ? `
          <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #166534; margin-top: 0;">Dati bancari per il pagamento</h3>
            <p><strong>Intestatario:</strong> Gasolio Veloce</p>
            <p><strong>Banca:</strong> ${bankAccountDetails.bank_name}</p>
            <p><strong>IBAN:</strong> ${bankAccountDetails.iban}</p>
            <p><strong>BIC:</strong> ${bankAccountDetails.bic}</p>
            <p><strong>Riferimento:</strong> ${orderNumber}</p>
            <p><strong>Importo:</strong> €${orderData.total.toFixed(2)}</p>
          </div>
          ` : ''}
          
          <p>La consegna avverrà entro 3-5 giorni lavorativi dal ricevimento del pagamento.</p>
          
          <p>Il nostro autista vi contatterà telefonicamente il giorno della consegna.</p>
          
          <p>Per qualsiasi domanda, non esitate a contattarci:</p>
          <p>📞 Tel: 0800 123 456 7<br>
          📧 Email: servizio@gasoliocasa.com</p>
          
          <p>Cordiali saluti,<br>
          Il team di Gasolio Veloce</p>
        </div>
      `,
      attachments: [
        {
          filename: `fattura-${orderNumber}.pdf`,
          content: pdfBase64,
          contentType: 'application/pdf'
        }
      ]
    });

    if (emailResponse.error) {
      console.error('Error sending email:', emailResponse.error);
      // Don't throw error here - order is saved, just log the email issue
    } else {
      console.log('Email sent successfully:', emailResponse.data?.id);
      
      // Log email sending
      await supabase
        .from('email_logs')
        .insert({
          order_id: order.id,
          recipient_email: orderData.customerEmail,
          email_type: 'italian_invoice',
          subject: `Fattura ordine ${orderNumber} - Gasolio Veloce`,
          status: 'sent'
        });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      orderId: order.id,
      orderNumber: orderNumber,
      emailSent: !emailResponse.error
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error in send-italian-invoice function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
