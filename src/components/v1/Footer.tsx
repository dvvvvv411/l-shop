
import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <Flame className="text-red-500 mr-2" size={24} />
              <span className="text-xl font-bold">Heizöl-Service</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Deutschlands führender Heizöl-Lieferant mit über 20 Jahren Erfahrung. 
              Günstige Preise, zuverlässige Lieferung, erstklassiger Service.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone size={16} className="mr-3 text-red-500" />
                <span>0800 123 456 789</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail size={16} className="mr-3 text-red-500" />
                <span>info@heizoel-service.de</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock size={16} className="mr-3 text-red-500" />
                <span>24/7 Kundenservice</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Unsere Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/produkte" className="text-gray-300 hover:text-white transition-colors">
                  Heizöl-Qualitäten
                </Link>
              </li>
              <li>
                <Link to="/service" className="text-gray-300 hover:text-white transition-colors">
                  Premium Service
                </Link>
              </li>
              <li>
                <Link to="/liefergebiet" className="text-gray-300 hover:text-white transition-colors">
                  Liefergebiete
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-gray-300 hover:text-white transition-colors">
                  Beratung & Support
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
                <Link to="/agb" className="text-gray-300 hover:text-white transition-colors">
                  AGB
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-gray-300 hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link to="/widerrufsrecht" className="text-gray-300 hover:text-white transition-colors">
                  Widerrufsrecht
                </Link>
              </li>
            </ul>
          </div>

          {/* Quality & Trust */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Qualität & Vertrauen</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                DIN-zertifizierte Qualität
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                150.000+ zufriedene Kunden
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Deutschlandweite Lieferung
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                24/7 Kundenservice
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Heizöl-Service. Alle Rechte vorbehalten. 
            Deutschlands günstigster Heizöl-Lieferant.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
