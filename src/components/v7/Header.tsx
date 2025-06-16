
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

const V7Header = () => {
  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-red-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone size={14} />
                <span>+32 2 123 4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail size={14} />
                <span>info@mazoutvandaag.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <span>🚚 Gratis levering vanaf 3.000L</span>
              <span>⚡ Levering binnen 3-5 werkdagen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/7/home" className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-red-600">
              MazoutVandaag
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/7/home" 
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/7/producten" 
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Producten
            </Link>
            <Link 
              to="/7/leveringsgebied" 
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Leveringsgebied
            </Link>
            <Link 
              to="/7/service" 
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Service
            </Link>
            <Link 
              to="/7/contact" 
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Mazout prijs vandaag</div>
              <div className="text-lg font-bold text-red-600">€0.89/L</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default V7Header;
