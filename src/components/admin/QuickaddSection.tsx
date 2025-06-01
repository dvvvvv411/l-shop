
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ExternalLink, Zap, TestTube } from 'lucide-react';
import { useNorthdataScraper } from '@/hooks/useNorthdataScraper';

interface QuickaddSectionProps {
  onDataFetched: (data: any) => void;
}

const QuickaddSection: React.FC<QuickaddSectionProps> = ({ onDataFetched }) => {
  const [northdataUrl, setNorthdataUrl] = useState('');
  const { scrapeNorthdataUrl, isLoading } = useNorthdataScraper();

  const handleQuickadd = async () => {
    if (!northdataUrl.trim()) {
      return;
    }

    const scrapedData = await scrapeNorthdataUrl(northdataUrl);
    
    if (scrapedData) {
      onDataFetched(scrapedData);
      setNorthdataUrl(''); // Clear the input after successful fetch
    }
  };

  const handleGenerateTestData = () => {
    const testData = {
      name: 'Muster Heizöl Handel',
      company_name: 'Muster Heizöl Handel GmbH',
      company_address: 'Industriestraße 42',
      company_postcode: '10115',
      company_city: 'Berlin',
      company_phone: '+49 30 12345678',
      company_email: 'info@muster-heizooel.de',
      company_website: 'www.muster-heizooel.de',
      vat_number: 'DE123456789',
      business_owner: 'Max Mustermann',
      court_name: 'Amtsgericht Charlottenburg',
      registration_number: 'HRB 12345'
    };

    onDataFetched(testData);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleQuickadd();
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Zap className="h-5 w-5" />
          Quickadd - Firmendaten automatisch ausfüllen
        </CardTitle>
        <p className="text-sm text-blue-600">
          Geben Sie einen Northdata-Link ein, um die Firmendaten automatisch zu importieren, oder verwenden Sie Testdaten.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="https://www.northdata.de/..."
              value={northdataUrl}
              onChange={(e) => setNorthdataUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="pr-10"
            />
            {northdataUrl && (
              <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            )}
          </div>
          <Button 
            onClick={handleQuickadd}
            disabled={!northdataUrl.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Lädt...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Importieren
              </>
            )}
          </Button>
        </div>
        
        <div className="flex justify-center">
          <div className="text-sm text-gray-500">oder</div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleGenerateTestData}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <TestTube className="h-4 w-4 mr-2" />
            Testdaten generieren
          </Button>
        </div>
        
        <div className="mt-3 text-xs text-gray-600">
          <strong>Tipp:</strong> Suchen Sie auf{' '}
          <a 
            href="https://www.northdata.de" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            northdata.de
          </a>{' '}
          nach dem gewünschten Unternehmen und kopieren Sie den Link hierher.
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickaddSection;
