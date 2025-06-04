
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw, Webhook, AlertTriangle, CheckCircle, Clock, ExternalLink } from 'lucide-react';

interface WebhookLog {
  id: string;
  payment_id: string;
  transaction_type: string;
  status: string;
  webhook_data: any;
  created_at: string;
  notes?: string;
}

const WebhookMonitor = () => {
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const { toast } = useToast();

  const fetchWebhookLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('nexi_payment_logs')
        .select('*')
        .in('transaction_type', ['webhook_received', 'webhook_processed', 'webhook_orphaned'])
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching webhook logs:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch webhook logs',
          variant: 'destructive'
        });
        return;
      }

      setWebhookLogs(data || []);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to load webhook data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWebhookLogs();
    
    // Set up real-time subscription for webhook logs
    const subscription = supabase
      .channel('webhook_logs')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'nexi_payment_logs',
          filter: 'transaction_type=in.(webhook_received,webhook_processed,webhook_orphaned)'
        }, 
        (payload) => {
          console.log('New webhook log received:', payload);
          setWebhookLogs(prev => [payload.new as WebhookLog, ...prev.slice(0, 49)]);
          setLastRefresh(new Date());
          
          // Show notification for new webhooks
          if (payload.new.transaction_type === 'webhook_received') {
            toast({
              title: 'New Webhook Received',
              description: `Payment ID: ${payload.new.payment_id}`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getStatusIcon = (type: string, status: string) => {
    if (type === 'webhook_orphaned') return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    if (type === 'webhook_processed' && status === 'completed') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (type === 'webhook_received') return <Webhook className="h-4 w-4 text-blue-500" />;
    return <Clock className="h-4 w-4 text-gray-500" />;
  };

  const getStatusBadge = (type: string, status: string) => {
    if (type === 'webhook_orphaned') return <Badge variant="destructive">Orphaned</Badge>;
    if (type === 'webhook_processed') {
      if (status === 'completed') return <Badge variant="default" className="bg-green-600">Processed</Badge>;
      if (status === 'failed') return <Badge variant="destructive">Failed</Badge>;
      return <Badge variant="secondary">Processed</Badge>;
    }
    if (type === 'webhook_received') return <Badge variant="outline">Received</Badge>;
    return <Badge variant="secondary">{type}</Badge>;
  };

  const formatWebhookData = (data: any) => {
    if (!data) return 'No data';
    
    const key_fields = ['trackid', 'tranid', 'result', 'responsecode', 'auth', 'method'];
    const summary: string[] = [];
    
    key_fields.forEach(field => {
      if (data[field] || data.parsed_data?.[field]) {
        summary.push(`${field}: ${data[field] || data.parsed_data[field]}`);
      }
    });
    
    return summary.length > 0 ? summary.join(', ') : 'Various fields';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="h-5 w-5" />
              Webhook Monitor
            </CardTitle>
            <CardDescription>
              Real-time monitoring of Nexi webhook activity
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
            <Button
              onClick={fetchWebhookLogs}
              disabled={isLoading}
              size="sm"
              variant="outline"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading webhook logs...</span>
          </div>
        ) : webhookLogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Webhook className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No webhooks received yet</p>
            <p className="text-sm">Webhook activity will appear here in real-time</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {webhookLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(log.transaction_type, log.status)}
                    <span className="font-medium">{log.payment_id}</span>
                    {getStatusBadge(log.transaction_type, log.status)}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600">
                  {formatWebhookData(log.webhook_data)}
                </div>
                
                {log.notes && (
                  <div className="text-xs text-gray-500 italic">
                    {log.notes}
                  </div>
                )}
                
                <details className="text-xs">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                    View raw data
                  </summary>
                  <pre className="mt-2 bg-gray-50 p-2 rounded text-xs overflow-x-auto">
                    {JSON.stringify(log.webhook_data, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Showing last 50 webhook events</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('/admin/webhook-test', '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Test Webhook
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookMonitor;
