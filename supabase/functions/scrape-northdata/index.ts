
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

async function scrapeNorthdata(url: string): Promise<NorthdataCompanyData> {
  try {
    console.log('Scraping Northdata URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    console.log('HTML fetched, length:', html.length);

    // Extract company data using regex patterns
    const data: NorthdataCompanyData = {};

    // Company name - look for h1 with company name or title
    const nameMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || 
                     html.match(/<title>([^|<]+)/i);
    if (nameMatch) {
      const name = nameMatch[1].trim().replace(/\s+/g, ' ');
      data.company_name = name;
      data.name = name;
    }

    // Address information
    const addressMatch = html.match(/Adresse[^>]*>([^<]+)/i) ||
                        html.match(/Sitz[^>]*>([^<]+)/i) ||
                        html.match(/([^,]+,\s*\d{5}\s+[^,]+)/);
    if (addressMatch) {
      const fullAddress = addressMatch[1].trim();
      // Try to split address into components
      const addressParts = fullAddress.split(',').map(part => part.trim());
      
      if (addressParts.length >= 2) {
        data.company_address = addressParts[0];
        
        // Extract postcode and city from the last part
        const lastPart = addressParts[addressParts.length - 1];
        const postcodeMatch = lastPart.match(/(\d{5})\s+(.+)/);
        if (postcodeMatch) {
          data.company_postcode = postcodeMatch[1];
          data.company_city = postcodeMatch[2];
        }
      } else {
        data.company_address = fullAddress;
      }
    }

    // Phone number
    const phoneMatch = html.match(/(?:Telefon|Tel|Phone)[^>]*>([^<]+)/i) ||
                      html.match(/(\+49[\s\-]?\d{2,4}[\s\-]?\d{3,8})/);
    if (phoneMatch) {
      data.company_phone = phoneMatch[1].trim();
    }

    // Email
    const emailMatch = html.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch) {
      data.company_email = emailMatch[1];
    }

    // Website
    const websiteMatch = html.match(/(?:Website|Homepage|Web)[^>]*>([^<]+)/i) ||
                        html.match(/(https?:\/\/[^\s<>"]+)/);
    if (websiteMatch) {
      data.company_website = websiteMatch[1].trim();
    }

    // VAT number (USt-IdNr)
    const vatMatch = html.match(/(?:USt-IdNr|VAT|Umsatzsteuer-ID)[^>]*>([^<]+)/i) ||
                    html.match(/(DE\d{9})/);
    if (vatMatch) {
      data.vat_number = vatMatch[1].trim();
    }

    // Business owner/manager
    const ownerMatch = html.match(/(?:Geschäftsführer|Inhaber|CEO|Managing Director)[^>]*>([^<]+)/i);
    if (ownerMatch) {
      data.business_owner = ownerMatch[1].trim();
    }

    // Court registration
    const courtMatch = html.match(/(?:Amtsgericht|Registergericht)[^>]*>([^<]+)/i);
    if (courtMatch) {
      data.court_name = courtMatch[1].trim();
    }

    // Registration number
    const regMatch = html.match(/(?:HRB|Handelsregister)[^>]*>([^<]+)/i) ||
                    html.match(/(HRB\s*\d+)/i);
    if (regMatch) {
      data.registration_number = regMatch[1].trim();
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
