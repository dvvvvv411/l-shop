import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

// Version 1 pages
import HomeV1 from "./pages/v1/Home";
import ServiceV1 from "./pages/v1/Service";
import ProdukteV1 from "./pages/v1/Produkte";
import LiefergebietV1 from "./pages/v1/Liefergebiet";
import KontaktV1 from "./pages/v1/Kontakt";
import ImpressumV1 from "./pages/v1/Impressum";
import DatenschutzV1 from "./pages/v1/Datenschutz";
import AGBV1 from "./pages/v1/AGB";
import WiderrufsrechtV1 from "./pages/v1/Widerrufsrecht";

// Version 2 pages
import HomeV2 from "./pages/v2/Home";
import ServiceV2 from "./pages/v2/Service";
import ProdukteV2 from "./pages/v2/Produkte";
import LiefergebietV2 from "./pages/v2/Liefergebiet";
import KontaktV2 from "./pages/v2/Kontakt";
import ImpressumV2 from "./pages/v2/Impressum";
import DatenschutzV2 from "./pages/v2/Datenschutz";
import AGBV2 from "./pages/v2/AGB";
import WiderrufsrechtV2 from "./pages/v2/Widerrufsrecht";

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
                {/* Redirects from old routes to versioned routes */}
                <Route path="/" element={<Navigate to="/1/home" replace />} />
                <Route path="/produkte" element={<Navigate to="/1/produkte" replace />} />
                <Route path="/liefergebiet" element={<Navigate to="/1/liefergebiet" replace />} />
                <Route path="/service" element={<Navigate to="/1/service" replace />} />
                <Route path="/kontakt" element={<Navigate to="/1/kontakt" replace />} />

                {/* Version 1 Routes */}
                <Route path="/1/home" element={<HomeV1 />} />
                <Route path="/1/produkte" element={<ProdukteV1 />} />
                <Route path="/1/liefergebiet" element={<LiefergebietV1 />} />
                <Route path="/1/service" element={<ServiceV1 />} />
                <Route path="/1/kontakt" element={<KontaktV1 />} />
                <Route path="/1/impressum" element={<ImpressumV1 />} />
                <Route path="/1/datenschutz" element={<DatenschutzV1 />} />
                <Route path="/1/agb" element={<AGBV1 />} />
                <Route path="/1/widerrufsrecht" element={<WiderrufsrechtV1 />} />

                {/* Version 2 Routes */}
                <Route path="/2/home" element={<HomeV2 />} />
                <Route path="/2/produkte" element={<ProdukteV2 />} />
                <Route path="/2/liefergebiet" element={<LiefergebietV2 />} />
                <Route path="/2/service" element={<ServiceV2 />} />
                <Route path="/2/kontakt" element={<KontaktV2 />} />
                <Route path="/2/impressum" element={<ImpressumV2 />} />
                <Route path="/2/datenschutz" element={<DatenschutzV2 />} />
                <Route path="/2/agb" element={<AGBV2 />} />
                <Route path="/2/widerrufsrecht" element={<WiderrufsrechtV2 />} />

                {/* Order Pipeline Routes - Unchanged */}
                <Route path="/bestellen" element={<Order />} />
                <Route path="/zusammenfassung" element={<Summary />} />
                <Route path="/kasse" element={<Checkout />} />
                <Route path="/bestaetigung" element={<Confirmation />} />

                {/* Legal Pages - Unchanged */}
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="/agb" element={<AGB />} />
                <Route path="/widerrufsrecht" element={<Widerrufsrecht />} />
                
                {/* Admin Routes - Unchanged */}
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
