
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isMaltaPages = location.pathname.startsWith('/6/');
  const isBelgianPages = location.pathname.startsWith('/7/');

  // Belgian-specific contact info
  const belgianInfo = {
    phone: '+32 2 123 4567',
    email: 'info@mazoutvandaag.com',
    address: {
      street: 'Voorbeeldstraat 123',
      city: '1000 Brussel'
    },
    company: 'Mazout Vandaag BVBA'
  };

  // Malta-specific contact info
  const maltaInfo = {
    phone: '+356 2123 4567',
    email: 'info@malta-heating-oil.com',
    address: {
      street: 'Triq il-Kbira',
      city: 'VLT 1234 Valletta'
    },
    company: 'Malta Energy Solutions Ltd'
  };

  // Default German info
  const defaultInfo = {
    phone: '089 41435467',
    email: 'info@stanton-energie.de',
    address: {
      street: 'Schellingstr. 109a',
      city: '80798 München'
    },
    company: 'STANTON GmbH'
  };

  const contactInfo = isBelgianPages ? belgianInfo : isMaltaPages ? maltaInfo : defaultInfo;
  const homeLink = isBelgianPages ? "/7/home" : isMaltaPages ? "/6/home" : "/";
  const logoAlt = isBelgianPages ? "Mazout Vandaag" : isMaltaPages ? "Malta Energy" : "HeizölDirekt";

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to={homeLink} className="inline-block">
              <img src="https://i.imgur.com/vX78e29.png" alt={logoAlt} className="h-12 w-auto mb-4" />
            </Link>
            <p className="text-gray-300 mb-4">
              {isBelgianPages 
                ? "Uw betrouwbare partner voor betaalbare mazoutleveringen al meer dan 25 jaar."
                : isMaltaPages 
                ? "Your reliable partner for affordable heating oil deliveries for over 15 years."
                : "Ihr zuverlässiger Partner für günstige Heizöllieferungen seit über 25 Jahren."
              }
            </p>
          </div>

          {/* Products & Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isBelgianPages ? "Producten & Service" : isMaltaPages ? "Products & Service" : "Produkte & Service"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to={isBelgianPages ? "/7/produkte" : isMaltaPages ? "/6/produkte" : "/produkte"} className="text-gray-300 hover:text-white transition-colors">
                  {isBelgianPages ? "Mazout Producten" : isMaltaPages ? "Heating Oil Products" : "Heizöl-Produkte"}
                </Link>
              </li>
              <li>
                <Link to={isBelgianPages ? "/7/liefergebiet" : isMaltaPages ? "/6/liefergebiet" : "/liefergebiet"} className="text-gray-300 hover:text-white transition-colors">
                  {isBelgianPages ? "Leveringsgebieden" : isMaltaPages ? "Delivery Areas" : "Liefergebiete"}
                </Link>
              </li>
              <li>
                <Link to={homeLink} className="text-gray-300 hover:text-white transition-colors">
                  {isBelgianPages ? "Prijscalculator" : isMaltaPages ? "Price Calculator" : "Preisrechner"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isBelgianPages ? "Klantenservice" : isMaltaPages ? "Customer Service" : "Kundenservice"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to={isBelgianPages ? "/7/kontakt" : isMaltaPages ? "/6/kontakt" : "/kontakt"} className="text-gray-300 hover:text-white transition-colors">
                  {isBelgianPages ? "Contact" : isMaltaPages ? "Contact" : "Kontakt"}
                </Link>
              </li>
              <li>
                <a href={isBelgianPages ? "/7/home#faq" : isMaltaPages ? "/6/home#faq" : "/#faq"} className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link to={isBelgianPages ? "/7/widerrufsrecht" : isMaltaPages ? "/6/widerrufsrecht" : "/widerrufsrecht"} className="text-gray-300 hover:text-white transition-colors">
                  {isBelgianPages ? "Herroepingsrecht" : isMaltaPages ? "Right of Withdrawal" : "Widerrufsrecht"}
                </Link>
              </li>
              <li>
                <Link to={isBelgianPages ? "/7/service" : isMaltaPages ? "/6/service" : "/service"} className="text-gray-300 hover:text-white transition-colors">
                  Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isBelgianPages ? "Contact" : isMaltaPages ? "Contact" : "Kontakt"}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-gray-300">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-gray-300">{contactInfo.email}</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1" />
                <div className="text-gray-300">
                  <div>{contactInfo.address.street}</div>
                  <div>{contactInfo.address.city}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 {contactInfo.company}. {isBelgianPages ? "Alle rechten voorbehouden." : isMaltaPages ? "All rights reserved." : "Alle Rechte vorbehalten."}
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to={isBelgianPages ? "/7/impressum" : isMaltaPages ? "/6/impressum" : "/impressum"} className="text-gray-400 hover:text-white text-sm transition-colors">
                {isBelgianPages ? "Wettelijke informatie" : isMaltaPages ? "Legal Information" : "Impressum"}
              </Link>
              <Link to={isBelgianPages ? "/7/datenschutz" : isMaltaPages ? "/6/datenschutz" : "/datenschutz"} className="text-gray-400 hover:text-white text-sm transition-colors">
                {isBelgianPages ? "Privacybeleid" : isMaltaPages ? "Privacy Policy" : "Datenschutz"}
              </Link>
              <Link to={isBelgianPages ? "/7/agb" : isMaltaPages ? "/6/agb" : "/agb"} className="text-gray-400 hover:text-white text-sm transition-colors">
                {isBelgianPages ? "Algemene voorwaarden" : isMaltaPages ? "Terms & Conditions" : "AGB"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
