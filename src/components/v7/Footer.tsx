
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/7/home" className="inline-block">
              <img src="https://i.imgur.com/vX78e29.png" alt="Mazout Vandaag" className="h-12 w-auto mb-4" />
            </Link>
            <p className="text-gray-300 mb-4">
              Uw betrouwbare partner voor betaalbare mazoutleveringen al meer dan 25 jaar.
            </p>
          </div>

          {/* Products & Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Producten & Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/7/produkte" className="text-gray-300 hover:text-white transition-colors">
                  Mazout Producten
                </Link>
              </li>
              <li>
                <Link to="/7/liefergebiet" className="text-gray-300 hover:text-white transition-colors">
                  Leveringsgebieden
                </Link>
              </li>
              <li>
                <Link to="/7/home" className="text-gray-300 hover:text-white transition-colors">
                  Prijscalculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Klantenservice</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/7/kontakt" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="/7/home#faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/7/widerrufsrecht" className="text-gray-300 hover:text-white transition-colors">
                  Herroepingsrecht
                </Link>
              </li>
              <li>
                <Link to="/7/service" className="text-gray-300 hover:text-white transition-colors">
                  Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-gray-300">+32 2 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-gray-300">info@mazoutvandaag.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1" />
                <div className="text-gray-300">
                  <div>Voorbeeldstraat 123</div>
                  <div>1000 Brussel</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 Mazout Vandaag BVBA. Alle rechten voorbehouden.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/7/impressum" className="text-gray-400 hover:text-white text-sm transition-colors">
                Wettelijke informatie
              </Link>
              <Link to="/7/datenschutz" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacybeleid
              </Link>
              <Link to="/7/agb" className="text-gray-400 hover:text-white text-sm transition-colors">
                Algemene voorwaarden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
