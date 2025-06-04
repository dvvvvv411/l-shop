
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, Send, Globe, Database } from 'lucide-react';

const AdminWebhookTest = () => {
  const [testData, setTestData] = useState({
    trackid: 'H123456',
    tranid: 'TXN_' + Date.now(),
    result: 'CAPTURED',
    auth: '123456',
    ref: 'REF_' + Date.now(),
    amt: '100000',
    responsecode: '00'
  });
  const [customPayload, setCustomPayload] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const { toast } = useToast();

  const webhookUrl = `${window.location.origin.replace('https://preview--', 'https://').replace('.lovable.app', '.supabase.co')}/functions/v1/nexi-webhook`;

  const handleTestWebhook = async (method: 'GET' | 'POST', payload?: any) => {
    setIsLoading(true);
    const testId = Date.now();
    
    try {
      console.log('Testing webhook:', { method, payload, url: webhookUrl });
      
      let response;
      if (method === 'GET') {
        const params = new URLSearchParams(payload || testData);
        response = await fetch(`${webhookUrl}?${params}`, {
          method: 'GET',
          headers: {
            'User-Agent': 'Nexi-Webhook-Test',
            'Accept': 'application/json'
          }
        });
      } else {
        response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Nexi-Webhook-Test',
            'Accept': 'application/json'
          },
          body: payload ? (typeof payload === 'string' ? payload : new URLSearchParams(payload)) : new URLSearchParams(testData)
        });
      }

      const result = await response.text();
      let parsedResult;
      try {
        parsedResult = JSON.parse(result);
      } catch {
        parsedResult = { raw_response: result };
      }

      const testResult = {
        id: testId,
        timestamp: new Date().toISOString(),
        method,
        status: response.status,
        success: response.ok,
        response: parsedResult,
        payload: payload || testData
      };

      setTestResults(prev => [testResult, ...prev]);

      if (response.ok) {
        toast({
          title: 'Webhook Test Successful',
          description: `${method} request returned status ${response.status}`,
        });
      } else {
        toast({
          title: 'Webhook Test Failed',
          description: `${method} request failed with status ${response.status}`,
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Webhook test error:', error);
      const testResult = {
        id: testId,
        timestamp: new Date().toISOString(),
        method,
        status: 0,
        success: false,
        error: error.message,
        payload: payload || testData
      };

      setTestResults(prev => [testResult, ...prev]);

      toast({
        title: 'Webhook Test Error',
        description: `Failed to send ${method} request: ${error.message}`,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomPayloadTest = async () => {
    try {
      const payload = JSON.parse(customPayload);
      await handleTestWebhook('POST', payload);
    } catch (error) {
      toast({
        title: 'Invalid JSON',
        description: 'Please check your custom payload format',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Webhook Testing</h1>
          <p className="text-gray-600">Test Nexi webhook endpoint functionality</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Configuration */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Webhook Configuration
              </CardTitle>
              <CardDescription>
                Current webhook URL configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Webhook URL</label>
                  <Input
                    value={webhookUrl}
                    readOnly
                    className="font-mono text-xs"
                  />
                </div>
                <Badge variant="outline" className="w-fit">
                  Auto-detected from current environment
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="standard" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="standard">Standard Test</TabsTrigger>
              <TabsTrigger value="custom">Custom Payload</TabsTrigger>
            </TabsList>

            <TabsContent value="standard" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Standard Webhook Parameters</CardTitle>
                  <CardDescription>
                    Test with typical Nexi webhook parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Track ID (Order)</label>
                      <Input
                        value={testData.trackid}
                        onChange={(e) => setTestData(prev => ({ ...prev, trackid: e.target.value }))}
                        placeholder="H123456"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Transaction ID</label>
                      <Input
                        value={testData.tranid}
                        onChange={(e) => setTestData(prev => ({ ...prev, tranid: e.target.value }))}
                        placeholder="TXN_123456789"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Result</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={testData.result}
                        onChange={(e) => setTestData(prev => ({ ...prev, result: e.target.value }))}
                      >
                        <option value="CAPTURED">CAPTURED</option>
                        <option value="FAILED">FAILED</option>
                        <option value="PENDING">PENDING</option>
                        <option value="SUCCESS">SUCCESS</option>
                        <option value="DECLINED">DECLINED</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Amount (cents)</label>
                      <Input
                        value={testData.amt}
                        onChange={(e) => setTestData(prev => ({ ...prev, amt: e.target.value }))}
                        placeholder="100000"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Auth Code</label>
                      <Input
                        value={testData.auth}
                        onChange={(e) => setTestData(prev => ({ ...prev, auth: e.target.value }))}
                        placeholder="123456"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Reference</label>
                      <Input
                        value={testData.ref}
                        onChange={(e) => setTestData(prev => ({ ...prev, ref: e.target.value }))}
                        placeholder="REF_123456789"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleTestWebhook('POST')}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Test POST Request
                    </Button>
                    <Button
                      onClick={() => handleTestWebhook('GET')}
                      disabled={isLoading}
                      variant="outline"
                      className="flex-1"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Test GET Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Payload Test</CardTitle>
                  <CardDescription>
                    Send custom JSON payload to webhook
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={customPayload}
                    onChange={(e) => setCustomPayload(e.target.value)}
                    placeholder={JSON.stringify(testData, null, 2)}
                    rows={8}
                    className="font-mono"
                  />
                  <Button
                    onClick={handleCustomPayloadTest}
                    disabled={isLoading || !customPayload}
                    className="w-full"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Custom Payload
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Test Results */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Test Results
              </CardTitle>
              <CardDescription>
                Recent webhook test results and responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {testResults.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No tests run yet. Use the test buttons to start testing.
                  </p>
                ) : (
                  testResults.map((result) => (
                    <div
                      key={result.id}
                      className={`p-4 border rounded-lg ${
                        result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {result.success ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          )}
                          <Badge variant="outline">{result.method}</Badge>
                          <span className="text-sm text-gray-600">
                            Status: {result.status}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(result.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm font-medium">
                          View Details
                        </summary>
                        <div className="mt-2 space-y-2">
                          <div>
                            <strong className="text-xs">Payload:</strong>
                            <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                              {JSON.stringify(result.payload, null, 2)}
                            </pre>
                          </div>
                          <div>
                            <strong className="text-xs">Response:</strong>
                            <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                              {JSON.stringify(result.response || result.error, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </details>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminWebhookTest;
