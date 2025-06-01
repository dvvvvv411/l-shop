
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

function parseNorthdataUrl(url: string): NorthdataCompanyData {
  console.log('Parsing Northdata URL:', url);
  
  const data: NorthdataCompanyData = {};
  
  try {
    // Decode the URL to handle URL encoding
    const decodedUrl = decodeURIComponent(url);
    console.log('Decoded URL:', decodedUrl);
    
    // Extract the path part after the domain
    const urlParts = decodedUrl.split('/');
    const pathIndex = urlParts.findIndex(part => part.includes('northdata.de'));
    
    if (pathIndex === -1 || pathIndex + 1 >= urlParts.length) {
      throw new Error('Invalid Northdata URL format');
    }
    
    // Get the company info part (everything after the domain)
    const companyPath = urlParts.slice(pathIndex + 1).join('/');
    console.log('Company path:', companyPath);
    
    // Split by comma to separate company info from court info
    const parts = companyPath.split(',');
    
    if (parts.length >= 1) {
      // Extract company name (first part)
      const companyName = parts[0].trim();
      data.company_name = companyName;
      data.name = companyName;
      console.log('Extracted company name:', companyName);
    }
    
    if (parts.length >= 2) {
      // Extract city (second part, usually contains the city)
      const cityPart = parts[1].trim();
      data.company_city = cityPart;
      console.log('Extracted city:', cityPart);
    }
    
    if (parts.length >= 3) {
      // Extract court and registration info (third part)
      const courtPart = parts[2].trim();
      console.log('Court part:', courtPart);
      
      // Parse court and registration number
      // Expected format: "Amtsgericht [Court Name] HRB [Number]"
      const courtMatch = courtPart.match(/^(Amtsgericht\s+[^H]+)/);
      if (courtMatch) {
        data.court_name = courtMatch[1].trim();
        console.log('Extracted court name:', data.court_name);
      }
      
      const hrbMatch = courtPart.match(/HRB\s*(\d+)/);
      if (hrbMatch) {
        data.registration_number = `HRB ${hrbMatch[1]}`;
        console.log('Extracted registration number:', data.registration_number);
      }
    }
    
    console.log('Final extracted data:', data);
    return data;
    
  } catch (error) {
    console.error('Error parsing Northdata URL:', error);
    throw new Error(`Failed to parse Northdata URL: ${error.message}`);
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

    const companyData = parseNorthdataUrl(url);

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
