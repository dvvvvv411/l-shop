
import React, { useState } from 'react';
import { Menu, X, Phone, Mail, ShoppingCart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg relative z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>0800 123 456 7</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>info@heizoeldirekt.de</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span>Kostenlose Beratung Mo-Fr 8-18 Uhr</span>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                <User size={16} />
                <span>Anmelden</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                <ShoppingCart size={16} />
                <span>Warenkorb (0)</span>
              </button>
              {/* Admin Link - for development */}
              <Link to="/admin" className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <Link to="/1/home" className="flex items-center">
              <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-2xl">
                HeizölDirekt
              </div>
              <div className="ml-4 hidden md:block">
                <div className="text-sm text-gray-600">Deutschlands günstigster</div>
                <div className="text-lg font-semibold text-gray-900">Heizöl-Service</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link to="/1/produkte" className="text-gray-700 hover:text-red-600 font-medium transition-colors relative group">
              Produkte
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/1/liefergebiet" className="text-gray-700 hover:text-red-600 font-medium transition-colors relative group">
              Liefergebiete
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/1/service" className="text-gray-700 hover:text-red-600 font-medium transition-colors relative group">
              Service & Qualität
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/1/kontakt" className="text-gray-700 hover:text-red-600 font-medium transition-colors relative group">
              Kontakt
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Jetzt bestellen
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-6 pb-6 border-t border-gray-200 pt-6"
          >
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/1/produkte" 
                className="text-gray-700 hover:text-red-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Produkte
              </Link>
              <Link 
                to="/1/liefergebiet" 
                className="text-gray-700 hover:text-red-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Liefergebiete
              </Link>
              <Link 
                to="/1/service" 
                className="text-gray-700 hover:text-red-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Service & Qualität
              </Link>
              <Link 
                to="/1/kontakt" 
                className="text-gray-700 hover:text-red-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakt
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-red-600 py-2">
                  <User size={18} />
                  <span>Anmelden</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-red-600 py-2">
                  <ShoppingCart size={18} />
                  <span>Warenkorb (0)</span>
                </button>
                <Link 
                  to="/admin" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Admin</span>
                </Link>
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold w-full mt-4">
                  Jetzt bestellen
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
