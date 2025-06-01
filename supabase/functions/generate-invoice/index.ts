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
    const htmlContent = generateModernInvoiceHTML(order, shopSettings, invoiceNumber)

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

function generateModernInvoiceHTML(order: any, shopSettings: any, invoiceNumber: string): string {
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
                font-family: 'Segoe UI', 'Inter', 'Helvetica Neue', Arial, sans-serif;
                font-size: 10pt;
                line-height: 1.4;
                color: #1f2937;
                background: #ffffff;
                -webkit-font-smoothing: antialiased;
            }
            
            .invoice-container {
                width: 190mm;
                min-height: 270mm;
                margin: 0 auto;
                padding: 12mm;
                position: relative;
                background: #ffffff;
            }
            
            /* Modern Header with Gradient */
            .header {
                background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
                color: white;
                padding: 8mm;
                margin: -12mm -12mm 8mm -12mm;
                border-radius: 0 0 4mm 4mm;
                position: relative;
                overflow: hidden;
            }
            
            .header::before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 100px;
                height: 100px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                transform: translate(30px, -30px);
            }
            
            .header-content {
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 6mm;
                align-items: start;
                position: relative;
                z-index: 1;
            }
            
            .company-info h1 {
                font-size: 18pt;
                font-weight: 700;
                margin-bottom: 3mm;
                letter-spacing: -0.5px;
            }
            
            .company-info p {
                font-size: 9pt;
                margin-bottom: 1mm;
                opacity: 0.95;
                line-height: 1.3;
            }
            
            .invoice-meta {
                text-align: right;
                background: rgba(255, 255, 255, 0.15);
                padding: 4mm;
                border-radius: 3mm;
                backdrop-filter: blur(10px);
            }
            
            .invoice-meta h2 {
                font-size: 20pt;
                font-weight: 800;
                margin-bottom: 3mm;
                letter-spacing: -0.5px;
            }
            
            .invoice-details p {
                font-size: 8.5pt;
                margin-bottom: 1.5mm;
                display: flex;
                justify-content: space-between;
                gap: 4mm;
            }
            
            .invoice-details strong {
                font-weight: 600;
            }
            
            /* Modern Card-based Customer Section */
            .customer-section {
                margin: 6mm 0;
            }
            
            .address-card {
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 3mm;
                padding: 5mm;
                width: 80mm;
                position: relative;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            
            .address-card::before {
                content: 'RECHNUNGSADRESSE';
                position: absolute;
                top: -1mm;
                left: 3mm;
                background: #ffffff;
                color: #64748b;
                font-size: 7pt;
                font-weight: 600;
                padding: 0 2mm;
                letter-spacing: 0.5px;
            }
            
            .return-address {
                font-size: 6pt;
                color: #64748b;
                margin-bottom: 3mm;
                padding-bottom: 2mm;
                border-bottom: 1px solid #e2e8f0;
                line-height: 1.2;
            }
            
            .customer-address {
                font-size: 10pt;
                line-height: 1.4;
                color: #1f2937;
            }
            
            .customer-address strong {
                font-weight: 700;
                font-size: 11pt;
                display: block;
                margin-bottom: 2mm;
                color: #111827;
            }
            
            /* Stylish Info Grid */
            .invoice-info {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(60mm, 1fr));
                gap: 4mm;
                margin: 6mm 0;
                padding: 4mm;
                background: linear-gradient(135deg, #f1f5f9 0%, #f8fafc 100%);
                border-radius: 3mm;
                border-left: 4px solid #3b82f6;
            }
            
            .info-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 9pt;
                padding: 1mm 0;
            }
            
            .info-label {
                font-weight: 600;
                color: #475569;
            }
            
            .info-value {
                font-weight: 500;
                color: #1e293b;
            }
            
            /* Modern Table Design */
            .table-section {
                margin: 8mm 0;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                border-radius: 3mm;
                overflow: hidden;
            }
            
            .items-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 8.5pt;
                background: white;
            }
            
            .items-table th {
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                color: white;
                padding: 3mm 2mm;
                text-align: left;
                font-weight: 600;
                font-size: 8.5pt;
                letter-spacing: 0.3px;
            }
            
            .items-table th.text-right {
                text-align: right;
            }
            
            .items-table th.text-center {
                text-align: center;
            }
            
            .items-table td {
                padding: 3mm 2mm;
                border-bottom: 1px solid #e2e8f0;
                vertical-align: top;
                font-size: 8.5pt;
                line-height: 1.3;
            }
            
            .items-table .text-right {
                text-align: right;
                font-weight: 500;
            }
            
            .items-table .text-center {
                text-align: center;
            }
            
            .items-table tbody tr:hover {
                background: #f8fafc;
            }
            
            .items-table tbody tr:last-child td {
                border-bottom: none;
            }
            
            .items-table .product-name {
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 1mm;
            }
            
            .items-table small {
                font-size: 7.5pt;
                color: #64748b;
                display: block;
                margin-top: 1mm;
                font-style: italic;
            }
            
            /* Premium Summary Section */
            .summary-section {
                margin: 8mm 0;
                display: flex;
                justify-content: flex-end;
            }
            
            .summary-card {
                background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                border: 2px solid #e2e8f0;
                border-radius: 3mm;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                min-width: 65mm;
            }
            
            .summary-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 9pt;
            }
            
            .summary-table td {
                padding: 2.5mm 3mm;
                border-bottom: 1px solid #f1f5f9;
                line-height: 1.3;
            }
            
            .summary-table .label {
                font-weight: 500;
                color: #475569;
            }
            
            .summary-table .value {
                text-align: right;
                font-weight: 600;
                color: #1e293b;
            }
            
            .summary-table .total-row {
                background: linear-gradient(135deg, #059669 0%, #10b981 100%);
                color: white;
                font-weight: 700;
                font-size: 11pt;
            }
            
            .summary-table .total-row td {
                border-bottom: none;
                padding: 3mm;
            }
            
            /* Call-to-Action Payment Section */
            .payment-section {
                margin: 8mm 0;
                background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
                border: 2px solid #f59e0b;
                border-radius: 3mm;
                padding: 5mm;
                position: relative;
                box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);
            }
            
            .payment-section::before {
                content: '💳';
                position: absolute;
                top: -2mm;
                right: 4mm;
                font-size: 16pt;
            }
            
            .payment-section h3 {
                font-size: 12pt;
                font-weight: 700;
                margin-bottom: 3mm;
                color: #92400e;
                letter-spacing: -0.3px;
            }
            
            .payment-section p {
                margin-bottom: 2mm;
                font-size: 9pt;
                line-height: 1.4;
                color: #78350f;
            }
            
            .payment-section strong {
                color: #451a03;
                font-weight: 700;
            }
            
            .bank-details {
                background: rgba(255, 255, 255, 0.8);
                padding: 3mm;
                border-radius: 2mm;
                margin-top: 3mm;
                border-left: 3px solid #f59e0b;
            }
            
            /* Elegant Footer */
            .footer {
                position: absolute;
                bottom: 8mm;
                left: 12mm;
                right: 12mm;
                border-top: 2px solid #e2e8f0;
                padding-top: 4mm;
                font-size: 7.5pt;
                color: #64748b;
                background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                border-radius: 2mm;
                padding: 4mm;
            }
            
            .footer-grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 4mm;
            }
            
            .footer-column h4 {
                font-size: 8pt;
                font-weight: 700;
                margin-bottom: 2mm;
                color: #374151;
                text-transform: uppercase;
                letter-spacing: 0.5px;
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
                    padding: 8mm;
                }
                
                @page {
                    margin: 0;
                    size: A4;
                }
            }
            
            /* Responsive Design */
            @media screen and (max-width: 800px) {
                .header-content {
                    grid-template-columns: 1fr;
                    gap: 4mm;
                }
                
                .invoice-meta {
                    text-align: left;
                }
                
                .footer-grid {
                    grid-template-columns: 1fr;
                    gap: 3mm;
                }
            }
        </style>
    </head>
    <body>
        <div class="invoice-container">
            <!-- Modern Header -->
            <div class="header">
                <div class="header-content">
                    <div class="company-info">
                        <h1>${shopSettings.company_name}</h1>
                        <p>${shopSettings.company_address}</p>
                        <p>${shopSettings.company_postcode} ${shopSettings.company_city}</p>
                        ${shopSettings.company_phone ? `<p>📞 ${shopSettings.company_phone}</p>` : ''}
                        ${shopSettings.company_email ? `<p>✉️ ${shopSettings.company_email}</p>` : ''}
                        ${shopSettings.company_website ? `<p>🌐 ${shopSettings.company_website}</p>` : ''}
                    </div>
                    
                    <div class="invoice-meta">
                        <h2>RECHNUNG</h2>
                        <div class="invoice-details">
                            <p><strong>Nr.:</strong><span>${invoiceNumber}</span></p>
                            <p><strong>Datum:</strong><span>${currentDate}</span></p>
                            <p><strong>Bestellung:</strong><span>${order.order_number}</span></p>
                            <p><strong>Kunde:</strong><span>${order.id.substring(0, 8)}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Customer Address Card -->
            <div class="customer-section">
                <div class="address-card">
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
            
            <!-- Invoice Information Grid -->
            <div class="invoice-info">
                ${deliveryDate ? `
                <div class="info-item">
                    <span class="info-label">Lieferdatum:</span>
                    <span class="info-value">${deliveryDate}</span>
                </div>
                ` : ''}
                <div class="info-item">
                    <span class="info-label">Zahlungsart:</span>
                    <span class="info-value">${order.payment_method === 'vorkasse' ? 'Vorkasse' : order.payment_method || 'Vorkasse'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Zahlungsziel:</span>
                    <span class="info-value">Sofort fällig</span>
                </div>
            </div>
            
            <!-- Modern Items Table -->
            <div class="table-section">
                <table class="items-table">
                    <thead>
                        <tr>
                            <th style="width: 6%;">Pos.</th>
                            <th style="width: 44%;">Leistung</th>
                            <th style="width: 10%;" class="text-right">Menge</th>
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
                                ${deliveryDate ? `<small>📅 Lieferung am ${deliveryDate}</small>` : ''}
                                ${order.delivery_street ? `<small>📍 ${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}</small>` : ''}
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
                                <small>🚛 Professionelle Anlieferung</small>
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
                                <div class="product-name">💰 Sonderrabatt</div>
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
            
            <!-- Premium Summary -->
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
            
            <!-- Call-to-Action Payment Section -->
            ${order.payment_method === 'vorkasse' && shopSettings.bank_iban ? `
            <div class="payment-section">
                <h3>💳 Einfache Zahlung per Überweisung</h3>
                <p><strong>Bitte überweisen Sie den Rechnungsbetrag schnell und unkompliziert:</strong></p>
                
                <div class="bank-details">
                    <p><strong>🏦 Bank:</strong> ${shopSettings.bank_name || 'Unsere Hausbank'}</p>
                    <p><strong>💳 IBAN:</strong> ${shopSettings.bank_iban}</p>
                    ${shopSettings.bank_bic ? `<p><strong>🔢 BIC:</strong> ${shopSettings.bank_bic}</p>` : ''}
                    <p><strong>📝 Verwendungszweck:</strong> ${invoiceNumber}</p>
                </div>
                
                <p style="margin-top: 3mm; font-size: 8.5pt;"><strong>⚡ Schnelle Zahlung = Schnelle Lieferung!</strong> Bei Fragen erreichen Sie uns jederzeit.</p>
            </div>
            ` : ''}
            
            <!-- Elegant Footer -->
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
                        <p style="margin-top: 2mm; font-style: italic;">Vielen Dank für Ihr Vertrauen!</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `
}
