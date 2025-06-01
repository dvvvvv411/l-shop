
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
    const htmlContent = generateInvoiceHTML(order, shopSettings, invoiceNumber)

    // Here you would normally use a PDF generation service
    // For now, we'll return the HTML content and let the frontend handle PDF generation
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

function generateInvoiceHTML(order: any, shopSettings: any, invoiceNumber: string): string {
  const currentDate = new Date().toLocaleDateString('de-DE')
  const deliveryDate = order.delivery_date ? new Date(order.delivery_date).toLocaleDateString('de-DE') : 'Nach Vereinbarung'

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Rechnung ${invoiceNumber}</title>
        <style>
            body { font-family: Arial, sans-serif; font-size: 12px; margin: 0; padding: 20px; }
            .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .company-info { width: 45%; }
            .invoice-info { width: 45%; text-align: right; }
            .customer-info { margin: 30px 0; }
            .invoice-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .invoice-table th { background-color: #f5f5f5; }
            .total-row { font-weight: bold; background-color: #f9f9f9; }
            .footer { margin-top: 40px; font-size: 10px; }
            .text-right { text-align: right; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="company-info">
                <h2>${shopSettings.company_name}</h2>
                <p>${shopSettings.company_address}<br>
                ${shopSettings.company_postcode} ${shopSettings.company_city}</p>
                ${shopSettings.company_phone ? `<p>Tel: ${shopSettings.company_phone}</p>` : ''}
                ${shopSettings.company_email ? `<p>E-Mail: ${shopSettings.company_email}</p>` : ''}
            </div>
            <div class="invoice-info">
                <h1>RECHNUNG</h1>
                <p><strong>Rechnungsnummer:</strong> ${invoiceNumber}</p>
                <p><strong>Rechnungsdatum:</strong> ${currentDate}</p>
                <p><strong>Bestellnummer:</strong> ${order.order_number}</p>
            </div>
        </div>

        <div class="customer-info">
            <h3>Rechnungsadresse:</h3>
            <p>${order.customer_name}<br>
            ${order.billing_street || order.customer_address}<br>
            ${order.billing_postcode || order.delivery_postcode} ${order.billing_city || order.delivery_city}</p>
        </div>

        ${order.delivery_street && order.use_same_address !== true ? `
        <div class="customer-info">
            <h3>Lieferadresse:</h3>
            <p>${order.delivery_first_name} ${order.delivery_last_name}<br>
            ${order.delivery_street}<br>
            ${order.delivery_postcode} ${order.delivery_city}</p>
        </div>
        ` : ''}

        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Beschreibung</th>
                    <th>Menge</th>
                    <th>Einheit</th>
                    <th class="text-right">Einzelpreis</th>
                    <th class="text-right">Gesamtpreis</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>${order.product || 'Standard Heizöl'}</td>
                    <td class="text-right">${order.liters.toLocaleString('de-DE')}</td>
                    <td>Liter</td>
                    <td class="text-right">€${order.price_per_liter.toFixed(2)}</td>
                    <td class="text-right">€${(order.liters * order.price_per_liter).toFixed(2)}</td>
                </tr>
                ${order.delivery_fee > 0 ? `
                <tr>
                    <td>2</td>
                    <td>Lieferung</td>
                    <td class="text-right">1</td>
                    <td>Pauschal</td>
                    <td class="text-right">€${order.delivery_fee.toFixed(2)}</td>
                    <td class="text-right">€${order.delivery_fee.toFixed(2)}</td>
                </tr>
                ` : ''}
                ${order.discount > 0 ? `
                <tr>
                    <td></td>
                    <td>Rabatt</td>
                    <td class="text-right">1</td>
                    <td>Pauschal</td>
                    <td class="text-right">-€${order.discount.toFixed(2)}</td>
                    <td class="text-right">-€${order.discount.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr class="total-row">
                    <td colspan="5"><strong>Gesamtbetrag</strong></td>
                    <td class="text-right"><strong>€${order.total_amount.toFixed(2)}</strong></td>
                </tr>
            </tbody>
        </table>

        <div style="margin: 20px 0;">
            <p><strong>Liefertermin:</strong> ${deliveryDate}</p>
            <p><strong>Zahlungsart:</strong> ${order.payment_method === 'vorkasse' ? 'Vorkasse' : order.payment_method}</p>
        </div>

        ${shopSettings.tax_number || shopSettings.vat_number ? `
        <div style="margin: 20px 0;">
            ${shopSettings.tax_number ? `<p>Steuernummer: ${shopSettings.tax_number}</p>` : ''}
            ${shopSettings.vat_number ? `<p>USt-IdNr.: ${shopSettings.vat_number}</p>` : ''}
        </div>
        ` : ''}

        ${shopSettings.bank_iban ? `
        <div style="margin: 20px 0;">
            <h3>Bankverbindung:</h3>
            <p>${shopSettings.bank_name || 'Bank'}<br>
            IBAN: ${shopSettings.bank_iban}<br>
            ${shopSettings.bank_bic ? `BIC: ${shopSettings.bank_bic}` : ''}</p>
        </div>
        ` : ''}

        <div class="footer">
            ${shopSettings.invoice_footer_text ? `<p>${shopSettings.invoice_footer_text}</p>` : ''}
        </div>
    </body>
    </html>
  `
}
