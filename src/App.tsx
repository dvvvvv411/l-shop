
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { OrderProvider } from "@/contexts/OrderContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

import Index from "./pages/Index";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Order from "./pages/Order";
import Summary from "./pages/Summary";
import Kontakt from "./pages/Kontakt";
import Service from "./pages/Service";
import Liefergebiet from "./pages/Liefergebiet";
import Produkte from "./pages/Produkte";
import AGB from "./pages/AGB";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import Widerrufsrecht from "./pages/Widerrufsrecht";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";

// V1 Pages
import V1Home from "./pages/v1/Home";
import V1Kontakt from "./pages/v1/Kontakt";
import V1Service from "./pages/v1/Service";
import V1Liefergebiet from "./pages/v1/Liefergebiet";
import V1Produkte from "./pages/v1/Produkte";
import V1AGB from "./pages/v1/AGB";
import V1Datenschutz from "./pages/v1/Datenschutz";
import V1Impressum from "./pages/v1/Impressum";
import V1Widerrufsrecht from "./pages/v1/Widerrufsrecht";

// V2 Pages
import V2Home from "./pages/v2/Home";
import V2Kontakt from "./pages/v2/Kontakt";
import V2Service from "./pages/v2/Service";
import V2Liefergebiet from "./pages/v2/Liefergebiet";
import V2Produkte from "./pages/v2/Produkte";
import V2AGB from "./pages/v2/AGB";
import V2Datenschutz from "./pages/v2/Datenschutz";
import V2Impressum from "./pages/v2/Impressum";
import V2Widerrufsrecht from "./pages/v2/Widerrufsrecht";

// Admin Pages
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminShops from "./pages/admin/AdminShops";
import AdminBankAccounts from "./pages/admin/AdminBankAccounts";
import AdminSMTP from "./pages/admin/AdminSMTP";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <OrderProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Default/Legacy Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<PaymentSuccess />} />
                <Route path="/checkout/cancel" element={<PaymentCancel />} />
                <Route path="/kasse" element={<Checkout />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/order" element={<Order />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/service" element={<Service />} />
                <Route path="/liefergebiet" element={<Liefergebiet />} />
                <Route path="/produkte" element={<Produkte />} />
                <Route path="/agb" element={<AGB />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/widerrufsrecht" element={<Widerrufsrecht />} />

                {/* Version 1 Routes */}
                <Route path="/1/home" element={<V1Home />} />
                <Route path="/1/kontakt" element={<V1Kontakt />} />
                <Route path="/1/service" element={<V1Service />} />
                <Route path="/1/liefergebiet" element={<V1Liefergebiet />} />
                <Route path="/1/produkte" element={<V1Produkte />} />
                <Route path="/1/agb" element={<V1AGB />} />
                <Route path="/1/datenschutz" element={<V1Datenschutz />} />
                <Route path="/1/impressum" element={<V1Impressum />} />
                <Route path="/1/widerrufsrecht" element={<V1Widerrufsrecht />} />

                {/* Version 2 Routes */}
                <Route path="/2/home" element={<V2Home />} />
                <Route path="/2/kontakt" element={<V2Kontakt />} />
                <Route path="/2/service" element={<V2Service />} />
                <Route path="/2/liefergebiet" element={<V2Liefergebiet />} />
                <Route path="/2/produkte" element={<V2Produkte />} />
                <Route path="/2/agb" element={<V2AGB />} />
                <Route path="/2/datenschutz" element={<V2Datenschutz />} />
                <Route path="/2/impressum" element={<V2Impressum />} />
                <Route path="/2/widerrufsrecht" element={<V2Widerrufsrecht />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/*" element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="orders/:id" element={<AdminOrderDetail />} />
                  <Route path="shops" element={<AdminShops />} />
                  <Route path="bank-accounts" element={<AdminBankAccounts />} />
                  <Route path="smtp" element={<AdminSMTP />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </OrderProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
