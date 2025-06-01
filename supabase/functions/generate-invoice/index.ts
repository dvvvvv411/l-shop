
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

    const { orderId } = await req.json()
    
    if (!orderId) {
      throw new Error('Order ID is required')
    }

    console.log('Generating invoice for order:', orderId)

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      throw new Error('Order not found')
    }

    // Get shop settings
    const { data: shopSettings, error: settingsError } = await supabase
      .from('shop_settings')
      .select('*')
      .limit(1)
      .single()

    if (settingsError || !shopSettings) {
      throw new Error('Shop settings not found')
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

      // Update order with invoice number
      await supabase
        .from('orders')
        .update({ invoice_number: invoiceNumber })
        .eq('id', orderId)
    }

    // Generate HTML content for PDF
    const htmlContent = generateCompactInvoiceHTML(order, shopSettings, invoiceNumber)

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

function generateCompactInvoiceHTML(order: any, shopSettings: any, invoiceNumber: string): string {
  const currentDate = new Date().toLocaleDateString('de-DE')
  const deliveryDate = order.delivery_date ? new Date(order.delivery_date).toLocaleDateString('de-DE') : 'Nach Vereinbarung'
  const subtotal = order.liters * order.price_per_liter
  const total = order.total_amount

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
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 10px;
                line-height: 1.3;
                color: #333;
                background: #fff;
                height: 100vh;
                display: flex;
                flex-direction: column;
            }
            
            .invoice-container {
                width: 100%;
                height: 100vh;
                display: flex;
                flex-direction: column;
                position: relative;
            }
            
            .invoice-header {
                background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
                color: white;
                padding: 20px 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-shrink: 0;
            }
            
            .company-info h1 {
                font-size: 22px;
                font-weight: 700;
                margin-bottom: 8px;
            }
            
            .company-info p {
                font-size: 10px;
                opacity: 0.95;
                margin-bottom: 2px;
            }
            
            .invoice-title h2 {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 10px;
                text-align: right;
            }
            
            .invoice-meta {
                background: rgba(255,255,255,0.2);
                padding: 10px 15px;
                border-radius: 6px;
                text-align: right;
            }
            
            .invoice-meta p {
                margin-bottom: 3px;
                font-size: 10px;
            }
            
            .invoice-meta strong {
                font-weight: 600;
            }
            
            .status-badge {
                display: inline-block;
                padding: 4px 8px;
                background: #27ae60;
                color: white;
                border-radius: 12px;
                font-size: 8px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-top: 5px;
            }
            
            .invoice-body {
                padding: 20px 25px;
                flex: 1;
                display: flex;
                flex-direction: column;
            }
            
            .addresses {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                gap: 20px;
            }
            
            .address-block {
                flex: 1;
                background: #f8f9fa;
                padding: 15px;
                border-radius: 6px;
                border-left: 3px solid #3498db;
            }
            
            .address-block h3 {
                color: #2c3e50;
                font-size: 11px;
                font-weight: 600;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .address-block p {
                margin-bottom: 3px;
                font-size: 10px;
                line-height: 1.4;
            }
            
            .items-table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
                background: #fff;
                border-radius: 6px;
                overflow: hidden;
                box-shadow: 0 1px 4px rgba(0,0,0,0.1);
            }
            
            .items-table thead {
                background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
                color: white;
            }
            
            .items-table th {
                padding: 10px 8px;
                text-align: left;
                font-weight: 600;
                font-size: 9px;
                text-transform: uppercase;
                letter-spacing: 0.3px;
            }
            
            .items-table th.text-right {
                text-align: right;
            }
            
            .items-table tbody tr {
                border-bottom: 1px solid #ecf0f1;
            }
            
            .items-table td {
                padding: 8px;
                font-size: 10px;
                vertical-align: middle;
            }
            
            .items-table .text-right {
                text-align: right;
            }
            
            .total-row {
                background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
                color: white;
                font-weight: 700;
                font-size: 11px;
            }
            
            .total-row td {
                padding: 12px 8px !important;
            }
            
            .details-section {
                display: flex;
                justify-content: space-between;
                margin: 15px 0;
                gap: 15px;
                flex-shrink: 0;
            }
            
            .detail-block {
                flex: 1;
                background: #f8f9fa;
                padding: 12px;
                border-radius: 6px;
                border-top: 2px solid #3498db;
            }
            
            .detail-block h4 {
                color: #2c3e50;
                font-size: 10px;
                font-weight: 600;
                margin-bottom: 6px;
                text-transform: uppercase;
                letter-spacing: 0.3px;
            }
            
            .detail-block p {
                margin-bottom: 4px;
                font-size: 9px;
                line-height: 1.3;
            }
            
            .payment-terms {
                background: #e8f4fd;
                border: 1px solid #3498db;
                border-radius: 6px;
                padding: 12px;
                margin: 15px 0;
                flex-shrink: 0;
            }
            
            .payment-terms h4 {
                color: #2c3e50;
                font-size: 11px;
                font-weight: 600;
                margin-bottom: 8px;
            }
            
            .payment-terms p {
                font-size: 9px;
                margin-bottom: 4px;
                line-height: 1.3;
            }
            
            .footer {
                background: #2c3e50;
                color: white;
                padding: 15px 25px;
                font-size: 8px;
                margin-top: auto;
                flex-shrink: 0;
            }
            
            .footer-content {
                display: flex;
                justify-content: space-between;
                gap: 20px;
            }
            
            .footer-section {
                flex: 1;
            }
            
            .footer-section h5 {
                font-size: 9px;
                font-weight: 600;
                margin-bottom: 6px;
                text-transform: uppercase;
                letter-spacing: 0.3px;
                color: #3498db;
            }
            
            .footer-section p {
                margin-bottom: 2px;
                opacity: 0.9;
                line-height: 1.3;
            }
            
            @media print {
                body { 
                    padding: 0;
                    height: 100vh;
                }
                .invoice-container { 
                    box-shadow: none;
                    max-width: none;
                    height: 100vh;
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
            <div class="invoice-header">
                <div class="company-info">
                    <h1>${shopSettings.company_name}</h1>
                    <p>${shopSettings.company_address}</p>
                    <p>${shopSettings.company_postcode} ${shopSettings.company_city}</p>
                    ${shopSettings.company_phone ? `<p>Tel: ${shopSettings.company_phone}</p>` : ''}
                    ${shopSettings.company_email ? `<p>E-Mail: ${shopSettings.company_email}</p>` : ''}
                </div>
                
                <div class="invoice-title">
                    <h2>RECHNUNG</h2>
                    <div class="invoice-meta">
                        <p><strong>Nr.:</strong> ${invoiceNumber}</p>
                        <p><strong>Datum:</strong> ${currentDate}</p>
                        <p><strong>Bestellung:</strong> ${order.order_number}</p>
                        <span class="status-badge">Original</span>
                    </div>
                </div>
            </div>
            
            <!-- Body -->
            <div class="invoice-body">
                <!-- Addresses -->
                <div class="addresses">
                    <div class="address-block">
                        <h3>Rechnungsadresse</h3>
                        <p><strong>${order.customer_name}</strong></p>
                        <p>${order.billing_street || order.customer_address}</p>
                        <p>${order.billing_postcode || order.delivery_postcode} ${order.billing_city || order.delivery_city}</p>
                        ${order.customer_email ? `<p>${order.customer_email}</p>` : ''}
                        ${order.customer_phone ? `<p>${order.customer_phone}</p>` : ''}
                    </div>
                    
                    ${order.delivery_street && order.use_same_address !== true ? `
                    <div class="address-block">
                        <h3>Lieferadresse</h3>
                        <p><strong>${order.delivery_first_name} ${order.delivery_last_name}</strong></p>
                        <p>${order.delivery_street}</p>
                        <p>${order.delivery_postcode} ${order.delivery_city}</p>
                        ${order.delivery_phone ? `<p>${order.delivery_phone}</p>` : ''}
                    </div>
                    ` : ''}
                </div>
                
                <!-- Items Table -->
                <table class="items-table">
                    <thead>
                        <tr>
                            <th style="width: 40px;">Pos.</th>
                            <th>Beschreibung</th>
                            <th style="width: 80px;" class="text-right">Menge</th>
                            <th style="width: 60px;">Einheit</th>
                            <th style="width: 80px;" class="text-right">Preis</th>
                            <th style="width: 90px;" class="text-right">Gesamt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1</strong></td>
                            <td>
                                <strong>${order.product || 'Standard Heizöl'}</strong>
                                <br><small style="color: #666; font-size: 8px;">Lieferung: ${deliveryDate}</small>
                            </td>
                            <td class="text-right"><strong>${order.liters.toLocaleString('de-DE')}</strong></td>
                            <td>Liter</td>
                            <td class="text-right">€${order.price_per_liter.toFixed(3)}</td>
                            <td class="text-right"><strong>€${subtotal.toFixed(2)}</strong></td>
                        </tr>
                        ${order.delivery_fee > 0 ? `
                        <tr>
                            <td><strong>2</strong></td>
                            <td><strong>Lieferung</strong></td>
                            <td class="text-right">1</td>
                            <td>Pauschal</td>
                            <td class="text-right">€${order.delivery_fee.toFixed(2)}</td>
                            <td class="text-right"><strong>€${order.delivery_fee.toFixed(2)}</strong></td>
                        </tr>
                        ` : ''}
                        ${order.discount > 0 ? `
                        <tr>
                            <td></td>
                            <td><strong>Rabatt</strong></td>
                            <td class="text-right">1</td>
                            <td>Pauschal</td>
                            <td class="text-right">-€${order.discount.toFixed(2)}</td>
                            <td class="text-right"><strong>-€${order.discount.toFixed(2)}</strong></td>
                        </tr>
                        ` : ''}
                        <tr class="total-row">
                            <td colspan="5"><strong>GESAMTBETRAG INKL. MWST.</strong></td>
                            <td class="text-right"><strong>€${total.toFixed(2)}</strong></td>
                        </tr>
                    </tbody>
                </table>
                
                <!-- Details Section -->
                <div class="details-section">
                    <div class="detail-block">
                        <h4>Zahlungskonditionen</h4>
                        <p><strong>Art:</strong> ${order.payment_method === 'vorkasse' ? 'Vorkasse' : order.payment_method}</p>
                        <p><strong>Ziel:</strong> Sofort bei Erhalt</p>
                    </div>
                    
                    <div class="detail-block">
                        <h4>Lieferkonditionen</h4>
                        <p><strong>Termin:</strong> ${deliveryDate}</p>
                        <p><strong>Art:</strong> Tankwagen</p>
                    </div>
                </div>
                
                ${order.payment_method === 'vorkasse' && shopSettings.bank_iban ? `
                <div class="payment-terms">
                    <h4>💳 Zahlungsinformationen</h4>
                    <p><strong>Bankverbindung:</strong> ${shopSettings.bank_name || 'Bank'}</p>
                    <p><strong>IBAN:</strong> ${shopSettings.bank_iban} ${shopSettings.bank_bic ? `| BIC: ${shopSettings.bank_bic}` : ''}</p>
                    <p><strong>Verwendungszweck:</strong> ${invoiceNumber}</p>
                </div>
                ` : ''}
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <div class="footer-content">
                    <div class="footer-section">
                        <h5>Kontakt</h5>
                        <p>${shopSettings.company_name}</p>
                        <p>${shopSettings.company_address}, ${shopSettings.company_postcode} ${shopSettings.company_city}</p>
                        ${shopSettings.company_phone ? `<p>Tel: ${shopSettings.company_phone}</p>` : ''}
                        ${shopSettings.company_email ? `<p>E-Mail: ${shopSettings.company_email}</p>` : ''}
                    </div>
                    
                    <div class="footer-section">
                        <h5>Steuerdaten</h5>
                        ${shopSettings.tax_number ? `<p>Steuernummer: ${shopSettings.tax_number}</p>` : ''}
                        ${shopSettings.vat_number ? `<p>USt-IdNr.: ${shopSettings.vat_number}</p>` : ''}
                        <p>Alle Preise inkl. gesetzl. MwSt.</p>
                    </div>
                    
                    <div class="footer-section">
                        <h5>Rechtliches</h5>
                        <p>Erfüllungsort: ${shopSettings.company_city}</p>
                        <p>Gerichtsstand: ${shopSettings.company_city}</p>
                        ${shopSettings.invoice_footer_text ? `<p style="font-style: italic;">${shopSettings.invoice_footer_text}</p>` : ''}
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `
}
