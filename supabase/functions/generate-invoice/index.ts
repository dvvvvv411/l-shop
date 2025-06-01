
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

    const { orderId, shopId, bankAccountId } = await req.json()
    
    if (!orderId) {
      throw new Error('Order ID is required')
    }

    console.log('Generating invoice for order:', orderId, 'with shop:', shopId, 'and bank account:', bankAccountId)

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

    // Get bank account data - either specified bank account or default or from shop
    let bankAccountSettings
    let bankAccountError

    if (bankAccountId) {
      // Use specified bank account
      const { data, error } = await supabase
        .from('bank_accounts')
        .select('*')
        .eq('id', bankAccountId)
        .single()
      bankAccountSettings = data
      bankAccountError = error
    } else {
      // Use default bank account
      const { data, error } = await supabase
        .from('bank_accounts')
        .select('*')
        .eq('is_default', true)
        .single()
      bankAccountSettings = data
      bankAccountError = error
    }

    // If bank account is found, override shop's bank information
    if (!bankAccountError && bankAccountSettings) {
      shopSettings.bank_name = bankAccountSettings.bank_name
      shopSettings.bank_iban = bankAccountSettings.iban
      shopSettings.bank_bic = bankAccountSettings.bic
    }

    // Use order number as invoice number - no need to generate new one
    const invoiceNumber = order.order_number

    // Update order with invoice date if not set
    if (!order.invoice_date) {
      await supabase
        .from('orders')
        .update({ 
          invoice_date: new Date().toISOString().split('T')[0]
        })
        .eq('id', orderId)
    }

    // Generate HTML content for PDF
    const htmlContent = generateInvoiceHTML(order, shopSettings, invoiceNumber)

    console.log('Invoice generated successfully for order:', orderId)

    return new Response(
      JSON.stringify({
        success: true,
        invoiceNumber,
        htmlContent,
        order,
        shopSettings,
        bankAccountSettings
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

function generateInvoiceHTML(order: any, shopSettings: any, invoiceNumber: string): string {
  const currentDate = new Date().toLocaleDateString('de-DE')
  const deliveryDate = order.delivery_date ? new Date(order.delivery_date).toLocaleDateString('de-DE') : null
  
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
                font-family: 'Arial', sans-serif;
                font-size: 10pt;
                line-height: 1.4;
                color: #000;
                background: #ffffff;
            }
            
            .invoice-container {
                width: 190mm;
                min-height: 277mm;
                margin: 0 auto;
                padding: 15mm;
                position: relative;
                background: #ffffff;
            }
            
            /* Simple Header */
            .header {
                border-bottom: 2px solid #000;
                padding-bottom: 8mm;
                margin-bottom: 8mm;
            }
            
            .header-content {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            
            .company-info h1 {
                font-size: 18pt;
                font-weight: bold;
                margin-bottom: 3mm;
                color: #000;
            }
            
            .company-info p {
                font-size: 9pt;
                margin-bottom: 1mm;
                line-height: 1.3;
            }
            
            .invoice-meta {
                text-align: right;
                border: 1px solid #000;
                padding: 6mm;
                min-width: 60mm;
            }
            
            .invoice-meta h2 {
                font-size: 16pt;
                font-weight: bold;
                margin-bottom: 4mm;
                color: #000;
            }
            
            .invoice-details p {
                font-size: 9pt;
                margin-bottom: 2mm;
                display: flex;
                justify-content: space-between;
                gap: 8mm;
            }
            
            .invoice-details strong {
                font-weight: bold;
            }
            
            /* Customer Section */
            .customer-section {
                margin: 8mm 0;
            }
            
            .address-card {
                border: 1px solid #000;
                padding: 6mm;
                width: 85mm;
            }
            
            .address-label {
                font-size: 8pt;
                font-weight: bold;
                margin-bottom: 3mm;
                text-transform: uppercase;
                color: #000;
            }
            
            .return-address {
                font-size: 7pt;
                margin-bottom: 4mm;
                padding-bottom: 2mm;
                border-bottom: 1px solid #ccc;
                line-height: 1.2;
            }
            
            .customer-address {
                font-size: 10pt;
                line-height: 1.4;
                color: #000;
            }
            
            .customer-address strong {
                font-weight: bold;
                font-size: 11pt;
                display: block;
                margin-bottom: 2mm;
            }
            
            /* Simple Info Section */
            .invoice-info {
                margin: 8mm 0;
                padding: 4mm;
                border: 1px solid #000;
                background: #f8f8f8;
            }
            
            .info-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 4mm;
            }
            
            .info-item {
                font-size: 9pt;
            }
            
            .info-label {
                font-weight: bold;
                color: #000;
            }
            
            .info-value {
                color: #000;
            }
            
            /* Table */
            .table-section {
                margin: 8mm 0;
                border: 1px solid #000;
            }
            
            .items-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 9pt;
            }
            
            .items-table th {
                background: #000;
                color: white;
                padding: 3mm;
                text-align: left;
                font-weight: bold;
                border-bottom: 1px solid #000;
            }
            
            .items-table th.text-right {
                text-align: right;
            }
            
            .items-table th.text-center {
                text-align: center;
            }
            
            .items-table td {
                padding: 3mm;
                border-bottom: 1px solid #ccc;
                vertical-align: top;
            }
            
            .items-table .text-right {
                text-align: right;
                font-weight: bold;
            }
            
            .items-table .text-center {
                text-align: center;
            }
            
            .items-table tbody tr:nth-child(even) {
                background: #f8f8f8;
            }
            
            .items-table .product-name {
                font-weight: bold;
                margin-bottom: 1mm;
            }
            
            .items-table small {
                font-size: 8pt;
                color: #666;
                display: block;
                margin-top: 1mm;
                font-style: italic;
            }
            
            /* Summary */
            .summary-section {
                margin: 8mm 0;
                display: flex;
                justify-content: flex-end;
            }
            
            .summary-card {
                border: 1px solid #000;
                min-width: 70mm;
            }
            
            .summary-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 10pt;
            }
            
            .summary-table td {
                padding: 3mm;
                border-bottom: 1px solid #ccc;
            }
            
            .summary-table .label {
                font-weight: bold;
            }
            
            .summary-table .value {
                text-align: right;
                font-weight: bold;
            }
            
            .summary-table .total-row {
                background: #000;
                color: white;
                font-weight: bold;
                font-size: 11pt;
            }
            
            .summary-table .total-row td {
                border-bottom: none;
            }
            
            /* Payment Section */
            .payment-section {
                margin: 8mm 0;
                border: 2px solid #000;
                padding: 6mm;
                background: #f0f0f0;
            }
            
            .payment-section h3 {
                font-size: 12pt;
                font-weight: bold;
                margin-bottom: 4mm;
                color: #000;
            }
            
            .payment-section p {
                margin-bottom: 2mm;
                font-size: 9pt;
                line-height: 1.4;
            }
            
            .bank-details {
                background: white;
                padding: 4mm;
                border: 1px solid #000;
                margin-top: 4mm;
            }
            
            .bank-details p {
                margin-bottom: 1.5mm;
                font-size: 9pt;
                font-weight: bold;
            }
            
            /* Footer */
            .footer {
                position: absolute;
                bottom: 15mm;
                left: 15mm;
                right: 15mm;
                border-top: 1px solid #000;
                padding-top: 4mm;
                font-size: 8pt;
                color: #000;
            }
            
            .footer-grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 8mm;
            }
            
            .footer-column h4 {
                font-size: 8pt;
                font-weight: bold;
                margin-bottom: 2mm;
                text-transform: uppercase;
            }
            
            .footer-column p {
                margin-bottom: 1mm;
                line-height: 1.3;
            }
            
            /* Print Optimizations */
            @media print {
                body { 
                    print-color-adjust: exact;
                    -webkit-print-color-adjust: exact;
                }
                
                .invoice-container {
                    margin: 0;
                    padding: 10mm;
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
            <div class="header">
                <div class="header-content">
                    <div class="company-info">
                        <h1>${shopSettings.company_name}</h1>
                        <p>${shopSettings.company_address}</p>
                        <p>${shopSettings.company_postcode} ${shopSettings.company_city}</p>
                        ${shopSettings.company_phone ? `<p>Tel: ${shopSettings.company_phone}</p>` : ''}
                        ${shopSettings.company_email ? `<p>E-Mail: ${shopSettings.company_email}</p>` : ''}
                        ${shopSettings.company_website ? `<p>Web: ${shopSettings.company_website}</p>` : ''}
                    </div>
                    
                    <div class="invoice-meta">
                        <h2>RECHNUNG</h2>
                        <div class="invoice-details">
                            <p><strong>Nr.:</strong><span>${invoiceNumber}</span></p>
                            <p><strong>Datum:</strong><span>${currentDate}</span></p>
                            <p><strong>Kunde:</strong><span>${order.id.substring(0, 8)}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Customer Address -->
            <div class="customer-section">
                <div class="address-card">
                    <div class="address-label">Rechnungsadresse</div>
                    <div class="return-address">
                        ${shopSettings.company_name} • ${shopSettings.company_address} • ${shopSettings.company_postcode} ${shopSettings.company_city}
                    </div>
                    <div class="customer-address">
                        <strong>${order.customer_name}</strong>
                        ${order.billing_street || order.delivery_street || order.customer_address}<br>
                        ${order.billing_postcode || order.delivery_postcode} ${order.billing_city || order.delivery_city}
                    </div>
                </div>
            </div>
            
            <!-- Invoice Information -->
            ${deliveryDate ? `
            <div class="invoice-info">
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Lieferdatum:</span><br>
                        <span class="info-value">${deliveryDate}</span>
                    </div>
                </div>
            </div>
            ` : ''}
            
            <!-- Items Table -->
            <div class="table-section">
                <table class="items-table">
                    <thead>
                        <tr>
                            <th style="width: 8%;">Pos.</th>
                            <th style="width: 46%;">Leistung</th>
                            <th style="width: 12%;" class="text-right">Menge</th>
                            <th style="width: 8%;">Einheit</th>
                            <th style="width: 12%;" class="text-right">Einzelpreis</th>
                            <th style="width: 6%;" class="text-center">MwSt.</th>
                            <th style="width: 14%;" class="text-right">Gesamtpreis</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1</strong></td>
                            <td>
                                <div class="product-name">${order.product || 'Premium Heizöl'}</div>
                                ${deliveryDate ? `<small>Lieferung am ${deliveryDate}</small>` : ''}
                                ${order.delivery_street ? `<small>${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}</small>` : ''}
                            </td>
                            <td class="text-right">${order.liters.toLocaleString('de-DE')}</td>
                            <td>Liter</td>
                            <td class="text-right">€ ${(order.price_per_liter / 1.19).toFixed(2)}</td>
                            <td class="text-center">19%</td>
                            <td class="text-right">€ ${netProductAmount.toFixed(2)}</td>
                        </tr>
                        ${order.delivery_fee > 0 ? `
                        <tr>
                            <td><strong>2</strong></td>
                            <td>
                                <div class="product-name">Lieferung & Transport</div>
                                <small>Professionelle Anlieferung</small>
                            </td>
                            <td class="text-right">1</td>
                            <td>Service</td>
                            <td class="text-right">€ ${netDeliveryFee.toFixed(2)}</td>
                            <td class="text-center">19%</td>
                            <td class="text-right">€ ${netDeliveryFee.toFixed(2)}</td>
                        </tr>
                        ` : ''}
                        ${order.discount > 0 ? `
                        <tr>
                            <td></td>
                            <td>
                                <div class="product-name">Sonderrabatt</div>
                                <small>Vielen Dank für Ihr Vertrauen</small>
                            </td>
                            <td class="text-right">1</td>
                            <td>Rabatt</td>
                            <td class="text-right">-€ ${netDiscount.toFixed(2)}</td>
                            <td class="text-center">19%</td>
                            <td class="text-right">-€ ${netDiscount.toFixed(2)}</td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>
            
            <!-- Summary -->
            <div class="summary-section">
                <div class="summary-card">
                    <table class="summary-table">
                        <tr>
                            <td class="label">Nettobetrag:</td>
                            <td class="value">€ ${netTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td class="label">MwSt. (19%):</td>
                            <td class="value">€ ${vatAmount.toFixed(2)}</td>
                        </tr>
                        <tr class="total-row">
                            <td><strong>GESAMTBETRAG</strong></td>
                            <td><strong>€ ${grossTotal.toFixed(2)}</strong></td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <!-- Payment Section -->
            ${order.payment_method === 'vorkasse' && shopSettings.bank_iban ? `
            <div class="payment-section">
                <h3>Zahlungsinformationen</h3>
                <p><strong>Bitte überweisen Sie den Rechnungsbetrag auf folgendes Konto:</strong></p>
                
                <div class="bank-details">
                    <p><strong>Bank:</strong> ${shopSettings.bank_name || 'Unsere Hausbank'}</p>
                    <p><strong>IBAN:</strong> ${shopSettings.bank_iban}</p>
                    ${shopSettings.bank_bic ? `<p><strong>BIC:</strong> ${shopSettings.bank_bic}</p>` : ''}
                    <p><strong>Verwendungszweck:</strong> ${invoiceNumber}</p>
                    <p><strong>Betrag:</strong> € ${grossTotal.toFixed(2)}</p>
                </div>
                
                <p style="margin-top: 4mm;"><strong>Der Rechnungsbetrag ist sofort nach Erhalt fällig.</strong></p>
            </div>
            ` : ''}
            
            <!-- Footer -->
            <div class="footer">
                <div class="footer-grid">
                    <div class="footer-column">
                        <h4>Kontakt</h4>
                        <p><strong>${shopSettings.company_name}</strong></p>
                        <p>${shopSettings.company_address}</p>
                        <p>${shopSettings.company_postcode} ${shopSettings.company_city}</p>
                        ${shopSettings.company_phone ? `<p>Tel: ${shopSettings.company_phone}</p>` : ''}
                        ${shopSettings.company_email ? `<p>E-Mail: ${shopSettings.company_email}</p>` : ''}
                    </div>
                    
                    <div class="footer-column">
                        <h4>Steuerdaten</h4>
                        ${shopSettings.tax_number ? `<p>Steuernr.: ${shopSettings.tax_number}</p>` : ''}
                        ${shopSettings.vat_number ? `<p>USt-IdNr.: ${shopSettings.vat_number}</p>` : ''}
                        <p>Lieferung gem. § 13b UStG</p>
                    </div>
                    
                    <div class="footer-column">
                        <h4>Zahlung</h4>
                        ${shopSettings.bank_name ? `<p>${shopSettings.bank_name}</p>` : ''}
                        ${shopSettings.bank_iban ? `<p>IBAN: ${shopSettings.bank_iban}</p>` : ''}
                        <p>Zahlbar sofort ohne Abzug</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `
}
