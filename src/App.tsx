
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { OrderProvider } from "./contexts/OrderContext";
import { useFavicon } from "./hooks/useFavicon";

// Import all pages
import Index from "./pages/Index";
import V1Home from "./pages/v1/Home";
import V2Home from "./pages/v2/Home";
import Order from "./pages/Order";
import Summary from "./pages/Summary";
import Confirmation from "./pages/Confirmation";
import Checkout from "./pages/Checkout";
import Impressum from "./pages/Impressum";
import AGB from "./pages/AGB";
import Datenschutz from "./pages/Datenschutz";
import Widerrufsrecht from "./pages/Widerrufsrecht";
import Kontakt from "./pages/Kontakt";
import Service from "./pages/Service";
import Produkte from "./pages/Produkte";
import Liefergebiet from "./pages/Liefergebiet";
import NotFound from "./pages/NotFound";

// V1 pages
import V1Impressum from "./pages/v1/Impressum";
import V1AGB from "./pages/v1/AGB";
import V1Datenschutz from "./pages/v1/Datenschutz";
import V1Widerrufsrecht from "./pages/v1/Widerrufsrecht";
import V1Kontakt from "./pages/v1/Kontakt";
import V1Service from "./pages/v1/Service";
import V1Produkte from "./pages/v1/Produkte";
import V1Liefergebiet from "./pages/v1/Liefergebiet";

// V2 pages  
import V2Impressum from "./pages/v2/Impressum";
import V2AGB from "./pages/v2/AGB";
import V2Datenschutz from "./pages/v2/Datenschutz";
import V2Widerrufsrecht from "./pages/v2/Widerrufsrecht";
import V2Kontakt from "./pages/v2/Kontakt";
import V2Service from "./pages/v2/Service";
import V2Produkte from "./pages/v2/Produkte";
import V2Liefergebiet from "./pages/v2/Liefergebiet";

// Admin pages - Fixed import path
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminBankAccounts from "./pages/admin/AdminBankAccounts";
import AdminShops from "./pages/admin/AdminShops";
import AdminSMTP from "./pages/admin/AdminSMTP";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";

const queryClient = new QueryClient();

// App content component that uses the favicon hook
const AppContent = () => {
  useFavicon();

  return (
    <Routes>
      {/* Root routes */}
      <Route path="/" element={<Index />} />
      <Route path="/bestellen" element={<Order />} />
      <Route path="/zusammenfassung" element={<Summary />} />
      <Route path="/bestaetigung" element={<Confirmation />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/agb" element={<AGB />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
      <Route path="/widerrufsrecht" element={<Widerrufsrecht />} />
      <Route path="/kontakt" element={<Kontakt />} />
      <Route path="/service" element={<Service />} />
      <Route path="/produkte" element={<Produkte />} />
      <Route path="/liefergebiet" element={<Liefergebiet />} />

      {/* V1 routes */}
      <Route path="/1/home" element={<V1Home />} />
      <Route path="/1/bestellen" element={<Order />} />
      <Route path="/1/zusammenfassung" element={<Summary />} />
      <Route path="/1/bestaetigung" element={<Confirmation />} />
      <Route path="/1/checkout" element={<Checkout />} />
      <Route path="/1/impressum" element={<V1Impressum />} />
      <Route path="/1/agb" element={<V1AGB />} />
      <Route path="/1/datenschutz" element={<V1Datenschutz />} />
      <Route path="/1/widerrufsrecht" element={<V1Widerrufsrecht />} />
      <Route path="/1/kontakt" element={<V1Kontakt />} />
      <Route path="/1/service" element={<V1Service />} />
      <Route path="/1/produkte" element={<V1Produkte />} />
      <Route path="/1/liefergebiet" element={<V1Liefergebiet />} />

      {/* V2 routes */}
      <Route path="/2/home" element={<V2Home />} />
      <Route path="/2/bestellen" element={<Order />} />
      <Route path="/2/zusammenfassung" element={<Summary />} />
      <Route path="/2/bestaetigung" element={<Confirmation />} />
      <Route path="/2/checkout" element={<Checkout />} />
      <Route path="/2/impressum" element={<V2Impressum />} />
      <Route path="/2/agb" element={<V2AGB />} />
      <Route path="/2/datenschutz" element={<V2Datenschutz />} />
      <Route path="/2/widerrufsrecht" element={<V2Widerrufsrecht />} />
      <Route path="/2/kontakt" element={<V2Kontakt />} />
      <Route path="/2/service" element={<V2Service />} />
      <Route path="/2/produkte" element={<V2Produkte />} />
      <Route path="/2/liefergebiet" element={<V2Liefergebiet />} />

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
      <Route path="/admin/orders" element={<ProtectedAdminRoute><AdminOrders /></ProtectedAdminRoute>} />
      <Route path="/admin/orders/:id" element={<ProtectedAdminRoute><AdminOrderDetail /></ProtectedAdminRoute>} />
      <Route path="/admin/customers" element={<ProtectedAdminRoute><AdminCustomers /></ProtectedAdminRoute>} />
      <Route path="/admin/settings" element={<ProtectedAdminRoute><AdminSettings /></ProtectedAdminRoute>} />
      <Route path="/admin/bank-accounts" element={<ProtectedAdminRoute><AdminBankAccounts /></ProtectedAdminRoute>} />
      <Route path="/admin/shops" element={<ProtectedAdminRoute><AdminShops /></ProtectedAdminRoute>} />
      <Route path="/admin/smtp" element={<ProtectedAdminRoute><AdminSMTP /></ProtectedAdminRoute>} />

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <OrderProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </OrderProvider>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
