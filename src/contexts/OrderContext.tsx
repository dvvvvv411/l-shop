
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrderData {
  // Customer Details
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  postcode?: string;

  // Delivery Address
  deliveryFirstName: string;
  deliveryLastName: string;
  deliveryStreet: string;
  deliveryPostcode: string;
  deliveryCity: string;
  deliveryPhone: string;

  // Billing Address
  useSameAddress: boolean;
  billingFirstName?: string;
  billingLastName?: string;
  billingStreet?: string;
  billingPostcode?: string;
  billingCity?: string;

  // Additional form fields
  notes?: string;
  differentDeliveryAddress?: boolean;
  agbAccepted?: boolean;

  // Payment
  paymentMethod: string;
  
  // Order Details
  product: string;
  amount: number; // This is the liters
  pricePerLiter: number;
  basePrice: number;
  deliveryFee: number;
  discount: number;
  total: number; // This is the total amount
  deliveryDate: string;
  
  // Order Tracking
  orderNumber?: string;
}

interface OrderContextType {
  orderData: OrderData | null;
  setOrderData: (data: OrderData) => void;
  updateOrderData: (data: Partial<OrderData>) => void;
  clearOrderData: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const updateOrderData = (data: Partial<OrderData>) => {
    setOrderData(prev => prev ? { ...prev, ...data } : null);
  };

  const clearOrderData = () => {
    setOrderData(null);
  };

  return (
    <OrderContext.Provider value={{ orderData, setOrderData, updateOrderData, clearOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
