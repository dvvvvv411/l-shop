
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
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline connector line */}
              {index < events.length - 1 && (
                <div className="absolute left-3 top-8 w-0.5 h-12 bg-gray-200" />
              )}
              
              {/* Timeline event */}
              <div className="flex items-start space-x-4">
                {/* Status indicator */}
                <div className={`w-6 h-6 rounded-full ${getStatusColor(event.status)} flex-shrink-0 mt-1`} />
                
                {/* Event content */}
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Status and timestamp */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <Badge variant="outline" className="text-xs w-fit">
                      {event.status}
                    </Badge>
                    <span className="text-xs text-gray-500 flex-shrink-0">{event.timestamp}</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-900 leading-relaxed">{event.description}</p>
                  
                  {/* User info */}
                  {event.user && (
                    <p className="text-xs text-gray-500">von {event.user}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTimeline;
