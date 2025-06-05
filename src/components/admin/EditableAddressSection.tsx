
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EditableAddressField from './EditableAddressField';
import { Order } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';

interface EditableAddressSectionProps {
  title: string;
  icon: React.ReactNode;
  order: Order;
  addressType: 'customer' | 'delivery' | 'billing';
  onOrderUpdate: (orderId: string, updatedData: Partial<Order>) => void;
}

const EditableAddressSection: React.FC<EditableAddressSectionProps> = ({
  title,
  icon,
  order,
  addressType,
  onOrderUpdate,
}) => {
  const { toast } = useToast();

  const handleFieldUpdate = (field: string, value: string) => {
    const updatedData: Partial<Order> = {
      [field]: value,
      updated_at: new Date().toISOString()
    };
    
    onOrderUpdate(order.id, updatedData);
    
    toast({
      title: 'Erfolg',
      description: 'Adresse wurde aktualisiert.',
    });
  };

  const getFields = () => {
    switch (addressType) {
      case 'customer':
        return [
          { 
            label: 'Name', 
            field: 'customer_name', 
            value: order.customer_name,
            placeholder: 'Name eingeben'
          },
          { 
            label: 'E-Mail', 
            field: 'customer_email', 
            value: order.customer_email,
            placeholder: 'E-Mail eingeben'
          },
          { 
            label: 'Telefon', 
            field: 'customer_phone', 
            value: order.customer_phone,
            placeholder: 'Telefonnummer eingeben'
          },
          { 
            label: 'Adresse', 
            field: 'customer_address', 
            value: order.customer_address,
            placeholder: 'Adresse eingeben'
          }
        ];
      case 'delivery':
        return [
          { 
            label: 'Vorname', 
            field: 'delivery_first_name', 
            value: order.delivery_first_name,
            placeholder: 'Vorname eingeben'
          },
          { 
            label: 'Nachname', 
            field: 'delivery_last_name', 
            value: order.delivery_last_name,
            placeholder: 'Nachname eingeben'
          },
          { 
            label: 'Straße', 
            field: 'delivery_street', 
            value: order.delivery_street,
            placeholder: 'Straße und Hausnummer eingeben'
          },
          { 
            label: 'Postleitzahl', 
            field: 'delivery_postcode', 
            value: order.delivery_postcode,
            placeholder: 'PLZ eingeben'
          },
          { 
            label: 'Stadt', 
            field: 'delivery_city', 
            value: order.delivery_city,
            placeholder: 'Stadt eingeben'
          },
          { 
            label: 'Telefon', 
            field: 'delivery_phone', 
            value: order.delivery_phone,
            placeholder: 'Telefonnummer eingeben'
          }
        ];
      case 'billing':
        return [
          { 
            label: 'Vorname', 
            field: 'billing_first_name', 
            value: order.billing_first_name,
            placeholder: 'Vorname eingeben'
          },
          { 
            label: 'Nachname', 
            field: 'billing_last_name', 
            value: order.billing_last_name,
            placeholder: 'Nachname eingeben'
          },
          { 
            label: 'Straße', 
            field: 'billing_street', 
            value: order.billing_street,
            placeholder: 'Straße und Hausnummer eingeben'
          },
          { 
            label: 'Postleitzahl', 
            field: 'billing_postcode', 
            value: order.billing_postcode,
            placeholder: 'PLZ eingeben'
          },
          { 
            label: 'Stadt', 
            field: 'billing_city', 
            value: order.billing_city,
            placeholder: 'Stadt eingeben'
          }
        ];
      default:
        return [];
    }
  };

  const fields = getFields();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {fields.map((field) => (
          <EditableAddressField
            key={field.field}
            label={field.label}
            value={field.value}
            placeholder={field.placeholder}
            onSave={(newValue) => handleFieldUpdate(field.field, newValue)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default EditableAddressSection;
