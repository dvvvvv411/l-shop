
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NorthdataCompanyData {
  name?: string;
  company_name?: string;
  company_address?: string;
  company_postcode?: string;
  company_city?: string;
  company_phone?: string;
  company_email?: string;
  company_website?: string;
  vat_number?: string;
  business_owner?: string;
  court_name?: string;
  registration_number?: string;
}

function extractTextFromElement(html: string, patterns: string[]): string | null {
  for (const pattern of patterns) {
    const match = html.match(new RegExp(pattern, 'is'));
    if (match && match[1]) {
      return match[1].trim().replace(/\s+/g, ' ').replace(/&nbsp;/g, ' ');
    }
  }
  return null;
}

function cleanText(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function scrapeNorthdata(url: string): Promise<NorthdataCompanyData> {
  try {
    console.log('Scraping Northdata URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    console.log('HTML fetched, length:', html.length);

    const data: NorthdataCompanyData = {};

    // Company name - multiple approaches
    const namePatterns = [
      '<h1[^>]*>([^<]+)<\/h1>',
      '<title>([^|<,]+?)(?:\\s*[|,]|\\s*-\\s*|$)',
      'class="company-name[^"]*"[^>]*>([^<]+)<',
      'data-company-name="([^"]+)"',
      '<span[^>]*class="[^"]*name[^"]*"[^>]*>([^<]+)<\/span>'
    ];
    
    const extractedName = extractTextFromElement(html, namePatterns);
    if (extractedName) {
      const cleanName = cleanText(extractedName);
      data.company_name = cleanName;
      data.name = cleanName;
    }

    // Address extraction - look for structured address data
    const addressPatterns = [
      'Adresse[^>]*>\\s*([^<]+)<',
      'Sitz[^>]*>\\s*([^<]+)<',
      'class="address[^"]*"[^>]*>([^<]+)<',
      'Anschrift[^>]*>\\s*([^<]+)<',
      '<td[^>]*>\\s*Adresse[^<]*<\/td>\\s*<td[^>]*>([^<]+)<',
      'Geschäftsadresse[^>]*>\\s*([^<]+)<'
    ];

    const fullAddress = extractTextFromElement(html, addressPatterns);
    if (fullAddress) {
      const cleanAddress = cleanText(fullAddress);
      
      // Try to parse German address format: "Street Number, PLZ City"
      const addressMatch = cleanAddress.match(/^(.+?),?\s*(\d{5})\s+(.+)$/);
      if (addressMatch) {
        data.company_address = addressMatch[1].replace(/,$/, '').trim();
        data.company_postcode = addressMatch[2];
        data.company_city = addressMatch[3];
      } else {
        // Fallback: try to extract postcode and city separately
        const postcodeMatch = cleanAddress.match(/(\d{5})/);
        if (postcodeMatch) {
          data.company_postcode = postcodeMatch[1];
          
          // Extract city after postcode
          const cityMatch = cleanAddress.match(/\d{5}\s+([^,\n]+)/);
          if (cityMatch) {
            data.company_city = cityMatch[1].trim();
          }
          
          // Extract street before postcode
          const streetMatch = cleanAddress.match(/^(.+?)\s*,?\s*\d{5}/);
          if (streetMatch) {
            data.company_address = streetMatch[1].trim();
          }
        } else {
          data.company_address = cleanAddress;
        }
      }
    }

    // Phone number extraction
    const phonePatterns = [
      'Telefon[^>]*>\\s*([^<]+)<',
      'Tel[^>]*>\\s*([^<]+)<',
      'Phone[^>]*>\\s*([^<]+)<',
      'class="phone[^"]*"[^>]*>([^<]+)<',
      '<td[^>]*>\\s*Telefon[^<]*<\/td>\\s*<td[^>]*>([^<]+)<',
      '(?:Telefon|Tel|Phone):\\s*([+\\d\\s\\-\\/\\(\\)]+)',
      '(\\+49[\\s\\-]?\\d{2,4}[\\s\\-]?\\d{3,8})',
      '(\\d{2,5}[\\s\\-]?\\d{3,8})'
    ];

    const phone = extractTextFromElement(html, phonePatterns);
    if (phone) {
      data.company_phone = cleanText(phone);
    }

    // Email extraction
    const emailPatterns = [
      'mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})',
      '([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})',
      'E-Mail[^>]*>\\s*([^<]+)<',
      'Email[^>]*>\\s*([^<]+)<',
      'class="email[^"]*"[^>]*>([^<]+)<'
    ];

    const email = extractTextFromElement(html, emailPatterns);
    if (email && email.includes('@')) {
      data.company_email = cleanText(email);
    }

    // Website extraction
    const websitePatterns = [
      'Website[^>]*>\\s*<a[^>]*href="([^"]+)"',
      'Homepage[^>]*>\\s*<a[^>]*href="([^"]+)"',
      'Web[^>]*>\\s*<a[^>]*href="([^"]+)"',
      'href="(https?://[^"]+)"[^>]*>\\s*(?:www\\.|Website|Homepage)',
      'class="website[^"]*"[^>]*href="([^"]+)"',
      '(https?://[^\\s<>"]+\\.[a-zA-Z]{2,})'
    ];

    const website = extractTextFromElement(html, websitePatterns);
    if (website && (website.startsWith('http') || website.startsWith('www'))) {
      data.company_website = cleanText(website);
    }

    // VAT number (USt-IdNr) extraction
    const vatPatterns = [
      'USt-IdNr[^>]*>\\s*([^<]+)<',
      'Umsatzsteuer-ID[^>]*>\\s*([^<]+)<',
      'VAT[^>]*>\\s*([^<]+)<',
      'Umsatzsteuer-Identifikationsnummer[^>]*>\\s*([^<]+)<',
      '<td[^>]*>\\s*USt-IdNr[^<]*<\/td>\\s*<td[^>]*>([^<]+)<',
      '(DE\\d{9})',
      'USt[^:]*:\\s*([A-Z]{2}\\d{9})'
    ];

    const vat = extractTextFromElement(html, vatPatterns);
    if (vat) {
      data.vat_number = cleanText(vat);
    }

    // Business owner/manager extraction
    const ownerPatterns = [
      'Geschäftsführer[^>]*>\\s*([^<]+)<',
      'Inhaber[^>]*>\\s*([^<]+)<',
      'CEO[^>]*>\\s*([^<]+)<',
      'Managing Director[^>]*>\\s*([^<]+)<',
      'Geschäftsführung[^>]*>\\s*([^<]+)<',
      '<td[^>]*>\\s*Geschäftsführer[^<]*<\/td>\\s*<td[^>]*>([^<]+)<',
      'Vertretungsberechtigte[^>]*>\\s*([^<]+)<',
      'class="manager[^"]*"[^>]*>([^<]+)<'
    ];

    const owner = extractTextFromElement(html, ownerPatterns);
    if (owner) {
      data.business_owner = cleanText(owner);
    }

    // Court registration extraction
    const courtPatterns = [
      'Amtsgericht[^>]*>\\s*([^<]+)<',
      'Registergericht[^>]*>\\s*([^<]+)<',
      '<td[^>]*>\\s*Amtsgericht[^<]*<\/td>\\s*<td[^>]*>([^<]+)<',
      'Gericht[^>]*>\\s*([^<]+)<',
      'class="court[^"]*"[^>]*>([^<]+)<'
    ];

    const court = extractTextFromElement(html, courtPatterns);
    if (court) {
      data.court_name = cleanText(court);
    }

    // Registration number extraction
    const regPatterns = [
      'HRB[^>]*>\\s*([^<]+)<',
      'Handelsregister[^>]*>\\s*([^<]+)<',
      '<td[^>]*>\\s*HRB[^<]*<\/td>\\s*<td[^>]*>([^<]+)<',
      'Registernummer[^>]*>\\s*([^<]+)<',
      '(HRB\\s*\\d+)',
      'HR\\s*B\\s*(\\d+)',
      'class="register[^"]*"[^>]*>([^<]+)<'
    ];

    const registration = extractTextFromElement(html, regPatterns);
    if (registration) {
      data.registration_number = cleanText(registration);
    }

    console.log('Extracted data:', data);
    return data;

  } catch (error) {
    console.error('Error scraping Northdata:', error);
    throw new Error(`Failed to scrape Northdata: ${error.message}`);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate that it's a Northdata URL
    if (!url.includes('northdata.de')) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid Northdata.de URL' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const companyData = await scrapeNorthdata(url);

    return new Response(
      JSON.stringify({ data: companyData }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
