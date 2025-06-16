
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDomainShop } from '@/hooks/useDomainShop';

// Import all pages
import Index from '@/pages/Index';
import V1Home from '@/pages/v1/Home';
import V2Home from '@/pages/v2/Home';
import V3Home from '@/pages/v3/Home';
import V4Home from '@/pages/v4/Home';
import V5Home from '@/pages/v5/Home';
import V6Home from '@/pages/v6/Home';
import Order from '@/pages/Order';
import Summary from '@/pages/Summary';
import Confirmation from '@/pages/Confirmation';
import Checkout from '@/pages/Checkout';
import Impressum from '@/pages/Impressum';
import AGB from '@/pages/AGB';
import Datenschutz from '@/pages/Datenschutz';
import Widerrufsrecht from '@/pages/Widerrufsrecht';
import Kontakt from '@/pages/Kontakt';
import Service from '@/pages/Service';
import Produkte from '@/pages/Produkte';
import Liefergebiet from '@/pages/Liefergebiet';
import NotFound from '@/pages/NotFound';

// V1 pages
import V1Impressum from '@/pages/v1/Impressum';
import V1AGB from '@/pages/v1/AGB';
import V1Datenschutz from '@/pages/v1/Datenschutz';
import V1Widerrufsrecht from '@/pages/v1/Widerrufsrecht';
import V1Kontakt from '@/pages/v1/Kontakt';
import V1Service from '@/pages/v1/Service';
import V1Produkte from '@/pages/v1/Produkte';
import V1Liefergebiet from '@/pages/v1/Liefergebiet';

// V2 pages  
import V2Impressum from '@/pages/v2/Impressum';
import V2AGB from '@/pages/v2/AGB';
import V2Datenschutz from '@/pages/v2/Datenschutz';
import V2Widerrufsrecht from '@/pages/v2/Widerrufsrecht';
import V2Kontakt from '@/pages/v2/Kontakt';
import V2Service from '@/pages/v2/Service';
import V2Produkte from '@/pages/v2/Produkte';
import V2Liefergebiet from '@/pages/v2/Liefergebiet';

// V3 pages (Austrian)
import V3Impressum from '@/pages/v3/Impressum';
import V3AGB from '@/pages/v3/AGB';
import V3Datenschutz from '@/pages/v3/Datenschutz';
import V3Widerrufsrecht from '@/pages/v3/Widerrufsrecht';
import V3Kontakt from '@/pages/v3/Kontakt';
import V3Service from '@/pages/v3/Service';
import V3Produkte from '@/pages/v3/Produkte';
import V3Liefergebiet from '@/pages/v3/Liefergebiet';

// V4 pages (French)
import V4Impressum from '@/pages/v4/Impressum';
import V4AGB from '@/pages/v4/AGB';
import V4Datenschutz from '@/pages/v4/Datenschutz';
import V4Widerrufsrecht from '@/pages/v4/Widerrufsrecht';
import V4Kontakt from '@/pages/v4/Kontakt';
import V4Service from '@/pages/v4/Service';
import V4Produkte from '@/pages/v4/Produkte';
import V4Liefergebiet from '@/pages/v4/Liefergebiet';

// V5 pages (Italian)
import V5Impressum from '@/pages/v5/Impressum';
import V5AGB from '@/pages/v5/AGB';
import V5Datenschutz from '@/pages/v5/Datenschutz';
import V5Widerrufsrecht from '@/pages/v5/Widerrufsrecht';
import V5Kontakt from '@/pages/v5/Kontakt';
import V5Service from '@/pages/v5/Service';
import V5Produkte from '@/pages/v5/Produkte';
import V5Liefergebiet from '@/pages/v5/Liefergebiet';

// V6 pages (Malta - English)
import V6Impressum from '@/pages/v6/Impressum';
import V6AGB from '@/pages/v6/AGB';
import V6Datenschutz from '@/pages/v6/Datenschutz';
import V6Widerrufsrecht from '@/pages/v6/Widerrufsrecht';
import V6Kontakt from '@/pages/v6/Kontakt';
import V6Service from '@/pages/v6/Service';
import V6Produkte from '@/pages/v6/Produkte';
import V6Liefergebiet from '@/pages/v6/Liefergebiet';

