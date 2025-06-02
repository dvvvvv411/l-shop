
import React, { useState } from 'react';
import { Menu, X, Phone, Mail, ShoppingCart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 shadow-xl relative z-50">
      {/* Top Bar */}
      <div className="bg-slate-800 text-gray-300 py-3">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>0800 123 456 7</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>premium@heizoeldirekt.de</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span>Exklusiver Service Mo-Fr 8-20 Uhr</span>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                <User size={16} />
                <span>Premium Login</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                <ShoppingCart size={16} />
                <span>Warenkorb (0)</span>
              </button>
              <Link to="/admin" className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
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
            <Link to="/2/home" className="flex items-center">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-bold text-2xl shadow-lg">
                PremiumÖl
              </div>
              <div className="ml-4 hidden md:block">
                <div className="text-sm text-gray-400">Exklusiver</div>
                <div className="text-lg font-semibold text-white">Premium-Service</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link to="/2/produkte" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors relative group">
              Premium Produkte
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/2/liefergebiet" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors relative group">
              Exklusive Gebiete
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/2/service" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors relative group">
              VIP Service
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/2/kontakt" className="text-gray-300 hover:text-yellow-400 font-medium transition-colors relative group">
              Persönlicher Kontakt
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 px-8 py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl"
            >
              Premium bestellen
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
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
            className="lg:hidden mt-6 pb-6 border-t border-slate-700 pt-6"
          >
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/2/produkte" 
                className="text-gray-300 hover:text-yellow-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Premium Produkte
              </Link>
              <Link 
                to="/2/liefergebiet" 
                className="text-gray-300 hover:text-yellow-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Exklusive Gebiete
              </Link>
              <Link 
                to="/2/service" 
                className="text-gray-300 hover:text-yellow-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                VIP Service
              </Link>
              <Link 
                to="/2/kontakt" 
                className="text-gray-300 hover:text-yellow-400 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Persönlicher Kontakt
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-slate-700">
                <button className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 py-2">
                  <User size={18} />
                  <span>Premium Login</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 py-2">
                  <ShoppingCart size={18} />
                  <span>Warenkorb (0)</span>
                </button>
                <Link 
                  to="/admin" 
                  className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Admin</span>
                </Link>
                <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-semibold w-full mt-4">
                  Premium bestellen
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
