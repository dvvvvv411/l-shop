
import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Mail, MapPin, Clock, Shield, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info with Austrian Branding */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="https://i.imgur.com/FrtZ9Dd.png" 
                alt="Sommer Öl und Industriebedarf" 
                className="h-32 w-auto"
              />
            </div>
            
            <p className="text-violet-200 leading-relaxed">
              Ihr vertrauensvoller Partner für Premium-Heizöl in ganz Österreich. 
              Von den Alpen bis ins Burgenland - seit über 25 Jahren.
            </p>
            
            {/* Austrian Quality Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <Shield className="h-4 w-4 text-violet-300" />
                <span className="text-sm text-violet-200">ÖNORM-zertifiziert</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <Award className="h-4 w-4 text-violet-300" />
                <span className="text-sm text-violet-200">Seit 1998</span>
              </div>
            </div>

            {/* Austrian Flag */}
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-6 h-4 bg-red-600 rounded-sm shadow-sm"></div>
                <div className="w-6 h-4 bg-white rounded-sm shadow-sm"></div>
                <div className="w-6 h-4 bg-red-600 rounded-sm shadow-sm"></div>
              </div>
              <span className="text-violet-200 text-sm font-medium">Österreichisches Traditionsunternehmen</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Schnellzugriff</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/service" className="text-violet-200 hover:text-white transition-colors duration-200 flex items-center">
                  <Mountain className="h-4 w-4 mr-2" />
                  Unser Service
                </Link>
              </li>
              <li>
                <Link to="/produkte" className="text-violet-200 hover:text-white transition-colors duration-200">
                  Heizöl-Qualitäten
                </Link>
              </li>
              <li>
                <Link to="/liefergebiet" className="text-violet-200 hover:text-white transition-colors duration-200">
                  Österreichweite Lieferung
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-violet-200 hover:text-white transition-colors duration-200">
                  Kontakt & Beratung
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Rechtliches</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/impressum" className="text-violet-200 hover:text-white transition-colors duration-200">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/agb" className="text-violet-200 hover:text-white transition-colors duration-200">
                  AGB
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-violet-200 hover:text-white transition-colors duration-200">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link to="/widerrufsrecht" className="text-violet-200 hover:text-white transition-colors duration-200">
                  Widerrufsrecht
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Kontakt Österreich</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-violet-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white">info@heizoel-austria.com</p>
                  <p className="text-violet-200 text-sm">Schnelle Antwort garantiert</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-violet-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white">Ganz Österreich</p>
                  <p className="text-violet-200 text-sm">Alle 9 Bundesländer</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-violet-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white">Express-Lieferung</p>
                  <p className="text-violet-200 text-sm">2-5 Werktage österreichweit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-violet-800/50 bg-violet-950/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-violet-300 text-sm">
              © 2024 Sommer Öl und Industriebedarf GmbH. Alle Rechte vorbehalten.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-violet-300">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>SSL-verschlüsselt</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Österreichische Qualität</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mountain className="h-4 w-4" />
                <span>ÖNORM-Standard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
