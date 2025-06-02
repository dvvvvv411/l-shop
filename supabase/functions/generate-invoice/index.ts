
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

    // Store the old status for history logging
    const oldStatus = order.status;

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

    // Check for existing invoice
    console.log('Checking for existing invoice...');
    const { data: existingInvoice, error: existingInvoiceError } = await supabaseClient
      .from('invoices')
      .select('*')
      .eq('order_id', orderId)
      .maybeSingle()

    if (existingInvoiceError) {
      console.error('Error checking for existing invoice:', existingInvoiceError);
      throw new Error('Failed to check for existing invoice')
    }

    let invoiceNumber = null
    let shouldReuseInvoiceNumber = false

    if (existingInvoice) {
      console.log('Found existing invoice:', existingInvoice.invoice_number);
      console.log('Cleaning up existing invoice...');
      
      // Store the existing invoice number to reuse it
      invoiceNumber = existingInvoice.invoice_number
      shouldReuseInvoiceNumber = true

      try {
        // 1. Delete old PDF file from storage if it exists
        if (existingInvoice.file_name) {
          console.log('Deleting old PDF file:', existingInvoice.file_name);
          const { error: deleteFileError } = await supabaseClient.storage
            .from('invoices')
            .remove([existingInvoice.file_name]);

          if (deleteFileError) {
            console.warn('Could not delete old PDF file:', deleteFileError);
            // Don't throw here, continue with the process
          } else {
            console.log('Old PDF file deleted successfully');
          }
        }

        // 2. Delete related bank account transactions
        console.log('Deleting related bank account transactions...');
        const { error: deleteTransactionsError } = await supabaseClient
          .from('bank_account_transactions')
          .delete()
          .eq('order_id', orderId);

        if (deleteTransactionsError) {
          console.warn('Could not delete bank account transactions:', deleteTransactionsError);
          // Don't throw here, continue with the process
        } else {
          console.log('Bank account transactions deleted successfully');
        }

        // 3. Delete the invoice record
        console.log('Deleting old invoice record...');
        const { error: deleteInvoiceError } = await supabaseClient
          .from('invoices')
          .delete()
          .eq('id', existingInvoice.id);

        if (deleteInvoiceError) {
          console.error('Failed to delete old invoice record:', deleteInvoiceError);
          throw new Error('Failed to delete old invoice record');
        }

        console.log('Old invoice record deleted successfully');

      } catch (cleanupError) {
        console.error('Error during cleanup:', cleanupError);
        throw new Error('Failed to clean up existing invoice: ' + cleanupError.message);
      }
    }

    // Generate invoice number if not reusing existing one
    if (!shouldReuseInvoiceNumber) {
      const { data: invoiceGen, error: invoiceGenError } = await supabaseClient
        .rpc('generate_invoice_number')

      if (invoiceGenError || !invoiceGen) {
        console.error('Invoice number generation error:', invoiceGenError);
        throw new Error('Failed to generate invoice number')
      }
      invoiceNumber = invoiceGen
    }

    console.log('Using invoice number:', invoiceNumber);

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

      // 2. Create new invoice record
      console.log('Creating new invoice record...');
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
      const newStatus = 'invoice_created';
      const { error: statusUpdateError } = await supabaseClient
        .from('orders')
        .update({ 
          status: newStatus,
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

      // 5. Log the status change in order_status_history
      console.log('Logging status change in history...');
      const { error: statusHistoryError } = await supabaseClient
        .from('order_status_history')
        .insert({
          order_id: orderId,
          old_status: oldStatus,
          new_status: newStatus,
          changed_by: 'System',
          notes: `Rechnung ${invoiceNumber} automatisch generiert`
        });

      if (statusHistoryError) {
        console.error('Error logging status change:', statusHistoryError);
        // Don't throw here as this is not critical for the invoice generation
        console.warn('Status change logging failed, but continuing with invoice generation');
      } else {
        console.log('Status change logged successfully');
      }

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
        wasReplaced: shouldReuseInvoiceNumber,
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
  
  // Define colors for the design - Changed primary color to green
  const primaryColor = [46, 213, 115] // Green (#2ed573)
  const accentColor = [229, 231, 235] // Light gray
  const textDark = [17, 24, 39] // Dark gray
  const textMuted = [107, 114, 128] // Muted gray
  
  // Set default font
  doc.setFont('helvetica')
  
  // Company header with background
  const companyName = shop?.company_name || 'Heizöl-Express GmbH'
  const companyAddress = shop?.company_address || 'Musterstraße 123'
  const companyPostcode = shop?.company_postcode || '12345'
  const companyCity = shop?.company_city || 'Berlin'
  const companyPhone = shop?.company_phone || '+49 30 12345678'
  const companyEmail = shop?.company_email || 'info@heizoel-express.de'
  const vatNumber = shop?.vat_number || 'DE123456789'
  
  // Header background
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, 210, 25, 'F')
  
  // Company name in header
  doc.setFontSize(20)
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.text(companyName, 15, 17)
  
  // Company details
  doc.setFontSize(9)
  doc.setTextColor(...textDark)
  doc.setFont('helvetica', 'normal')
  doc.text(`${companyAddress} • ${companyPostcode} ${companyCity}`, 15, 32)
  doc.text(`Tel: ${companyPhone} • E-Mail: ${companyEmail}`, 15, 37)
  doc.text(`USt-IdNr: ${vatNumber}`, 15, 42)
  
  // Invoice title with accent background
  doc.setFillColor(...accentColor)
  doc.rect(140, 25, 55, 20, 'F')
  doc.setFontSize(18)
  doc.setTextColor(...primaryColor)
  doc.setFont('helvetica', 'bold')
  doc.text('RECHNUNG', 145, 37)
  
  // Invoice info box (removed invoice number, kept date and order number)
  doc.setFillColor(250, 250, 250)
  doc.rect(140, 48, 55, 25, 'F')
  doc.setDrawColor(...accentColor)
  doc.rect(140, 48, 55, 25, 'S')
  
  doc.setFontSize(9)
  doc.setTextColor(...textDark)
  doc.setFont('helvetica', 'bold')
  const invoiceDate = new Date().toLocaleDateString('de-DE')
  
  doc.text('Rechnungsdatum:', 142, 54)
  doc.setFont('helvetica', 'normal')
  doc.text(invoiceDate, 142, 59)
  
  doc.setFont('helvetica', 'bold')
  doc.text('Bestellnummer:', 142, 65)
  doc.setFont('helvetica', 'normal')
  doc.text(order.order_number, 142, 70)
  
  // Customer address section
  doc.setFontSize(11)
  doc.setTextColor(...textDark)
  doc.setFont('helvetica', 'bold')
  doc.text('Rechnungsanschrift:', 15, 58)
  
  // Customer address box
  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(...accentColor)
  doc.rect(15, 62, 100, 25, 'FD')
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(order.customer_name, 18, 68)
  doc.text(order.delivery_street || order.customer_address, 18, 74)
  doc.text(`${order.delivery_postcode || ''} ${order.delivery_city || ''}`, 18, 80)
  
  // Delivery details section (removed delivery date)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Lieferdetails:', 15, 98)
  
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`Lieferadresse: ${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}`, 15, 105)
  doc.text(`Zahlungsart: ${order.payment_method}`, 15, 110)
  
  // Table header with improved styling
  let yPos = 125
  doc.setFillColor(...primaryColor)
  doc.rect(15, yPos, 180, 10, 'F')
  
  doc.setFontSize(9)
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.text('Pos.', 18, yPos + 7)
  doc.text('Beschreibung', 35, yPos + 7)
  doc.text('Menge', 90, yPos + 7)
  doc.text('Einheit', 110, yPos + 7)
  doc.text('Einzelpreis', 135, yPos + 7)
  doc.text('Gesamtpreis', 165, yPos + 7)
  
  // Table rows with alternating background
  yPos += 10
  let rowCount = 1
  
  // Product row
  if (rowCount % 2 === 0) {
    doc.setFillColor(250, 250, 250)
    doc.rect(15, yPos, 180, 8, 'F')
  }
  
  doc.setFontSize(9)
  doc.setTextColor(...textDark)
  doc.setFont('helvetica', 'normal')
  doc.text('1', 18, yPos + 5)
  doc.text(order.product || 'Heizöl Standard', 35, yPos + 5)
  doc.text(order.liters.toLocaleString(), 90, yPos + 5)
  doc.text('Liter', 110, yPos + 5)
  doc.text(`€${Number(order.price_per_liter).toFixed(2)}`, 135, yPos + 5)
  doc.text(`€${(order.liters * Number(order.price_per_liter)).toFixed(2)}`, 165, yPos + 5)
  
  // Delivery fee row
  yPos += 8
  rowCount++
  if (rowCount % 2 === 0) {
    doc.setFillColor(250, 250, 250)
    doc.rect(15, yPos, 180, 8, 'F')
  }
  
  doc.text('2', 18, yPos + 5)
  doc.text('Lieferkosten', 35, yPos + 5)
  doc.text('1', 90, yPos + 5)
  doc.text('Stück', 110, yPos + 5)
  doc.text(`€${Number(order.delivery_fee).toFixed(2)}`, 135, yPos + 5)
  doc.text(`€${Number(order.delivery_fee).toFixed(2)}`, 165, yPos + 5)
  
  // Discount row if applicable
  if (Number(order.discount) > 0) {
    yPos += 8
    rowCount++
    if (rowCount % 2 === 0) {
      doc.setFillColor(250, 250, 250)
      doc.rect(15, yPos, 180, 8, 'F')
    }
    
    doc.text('3', 18, yPos + 5)
    doc.text('Rabatt', 35, yPos + 5)
    doc.text('1', 90, yPos + 5)
    doc.text('Stück', 110, yPos + 5)
    doc.setTextColor(220, 38, 38) // Red for discount
    doc.text(`-€${Number(order.discount).toFixed(2)}`, 135, yPos + 5)
    doc.text(`-€${Number(order.discount).toFixed(2)}`, 165, yPos + 5)
    doc.setTextColor(...textDark) // Reset color
  }
  
  // Totals section with improved styling
  yPos += 20
  const subtotal = order.liters * Number(order.price_per_liter) + Number(order.delivery_fee) - Number(order.discount)
  const vat = subtotal * 0.19
  
  // Totals background
  doc.setFillColor(249, 250, 251)
  doc.rect(120, yPos - 5, 75, 25, 'F')
  doc.setDrawColor(...accentColor)
  doc.rect(120, yPos - 5, 75, 25, 'S')
  
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Zwischensumme:', 125, yPos + 2)
  doc.text(`€${subtotal.toFixed(2)}`, 175, yPos + 2)
  
  doc.text('MwSt. (19%):', 125, yPos + 8)
  doc.text(`€${vat.toFixed(2)}`, 175, yPos + 8)
  
  // Total amount with emphasis
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...primaryColor)
  doc.text('Gesamtbetrag:', 125, yPos + 16)
  doc.text(`€${Number(order.total_amount).toFixed(2)}`, 175, yPos + 16)
  doc.setTextColor(...textDark)
  doc.setFont('helvetica', 'normal')
  
  // Bank details section with improved styling
  if (bankAccount) {
    yPos += 35
    doc.setFillColor(...accentColor)
    doc.rect(15, yPos - 3, 180, 35, 'F')
    
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Bankverbindung:', 18, yPos + 3)
    
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text(`Bank: ${bankAccount.bank_name}`, 18, yPos + 10)
    doc.text(`Kontoinhaber: ${bankAccount.account_holder}`, 18, yPos + 15)
    doc.text(`IBAN: ${bankAccount.iban}`, 18, yPos + 20)
    if (bankAccount.bic) {
      doc.text(`BIC: ${bankAccount.bic}`, 18, yPos + 25)
    }
    doc.setFont('helvetica', 'bold')
    doc.text(`Bestellnummer: ${order.order_number}`, 18, yPos + 30)
    doc.setFont('helvetica', 'normal')
  }
  
  // Notes section if available
  if (order.notes) {
    yPos += bankAccount ? 45 : 25
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Bemerkungen:', 15, yPos)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text(order.notes, 15, yPos + 6)
  }
  
  // Footer with line separator and dynamic shop information
  doc.setDrawColor(...primaryColor)
  doc.setLineWidth(0.5)
  doc.line(15, 265, 195, 265)
  
  doc.setFontSize(8)
  doc.setTextColor(...textMuted)
  doc.text('Vielen Dank für Ihren Auftrag!', 15, 272)
  doc.text(`${companyName} • ${companyAddress} • ${companyPostcode} ${companyCity}`, 15, 277)
  
  // Dynamic footer information using shop data
  const businessOwner = shop?.business_owner || 'Max Mustermann'
  const courtName = shop?.court_name || 'Amtsgericht Berlin'
  const registrationNumber = shop?.registration_number || 'HRB 12345'
  
  doc.text(`Geschäftsführung: ${businessOwner} • ${courtName}: ${registrationNumber} • USt-IdNr: ${vatNumber}`, 15, 282)
  
  // Convert to Uint8Array
  const pdfOutput = doc.output('arraybuffer')
  return new Uint8Array(pdfOutput)
}
