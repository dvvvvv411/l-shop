
import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleJetztBestellenClick = () => {
    navigate('/1/home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg relative z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>089 41435467</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>info@stanton-energie.de</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span>Kostenlose Beratung Mo-Fr 8-18 Uhr</span>
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
            className="flex items-center lg:justify-start justify-center flex-1 lg:flex-initial"
          >
            <Link to="/1/home" className="flex items-center">
              <img 
                src="https://i.imgur.com/vX78e29.png" 
                alt="HeizölDirekt" 
                className="h-12 md:h-15 w-auto"
              />
              <div className="ml-4 hidden md:block">
                <div className="text-sm text-gray-600">Deutschlands günstigster</div>
                <div className="text-lg font-semibold text-gray-900">Heizöl-Service</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link to="/1/home" className="text-gray-700 hover:text-red-600 font-medium transition-colors relative group">
              Startseite
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
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
              onClick={handleJetztBestellenClick}
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
                to="/1/home" 
                className="text-gray-700 hover:text-red-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Startseite
              </Link>
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
              <div className="pt-4 border-t border-gray-200">
                <button 
                  onClick={handleJetztBestellenClick}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold w-full"
                >
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
