
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRoute';
import { OrderProvider } from '@/contexts/OrderContext';

// Import main pages
import Index from '@/pages/Index';
import Produkte from '@/pages/Produkte';
import Liefergebiet from '@/pages/Liefergebiet';
import Service from '@/pages/Service';
import Kontakt from '@/pages/Kontakt';
import Impressum from '@/pages/Impressum';
import Datenschutz from '@/pages/Datenschutz';
import AGB from '@/pages/AGB';
import Widerrufsrecht from '@/pages/Widerrufsrecht';
import NotFound from '@/pages/NotFound';

// Import order flow pages
import Order from '@/pages/Order';
import Summary from '@/pages/Summary';
import Checkout from '@/pages/Checkout';
import Confirmation from '@/pages/Confirmation';

// Import payment flow pages
import PaymentWebhook from '@/pages/PaymentWebhook';
import PaymentSuccess from '@/pages/PaymentSuccess';
import PaymentCancel from '@/pages/PaymentCancel';

// Import admin pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminOrderDetail from '@/pages/admin/AdminOrderDetail';
import AdminCustomers from '@/pages/admin/AdminCustomers';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminNexi from '@/pages/admin/AdminNexi';
import AdminSMTP from '@/pages/admin/AdminSMTP';
import AdminShops from '@/pages/admin/AdminShops';
import AdminBankAccounts from '@/pages/admin/AdminBankAccounts';
import AdminWebhookTest from '@/pages/admin/AdminWebhookTest';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <OrderProvider>
          <AdminAuthProvider>
            <Routes>
              {/* Main routes */}
              <Route path="/" element={<Index />} />
              <Route path="/produkte" element={<Produkte />} />
              <Route path="/liefergebiet" element={<Liefergebiet />} />
              <Route path="/service" element={<Service />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/agb" element={<AGB />} />
              <Route path="/widerrufsrecht" element={<Widerrufsrecht />} />
              
              {/* Order flow */}
              <Route path="/order" element={<Order />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation />} />
              
              {/* Payment flow */}
              <Route path="/payment/webhook" element={<PaymentWebhook />} />
              <Route path="/checkout/success" element={<PaymentSuccess />} />
              <Route path="/checkout/cancel" element={<PaymentCancel />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
              <Route path="/admin/orders" element={<ProtectedAdminRoute><AdminOrders /></ProtectedAdminRoute>} />
              <Route path="/admin/orders/:id" element={<ProtectedAdminRoute><AdminOrderDetail /></ProtectedAdminRoute>} />
              <Route path="/admin/customers" element={<ProtectedAdminRoute><AdminCustomers /></ProtectedAdminRoute>} />
              <Route path="/admin/settings" element={<ProtectedAdminRoute><AdminSettings /></ProtectedAdminRoute>} />
              <Route path="/admin/nexi" element={<ProtectedAdminRoute><AdminNexi /></ProtectedAdminRoute>} />
              <Route path="/admin/smtp" element={<ProtectedAdminRoute><AdminSMTP /></ProtectedAdminRoute>} />
              <Route path="/admin/shops" element={<ProtectedAdminRoute><AdminShops /></ProtectedAdminRoute>} />
              <Route path="/admin/bank-accounts" element={<ProtectedAdminRoute><AdminBankAccounts /></ProtectedAdminRoute>} />
              <Route path="/admin/webhook-test" element={<ProtectedAdminRoute><AdminWebhookTest /></ProtectedAdminRoute>} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminAuthProvider>
        </OrderProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
