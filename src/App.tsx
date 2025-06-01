
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { OrderProvider } from "./contexts/OrderContext";
import Index from "./pages/Index";
import Order from "./pages/Order";
import Summary from "./pages/Summary";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import Widerrufsrecht from "./pages/Widerrufsrecht";
import Kontakt from "./pages/Kontakt";
import Service from "./pages/Service";
import Produkte from "./pages/Produkte";
import Liefergebiet from "./pages/Liefergebiet";
import NotFound from "./pages/NotFound";
import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminShops from "./pages/admin/AdminShops";
import AdminBankAccounts from "./pages/admin/AdminBankAccounts";
import AdminSettings from "./pages/admin/AdminSettings";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <OrderProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/bestellen" element={<Order />} />
                <Route path="/zusammenfassung" element={<Summary />} />
                <Route path="/kasse" element={<Checkout />} />
                <Route path="/bestaetigung" element={<Confirmation />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="/agb" element={<AGB />} />
                <Route path="/widerrufsrecht" element={<Widerrufsrecht />} />
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/service" element={<Service />} />
                <Route path="/produkte" element={<Produkte />} />
                <Route path="/liefergebiet" element={<Liefergebiet />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedAdminRoute>
                      <AdminLayout />
                    </ProtectedAdminRoute>
                  }
                >
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="orders/:id" element={<AdminOrderDetail />} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="shops" element={<AdminShops />} />
                  <Route path="bank-accounts" element={<AdminBankAccounts />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </OrderProvider>
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
