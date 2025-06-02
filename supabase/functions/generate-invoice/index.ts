
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

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

    // Generate HTML content for the invoice
    const htmlContent = generateInvoiceHTML(order, shop, bankAccount, invoiceNumber)

    // Convert HTML to PDF using Puppeteer
    const pdfBuffer = await generatePDF(htmlContent)

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
        htmlContent,
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

function generateInvoiceHTML(order: any, shop: any, bankAccount: any, invoiceNumber: string): string {
  const invoiceDate = new Date().toLocaleDateString('de-DE')
  const deliveryDate = order.delivery_date ? new Date(order.delivery_date).toLocaleDateString('de-DE') : 'TBD'
  
  // Use shop data if available, otherwise fallback to default
  const companyName = shop?.company_name || 'Heizöl-Express GmbH'
  const companyAddress = shop?.company_address || 'Musterstraße 123'
  const companyPostcode = shop?.company_postcode || '12345'
  const companyCity = shop?.company_city || 'Berlin'
  const companyPhone = shop?.company_phone || '+49 30 12345678'
  const companyEmail = shop?.company_email || 'info@heizoel-express.de'
  const vatNumber = shop?.vat_number || 'DE123456789'

  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rechnung ${invoiceNumber}</title>
        <style>
            body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; margin: 0; padding: 20px; }
            .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .company-info { text-align: left; }
            .invoice-info { text-align: right; }
            .customer-address { margin: 20px 0; }
            .invoice-details { margin: 30px 0; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f5f5f5; font-weight: bold; }
            .total-row { font-weight: bold; background-color: #f9f9f9; }
            .footer { margin-top: 40px; font-size: 10px; color: #666; }
            .bank-details { margin-top: 20px; }
            @media print { body { margin: 0; padding: 15px; } }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="company-info">
                <h2>${companyName}</h2>
                <p>${companyAddress}<br>
                ${companyPostcode} ${companyCity}<br>
                Tel: ${companyPhone}<br>
                E-Mail: ${companyEmail}<br>
                USt-IdNr: ${vatNumber}</p>
            </div>
            <div class="invoice-info">
                <h1>RECHNUNG</h1>
                <p><strong>Rechnungsnummer:</strong> ${invoiceNumber}<br>
                <strong>Rechnungsdatum:</strong> ${invoiceDate}<br>
                <strong>Bestellnummer:</strong> ${order.order_number}</p>
            </div>
        </div>

        <div class="customer-address">
            <h3>Rechnungsanschrift:</h3>
            <p>${order.customer_name}<br>
            ${order.delivery_street}<br>
            ${order.delivery_postcode} ${order.delivery_city}</p>
        </div>

        <div class="invoice-details">
            <h3>Lieferdetails:</h3>
            <p><strong>Lieferadresse:</strong> ${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}<br>
            <strong>Gewünschter Liefertermin:</strong> ${deliveryDate}<br>
            <strong>Zahlungsart:</strong> ${order.payment_method}</p>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Pos.</th>
                    <th>Beschreibung</th>
                    <th>Menge</th>
                    <th>Einheit</th>
                    <th>Einzelpreis</th>
                    <th>Gesamtpreis</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>${order.product || 'Heizöl Standard'}</td>
                    <td>${order.liters.toLocaleString()}</td>
                    <td>Liter</td>
                    <td>€${Number(order.price_per_liter).toFixed(2)}</td>
                    <td>€${(order.liters * Number(order.price_per_liter)).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Lieferkosten</td>
                    <td>1</td>
                    <td>Stück</td>
                    <td>€${Number(order.delivery_fee).toFixed(2)}</td>
                    <td>€${Number(order.delivery_fee).toFixed(2)}</td>
                </tr>
                ${Number(order.discount) > 0 ? `
                <tr>
                    <td>3</td>
                    <td>Rabatt</td>
                    <td>1</td>
                    <td>Stück</td>
                    <td>-€${Number(order.discount).toFixed(2)}</td>
                    <td>-€${Number(order.discount).toFixed(2)}</td>
                </tr>
                ` : ''}
            </tbody>
        </table>

        <table style="margin-top: 20px;">
            <tr>
                <td style="text-align: right; padding-right: 20px;"><strong>Zwischensumme:</strong></td>
                <td style="text-align: right;"><strong>€${(order.liters * Number(order.price_per_liter) + Number(order.delivery_fee) - Number(order.discount)).toFixed(2)}</strong></td>
            </tr>
            <tr>
                <td style="text-align: right; padding-right: 20px;">MwSt. (19%):</td>
                <td style="text-align: right;">€${((order.liters * Number(order.price_per_liter) + Number(order.delivery_fee) - Number(order.discount)) * 0.19).toFixed(2)}</td>
            </tr>
            <tr class="total-row">
                <td style="text-align: right; padding-right: 20px;"><strong>Gesamtbetrag:</strong></td>
                <td style="text-align: right;"><strong>€${Number(order.total_amount).toFixed(2)}</strong></td>
            </tr>
        </table>

        ${bankAccount ? `
        <div class="bank-details">
            <h3>Bankverbindung:</h3>
            <p><strong>Bank:</strong> ${bankAccount.bank_name}<br>
            <strong>Kontoinhaber:</strong> ${bankAccount.account_holder}<br>
            <strong>IBAN:</strong> ${bankAccount.iban}<br>
            ${bankAccount.bic ? `<strong>BIC:</strong> ${bankAccount.bic}<br>` : ''}
            <strong>Verwendungszweck:</strong> ${invoiceNumber}</p>
        </div>
        ` : ''}

        ${order.notes ? `
        <div style="margin-top: 20px;">
            <h3>Bemerkungen:</h3>
            <p>${order.notes}</p>
        </div>
        ` : ''}

        <div class="footer">
            <p>Vielen Dank für Ihren Auftrag!<br>
            ${companyName} • ${companyAddress} • ${companyPostcode} ${companyCity}<br>
            Geschäftsführung: Max Mustermann • Handelsregister: HRB 12345 Berlin • USt-IdNr: ${vatNumber}</p>
        </div>
    </body>
    </html>
  `
}

async function generatePDF(htmlContent: string): Promise<Uint8Array> {
  // For now, we'll return the HTML as bytes since Puppeteer is complex to set up in Deno
  // In a production environment, you would use a PDF generation service
  const encoder = new TextEncoder()
  return encoder.encode(htmlContent)
}
