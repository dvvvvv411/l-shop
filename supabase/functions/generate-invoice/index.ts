
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { orderId, shopId } = await req.json()
    
    if (!orderId) {
      throw new Error('Order ID is required')
    }

    console.log('Generating invoice for order:', orderId, 'with shop:', shopId)

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      throw new Error('Order not found')
    }

    // Get shop data - either specified shop or from order, or default shop
    let shopSettings
    let shopError

    if (shopId) {
      // Use specified shop
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('id', shopId)
        .eq('is_active', true)
        .single()
      shopSettings = data
      shopError = error
    } else if (order.shop_id) {
      // Use shop from order
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('id', order.shop_id)
        .eq('is_active', true)
        .single()
      shopSettings = data
      shopError = error
    } else {
      // Use default shop
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('is_default', true)
        .eq('is_active', true)
        .single()
      shopSettings = data
      shopError = error
    }

    // Fallback to shop_settings table if no shop found
    if (shopError || !shopSettings) {
      console.log('No shop found, falling back to shop_settings')
      const { data: fallbackSettings, error: settingsError } = await supabase
        .from('shop_settings')
        .select('*')
        .limit(1)
        .single()

      if (settingsError || !fallbackSettings) {
        throw new Error('No shop settings found')
      }
      
      // Convert shop_settings to shop format
      shopSettings = {
        id: 'fallback',
        name: 'Hauptgeschäft',
        company_name: fallbackSettings.company_name,
        company_address: fallbackSettings.company_address,
        company_postcode: fallbackSettings.company_postcode,
        company_city: fallbackSettings.company_city,
        company_phone: fallbackSettings.company_phone,
        company_email: fallbackSettings.company_email,
        company_website: fallbackSettings.company_website,
        tax_number: fallbackSettings.tax_number,
        vat_number: fallbackSettings.vat_number,
        bank_name: fallbackSettings.bank_name,
        bank_iban: fallbackSettings.bank_iban,
        bank_bic: fallbackSettings.bank_bic,
      }
    }

    // Generate invoice number if not exists
    let invoiceNumber = order.invoice_number
    if (!invoiceNumber) {
      const { data: newInvoiceNumber, error: invoiceError } = await supabase
        .rpc('generate_invoice_number')

      if (invoiceError) {
        throw new Error('Failed to generate invoice number')
      }

      invoiceNumber = newInvoiceNumber

      // Update order with invoice number and shop info
      const updateData = { 
        invoice_number: invoiceNumber,
        invoice_date: new Date().toISOString().split('T')[0]
      }
      
      // Add shop_id if we have one and it's not already set
      if (shopSettings.id !== 'fallback' && !order.shop_id) {
        updateData.shop_id = shopSettings.id
      }

      await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)
    }

    // Generate HTML content for PDF
    const htmlContent = generateProfessionalInvoiceHTML(order, shopSettings, invoiceNumber)

    console.log('Invoice generated successfully for order:', orderId)

    return new Response(
      JSON.stringify({
        success: true,
        invoiceNumber,
        htmlContent,
        order,
        shopSettings
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error generating invoice:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

function generateProfessionalInvoiceHTML(order: any, shopSettings: any, invoiceNumber: string): string {
  const currentDate = new Date().toLocaleDateString('de-DE')
  const deliveryDate = order.delivery_date ? new Date(order.delivery_date).toLocaleDateString('de-DE') : 'Nach Vereinbarung'
  
  // Calculate prices correctly - assuming total_amount includes VAT
  const grossTotal = order.total_amount
  const netTotal = grossTotal / 1.19
  const vatAmount = grossTotal - netTotal
  
  const netProductAmount = (order.liters * order.price_per_liter) / 1.19
  const netDeliveryFee = (order.delivery_fee || 0) / 1.19
  const netDiscount = (order.discount || 0) / 1.19

  return `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="utf-8">
        <title>Rechnung ${invoiceNumber}</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', 'Helvetica', sans-serif;
                font-size: 10pt;
                line-height: 1.4;
                color: #000;
                background: #fff;
            }
            
            .invoice-container {
                width: 210mm;
                min-height: 297mm;
                margin: 0 auto;
                padding: 20mm;
                position: relative;
            }
            
            /* Header */
            .header {
                border-bottom: 2px solid #333;
                padding-bottom: 15mm;
                margin-bottom: 10mm;
            }
            
            .company-info {
                float: left;
                width: 60%;
            }
            
            .company-info h1 {
                font-size: 18pt;
                font-weight: bold;
                color: #333;
                margin-bottom: 3mm;
            }
            
            .company-info p {
                font-size: 9pt;
                margin-bottom: 1mm;
                color: #666;
            }
            
            .invoice-meta {
                float: right;
                width: 35%;
                text-align: right;
            }
            
            .invoice-meta h2 {
                font-size: 20pt;
                font-weight: bold;
                color: #333;
                margin-bottom: 5mm;
            }
            
            .invoice-details {
                background: #f8f9fa;
                padding: 5mm;
                border: 1px solid #ddd;
            }
            
            .invoice-details p {
                font-size: 9pt;
                margin-bottom: 2mm;
            }
            
            .clearfix::after {
                content: "";
                display: table;
                clear: both;
            }
            
            /* Customer Address */
            .customer-section {
                margin: 15mm 0;
            }
            
            .address-window {
                border: 1px solid #333;
                width: 85mm;
                height: 45mm;
                padding: 5mm;
                position: relative;
            }
            
            .return-address {
                font-size: 7pt;
                border-bottom: 1px solid #ccc;
                padding-bottom: 2mm;
                margin-bottom: 3mm;
                color: #666;
            }
            
            .customer-address {
                font-size: 10pt;
                line-height: 1.3;
            }
            
            .customer-address strong {
                font-weight: bold;
            }
            
            /* Invoice Details Grid */
            .invoice-info-grid {
                display: table;
                width: 100%;
                margin: 10mm 0;
            }
            
            .info-row {
                display: table-row;
            }
            
            .info-label {
                display: table-cell;
                width: 30%;
                padding: 2mm 0;
                font-weight: bold;
                vertical-align: top;
            }
            
            .info-value {
                display: table-cell;
                padding: 2mm 0;
                vertical-align: top;
            }
            
            /* Items Table */
            .items-table {
                width: 100%;
                border-collapse: collapse;
                margin: 10mm 0;
                font-size: 9pt;
            }
            
            .items-table th {
                background: #333;
                color: white;
                padding: 3mm;
                text-align: left;
                font-weight: bold;
                border: 1px solid #333;
            }
            
            .items-table th.text-right {
                text-align: right;
            }
            
            .items-table td {
                padding: 3mm;
                border: 1px solid #ddd;
                vertical-align: top;
            }
            
            .items-table .text-right {
                text-align: right;
            }
            
            .items-table .text-center {
                text-align: center;
            }
            
            .items-table tbody tr:nth-child(even) {
                background: #f9f9f9;
            }
            
            /* Summary Table */
            .summary-table {
                width: 50%;
                float: right;
                border-collapse: collapse;
                margin: 5mm 0;
                font-size: 9pt;
            }
            
            .summary-table td {
                padding: 2mm 5mm;
                border: 1px solid #ddd;
            }
            
            .summary-table .label {
                font-weight: bold;
                background: #f8f9fa;
            }
            
            .summary-table .total-row {
                background: #333;
                color: white;
                font-weight: bold;
                font-size: 10pt;
            }
            
            /* Payment Terms */
            .payment-section {
                clear: both;
                margin: 15mm 0;
                padding: 5mm;
                background: #f8f9fa;
                border: 1px solid #ddd;
            }
            
            .payment-section h3 {
                font-size: 11pt;
                font-weight: bold;
                margin-bottom: 3mm;
                color: #333;
            }
            
            .payment-section p {
                margin-bottom: 2mm;
                font-size: 9pt;
            }
            
            /* Footer */
            .footer {
                position: absolute;
                bottom: 15mm;
                left: 20mm;
                right: 20mm;
                border-top: 1px solid #333;
                padding-top: 5mm;
                font-size: 7pt;
                color: #666;
            }
            
            .footer-grid {
                display: table;
                width: 100%;
            }
            
            .footer-column {
                display: table-cell;
                width: 33.33%;
                vertical-align: top;
                padding-right: 5mm;
            }
            
            .footer-column h4 {
                font-size: 8pt;
                font-weight: bold;
                margin-bottom: 2mm;
                color: #333;
            }
            
            .footer-column p {
                margin-bottom: 1mm;
            }
            
            /* Print Styles */
            @media print {
                body { 
                    print-color-adjust: exact;
                    -webkit-print-color-adjust: exact;
                }
                .invoice-container {
                    margin: 0;
                    padding: 15mm;
                }
                @page {
                    margin: 0;
                    size: A4;
                }
            }
        </style>
    </head>
    <body>
        <div class="invoice-container">
            <!-- Header -->
            <div class="header clearfix">
                <div class="company-info">
                    <h1>${shopSettings.company_name}</h1>
                    <p>${shopSettings.company_address}</p>
                    <p>${shopSettings.company_postcode} ${shopSettings.company_city}</p>
                    ${shopSettings.company_phone ? `<p>Telefon: ${shopSettings.company_phone}</p>` : ''}
                    ${shopSettings.company_email ? `<p>E-Mail: ${shopSettings.company_email}</p>` : ''}
                    ${shopSettings.company_website ? `<p>Web: ${shopSettings.company_website}</p>` : ''}
                </div>
                
                <div class="invoice-meta">
                    <h2>RECHNUNG</h2>
                    <div class="invoice-details">
                        <p><strong>Rechnungsnummer:</strong> ${invoiceNumber}</p>
                        <p><strong>Rechnungsdatum:</strong> ${currentDate}</p>
                        <p><strong>Bestellnummer:</strong> ${order.order_number}</p>
                        <p><strong>Kundennummer:</strong> ${order.id.substring(0, 8)}</p>
                    </div>
                </div>
            </div>
            
            <!-- Customer Address -->
            <div class="customer-section">
                <div class="address-window">
                    <div class="return-address">
                        ${shopSettings.company_name} • ${shopSettings.company_address} • ${shopSettings.company_postcode} ${shopSettings.company_city}
                    </div>
                    <div class="customer-address">
                        <strong>${order.customer_name}</strong><br>
                        ${order.billing_street || order.delivery_street || order.customer_address}<br>
                        ${order.billing_postcode || order.delivery_postcode} ${order.billing_city || order.delivery_city}
                    </div>
                </div>
            </div>
            
            <!-- Invoice Information -->
            <div class="invoice-info-grid">
                <div class="info-row">
                    <div class="info-label">Lieferdatum:</div>
                    <div class="info-value">${deliveryDate}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Zahlungsart:</div>
                    <div class="info-value">${order.payment_method === 'vorkasse' ? 'Vorkasse' : order.payment_method || 'Vorkasse'}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Zahlungsziel:</div>
                    <div class="info-value">Sofort rein netto ohne Abzug</div>
                </div>
            </div>
            
            <!-- Items Table -->
            <table class="items-table">
                <thead>
                    <tr>
                        <th style="width: 8%;">Pos.</th>
                        <th style="width: 40%;">Bezeichnung</th>
                        <th style="width: 12%;" class="text-right">Menge</th>
                        <th style="width: 8%;">Einheit</th>
                        <th style="width: 12%;" class="text-right">Einzelpreis (netto)</th>
                        <th style="width: 8%;" class="text-center">MwSt.</th>
                        <th style="width: 12%;" class="text-right">Gesamtpreis (netto)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>1</strong></td>
                        <td>
                            <strong>${order.product || 'Standard Heizöl'}</strong><br>
                            <small>Lieferung am ${deliveryDate}</small>
                            ${order.delivery_street ? `<br><small>Lieferadresse: ${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}</small>` : ''}
                        </td>
                        <td class="text-right">${order.liters.toLocaleString('de-DE')}</td>
                        <td>Liter</td>
                        <td class="text-right">€ ${(order.price_per_liter / 1.19).toFixed(4)}</td>
                        <td class="text-center">19%</td>
                        <td class="text-right">€ ${netProductAmount.toFixed(2)}</td>
                    </tr>
                    ${order.delivery_fee > 0 ? `
                    <tr>
                        <td><strong>2</strong></td>
                        <td><strong>Lieferung und Transport</strong></td>
                        <td class="text-right">1</td>
                        <td>Pauschal</td>
                        <td class="text-right">€ ${netDeliveryFee.toFixed(2)}</td>
                        <td class="text-center">19%</td>
                        <td class="text-right">€ ${netDeliveryFee.toFixed(2)}</td>
                    </tr>
                    ` : ''}
                    ${order.discount > 0 ? `
                    <tr>
                        <td></td>
                        <td><strong>Rabatt</strong></td>
                        <td class="text-right">1</td>
                        <td>Pauschal</td>
                        <td class="text-right">-€ ${netDiscount.toFixed(2)}</td>
                        <td class="text-center">19%</td>
                        <td class="text-right">-€ ${netDiscount.toFixed(2)}</td>
                    </tr>
                    ` : ''}
                </tbody>
            </table>
            
            <!-- Summary -->
            <table class="summary-table">
                <tr>
                    <td class="label">Netto-Betrag:</td>
                    <td class="text-right">€ ${netTotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td class="label">MwSt. 19%:</td>
                    <td class="text-right">€ ${vatAmount.toFixed(2)}</td>
                </tr>
                <tr class="total-row">
                    <td><strong>Rechnungsbetrag:</strong></td>
                    <td class="text-right"><strong>€ ${grossTotal.toFixed(2)}</strong></td>
                </tr>
            </table>
            
            <!-- Payment Information -->
            ${order.payment_method === 'vorkasse' && shopSettings.bank_iban ? `
            <div class="payment-section">
                <h3>Zahlungsinformationen</h3>
                <p><strong>Bitte überweisen Sie den Rechnungsbetrag auf folgendes Konto:</strong></p>
                <p><strong>Bankverbindung:</strong> ${shopSettings.bank_name || 'Unsere Bank'}</p>
                <p><strong>IBAN:</strong> ${shopSettings.bank_iban}</p>
                ${shopSettings.bank_bic ? `<p><strong>BIC:</strong> ${shopSettings.bank_bic}</p>` : ''}
                <p><strong>Verwendungszweck:</strong> ${invoiceNumber}</p>
                <p><em>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</em></p>
            </div>
            ` : ''}
            
            <div class="clearfix"></div>
            
            <!-- Footer -->
            <div class="footer">
                <div class="footer-grid">
                    <div class="footer-column">
                        <h4>Kontakt</h4>
                        <p>${shopSettings.company_name}</p>
                        <p>${shopSettings.company_address}</p>
                        <p>${shopSettings.company_postcode} ${shopSettings.company_city}</p>
                        ${shopSettings.company_phone ? `<p>Tel: ${shopSettings.company_phone}</p>` : ''}
                        ${shopSettings.company_email ? `<p>E-Mail: ${shopSettings.company_email}</p>` : ''}
                    </div>
                    
                    <div class="footer-column">
                        <h4>Steuerdaten</h4>
                        ${shopSettings.tax_number ? `<p>Steuernummer: ${shopSettings.tax_number}</p>` : ''}
                        ${shopSettings.vat_number ? `<p>USt-IdNr.: ${shopSettings.vat_number}</p>` : ''}
                        <p>Lieferungen sind steuerpflichtig</p>
                        <p>nach § 13b UStG</p>
                    </div>
                    
                    <div class="footer-column">
                        <h4>Zahlungskonditionen</h4>
                        <p>Zahlbar sofort rein netto ohne Abzug</p>
                        <p>Bei Verzug 8% p.a. über Basiszins</p>
                        <p>Erfüllungsort: ${shopSettings.company_city}</p>
                        <p>Gerichtsstand: ${shopSettings.company_city}</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `
}
