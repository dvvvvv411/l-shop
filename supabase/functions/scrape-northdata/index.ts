
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
    
    // Split by comma to separate company info from location/court info
    const mainParts = companyPath.split(',');
    
    if (mainParts.length >= 1) {
      // Extract company name (first part)
      const companyName = mainParts[0].trim();
      data.company_name = companyName;
      data.name = companyName;
      console.log('Extracted company name:', companyName);
    }
    
    if (mainParts.length >= 2) {
      // Extract location and court info (second part)
      const locationCourtPart = mainParts[1].trim();
      console.log('Location/Court part:', locationCourtPart);
      
      // Parse the location/court part which has format: "City/Amtsgericht CourtName HRB Number"
      // Split by forward slash to separate city from court info
      const locationParts = locationCourtPart.split('/');
      
      if (locationParts.length >= 1) {
        // First part before slash is the city
        const city = locationParts[0].trim();
        data.company_city = city;
        console.log('Extracted city:', city);
      }
      
      if (locationParts.length >= 2) {
        // Second part contains court info: "Amtsgericht CourtName HRB Number"
        const courtInfo = locationParts[1].trim();
        console.log('Court info:', courtInfo);
        
        // Extract court name - everything after "Amtsgericht" but before "HRB"
        const amtsgerichtMatch = courtInfo.match(/Amtsgericht\s+(.+?)\s+HRB/);
        if (amtsgerichtMatch) {
          const courtName = `Amtsgericht ${amtsgerichtMatch[1].trim()}`;
          data.court_name = courtName;
          console.log('Extracted court name:', courtName);
        }
        
        // Extract HRB registration number
        const hrbMatch = courtInfo.match(/HRB\s*(\d+)/);
        if (hrbMatch) {
          data.registration_number = `HRB ${hrbMatch[1]}`;
          console.log('Extracted registration number:', data.registration_number);
        }
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
