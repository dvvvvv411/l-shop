
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimelineEvent {
  id: string;
  status: string;
  timestamp: string;
  description: string;
  user?: string;
}

interface OrderTimelineProps {
  events: TimelineEvent[];
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ events }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Neu':
        return 'bg-red-500';
      case 'Bezahlt':
        return 'bg-orange-500';
      case 'Versandt':
        return 'bg-blue-500';
      case 'Abgeschlossen':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status-Verlauf</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={event.id} className="flex items-start space-x-3">
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)}`} />
                {index < events.length - 1 && (
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-200" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {event.status}
                  </Badge>
                  <span className="text-xs text-gray-500">{event.timestamp}</span>
                </div>
                <p className="text-sm text-gray-900 mt-1">{event.description}</p>
                {event.user && (
                  <p className="text-xs text-gray-500 mt-1">von {event.user}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTimeline;
