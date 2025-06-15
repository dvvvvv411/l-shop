
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="https://i.imgur.com/vX78e29.png" 
                alt="HeizölDirekt" 
                className="h-10 w-auto"
              />
              <div className="ml-3">
                <div className="text-lg font-bold">Heizöl-Service</div>
                <div className="text-sm text-gray-400">Deutschlands günstigster</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Seit über 15 Jahren Ihr zuverlässiger Partner für günstige Heizöl-Lieferungen in ganz Deutschland.
            </p>
            <div className="flex space-x-4">
              <div className="bg-red-600 p-2 rounded-full">
                <Phone size={20} />
              </div>
              <div className="bg-red-600 p-2 rounded-full">
                <Mail size={20} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Schnellzugriff</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link to="/produkte" className="text-gray-300 hover:text-white transition-colors">
                  Unsere Produkte
                </Link>
              </li>
              <li>
                <Link to="/liefergebiet" className="text-gray-300 hover:text-white transition-colors">
                  Liefergebiete
                </Link>
              </li>
              <li>
                <Link to="/service" className="text-gray-300 hover:text-white transition-colors">
                  Service & Qualität
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-gray-300 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Rechtliches</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/impressum" className="text-gray-300 hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-gray-300 hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link to="/agb" className="text-gray-300 hover:text-white transition-colors">
                  AGB
                </Link>
              </li>
              <li>
                <Link to="/widerrufsrecht" className="text-gray-300 hover:text-white transition-colors">
                  Widerrufsrecht
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Kontakt</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone size={20} className="text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium">089 41435467</div>
                  <div className="text-sm text-gray-400">Kostenlose Beratung</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={20} className="text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium">info@stanton-energie.de</div>
                  <div className="text-sm text-gray-400">E-Mail Support</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock size={20} className="text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium">Mo-Fr 8:00-18:00</div>
                  <div className="text-sm text-gray-400">Servicezeiten</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Heizöl-Service. Alle Rechte vorbehalten.
            </div>
            <div className="text-gray-400 text-sm">
              Deutschlands günstigster Heizöl-Service
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
