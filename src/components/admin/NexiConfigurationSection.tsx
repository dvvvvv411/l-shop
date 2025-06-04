import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Settings, Save, TestTube, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
    id: '',
    merchant_id: '',
    terminal_id: '',
    api_key: '',
    webhook_url: '',
    environment: 'test',
    is_sandbox: true,
    is_active: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);

  useEffect(() => {
    loadNexiConfig();
  }, []);

  const loadNexiConfig = async () => {
    try {
      console.log('Loading Nexi configuration...');
      const { data, error } = await supabase
        .from('nexi_payment_configs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading Nexi config:', error);
        throw error;
      }

      if (data) {
        console.log('Loaded Nexi configuration:', data);
        // Ensure environment is properly typed
        const environment = data.environment === 'production' ? 'production' : 'test';
        setConfig({
          id: data.id,
          merchant_id: data.merchant_id || '',
          terminal_id: data.terminal_id || '',
          api_key: data.api_key || '',
          webhook_url: data.webhook_url || '',
          environment,
          is_sandbox: data.is_sandbox ?? true,
          is_active: data.is_active ?? true
        });
      } else {
        console.log('No Nexi configuration found, using defaults');
        // Keep default config if no data found
      }
    } catch (error) {
      console.error('Failed to load Nexi configuration:', error);
      toast({
        title: 'Fehler',
        description: 'Die Nexi-Konfiguration konnte nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingConfig(false);
    }
  };

  const handleSaveConfig = async () => {
    setIsLoading(true);
    try {
      console.log('Saving Nexi configuration:', config);
      
      const updateData = {
        merchant_id: config.merchant_id,
        terminal_id: config.terminal_id,
        api_key: config.api_key,
        webhook_url: config.webhook_url,
        environment: config.environment,
        is_sandbox: config.is_sandbox,
        is_active: config.is_active,
        updated_at: new Date().toISOString()
      };

      let result;
      if (config.id) {
        // Update existing record
        result = await supabase
          .from('nexi_payment_configs')
          .update(updateData)
          .eq('id', config.id);
      } else {
        // Insert new record
        result = await supabase
          .from('nexi_payment_configs')
          .insert(updateData)
          .select()
          .single();
        
        if (result.data) {
          setConfig(prev => ({ ...prev, id: result.data.id }));
        }
      }

      if (result.error) {
        throw result.error;
      }

      console.log('Nexi configuration saved successfully');
      toast({
        title: 'Konfiguration gespeichert',
        description: 'Die Nexi-Zahlungskonfiguration wurde erfolgreich aktualisiert.',
      });

      // Reload config to verify it was saved correctly
      await loadNexiConfig();
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
      console.log('Testing Nexi connection with config:', {
        merchant_id: config.merchant_id,
        terminal_id: config.terminal_id,
        environment: config.environment,
        has_api_key: !!config.api_key
      });
      
      // Test the connection using a simple API call
      const baseUrl = config.environment === 'production' 
        ? 'https://xpay.nexigroup.com/api/phoenix-0.0/psp/api/v1'
        : 'https://stg-ta.nexigroup.com/api/phoenix-0.0/psp/api/v1';

      const testResponse = await fetch(`${baseUrl}/orders/build`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': config.api_key.trim(),
          'X-Merchant-Id': config.merchant_id.trim(),
          'Accept': 'application/json',
          'User-Agent': 'Heizoel-Shop/1.0'
        },
        body: JSON.stringify({
          orderId: `TEST_${Date.now()}`,
          amount: { currency: 'EUR', value: 100 },
          paymentSession: {
            actionType: 'PAY',
            amount: { currency: 'EUR', value: 100 },
            language: 'ITA',
            resultUrl: 'https://example.com/success',
            cancelUrl: 'https://example.com/cancel'
          }
        })
      });

      if (testResponse.status === 401) {
        throw new Error('Authentifizierung fehlgeschlagen - Bitte überprüfen Sie Ihre API-Zugangsdaten');
      } else if (testResponse.status === 400) {
        // A 400 error with proper authentication means the API is reachable
        toast({
          title: 'Verbindung erfolgreich',
          description: 'Die Authentifizierung mit der Nexi API war erfolgreich.',
        });
      } else if (testResponse.ok) {
        toast({
          title: 'Verbindung erfolgreich',
          description: 'Die Verbindung zu Nexi wurde erfolgreich getestet.',
        });
      } else {
        const errorText = await testResponse.text();
        throw new Error(`API-Fehler: ${testResponse.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Nexi connection test failed:', error);
      toast({
        title: 'Verbindungsfehler',
        description: error.message || 'Die Verbindung zu Nexi konnte nicht hergestellt werden.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingConfig) {
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
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Konfiguration wird geladen...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

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
            <Label htmlFor="api_key">API-Schlüssel</Label>
            <Input
              id="api_key"
              type="password"
              value={config.api_key}
              onChange={(e) => setConfig({ ...config, api_key: e.target.value })}
              placeholder="Geben Sie Ihren Nexi API-Schlüssel ein"
            />
            <p className="text-sm text-gray-500">
              Ihr API-Schlüssel für die moderne Nexi REST API
            </p>
            {!config.api_key && (
              <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">API-Schlüssel ist erforderlich für die Integration</span>
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

        {/* Technical Details - UPDATED with correct authentication method */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Technische Details</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Test API Endpoint: https://stg-ta.nexigroup.com/api/phoenix-0.0/psp/api/v1</li>
            <li>• Live API Endpoint: https://xpay.nexigroup.com/api/phoenix-0.0/psp/api/v1</li>
            <li>• Authentifizierung: API-Schlüssel basiert (X-API-Key Header)</li>
            <li>• Datenformat: JSON (REST API)</li>
            <li>• Webhook Format: JSON POST</li>
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
