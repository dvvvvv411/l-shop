
import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg relative z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone size={16} />
              <span>0800 123 456 7</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail size={16} />
              <span>info@heizoeldirekt.de</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Kostenlose Beratung Mo-Fr 8-18 Uhr</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
              HeizölDirekt
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#preise" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Preise
            </a>
            <a href="#qualitaet" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Qualität
            </a>
            <a href="#service" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Service
            </a>
            <a href="#kontakt" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Kontakt
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Jetzt bestellen
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <a href="#preise" className="text-gray-700 hover:text-red-600 font-medium">
                Preise
              </a>
              <a href="#qualitaet" className="text-gray-700 hover:text-red-600 font-medium">
                Qualität
              </a>
              <a href="#service" className="text-gray-700 hover:text-red-600 font-medium">
                Service
              </a>
              <a href="#kontakt" className="text-gray-700 hover:text-red-600 font-medium">
                Kontakt
              </a>
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold w-full">
                Jetzt bestellen
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
