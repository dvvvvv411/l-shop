
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
            <Link to="/" className="inline-block">
              <img src="https://i.imgur.com/vX78e29.png" alt="HeizölDirekt" className="h-12 w-auto mb-4" />
            </Link>
            <p className="text-gray-300 mb-4">
              Ihr zuverlässiger Partner für günstige Heizöllieferungen seit über 25 Jahren.
            </p>
          </div>

          {/* Products & Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Produkte & Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produkte" className="text-gray-300 hover:text-white transition-colors">
                  Heizöl-Produkte
                </Link>
              </li>
              <li>
                <Link to="/liefergebiet" className="text-gray-300 hover:text-white transition-colors">
                  Liefergebiete
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Preisrechner
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kundenservice</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/kontakt" className="text-gray-300 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <a href="/#faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/widerrufsrecht" className="text-gray-300 hover:text-white transition-colors">
                  Widerrufsrecht
                </Link>
              </li>
              <li>
                <Link to="/service" className="text-gray-300 hover:text-white transition-colors">
                  Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-gray-300">089 41435467</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-gray-300">info@stanton-energie.de</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1" />
                <div className="text-gray-300">
                  <div>Schellingstr. 109a</div>
                  <div>80798 München</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">© 2025 STANTON GmbH. Alle Rechte vorbehalten.</div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/impressum" className="text-gray-400 hover:text-white text-sm transition-colors">
                Impressum
              </Link>
              <Link to="/datenschutz" className="text-gray-400 hover:text-white text-sm transition-colors">
                Datenschutz
              </Link>
              <Link to="/agb" className="text-gray-400 hover:text-white text-sm transition-colors">
                AGB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