const DomainRouter = () => {
  const shopConfig = useDomainShop();

  console.log('DomainRouter - Current shop config:', shopConfig);

  // For STANTON domain, route to V1 pages
  if (shopConfig.shopType === 'stanton') {
    return (
      <Routes>
        <Route path="/" element={<V1Home />} />
        <Route path="/bestellen" element={<Order />} />
        <Route path="/zusammenfassung" element={<Summary />} />
        <Route path="/bestaetigung" element={<Confirmation />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/impressum" element={<V1Impressum />} />
        <Route path="/agb" element={<V1AGB />} />
        <Route path="/datenschutz" element={<V1Datenschutz />} />
        <Route path="/widerrufsrecht" element={<V1Widerrufsrecht />} />
        <Route path="/kontakt" element={<V1Kontakt />} />
        <Route path="/service" element={<V1Service />} />
        <Route path="/produkte" element={<V1Produkte />} />
        <Route path="/liefergebiet" element={<V1Liefergebiet />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // For GreenOil domain, route to V2 pages
  if (shopConfig.shopType === 'greenoil') {
    return (
      <Routes>
        <Route path="/" element={<V2Home />} />
        <Route path="/bestellen" element={<Order />} />
        <Route path="/zusammenfassung" element={<Summary />} />
        <Route path="/bestaetigung" element={<Confirmation />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/impressum" element={<V2Impressum />} />
        <Route path="/agb" element={<V2AGB />} />
        <Route path="/datenschutz" element={<V2Datenschutz />} />
        <Route path="/widerrufsrecht" element={<V2Widerrufsrecht />} />
        <Route path="/kontakt" element={<V2Kontakt />} />
        <Route path="/service" element={<V2Service />} />
        <Route path="/produkte" element={<V2Produkte />} />
        <Route path="/liefergebiet" element={<V2Liefergebiet />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // For Austrian domain, route to V3 pages
  if (shopConfig.shopType === 'austria') {
    return (
      <Routes>
        <Route path="/" element={<V3Home />} />
        <Route path="/bestellen" element={<Order />} />
        <Route path="/zusammenfassung" element={<Summary />} />
        <Route path="/bestaetigung" element={<Confirmation />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/impressum" element={<V3Impressum />} />
        <Route path="/agb" element={<V3AGB />} />
        <Route path="/datenschutz" element={<V3Datenschutz />} />
        <Route path="/widerrufsrecht" element={<V3Widerrufsrecht />} />
        <Route path="/kontakt" element={<V3Kontakt />} />
        <Route path="/service" element={<V3Service />} />
        <Route path="/produkte" element={<V3Produkte />} />
        <Route path="/liefergebiet" element={<V3Liefergebiet />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // For French domain, route to V4 pages
  if (shopConfig.shopType === 'france') {
    return (
      <Routes>
        <Route path="/" element={<V4Home />} />
        <Route path="/bestellen" element={<Order />} />
        <Route path="/zusammenfassung" element={<Summary />} />
        <Route path="/bestaetigung" element={<Confirmation />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/mentions-legales" element={<V4Impressum />} />
        <Route path="/cgv" element={<V4AGB />} />
        <Route path="/confidentialite" element={<V4Datenschutz />} />
        <Route path="/retractation" element={<V4Widerrufsrecht />} />
        <Route path="/contact" element={<V4Kontakt />} />
        <Route path="/service" element={<V4Service />} />
        <Route path="/produits" element={<V4Produkte />} />
        <Route path="/livraison" element={<V4Liefergebiet />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // For Italian domain, route to V5 pages
  if (shopConfig.shopType === 'italy') {
    console.log('Routing to Italian pages (V5)');
    return (
      <Routes>
        <Route path="/" element={<V5Home />} />
        <Route path="/ordina" element={<Order />} />
        <Route path="/riepilogo" element={<Summary />} />
        <Route path="/conferma" element={<Confirmation />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/note-legali" element={<V5Impressum />} />
        <Route path="/termini" element={<V5AGB />} />
        <Route path="/privacy" element={<V5Datenschutz />} />
        <Route path="/recesso" element={<V5Widerrufsrecht />} />
        <Route path="/contatto" element={<V5Kontakt />} />
        <Route path="/servizio" element={<V5Service />} />
        <Route path="/prodotti" element={<V5Produkte />} />
        <Route path="/consegna" element={<V5Liefergebiet />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // For Malta domain, route to V6 pages
  if (shopConfig.shopType === 'malta') {
    return (
      <Routes>
        <Route path="/" element={<V6Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/legal" element={<V6Impressum />} />
        <Route path="/terms" element={<V6AGB />} />
        <Route path="/privacy" element={<V6Datenschutz />} />
        <Route path="/withdrawal" element={<V6Widerrufsrecht />} />
        <Route path="/contact" element={<V6Kontakt />} />
        <Route path="/service" element={<V6Service />} />
        <Route path="/products" element={<V6Produkte />} />
        <Route path="/delivery-areas" element={<V6Liefergebiet />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Default routing for root domain (with all original routes preserved)
  return (
    <Routes>
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

      {/* Keep legacy path routes for backward compatibility */}
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

      <Route path="/3/home" element={<V3Home />} />
      <Route path="/3/bestellen" element={<Order />} />
      <Route path="/3/zusammenfassung" element={<Summary />} />
      <Route path="/3/bestaetigung" element={<Confirmation />} />
      <Route path="/3/checkout" element={<Checkout />} />
      <Route path="/3/impressum" element={<V3Impressum />} />
      <Route path="/3/agb" element={<V3AGB />} />
      <Route path="/3/datenschutz" element={<V3Datenschutz />} />
      <Route path="/3/widerrufsrecht" element={<V3Widerrufsrecht />} />
      <Route path="/3/kontakt" element={<V3Kontakt />} />
      <Route path="/3/service" element={<V3Service />} />
      <Route path="/3/produkte" element={<V3Produkte />} />
      <Route path="/3/liefergebiet" element={<V3Liefergebiet />} />

      <Route path="/4/home" element={<V4Home />} />
      <Route path="/4/bestellen" element={<Order />} />
      <Route path="/4/zusammenfassung" element={<Summary />} />
      <Route path="/4/bestaetigung" element={<Confirmation />} />
      <Route path="/4/checkout" element={<Checkout />} />
      <Route path="/4/mentions-legales" element={<V4Impressum />} />
      <Route path="/4/cgv" element={<V4AGB />} />
      <Route path="/4/confidentialite" element={<V4Datenschutz />} />
      <Route path="/4/retractation" element={<V4Widerrufsrecht />} />
      <Route path="/4/contact" element={<V4Kontakt />} />
      <Route path="/4/service" element={<V4Service />} />
      <Route path="/4/produits" element={<V4Produkte />} />
      <Route path="/4/livraison" element={<V4Liefergebiet />} />

      <Route path="/5/home" element={<V5Home />} />
      <Route path="/5/ordina" element={<Order />} />
      <Route path="/5/riepilogo" element={<Summary />} />
      <Route path="/5/conferma" element={<Confirmation />} />
      <Route path="/5/checkout" element={<Checkout />} />
      <Route path="/5/note-legali" element={<V5Impressum />} />
      <Route path="/5/termini" element={<V5AGB />} />
      <Route path="/5/privacy" element={<V5Datenschutz />} />
      <Route path="/5/recesso" element={<V5Widerrufsrecht />} />
      <Route path="/5/contatto" element={<V5Kontakt />} />
      <Route path="/5/servizio" element={<V5Service />} />
      <Route path="/5/prodotti" element={<V5Produkte />} />
      <Route path="/5/consegna" element={<V5Liefergebiet />} />

      <Route path="/6/home" element={<V6Home />} />
      <Route path="/6/order" element={<Order />} />
      <Route path="/6/summary" element={<Summary />} />
      <Route path="/6/confirmation" element={<Confirmation />} />
      <Route path="/6/checkout" element={<Checkout />} />
      <Route path="/6/legal" element={<V6Impressum />} />
      <Route path="/6/terms" element={<V6AGB />} />
      <Route path="/6/privacy" element={<V6Datenschutz />} />
      <Route path="/6/withdrawal" element={<V6Widerrufsrecht />} />
      <Route path="/6/contact" element={<V6Kontakt />} />
      <Route path="/6/service" element={<V6Service />} />
      <Route path="/6/products" element={<V6Produkte />} />
      <Route path="/6/delivery-areas" element={<V6Liefergebiet />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DomainRouter;
