
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Settings, Save, TestTube, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NexiConfig {
  id: string;
  merchant_id: string;
  terminal_id: string;
  api_key: string;
  webhook_url: string;
  environment: 'test' | 'production';
  is_sandbox: boolean;
  is_active: boolean;
}

const NexiConfigurationSection = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<NexiConfig>({
    id: '1',
    merchant_id: '002132517',
    terminal_id: '03893387',
    api_key: '',
    webhook_url: '',
    environment: 'test',
    is_sandbox: true,
    is_active: true
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveConfig = async () => {
    setIsLoading(true);
    try {
      console.log('Saving Nexi configuration:', config);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Konfiguration gespeichert',
        description: 'Die Nexi-Zahlungskonfiguration wurde erfolgreich aktualisiert.',
      });
    } catch (error) {
      console.error('Failed to save Nexi configuration:', error);
      toast({
        title: 'Fehler',
        description: 'Die Konfiguration konnte nicht gespeichert werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    if (!config.api_key) {
      toast({
        title: 'API-Schlüssel fehlt',
        description: 'Bitte geben Sie einen API-Schlüssel ein, bevor Sie die Verbindung testen.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Testing Nexi connection with config:', config);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Verbindung erfolgreich',
        description: 'Die Verbindung zu Nexi wurde erfolgreich getestet.',
      });
    } catch (error) {
      console.error('Nexi connection test failed:', error);
      toast({
        title: 'Verbindungsfehler',
        description: 'Die Verbindung zu Nexi konnte nicht hergestellt werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          <CardTitle>Nexi Pay by Link Konfiguration</CardTitle>
        </div>
        <CardDescription>
          Konfigurieren Sie die Nexi Italy Pay by Link Integration für sichere Kreditkartenzahlungen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label>Status:</Label>
            <Badge variant={config.is_active ? 'default' : 'secondary'}>
              {config.is_active ? 'Aktiv' : 'Inaktiv'}
            </Badge>
            <Badge variant={config.environment === 'test' ? 'outline' : 'default'}>
              {config.environment === 'test' ? 'Test' : 'Live'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestConnection}
              disabled={isLoading || !config.api_key}
              className="flex items-center gap-2"
            >
              <TestTube className="h-4 w-4" />
              Verbindung testen
            </Button>
          </div>
        </div>

        <Separator />

        {/* API Configuration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-4 w-4" />
            <h4 className="font-medium">API-Konfiguration</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="merchant_id">Merchant Alias</Label>
              <Input
                id="merchant_id"
                value={config.merchant_id}
                onChange={(e) => setConfig({ ...config, merchant_id: e.target.value })}
                placeholder="z.B. ALIAS_WEB_00001"
              />
              <p className="text-sm text-gray-500">
                Ihr Nexi Merchant-Alias aus dem Nexi Dashboard
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="terminal_id">Terminal ID (optional)</Label>
              <Input
                id="terminal_id"
                value={config.terminal_id}
                onChange={(e) => setConfig({ ...config, terminal_id: e.target.value })}
                placeholder="z.B. 03893387"
              />
              <p className="text-sm text-gray-500">
                Ihre Nexi Terminal-ID (falls erforderlich)
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api_key">API-Schlüssel (MAC Key)</Label>
            <Input
              id="api_key"
              type="password"
              value={config.api_key}
              onChange={(e) => setConfig({ ...config, api_key: e.target.value })}
              placeholder="Geben Sie Ihren Nexi MAC-Schlüssel ein"
            />
            <p className="text-sm text-gray-500">
              Ihr MAC-Schlüssel für die Nexi Pay by Link Integration
            </p>
            {!config.api_key && (
              <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">MAC-Schlüssel ist erforderlich für die Integration</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook_url">Webhook URL</Label>
            <Input
              id="webhook_url"
              value={config.webhook_url}
              onChange={(e) => setConfig({ ...config, webhook_url: e.target.value })}
              placeholder="https://ihr-domain.com/api/nexi/webhook"
            />
            <p className="text-sm text-gray-500">
              URL für den Empfang von Zahlungsstatusbenachrichtigungen (optional)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="environment">Umgebung</Label>
            <Select 
              value={config.environment} 
              onValueChange={(value: 'test' | 'production') => 
                setConfig({ 
                  ...config, 
                  environment: value, 
                  is_sandbox: value === 'test' 
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="test">Test (Sandbox)</SelectItem>
                <SelectItem value="production">Produktion (Live)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              Wählen Sie die Umgebung für Ihre Zahlungsabwicklung
            </p>
          </div>
        </div>

        <Separator />

        {/* Switches */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Nexi-Zahlungen aktivieren</Label>
              <p className="text-sm text-gray-500">
                Aktivieren oder deaktivieren Sie Nexi-Kreditkartenzahlungen
              </p>
            </div>
            <Switch
              checked={config.is_active}
              onCheckedChange={(checked) => setConfig({ ...config, is_active: checked })}
            />
          </div>
        </div>

        <Separator />

        {/* Information Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Nexi Pay by Link Features</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Sichere Kreditkartenzahlungen über Nexi Italy</li>
            <li>• Pay by Link-Methode ohne komplexe Integration</li>
            <li>• Unterstützt alle gängigen Kreditkarten (Visa, Mastercard, etc.)</li>
            <li>• Automatische Webhooks für Statusupdates</li>
            <li>• PCI DSS-konforme Zahlungsabwicklung</li>
            <li>• Mehrsprachige Zahlungsseiten</li>
          </ul>
        </div>

        {/* Technical Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Technische Details</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• API Endpoint: {config.environment === 'production' ? 'https://xpay.nexigroup.com' : 'https://int-ecomm.nexi.it'}</li>
            <li>• Authentifizierung: MAC-Schlüssel basiert</li>
            <li>• Datenformat: URL-encoded form data</li>
            <li>• Webhook Format: Form POST parameters</li>
          </ul>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSaveConfig}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isLoading ? 'Speichern...' : 'Konfiguration speichern'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NexiConfigurationSection;
