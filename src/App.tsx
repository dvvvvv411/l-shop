
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { OrderProvider } from "./contexts/OrderContext";
import { useDomainFavicon } from "./hooks/useDomainFavicon";
import DomainRouter from "./components/DomainRouter";

// Admin pages
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

// App content component that uses the domain favicon hook
const AppContent = () => {
  useDomainFavicon();

  return (
    <Routes>
      {/* Admin routes - these bypass domain routing */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
      <Route path="/admin/orders" element={<ProtectedAdminRoute><AdminOrders /></ProtectedAdminRoute>} />
      <Route path="/admin/orders/:id" element={<ProtectedAdminRoute><AdminOrderDetail /></ProtectedAdminRoute>} />
      <Route path="/admin/customers" element={<ProtectedAdminRoute><AdminCustomers /></ProtectedAdminRoute>} />
      <Route path="/admin/settings" element={<ProtectedAdminRoute><AdminSettings /></ProtectedAdminRoute>} />
      <Route path="/admin/bank-accounts" element={<ProtectedAdminRoute><AdminBankAccounts /></ProtectedAdminRoute>} />
      <Route path="/admin/shops" element={<ProtectedAdminRoute><AdminShops /></ProtectedAdminRoute>} />
      <Route path="/admin/smtp" element={<ProtectedAdminRoute><AdminSMTP /></ProtectedAdminRoute>} />
      
      {/* All other routes handled by domain router */}
      <Route path="*" element={<DomainRouter />} />
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
