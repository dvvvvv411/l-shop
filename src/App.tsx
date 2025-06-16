import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingSpinner from './components/LoadingSpinner';
import { OrderProvider } from './contexts/OrderContext';
import { TooltipProvider } from './components/ui/tooltip';

// Page imports
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Order from './pages/Order';

// Legal pages
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import AGB from './pages/AGB';
import Widerrufsrecht from './pages/Widerrufsrecht';

// Other pages
import Produkte from './pages/Produkte';
import Liefergebiet from './pages/Liefergebiet';
import Service from './pages/Service';
import Kontakt from './pages/Kontakt';

// Stanton v1 pages
import StantonHome from './pages/v1/Home';

// GreenOil v2 pages
import GreenOilHome from './pages/v2/Home';

// Austria v3 pages
import AustriaHome from './pages/v3/Home';

// French v4 pages
import FrenchHome from './pages/v4/Home';

// Italian v5 pages
import ItalianHome from './pages/v5/Home';

// Malta v6 pages
import MaltaHome from './pages/v6/Home';

// Belgian v7 pages
import BelgianHome from './pages/v7/Home';
import BelgianProdukte from './pages/v7/Produkte';
import BelgianLiefergebiet from './pages/v7/Liefergebiet';
import BelgianService from './pages/v7/Service';
import BelgianKontakt from './pages/v7/Kontakt';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <OrderProvider>
          <Router>
            <div className="App">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Root routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/impressum" element={<Impressum />} />
                  <Route path="/datenschutz" element={<Datenschutz />} />
                  <Route path="/agb" element={<AGB />} />
                  <Route path="/widerrufsrecht" element={<Widerrufsrecht />} />
                  <Route path="/produkte" element={<Produkte />} />
                  <Route path="/liefergebiet" element={<Liefergebiet />} />
                  <Route path="/service" element={<Service />} />
                  <Route path="/kontakt" element={<Kontakt />} />

                  {/* Stanton Shop Routes (v1) */}
                  <Route path="/1/home" element={<StantonHome />} />
                  <Route path="/1/produkte" element={<Produkte />} />
                  <Route path="/1/liefergebiet" element={<Liefergebiet />} />
                  <Route path="/1/service" element={<Service />} />
                  <Route path="/1/kontakt" element={<Kontakt />} />
                  <Route path="/1/impressum" element={<Impressum />} />
                  <Route path="/1/datenschutz" element={<Datenschutz />} />
                  <Route path="/1/agb" element={<AGB />} />
                  <Route path="/1/widerrufsrecht" element={<Widerrufsrecht />} />

                  {/* GreenOil Shop Routes (v2) */}
                  <Route path="/2/home" element={<GreenOilHome />} />
                  <Route path="/2/produkte" element={<Produkte />} />
                  <Route path="/2/liefergebiet" element={<Liefergebiet />} />
                  <Route path="/2/service" element={<Service />} />
                  <Route path="/2/kontakt" element={<Kontakt />} />
                  <Route path="/2/impressum" element={<Impressum />} />
                  <Route path="/2/datenschutz" element={<Datenschutz />} />
                  <Route path="/2/agb" element={<AGB />} />
                  <Route path="/2/widerrufsrecht" element={<Widerrufsrecht />} />

                  {/* Austria Shop Routes (v3) */}
                  <Route path="/3/home" element={<AustriaHome />} />
                  <Route path="/3/produkte" element={<Produkte />} />
                  <Route path="/3/liefergebiet" element={<Liefergebiet />} />
                  <Route path="/3/service" element={<Service />} />
                  <Route path="/3/kontakt" element={<Kontakt />} />
                  <Route path="/3/impressum" element={<Impressum />} />
                  <Route path="/3/datenschutz" element={<Datenschutz />} />
                  <Route path="/3/agb" element={<AGB />} />
                  <Route path="/3/widerrufsrecht" element={<Widerrufsrecht />} />

                  {/* French Shop Routes (v4) */}
                  <Route path="/4/home" element={<FrenchHome />} />

                  {/* Italian Shop Routes (v5) */}
                  <Route path="/5/home" element={<ItalianHome />} />

                  {/* Malta Shop Routes (v6) */}
                  <Route path="/6/home" element={<MaltaHome />} />

                  {/* Belgian Shop Routes (v7) */}
                  <Route path="/7/home" element={<BelgianHome />} />
                  <Route path="/7/produkte" element={<BelgianProdukte />} />
                  <Route path="/7/liefergebiet" element={<BelgianLiefergebiet />} />
                  <Route path="/7/service" element={<BelgianService />} />
                  <Route path="/7/kontakt" element={<BelgianKontakt />} />
                  <Route path="/7/impressum" element={<Impressum />} />
                  <Route path="/7/datenschutz" element={<Datenschutz />} />
                  <Route path="/7/agb" element={<AGB />} />
                  <Route path="/7/widerrufsrecht" element={<Widerrufsrecht />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </Suspense>
            </div>
          </Router>
        </OrderProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
