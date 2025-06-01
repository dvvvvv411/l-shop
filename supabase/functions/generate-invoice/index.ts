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
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', 'Arial', 'Helvetica', sans-serif;
                font-size: 9pt;
                line-height: 1.4;
                color: #1a1a1a;
                background: #ffffff;
                font-weight: 400;
            }
            
            .invoice-container {
                width: 190mm;
                min-height: 277mm;
                margin: 0 auto;
                padding: 12mm;
                position: relative;
                background: linear-gradient(135deg, #ffffff 0%, #fafbfc 100%);
            }
            
            /* Modern Header with Gradient */
            .header {
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                color: white;
                padding: 8mm;
                margin: -12mm -12mm 8mm -12mm;
                border-radius: 0 0 6mm 6mm;
                position: relative;
                overflow: hidden;
            }
            
            .header::before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 50%;
                height: 100%;
                background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
                transform: skewX(-15deg);
                transform-origin: top right;
            }
            
            .header-content {
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 6mm;
                align-items: center;
                position: relative;
                z-index: 2;
            }
            
            .company-info h1 {
                font-size: 18pt;
                font-weight: 700;
                margin-bottom: 3mm;
                text-shadow: 0 1px 2px rgba(0,0,0,0.1);
            }
            
            .company-details {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 2mm;
                font-size: 8.5pt;
                opacity: 0.95;
            }
            
            .company-details p {
                margin-bottom: 1mm;
                font-weight: 300;
            }
            
            .invoice-badge {
                background: rgba(255,255,255,0.15);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 4mm;
                padding: 4mm;
                text-align: center;
                min-width: 55mm;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .invoice-badge h2 {
                font-size: 16pt;
                font-weight: 600;
                margin-bottom: 3mm;
                letter-spacing: 1px;
            }
            
            .invoice-meta {
                background: rgba(255,255,255,0.2);
                border-radius: 2mm;
                padding: 3mm;
                font-size: 8pt;
            }
            
            .invoice-meta-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 1.5mm;
                padding: 1mm 0;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            
            .invoice-meta-item:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }
            
            .meta-label {
                font-weight: 300;
                opacity: 0.9;
            }
            
            .meta-value {
                font-weight: 500;
            }
            
            /* Modern Address Section */
            .customer-section {
                margin: 8mm 0;
            }
            
            .address-card {
                background: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 4mm;
                padding: 5mm;
                box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                width: 85mm;
                position: relative;
            }
            
            .address-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, #2563eb, #1d4ed8);
                border-radius: 4mm 4mm 0 0;
            }
            
            .return-address {
                font-size: 6pt;
                color: #6b7280;
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 2mm;
                margin-bottom: 3mm;
                font-weight: 300;
            }
            
            .customer-address {
                font-size: 9pt;
                line-height: 1.3;
                color: #1a1a1a;
            }
            
            .customer-address strong {
                font-weight: 600;
                font-size: 10pt;
                display: block;
                margin-bottom: 2mm;
                color: #2563eb;
            }
            
            /* Enhanced Invoice Information */
            .invoice-info {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 3mm;
                padding: 4mm;
                margin: 6mm 0;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 4mm;
                font-size: 8.5pt;
            }
            
            .info-item {
                text-align: center;
            }
            
            .info-label {
                font-weight: 500;
                color: #64748b;
                font-size: 7.5pt;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 1mm;
            }
            
            .info-value {
                font-weight: 600;
                color: #1e293b;
                font-size: 9pt;
            }
            
            /* Modern Table Design */
            .table-section {
                margin: 10mm 0;
                background: #ffffff;
                border-radius: 4mm;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                border: 1px solid #e5e7eb;
            }
            
            .items-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 8pt;
            }
            
            .items-table thead {
                background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                color: white;
            }
            
            .items-table th {
                padding: 4mm 3mm;
                text-align: left;
                font-weight: 600;
                font-size: 8pt;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                border: none;
            }
            
            .items-table th.text-right {
                text-align: right;
            }
            
            .items-table th.text-center {
                text-align: center;
            }
            
            .items-table tbody tr {
                border-bottom: 1px solid #f1f5f9;
                transition: background-color 0.2s ease;
            }
            
            .items-table tbody tr:nth-child(even) {
                background: #fafbfc;
            }
            
            .items-table tbody tr:hover {
                background: #f0f9ff;
            }
            
            .items-table td {
                padding: 4mm 3mm;
                vertical-align: top;
                font-size: 8.5pt;
                color: #1e293b;
                border: none;
            }
            
            .items-table .text-right {
                text-align: right;
                font-weight: 500;
            }
            
            .items-table .text-center {
                text-align: center;
            }
            
            .items-table .product-name {
                font-weight: 600;
                color: #2563eb;
                margin-bottom: 1mm;
            }
            
            .items-table .product-details {
                font-size: 7pt;
                color: #64748b;
                line-height: 1.2;
                margin-top: 1mm;
            }
            
            /* Elegant Summary Section */
            .summary-section {
                margin: 8mm 0;
                display: flex;
                justify-content: flex-end;
            }
            
            .summary-card {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 4mm;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                overflow: hidden;
                min-width: 60mm;
            }
            
            .summary-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 9pt;
            }
            
            .summary-table td {
                padding: 3mm 4mm;
                border-bottom: 1px solid #f1f5f9;
            }
            
            .summary-table .label {
                font-weight: 500;
                color: #64748b;
            }
            
            .summary-table .value {
                text-align: right;
                font-weight: 600;
                color: #1e293b;
            }
            
            .summary-table .total-row {
                background: linear-gradient(135deg, #059669 0%, #047857 100%);
                color: white;
                font-weight: 700;
                font-size: 10pt;
            }
            
            .summary-table .total-row td {
                border-bottom: none;
                padding: 4mm;
            }
            
            /* Payment Call-to-Action */
            .payment-section {
                margin: 10mm 0;
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                border: 2px solid #0284c7;
                border-radius: 4mm;
                padding: 6mm;
                position: relative;
                overflow: hidden;
            }
            
            .payment-section::before {
                content: '💳';
                position: absolute;
                top: 3mm;
                right: 4mm;
                font-size: 16pt;
                opacity: 0.3;
            }
            
            .payment-header {
                display: flex;
                align-items: center;
                margin-bottom: 4mm;
            }
            
            .payment-icon {
                width: 8mm;
                height: 8mm;
                background: #0284c7;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 700;
                margin-right: 3mm;
                font-size: 8pt;
            }
            
            .payment-title {
                font-size: 11pt;
                font-weight: 700;
                color: #0c4a6e;
                margin: 0;
            }
            
            .payment-amount {
                background: #ffffff;
                border: 2px solid #0284c7;
                border-radius: 2mm;
                padding: 3mm;
                margin: 3mm 0;
                text-align: center;
                font-size: 14pt;
                font-weight: 700;
                color: #0c4a6e;
                box-shadow: 0 2px 4px rgba(2,132,199,0.1);
            }
            
            .bank-details {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 3mm;
                margin-top: 4mm;
                font-size: 8.5pt;
            }
            
            .bank-detail-item {
                background: rgba(255,255,255,0.7);
                padding: 2mm;
                border-radius: 2mm;
                border: 1px solid rgba(2,132,199,0.2);
            }
            
            .bank-detail-label {
                font-weight: 600;
                color: #0c4a6e;
                font-size: 7.5pt;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 1mm;
            }
            
            .bank-detail-value {
                color: #1e293b;
                font-weight: 500;
                font-family: 'Courier New', monospace;
            }
            
            /* Modern Footer */
            .footer {
                position: absolute;
                bottom: 8mm;
                left: 12mm;
                right: 12mm;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 3mm;
                padding: 4mm;
                font-size: 7pt;
                color: #64748b;
            }
            
            .footer-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 4mm;
            }
            
            .footer-section h4 {
                font-size: 8pt;
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 2mm;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .footer-section p {
                margin-bottom: 1mm;
                line-height: 1.2;
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
                    box-shadow: none;
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
                
                .company-details {
                    grid-template-columns: 1fr;
                }
                
                .invoice-info {
                    grid-template-columns: 1fr;
                }
                
                .bank-details {
                    grid-template-columns: 1fr;
                }
                
                .footer-grid {
                    grid-template-columns: 1fr;
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
                        <div class="company-details">
                            <div>
                                <p>${shopSettings.company_address}</p>
                                <p>${shopSettings.company_postcode} ${shopSettings.company_city}</p>
                            </div>
                            <div>
                                ${shopSettings.company_phone ? `<p>📞 ${shopSettings.company_phone}</p>` : ''}
                                ${shopSettings.company_email ? `<p>✉️ ${shopSettings.company_email}</p>` : ''}
                                ${shopSettings.company_website ? `<p>🌐 ${shopSettings.company_website}</p>` : ''}
                            </div>
                        </div>
                    </div>
                    
                    <div class="invoice-badge">
                        <h2>RECHNUNG</h2>
                        <div class="invoice-meta">
                            <div class="invoice-meta-item">
                                <span class="meta-label">Nr.:</span>
                                <span class="meta-value">${invoiceNumber}</span>
                            </div>
                            <div class="invoice-meta-item">
                                <span class="meta-label">Datum:</span>
                                <span class="meta-value">${currentDate}</span>
                            </div>
                            <div class="invoice-meta-item">
                                <span class="meta-label">Bestellung:</span>
                                <span class="meta-value">${order.order_number}</span>
                            </div>
                            <div class="invoice-meta-item">
                                <span class="meta-label">Kunde:</span>
                                <span class="meta-value">${order.id.substring(0, 8)}</span>
                            </div>
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
            
            <!-- Invoice Information -->
            <div class="invoice-info">
                ${deliveryDate ? `
                <div class="info-item">
                    <div class="info-label">Lieferdatum</div>
                    <div class="info-value">${deliveryDate}</div>
                </div>
                ` : ''}
                <div class="info-item">
                    <div class="info-label">Zahlungsart</div>
                    <div class="info-value">${order.payment_method === 'vorkasse' ? 'Vorkasse' : order.payment_method || 'Vorkasse'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Zahlungsziel</div>
                    <div class="info-value">Sofort fällig</div>
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
                                <div class="product-name">${order.product || 'Standard Heizöl'}</div>
                                <div class="product-details">
                                    ${deliveryDate ? `Lieferung am ${deliveryDate}<br>` : ''}
                                    ${order.delivery_street ? `Lieferadresse: ${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}` : ''}
                                </div>
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
                                <div class="product-name">Lieferung und Transport</div>
                                <div class="product-details">Pauschale Liefergebühr</div>
                            </td>
                            <td class="text-right">1</td>
                            <td>Pauschal</td>
                            <td class="text-right">€ ${netDeliveryFee.toFixed(2)}</td>
                            <td class="text-center">19%</td>
                            <td class="text-right">€ ${netDeliveryFee.toFixed(2)}</td>
                        </tr>
                        ` : ''}
                        ${order.discount > 0 ? `
                        <tr>
                            <td><strong>3</strong></td>
                            <td>
                                <div class="product-name">Rabatt</div>
                                <div class="product-details">Gewährter Nachlass</div>
                            </td>
                            <td class="text-right">1</td>
                            <td>Pauschal</td>
                            <td class="text-right">-€ ${netDiscount.toFixed(2)}</td>
                            <td class="text-center">19%</td>
                            <td class="text-right">-€ ${netDiscount.toFixed(2)}</td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
            </div>
            
            <!-- Elegant Summary -->
            <div class="summary-section">
                <div class="summary-card">
                    <table class="summary-table">
                        <tr>
                            <td class="label">Netto-Betrag:</td>
                            <td class="value">€ ${netTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td class="label">MwSt. 19%:</td>
                            <td class="value">€ ${vatAmount.toFixed(2)}</td>
                        </tr>
                        <tr class="total-row">
                            <td><strong>Rechnungsbetrag:</strong></td>
                            <td><strong>€ ${grossTotal.toFixed(2)}</strong></td>
                        </tr>
                    </table>
                </div>
            </div>
            
            <!-- Payment Call-to-Action -->
            ${order.payment_method === 'vorkasse' && shopSettings.bank_iban ? `
            <div class="payment-section">
                <div class="payment-header">
                    <div class="payment-icon">€</div>
                    <h3 class="payment-title">Jetzt bezahlen</h3>
                </div>
                
                <div class="payment-amount">
                    Zu zahlen: € ${grossTotal.toFixed(2)}
                </div>
                
                <div class="bank-details">
                    <div class="bank-detail-item">
                        <div class="bank-detail-label">Bank</div>
                        <div class="bank-detail-value">${shopSettings.bank_name || 'Unsere Bank'}</div>
                    </div>
                    <div class="bank-detail-item">
                        <div class="bank-detail-label">IBAN</div>
                        <div class="bank-detail-value">${shopSettings.bank_iban}</div>
                    </div>
                    ${shopSettings.bank_bic ? `
                    <div class="bank-detail-item">
                        <div class="bank-detail-label">BIC</div>
                        <div class="bank-detail-value">${shopSettings.bank_bic}</div>
                    </div>
                    ` : ''}
                    <div class="bank-detail-item">
                        <div class="bank-detail-label">Verwendungszweck</div>
                        <div class="bank-detail-value">${invoiceNumber}</div>
                    </div>
                </div>
            </div>
            ` : ''}
            
            <!-- Modern Footer -->
            <div class="footer">
                <div class="footer-grid">
                    <div class="footer-section">
                        <h4>Kontakt</h4>
                        <p>${shopSettings.company_name}</p>
                        <p>${shopSettings.company_address}</p>
                        <p>${shopSettings.company_postcode} ${shopSettings.company_city}</p>
                        ${shopSettings.company_phone ? `<p>${shopSettings.company_phone}</p>` : ''}
                        ${shopSettings.company_email ? `<p>${shopSettings.company_email}</p>` : ''}
                    </div>
                    
                    <div class="footer-section">
                        <h4>Steuerdaten</h4>
                        ${shopSettings.tax_number ? `<p>Steuernummer: ${shopSettings.tax_number}</p>` : ''}
                        ${shopSettings.vat_number ? `<p>USt-IdNr.: ${shopSettings.vat_number}</p>` : ''}
                        <p>Lieferungen sind steuerpflichtig</p>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Zahlungshinweis</h4>
                        <p>Zahlbar sofort ohne Abzug</p>
                        <p>Bei Fragen kontaktieren Sie uns gerne</p>
                        <p>Vielen Dank für Ihr Vertrauen!</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `
}
