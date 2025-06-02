
import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/1/home" className="inline-block">
              <img 
                src="https://i.imgur.com/vX78e29.png" 
                alt="HeizölDirekt" 
                className="h-12 w-auto mb-4"
              />
            </Link>
            <p className="text-gray-300 mb-4">
              Ihr zuverlässiger Partner für günstige Heizöllieferungen seit über 25 Jahren.
            </p>
            <div className="flex space-x-4">
              <div className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer">
                <Facebook size={20} />
              </div>
              <div className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer">
                <Twitter size={20} />
              </div>
              <div className="bg-gray-800 p-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer">
                <Instagram size={20} />
              </div>
            </div>
          </div>

          {/* Products & Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Produkte & Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/1/produkte" className="text-gray-300 hover:text-white transition-colors">
                  Heizöl-Produkte
                </Link>
              </li>
              <li>
                <Link to="/1/liefergebiet" className="text-gray-300 hover:text-white transition-colors">
                  Liefergebiete
                </Link>
              </li>
              <li>
                <a href="#preise" className="text-gray-300 hover:text-white transition-colors">
                  Preisrechner
                </a>
              </li>
              <li>
                <Link to="/1/service" className="text-gray-300 hover:text-white transition-colors">
                  Qualitätszertifikate
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kundenservice</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/1/kontakt" className="text-gray-300 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/1/widerrufsrecht" className="text-gray-300 hover:text-white transition-colors">
                  Widerrufsrecht
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Zahlung & Versand
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-gray-300">0800 123 456 7</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-gray-300">info@heizoeldirekt.de</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1" />
                <div className="text-gray-300">
                  <div>Musterstraße 123</div>
                  <div>12345 Musterstadt</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 HeizölDirekt GmbH. Alle Rechte vorbehalten.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/1/impressum" className="text-gray-400 hover:text-white text-sm transition-colors">
                Impressum
              </Link>
              <Link to="/1/datenschutz" className="text-gray-400 hover:text-white text-sm transition-colors">
                Datenschutz
              </Link>
              <Link to="/1/agb" className="text-gray-400 hover:text-white text-sm transition-colors">
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
