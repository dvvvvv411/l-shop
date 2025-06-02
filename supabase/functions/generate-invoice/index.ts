
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import jsPDF from 'https://esm.sh/jspdf@2.5.1'

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

    const { orderId, shopId, bankAccountId } = await req.json()
    
    console.log('Generating invoice for order:', orderId, 'with shop:', shopId, 'and bank account:', bankAccountId);

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

    // Fetch shop details if provided
    let shop = null
    if (shopId) {
      const { data: shopData, error: shopError } = await supabaseClient
        .from('shops')
        .select('*')
        .eq('id', shopId)
        .single()

      if (shopError || !shopData) {
        console.error('Shop fetch error:', shopError);
        throw new Error('Shop not found')
      }
      shop = shopData
    }

    // Fetch bank account details if provided
    let bankAccount = null
    if (bankAccountId) {
      const { data: bankData, error: bankError } = await supabaseClient
        .from('bank_accounts')
        .select('*')
        .eq('id', bankAccountId)
        .single()

      if (bankError || !bankData) {
        console.error('Bank account fetch error:', bankError);
        throw new Error('Bank account not found')
      }
      bankAccount = bankData
    }

    // Generate invoice number if not exists
    let invoiceNumber = order.invoice_number
    if (!invoiceNumber) {
      const { data: invoiceGen, error: invoiceGenError } = await supabaseClient
        .rpc('generate_invoice_number')

      if (invoiceGenError || !invoiceGen) {
        console.error('Invoice number generation error:', invoiceGenError);
        throw new Error('Failed to generate invoice number')
      }
      invoiceNumber = invoiceGen
    }

    // Generate PDF using jsPDF
    const pdfBuffer = generateInvoicePDF(order, shop, bankAccount, invoiceNumber)

    // Store PDF in Supabase Storage - sanitize filename
    const sanitizedOrderNumber = order.order_number.replace(/[^a-zA-Z0-9_-]/g, '_')
    const sanitizedInvoiceNumber = invoiceNumber.replace(/[^a-zA-Z0-9_-]/g, '_')
    const fileName = `${sanitizedOrderNumber}_${sanitizedInvoiceNumber}.pdf`
    
    console.log('Uploading PDF with filename:', fileName);
    
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('invoices')
      .upload(fileName, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true
      })

    if (uploadError) {
      console.error('Error uploading PDF:', uploadError)
      throw new Error('Failed to upload PDF')
    }

    // Get public URL for the uploaded file
    const { data: urlData } = supabaseClient.storage
      .from('invoices')
      .getPublicUrl(fileName)

    const fileUrl = urlData.publicUrl
    const currentDate = new Date().toISOString().split('T')[0]

    console.log('Starting database transaction...');

    // Start a transaction-like approach by doing operations in order with proper error handling
    try {
      // 1. Update the order with bank account if provided
      if (bankAccountId) {
        const { error: bankUpdateError } = await supabaseClient
          .from('orders')
          .update({ bank_account_id: bankAccountId })
          .eq('id', orderId);

        if (bankUpdateError) {
          console.error('Error updating order with bank account:', bankUpdateError);
          throw new Error('Failed to update order with bank account');
        }
      }

      // 2. Create invoice record
      console.log('Creating invoice record...');
      const { error: invoiceRecordError } = await supabaseClient
        .from('invoices')
        .insert({
          order_id: orderId,
          invoice_number: invoiceNumber,
          invoice_date: currentDate,
          file_name: fileName,
          file_url: fileUrl
        });

      if (invoiceRecordError) {
        console.error('Error creating invoice record:', invoiceRecordError);
        throw new Error('Failed to create invoice record');
      }

      console.log('Invoice record created successfully');

      // 3. Create bank account transaction record if applicable
      if (bankAccountId && order.total_amount) {
        console.log('Creating bank account transaction...');
        const { error: transactionError } = await supabaseClient
          .from('bank_account_transactions')
          .insert({
            bank_account_id: bankAccountId,
            order_id: orderId,
            amount: order.total_amount,
            transaction_date: currentDate
          });

        if (transactionError) {
          console.error('Error creating transaction record:', transactionError);
          throw new Error('Failed to create transaction record');
        }

        console.log('Bank account transaction created successfully');
      }

      // 4. Update order status and invoice information
      console.log('Updating order status...');
      const { error: statusUpdateError } = await supabaseClient
        .from('orders')
        .update({ 
          status: 'invoice_created',
          invoice_number: invoiceNumber,
          invoice_date: currentDate,
          invoice_file_url: fileUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (statusUpdateError) {
        console.error('Error updating order status:', statusUpdateError);
        throw new Error('Failed to update order status');
      }

      console.log('Order status updated successfully');

    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      
      // Clean up uploaded file if database operations failed
      try {
        await supabaseClient.storage
          .from('invoices')
          .remove([fileName]);
        console.log('Cleaned up uploaded file after database error');
      } catch (cleanupError) {
        console.error('Failed to clean up uploaded file:', cleanupError);
      }
      
      throw dbError;
    }

    console.log('Invoice generated successfully for order:', orderId);

    return new Response(
      JSON.stringify({
        success: true,
        invoiceNumber,
        invoiceAmount: order.total_amount,
        fileUrl,
        fileName,
        // Return updated order data for frontend
        updatedOrder: {
          status: 'invoice_created',
          invoice_number: invoiceNumber,
          invoice_date: currentDate,
          invoice_file_url: fileUrl
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error generating invoice:', error)
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

function generateInvoicePDF(order: any, shop: any, bankAccount: any, invoiceNumber: string): Uint8Array {
  const doc = new jsPDF()
  
  // Set font
  doc.setFont('helvetica')
  
  // Company header
  const companyName = shop?.company_name || 'Heizöl-Express GmbH'
  const companyAddress = shop?.company_address || 'Musterstraße 123'
  const companyPostcode = shop?.company_postcode || '12345'
  const companyCity = shop?.company_city || 'Berlin'
  const companyPhone = shop?.company_phone || '+49 30 12345678'
  const companyEmail = shop?.company_email || 'info@heizoel-express.de'
  const vatNumber = shop?.vat_number || 'DE123456789'
  
  // Header
  doc.setFontSize(18)
  doc.setTextColor(0, 0, 0)
  doc.text(companyName, 20, 20)
  
  doc.setFontSize(10)
  doc.text(`${companyAddress}`, 20, 30)
  doc.text(`${companyPostcode} ${companyCity}`, 20, 35)
  doc.text(`Tel: ${companyPhone}`, 20, 40)
  doc.text(`E-Mail: ${companyEmail}`, 20, 45)
  doc.text(`USt-IdNr: ${vatNumber}`, 20, 50)
  
  // Invoice title and info
  doc.setFontSize(16)
  doc.text('RECHNUNG', 140, 20)
  
  doc.setFontSize(10)
  const invoiceDate = new Date().toLocaleDateString('de-DE')
  doc.text(`Rechnungsnummer: ${invoiceNumber}`, 140, 30)
  doc.text(`Rechnungsdatum: ${invoiceDate}`, 140, 35)
  doc.text(`Bestellnummer: ${order.order_number}`, 140, 40)
  
  // Customer address
  doc.setFontSize(12)
  doc.text('Rechnungsanschrift:', 20, 70)
  doc.setFontSize(10)
  doc.text(order.customer_name, 20, 80)
  doc.text(order.delivery_street || order.customer_address, 20, 85)
  doc.text(`${order.delivery_postcode || ''} ${order.delivery_city || ''}`, 20, 90)
  
  // Delivery details
  doc.setFontSize(12)
  doc.text('Lieferdetails:', 20, 110)
  doc.setFontSize(10)
  const deliveryDate = order.delivery_date ? new Date(order.delivery_date).toLocaleDateString('de-DE') : 'TBD'
  doc.text(`Lieferadresse: ${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}`, 20, 120)
  doc.text(`Gewünschter Liefertermin: ${deliveryDate}`, 20, 125)
  doc.text(`Zahlungsart: ${order.payment_method}`, 20, 130)
  
  // Table header
  let yPos = 150
  doc.setFontSize(10)
  doc.setFillColor(245, 245, 245)
  doc.rect(20, yPos, 170, 8, 'F')
  doc.text('Pos.', 25, yPos + 5)
  doc.text('Beschreibung', 40, yPos + 5)
  doc.text('Menge', 100, yPos + 5)
  doc.text('Einheit', 120, yPos + 5)
  doc.text('Einzelpreis', 140, yPos + 5)
  doc.text('Gesamtpreis', 160, yPos + 5)
  
  // Table rows
  yPos += 10
  doc.text('1', 25, yPos + 5)
  doc.text(order.product || 'Heizöl Standard', 40, yPos + 5)
  doc.text(order.liters.toLocaleString(), 100, yPos + 5)
  doc.text('Liter', 120, yPos + 5)
  doc.text(`€${Number(order.price_per_liter).toFixed(2)}`, 140, yPos + 5)
  doc.text(`€${(order.liters * Number(order.price_per_liter)).toFixed(2)}`, 160, yPos + 5)
  
  yPos += 8
  doc.text('2', 25, yPos + 5)
  doc.text('Lieferkosten', 40, yPos + 5)
  doc.text('1', 100, yPos + 5)
  doc.text('Stück', 120, yPos + 5)
  doc.text(`€${Number(order.delivery_fee).toFixed(2)}`, 140, yPos + 5)
  doc.text(`€${Number(order.delivery_fee).toFixed(2)}`, 160, yPos + 5)
  
  if (Number(order.discount) > 0) {
    yPos += 8
    doc.text('3', 25, yPos + 5)
    doc.text('Rabatt', 40, yPos + 5)
    doc.text('1', 100, yPos + 5)
    doc.text('Stück', 120, yPos + 5)
    doc.text(`-€${Number(order.discount).toFixed(2)}`, 140, yPos + 5)
    doc.text(`-€${Number(order.discount).toFixed(2)}`, 160, yPos + 5)
  }
  
  // Totals
  yPos += 20
  const subtotal = order.liters * Number(order.price_per_liter) + Number(order.delivery_fee) - Number(order.discount)
  const vat = subtotal * 0.19
  
  doc.text('Zwischensumme:', 130, yPos)
  doc.text(`€${subtotal.toFixed(2)}`, 160, yPos)
  
  yPos += 6
  doc.text('MwSt. (19%):', 130, yPos)
  doc.text(`€${vat.toFixed(2)}`, 160, yPos)
  
  yPos += 6
  doc.setFont('helvetica', 'bold')
  doc.text('Gesamtbetrag:', 130, yPos)
  doc.text(`€${Number(order.total_amount).toFixed(2)}`, 160, yPos)
  doc.setFont('helvetica', 'normal')
  
  // Bank details if available
  if (bankAccount) {
    yPos += 20
    doc.setFontSize(12)
    doc.text('Bankverbindung:', 20, yPos)
    doc.setFontSize(10)
    yPos += 8
    doc.text(`Bank: ${bankAccount.bank_name}`, 20, yPos)
    yPos += 5
    doc.text(`Kontoinhaber: ${bankAccount.account_holder}`, 20, yPos)
    yPos += 5
    doc.text(`IBAN: ${bankAccount.iban}`, 20, yPos)
    if (bankAccount.bic) {
      yPos += 5
      doc.text(`BIC: ${bankAccount.bic}`, 20, yPos)
    }
    yPos += 5
    doc.text(`Verwendungszweck: ${invoiceNumber}`, 20, yPos)
  }
  
  // Notes if available
  if (order.notes) {
    yPos += 15
    doc.setFontSize(12)
    doc.text('Bemerkungen:', 20, yPos)
    doc.setFontSize(10)
    yPos += 8
    doc.text(order.notes, 20, yPos)
  }
  
  // Footer
  doc.setFontSize(8)
  doc.setTextColor(102, 102, 102)
  doc.text('Vielen Dank für Ihren Auftrag!', 20, 280)
  doc.text(`${companyName} • ${companyAddress} • ${companyPostcode} ${companyCity}`, 20, 285)
  doc.text(`Geschäftsführung: Max Mustermann • Handelsregister: HRB 12345 Berlin • USt-IdNr: ${vatNumber}`, 20, 290)
  
  // Convert to Uint8Array
  const pdfOutput = doc.output('arraybuffer')
  return new Uint8Array(pdfOutput)
}
