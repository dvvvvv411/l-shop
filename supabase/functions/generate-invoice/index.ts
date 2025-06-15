
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import jsPDF from 'https://esm.sh/jspdf@2.5.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InvoiceRequest {
  orderId: string;
  shopId: string;
  bankAccountId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { orderId, shopId, bankAccountId }: InvoiceRequest = await req.json();

    console.log('Generating invoice for order:', { orderId, shopId, bankAccountId });

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error('Error fetching order:', orderError);
      throw new Error('Order not found');
    }

    // Get shop details
    const { data: shop, error: shopError } = await supabase
      .from('shops')
      .select('*')
      .eq('id', shopId)
      .single();

    if (shopError || !shop) {
      console.error('Error fetching shop:', shopError);
      throw new Error('Shop not found');
    }

    // Get bank account details
    const { data: bankAccount, error: bankError } = await supabase
      .from('bank_accounts')
      .select('*')
      .eq('id', bankAccountId)
      .single();

    if (bankError || !bankAccount) {
      console.error('Error fetching bank account:', bankError);
      throw new Error('Bank account not found');
    }

    console.log('Retrieved data:', { order: order.order_number, shop: shop.name, bankAccount: bankAccount.system_name });

    // Check if this is an Italian order (gasoliocasa.com)
    const isItalianOrder = order.origin_domain === 'gasoliocasa.com';
    
    // Determine invoice number format based on shop
    let invoiceNumber: string;
    if (isItalianOrder) {
      // Use Italian invoice format: year + sequential number
      const currentYear = new Date().getFullYear();
      
      // Get or create invoice sequence for current year
      const { data: sequence, error: seqError } = await supabase
        .from('invoice_sequences')
        .select('*')
        .eq('year', currentYear)
        .single();

      let nextNumber = 1;
      if (sequence) {
        nextNumber = sequence.last_number + 1;
        await supabase
          .from('invoice_sequences')
          .update({ last_number: nextNumber })
          .eq('id', sequence.id);
      } else {
        await supabase
          .from('invoice_sequences')
          .insert({ year: currentYear, last_number: nextNumber });
      }
      
      invoiceNumber = `${currentYear}/${nextNumber.toString().padStart(4, '0')}`;
    } else {
      // Use existing format for other shops
      invoiceNumber = `INV-${order.order_number}`;
    }

    // Create PDF
    const doc = new jsPDF();
    
    // Set font
    doc.setFont('helvetica');
    
    let yPosition = 20;
    
    // Header with shop info
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(shop.company_name, 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(shop.company_address, 20, yPosition);
    yPosition += 5;
    doc.text(`${shop.company_postcode} ${shop.company_city}`, 20, yPosition);
    yPosition += 5;
    
    if (shop.company_phone) {
      doc.text(`Tel: ${shop.company_phone}`, 20, yPosition);
      yPosition += 5;
    }
    
    if (shop.company_email) {
      doc.text(`Email: ${shop.company_email}`, 20, yPosition);
      yPosition += 5;
    }
    
    if (shop.vat_number) {
      const vatLabel = isItalianOrder ? 'P.IVA:' : 'USt-IdNr:';
      doc.text(`${vatLabel} ${shop.vat_number}`, 20, yPosition);
      yPosition += 5;
    }
    
    yPosition += 10;
    
    // Customer address (right side)
    doc.setFontSize(10);
    doc.text('Rechnungsadresse:', 120, 30);
    doc.text(`${order.billing_first_name} ${order.billing_last_name}`, 120, 40);
    doc.text(order.billing_street || '', 120, 45);
    doc.text(`${order.billing_postcode || ''} ${order.billing_city || ''}`, 120, 50);
    
    yPosition = Math.max(yPosition, 70);
    
    // Invoice title and details
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const invoiceTitle = isItalianOrder ? 'FATTURA' : 'RECHNUNG';
    doc.text(invoiceTitle, 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const invoiceNumberLabel = isItalianOrder ? 'Numero Fattura:' : 'Rechnungsnummer:';
    doc.text(`${invoiceNumberLabel} ${invoiceNumber}`, 20, yPosition);
    yPosition += 5;
    
    const orderNumberLabel = isItalianOrder ? 'Numero Ordine:' : 'Bestellnummer:';
    doc.text(`${orderNumberLabel} ${order.order_number}`, 20, yPosition);
    yPosition += 5;
    
    const dateLabel = isItalianOrder ? 'Data:' : 'Datum:';
    doc.text(`${dateLabel} ${new Date().toLocaleDateString(isItalianOrder ? 'it-IT' : 'de-DE')}`, 20, yPosition);
    yPosition += 15;
    
    // Table header
    doc.setFont('helvetica', 'bold');
    const descriptionLabel = isItalianOrder ? 'Descrizione' : 'Beschreibung';
    const quantityLabel = isItalianOrder ? 'Quantità' : 'Menge';
    const priceLabel = isItalianOrder ? 'Prezzo' : 'Preis';
    const totalLabel = isItalianOrder ? 'Totale' : 'Gesamt';
    
    doc.text(descriptionLabel, 20, yPosition);
    doc.text(quantityLabel, 100, yPosition);
    doc.text(priceLabel, 130, yPosition);
    doc.text(totalLabel, 160, yPosition);
    yPosition += 8;
    
    // Line under header
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 8;
    
    // Product line
    doc.setFont('helvetica', 'normal');
    doc.text(order.product, 20, yPosition);
    doc.text(`${order.liters} L`, 100, yPosition);
    doc.text(`${order.price_per_liter?.toFixed(3)}€/L`, 130, yPosition);
    doc.text(`${order.base_price?.toFixed(2)}€`, 160, yPosition);
    yPosition += 8;
    
    // Delivery fee if applicable
    if (order.delivery_fee && order.delivery_fee > 0) {
      const deliveryLabel = isItalianOrder ? 'Spese di consegna' : 'Lieferkosten';
      doc.text(deliveryLabel, 20, yPosition);
      doc.text(`${order.delivery_fee.toFixed(2)}€`, 160, yPosition);
      yPosition += 8;
    }
    
    yPosition += 5;
    
    // VAT calculation
    const vatRate = isItalianOrder ? 0.22 : 0.19; // 22% IVA for Italy, 19% for others
    const netTotal = order.total_amount / (1 + vatRate);
    const vatAmount = order.total_amount - netTotal;
    
    doc.line(140, yPosition, 190, yPosition);
    yPosition += 8;
    
    const netLabel = isItalianOrder ? 'Netto:' : 'Netto:';
    doc.text(netLabel, 140, yPosition);
    doc.text(`${netTotal.toFixed(2)}€`, 160, yPosition);
    yPosition += 5;
    
    const vatLabel = isItalianOrder ? `IVA (${(vatRate * 100).toFixed(0)}%):` : `MwSt (${(vatRate * 100).toFixed(0)}%):`;
    doc.text(vatLabel, 140, yPosition);
    doc.text(`${vatAmount.toFixed(2)}€`, 160, yPosition);
    yPosition += 8;
    
    doc.line(140, yPosition, 190, yPosition);
    yPosition += 8;
    
    doc.setFont('helvetica', 'bold');
    const totalFinalLabel = isItalianOrder ? 'Totale:' : 'Gesamtbetrag:';
    doc.text(totalFinalLabel, 140, yPosition);
    doc.text(`${order.total_amount.toFixed(2)}€`, 160, yPosition);
    yPosition += 15;
    
    // Payment instructions
    doc.setFont('helvetica', 'normal');
    const paymentTitle = isItalianOrder ? 'Istruzioni di Pagamento:' : 'Zahlungshinweise:';
    doc.setFont('helvetica', 'bold');
    doc.text(paymentTitle, 20, yPosition);
    yPosition += 8;
    
    doc.setFont('helvetica', 'normal');
    
    // Format IBAN with spaces for better readability
    const formatIban = (iban: string) => {
      return iban.replace(/(.{4})/g, '$1 ').trim();
    };
    
    const accountHolderLabel = isItalianOrder ? 'Intestatario:' : 'Kontoinhaber:';
    doc.text(`${accountHolderLabel} ${bankAccount.account_holder}`, 20, yPosition);
    yPosition += 5;
    
    const bankLabel = isItalianOrder ? 'Banca:' : 'Bank:';
    doc.text(`${bankLabel} ${bankAccount.bank_name}`, 20, yPosition);
    yPosition += 5;
    
    doc.text(`IBAN: ${formatIban(bankAccount.iban)}`, 20, yPosition);
    yPosition += 5;
    doc.text(`BIC: ${bankAccount.bic}`, 20, yPosition);
    yPosition += 5;
    
    const referenceLabel = isItalianOrder ? 'Causale:' : 'Verwendungszweck:';
    doc.text(`${referenceLabel} ${order.order_number}`, 20, yPosition);
    yPosition += 10;
    
    // Footer note
    const footerNote = isItalianOrder 
      ? 'Si prega di effettuare il bonifico entro 14 giorni dalla data della fattura.'
      : 'Bitte überweisen Sie den Betrag innerhalb von 14 Tagen nach Rechnungsdatum.';
    
    doc.setFontSize(9);
    doc.text(footerNote, 20, yPosition);
    
    // Generate PDF buffer
    const pdfArrayBuffer = doc.output('arraybuffer');
    const pdfBuffer = new Uint8Array(pdfArrayBuffer);
    
    // Save to Supabase Storage
    const fileName = `invoice-${invoiceNumber.replace('/', '-')}.pdf`;
    const filePath = `invoices/${fileName}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('invoices')
      .upload(filePath, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true
      });
    
    if (uploadError) {
      console.error('Error uploading PDF:', uploadError);
      throw new Error('Failed to upload PDF');
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('invoices')
      .getPublicUrl(filePath);
    
    console.log('PDF uploaded successfully:', publicUrl);
    
    // Save invoice record
    const { data: invoiceRecord, error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        order_id: orderId,
        invoice_number: invoiceNumber,
        invoice_date: new Date().toISOString().split('T')[0],
        file_url: publicUrl,
        file_name: fileName
      })
      .select()
      .single();
    
    if (invoiceError) {
      console.error('Error saving invoice record:', invoiceError);
      throw new Error('Failed to save invoice record');
    }
    
    // Update order with invoice details
    await supabase
      .from('orders')
      .update({
        invoice_number: invoiceNumber,
        invoice_file_url: publicUrl,
        invoice_date: new Date().toISOString().split('T')[0]
      })
      .eq('id', orderId);
    
    console.log('Invoice generated successfully:', invoiceNumber);
    
    // Send invoice email using send-invoice-email function
    try {
      console.log('Sending invoice email...');
      
      const emailResponse = await supabase.functions.invoke('send-invoice-email', {
        body: {
          orderId,
          invoiceUrl: publicUrl,
          customerEmail: order.customer_email_actual || order.customer_email,
          isItalianOrder
        }
      });
      
      if (emailResponse.error) {
        console.error('Error sending invoice email:', emailResponse.error);
        throw emailResponse.error;
      }
      
      console.log('Invoice email sent successfully');
    } catch (emailError) {
      console.error('Failed to send invoice email:', emailError);
      // Don't fail the invoice generation if email fails
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        invoiceNumber,
        fileUrl: publicUrl,
        fileName
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
    
  } catch (error) {
    console.error('Error in generate-invoice function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  }
});
