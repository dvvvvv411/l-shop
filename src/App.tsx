
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { OrderProvider } from "./contexts/OrderContext";
import { useDomainFavicon } from "./hooks/useDomainFavicon";
import DomainRouter from "./components/DomainRouter";

// Admin components
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
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
      {/* Admin routes - handled globally on all domains */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* Protected admin routes with layout - work on all domains */}
      <Route path="/admin" element={
        <ProtectedAdminRoute>
          <AdminLayout />
        </ProtectedAdminRoute>
      }>
        {/* Redirect /admin to /admin/dashboard */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<AdminOrderDetail />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="bank-accounts" element={<AdminBankAccounts />} />
        <Route path="shops" element={<AdminShops />} />
        <Route path="smtp" element={<AdminSMTP />} />
      </Route>
      
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
