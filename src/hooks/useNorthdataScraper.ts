
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ScrapedData {
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

export const useNorthdataScraper = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const scrapeNorthdataUrl = async (url: string): Promise<ScrapedData | null> => {
    setIsLoading(true);
    
    try {
      console.log('Calling scrape-northdata function with URL:', url);
      
      const { data, error } = await supabase.functions.invoke('scrape-northdata', {
        body: { url }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to scrape company data');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      toast({
        title: 'Erfolg',
        description: 'Firmendaten wurden erfolgreich abgerufen.',
      });

      return data?.data || null;

    } catch (error) {
      console.error('Error scraping Northdata:', error);
      
      toast({
        title: 'Fehler',
        description: error instanceof Error ? error.message : 'Fehler beim Abrufen der Firmendaten.',
        variant: 'destructive',
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    scrapeNorthdataUrl,
    isLoading
  };
};
