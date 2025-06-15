import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { Resend } from 'npm:resend@4.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper function to format German IBANs
function formatGermanIban(iban: string): string {
  if (!iban) return iban;
  
  // Check if it's a German IBAN (starts with DE)
  if (!iban.toUpperCase().startsWith('DE')) {
    return iban;
  }
  
  // Remove existing spaces and format with spaces after every 4 characters
  const cleanIban = iban.replace(/\s/g, '');
  const formatted = cleanIban.replace(/(.{4})/g, '$1 ').trim();
  
  return formatted;
}

// Italian email template generator
const generateItalianInvoiceEmail = (order: any, invoiceNumber: string, shop: any, bankAccount: any) => {
  const accountHolderName = bankAccount?.anyname ? shop?.company_name : bankAccount?.account_holder;
  
  return `
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fattura ${invoiceNumber}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb;">
        <tr>
            <td align="center" style="padding: 24px;">
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" style="max-width: 640px; width: 100%;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #2ed573; border-radius: 12px 12px 0 0; padding: 32px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; font-family: Arial, sans-serif;">La tua fattura è pronta!</h1>
                            <p style="color: #ffffff; font-size: 16px; margin: 0; font-family: Arial, sans-serif;">Grazie per il tuo ordine presso ${shop?.company_name || 'Gasolio Veloce S.r.l.'}</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 32px; border-radius: 0 0 12px 12px;">
                            
                            <!-- Section Title -->
                            <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 20px 0; font-family: Arial, sans-serif; border-left: 4px solid #2ed573; padding-left: 12px;">📋 Dettagli dell'ordine</h2>
                            
                            <!-- Order Details Grid -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Numero ordine</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.order_number}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Numero fattura</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${invoiceNumber}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Cliente</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.customer_name}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Prodotto</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.product || 'Gasolio Standard'}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Quantità</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.liters.toLocaleString('it-IT')} litri</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Indirizzo di consegna</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Total Card -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #2ed573; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 24px; text-align: center;">
                                        <div style="color: #ffffff; font-size: 16px; font-weight: 500; margin-bottom: 8px; font-family: Arial, sans-serif;">Importo totale</div>
                                        <div style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0; font-family: Arial, sans-serif;">${order.total_amount.toFixed(2)}€</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    ${bankAccount ? `
                    <!-- Payment Information -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 32px;">
                                        <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 20px 0; font-family: Arial, sans-serif; border-left: 4px solid #2ed573; padding-left: 12px;">💳 Informazioni di pagamento</h2>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #e3f2fd; border: 1px solid #2196f3; border-radius: 8px; border-left: 4px solid #2196f3;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <h3 style="margin-top: 0; color: #1976d2; font-family: Arial, sans-serif;">Coordinate bancarie per bonifico</h3>
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Banca</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${bankAccount.bank_name}</div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Intestatario del conto</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${accountHolderName}</div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">IBAN</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${formatGermanIban(bankAccount.iban)}</div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">${bankAccount.bic ? 'BIC' : 'Riferimento ordine'}</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${bankAccount.bic || `<strong>${order.order_number}</strong>`}</div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        ${bankAccount.bic ? `
                                                        <tr>
                                                            <td colspan="2" style="padding: 8px 0;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Riferimento ordine</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;"><strong>${order.order_number}</strong></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        ` : ''}
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
                                            <tr>
                                                <td style="padding: 15px;">
                                                    <div style="color: #1f2937; font-size: 16px; font-weight: 500; font-family: Arial, sans-serif;">
                                                        <strong>Nota molto importante:</strong> Vi preghiamo di utilizzare esattamente il numero d'ordine <strong>${order.order_number}</strong> come riferimento del bonifico e di assicurarvi di trasferire il denaro al destinatario corretto <strong>${accountHolderName}</strong> in modo che possiamo identificare correttamente il vostro pagamento.
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ''}
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 12px 0 0 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1f2937; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 32px; text-align: center;">
                                        <div style="color: #ffffff; font-size: 20px; font-weight: 700; margin-bottom: 16px; font-family: Arial, sans-serif;">${shop?.company_name || 'Gasolio Veloce S.r.l.'}</div>
                                        ${shop?.company_address ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">${shop.company_address}, ${shop.company_postcode} ${shop.company_city}</div>` : '<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">Via Roma 123, 00100 Roma (RM)</div>'}
                                        ${shop?.company_phone ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">Tel: ${shop.company_phone}</div>` : ''}
                                        ${shop?.company_email ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">E-mail: <a href="mailto:${shop.company_email}" style="color: #2ed573; text-decoration: none; font-weight: 500;">${shop.company_email}</a></div>` : '<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">E-mail: <a href="mailto:info@gasoliocasa.com" style="color: #2ed573; text-decoration: none; font-weight: 500;">info@gasoliocasa.com</a></div>'}
                                        ${shop?.company_website ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">Web: <a href="${shop.company_website}" style="color: #2ed573; text-decoration: none; font-weight: 500;">${shop.company_website}</a></div>` : ''}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};

// French email template generator
const generateFrenchInvoiceEmail = (order: any, invoiceNumber: string, shop: any, bankAccount: any) => {
  const accountHolderName = bankAccount.anyname ? shop.company_name : bankAccount.account_holder;
  
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facture ${invoiceNumber}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb;">
        <tr>
            <td align="center" style="padding: 24px;">
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" style="max-width: 640px; width: 100%;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #2ed573; border-radius: 12px 12px 0 0; padding: 32px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; font-family: Arial, sans-serif;">Votre facture est prête !</h1>
                            <p style="color: #ffffff; font-size: 16px; margin: 0; font-family: Arial, sans-serif;">Merci pour votre commande chez ${shop.company_name}</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 32px; border-radius: 0 0 12px 12px;">
                            
                            <!-- Section Title -->
                            <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 20px 0; font-family: Arial, sans-serif; border-left: 4px solid #2ed573; padding-left: 12px;">📋 Détails de la commande</h2>
                            
                            <!-- Order Details Grid -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Numéro de commande</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.order_number}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Numéro de facture</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${invoiceNumber}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Client</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.customer_name}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Produit</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.product || 'Fioul Standard'}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Quantité</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.liters.toLocaleString('fr-FR')} litres</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Adresse de livraison</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Total Card -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #2ed573; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 24px; text-align: center;">
                                        <div style="color: #ffffff; font-size: 16px; font-weight: 500; margin-bottom: 8px; font-family: Arial, sans-serif;">Montant total</div>
                                        <div style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0; font-family: Arial, sans-serif;">${order.total_amount.toFixed(2)}€</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    ${bankAccount ? `
                    <!-- Payment Information -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 32px;">
                                        <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 20px 0; font-family: Arial, sans-serif; border-left: 4px solid #2ed573; padding-left: 12px;">💳 Informations de paiement</h2>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #e3f2fd; border: 1px solid #2196f3; border-radius: 8px; border-left: 4px solid #2196f3;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <h3 style="margin-top: 0; color: #1976d2; font-family: Arial, sans-serif;">Coordonnées bancaires pour virement</h3>
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Banque</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${bankAccount.bank_name}</div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Titulaire du compte</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${accountHolderName}</div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">IBAN</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${formatGermanIban(bankAccount.iban)}</div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">${bankAccount.bic ? 'BIC' : 'Référence'}</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${bankAccount.bic || `<strong>${order.order_number}</strong>`}</div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        ${bankAccount.bic ? `
                                                        <tr>
                                                            <td colspan="2" style="padding: 8px 0;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Référence</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;"><strong>${order.order_number}</strong></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        ` : ''}
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
                                            <tr>
                                                <td style="padding: 15px;">
                                                    <div style="color: #1f2937; font-size: 16px; font-weight: 500; font-family: Arial, sans-serif;">
                                                        <strong>Note très importante :</strong> Veuillez impérativement utiliser exactement le numéro de commande <strong>${order.order_number}</strong> comme référence de virement et vous assurer de transférer l'argent au bon destinataire <strong>${accountHolderName}</strong> afin que nous puissions identifier correctement votre paiement.
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ''}
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 12px 0 0 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1f2937; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 32px; text-align: center;">
                                        <div style="color: #ffffff; font-size: 20px; font-weight: 700; margin-bottom: 16px; font-family: Arial, sans-serif;">${shop.company_name}</div>
                                        ${shop.company_address ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">${shop.company_address}, ${shop.company_postcode} ${shop.company_city}</div>` : ''}
                                        ${shop.company_phone ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">Tél : ${shop.company_phone}</div>` : ''}
                                        ${shop.company_email ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">E-mail : <a href="mailto:${shop.company_email}" style="color: #2ed573; text-decoration: none; font-weight: 500;">${shop.company_email}</a></div>` : ''}
                                        ${shop.company_website ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">Web : <a href="${shop.company_website}" style="color: #2ed573; text-decoration: none; font-weight: 500;">${shop.company_website}</a></div>` : ''}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};

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

    const { orderId, invoiceNumber, invoiceFileUrl } = await req.json()
    
    console.log('Sending invoice email for order:', orderId, 'invoice:', invoiceNumber);

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

    // Get SMTP configuration based on order domain
    let smtpConfig = null
    if (order.origin_domain) {
      const { data: smtpData, error: smtpError } = await supabaseClient
        .from('smtp_domains')
        .select(`
          smtp_configurations (
            *,
            shops (
              id,
              name,
              company_name,
              company_address,
              company_postcode,
              company_city,
              company_phone,
              company_email,
              company_website
            )
          )
        `)
        .eq('domain', order.origin_domain)
        .eq('smtp_configurations.is_active', true)
        .single()

      if (!smtpError && smtpData?.smtp_configurations) {
        smtpConfig = smtpData.smtp_configurations
      }
    }

    // Fallback to default SMTP config if domain-specific not found
    if (!smtpConfig) {
      console.log('No domain-specific SMTP config found, using default');
      const { data: defaultSmtpData, error: defaultSmtpError } = await supabaseClient
        .from('smtp_configurations')
        .select(`
          *,
          shops (
            id,
            name,
            company_name,
            company_address,
            company_postcode,
            company_city,
            company_phone,
            company_email,
            company_website
          )
        `)
        .eq('is_active', true)
        .limit(1)
        .single()

      if (!defaultSmtpError && defaultSmtpData) {
        smtpConfig = defaultSmtpData
      }
    }

    if (!smtpConfig) {
      console.error('No SMTP configuration found');
      throw new Error('No SMTP configuration available')
    }

    console.log('Using SMTP config:', smtpConfig.sender_email);

    // Determine language based on customer_language and origin_domain
    const shop = smtpConfig.shops || { company_name: 'Heizöl-Express GmbH', name: 'Heizöl-Express' }
    
    // Check for Italian: customer_language = 'it' OR origin_domain contains 'gasoliocasa'
    const isItalian = order.customer_language === 'it' || order.origin_domain?.includes('gasoliocasa');
    
    // Check for French: only Fioul Rapide should generate French invoices
    const isFrench = !isItalian && (shop.name === 'Fioul Rapide' || shop.company_name === 'Fioul Rapide');
    
    console.log('Language detection:', { 
      customerLanguage: order.customer_language, 
      originDomain: order.origin_domain,
      shopName: shop.name, 
      companyName: shop.company_name, 
      isItalian, 
      isFrench 
    });

    // Get bank account information
    let bankAccount = null
    if (order.bank_account_id) {
      const { data: bankData, error: bankError } = await supabaseClient
        .from('bank_accounts')
        .select('*')
        .eq('id', order.bank_account_id)
        .single()

      if (!bankError && bankData) {
        bankAccount = bankData
      }
    }

    // Download the PDF file from Supabase Storage
    let pdfBuffer = null
    if (invoiceFileUrl) {
      try {
        // Extract filename from URL
        const urlParts = invoiceFileUrl.split('/')
        const filename = urlParts[urlParts.length - 1]
        
        const { data: pdfData, error: downloadError } = await supabaseClient.storage
          .from('invoices')
          .download(filename)

        if (downloadError) {
          console.error('Error downloading PDF:', downloadError)
        } else {
          pdfBuffer = await pdfData.arrayBuffer()
          console.log('PDF downloaded successfully, size:', pdfBuffer.byteLength)
        }
      } catch (downloadError) {
        console.error('Error processing PDF download:', downloadError)
      }
    }

    // Initialize Resend with the SMTP config's API key
    const resend = new Resend(smtpConfig.resend_api_key)

    // Create email content based on language
    let emailSubject: string;
    let emailHtml: string;

    if (isItalian) {
      emailSubject = `La tua fattura - Ordine ${order.order_number}`;
      emailHtml = generateItalianInvoiceEmail(order, invoiceNumber, shop, bankAccount);
    } else if (isFrench) {
      emailSubject = `Votre facture - Commande ${order.order_number}`;
      emailHtml = generateFrenchInvoiceEmail(order, invoiceNumber, shop, bankAccount);
    } else {
      // German email (existing template with anyname support)
      const accountHolderName = bankAccount?.anyname ? shop.company_name : bankAccount?.account_holder;
      
      emailSubject = `Ihre Rechnung - Bestellung ${order.order_number}`;
      emailHtml = `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rechnung ${invoiceNumber}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb;">
        <tr>
            <td align="center" style="padding: 24px;">
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="640" style="max-width: 640px; width: 100%;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #2ed573; border-radius: 12px 12px 0 0; padding: 32px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 8px 0; font-family: Arial, sans-serif;">Ihre Rechnung ist bereit!</h1>
                            <p style="color: #ffffff; font-size: 16px; margin: 0; font-family: Arial, sans-serif;">Vielen Dank für Ihre Bestellung bei ${shop.company_name}</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 32px; border-radius: 0 0 12px 12px;">
                            
                            <!-- Section Title -->
                            <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 20px 0; font-family: Arial, sans-serif; border-left: 4px solid #2ed573; padding-left: 12px;">📋 Bestelldetails</h2>
                            
                            <!-- Order Details Grid -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Bestellnummer</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.order_number}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Rechnungsnummer</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${invoiceNumber}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Kunde</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.customer_name}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Produkt</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.product || 'Heizöl Standard'}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Menge</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.liters.toLocaleString('de-DE')} Liter</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                            <tr>
                                                <td style="padding: 16px;">
                                                    <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Lieferadresse</div>
                                                    <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${order.delivery_street}, ${order.delivery_postcode} ${order.delivery_city}</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Total Card -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #2ed573; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 24px; text-align: center;">
                                        <div style="color: #ffffff; font-size: 16px; font-weight: 500; margin-bottom: 8px; font-family: Arial, sans-serif;">Gesamtbetrag</div>
                                        <div style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0; font-family: Arial, sans-serif;">€${order.total_amount.toFixed(2)}</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    ${bankAccount ? `
                    <!-- Payment Information -->
                    <tr>
                        <td style="padding: 12px 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 32px;">
                                        <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 20px 0; font-family: Arial, sans-serif; border-left: 4px solid #2ed573; padding-left: 12px;">💳 Zahlungsinformationen</h2>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #e3f2fd; border: 1px solid #2196f3; border-radius: 8px; border-left: 4px solid #2196f3;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <h3 style="margin-top: 0; color: #1976d2; font-family: Arial, sans-serif;">Bankverbindung für Überweisung</h3>
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Bank</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${bankAccount.bank_name}</div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Kontoinhaber</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${accountHolderName}</div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">IBAN</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${formatGermanIban(bankAccount.iban)}</div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">${bankAccount.bic ? 'BIC' : 'Verwendungszweck'}</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;">${bankAccount.bic || `<strong>${order.order_number}</strong>`}</div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        ${bankAccount.bic ? `
                                                        <tr>
                                                            <td colspan="2" style="padding: 8px 0;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 16px;">
                                                                            <div style="font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 4px; font-family: Arial, sans-serif;">Verwendungszweck</div>
                                                                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; font-family: Arial, sans-serif;"><strong>${order.order_number}</strong></div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        ` : ''}
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
                                            <tr>
                                                <td style="padding: 15px;">
                                                    <div style="color: #1f2937; font-size: 16px; font-weight: 500; font-family: Arial, sans-serif;">
                                                        <strong>Sehr wichtiger Hinweis:</strong> Bitte geben Sie bei der Überweisung unbedingt exakt die Bestellnummer <strong>${order.order_number}</strong> als Verwendungszweck an und stellen Sie sicher, dass Sie an den richtigen Empfänger <strong>${accountHolderName}</strong> überweisen, damit wir Ihre Zahlung korrekt zuordnen können.
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ''}
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 12px 0 0 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1f2937; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 32px; text-align: center;">
                                        <div style="color: #ffffff; font-size: 20px; font-weight: 700; margin-bottom: 16px; font-family: Arial, sans-serif;">${shop.company_name}</div>
                                        ${shop.company_address ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">${shop.company_address}, ${shop.company_postcode} ${shop.company_city}</div>` : ''}
                                        ${shop.company_phone ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">Tel: ${shop.company_phone}</div>` : ''}
                                        ${shop.company_email ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">E-Mail: <a href="mailto:${shop.company_email}" style="color: #2ed573; text-decoration: none; font-weight: 500;">${shop.company_email}</a></div>` : ''}
                                        ${shop.company_website ? `<div style="color: #d1d5db; font-size: 14px; margin: 8px 0; font-family: Arial, sans-serif;">Web: <a href="${shop.company_website}" style="color: #2ed573; text-decoration: none; font-weight: 500;">${shop.company_website}</a></div>` : ''}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
      `;
    }

    // Prepare email attachments
    const attachments = []
    if (pdfBuffer) {
      // Extract filename from URL for attachment
      const urlParts = invoiceFileUrl.split('/')
      const filename = urlParts[urlParts.length - 1]
      
      attachments.push({
        filename: filename,
        content: Array.from(new Uint8Array(pdfBuffer)),
        type: 'application/pdf',
        disposition: 'attachment'
      })
    }

    console.log('Sending email to:', order.customer_email);
    console.log('From:', smtpConfig.sender_email);
    console.log('Language:', isItalian ? 'Italian' : (isFrench ? 'French' : 'German'));
    console.log('Attachments:', attachments.length);

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: `${smtpConfig.sender_name} <${smtpConfig.sender_email}>`,
      to: [order.customer_email],
      subject: emailSubject,
      html: emailHtml,
      attachments: attachments.length > 0 ? attachments : undefined
    })

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error);
      throw new Error(`Failed to send email: ${emailResponse.error.message}`)
    }

    console.log('Email sent successfully:', emailResponse.data?.id);

    // Log the email sending
    await supabaseClient
      .from('email_sending_logs')
      .insert({
        order_id: orderId,
        recipient_email: order.customer_email,
        subject: emailSubject,
        status: 'sent',
        sent_at: new Date().toISOString(),
        smtp_config_id: smtpConfig.id
      })

    return new Response(
      JSON.stringify({
        success: true,
        emailId: emailResponse.data?.id,
        message: 'Invoice email sent successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error sending invoice email:', error)
    
    // Log the failed email attempt
    try {
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )
      
      const { orderId } = await req.json().catch(() => ({}))
      
      if (orderId) {
        await supabaseClient
          .from('email_sending_logs')
          .insert({
            order_id: orderId,
            recipient_email: 'unknown',
            subject: 'Invoice Email Failed',
            status: 'failed',
            error_message: error.message
          })
      }
    } catch (logError) {
      console.error('Failed to log email error:', logError)
    }

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
