
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { getLogoConfigByShopType } from '../../config/logoConfig';
import { useDomainShop } from '../../hooks/useDomainShop';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const shopConfig = useDomainShop();
  const logoConfig = getLogoConfigByShopType(shopConfig.shopType);

  const handlePriceCalculatorClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-100 relative z-50">
      {/* Top Bar */}
      <div className="bg-slate-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>Persönliche Beratung täglich 8-18 Uhr</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span>0911 96643306 | info@greenoil-lieferung.de</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center">
              {logoConfig.useImage && logoConfig.imageUrl ? (
                <img 
                  src={logoConfig.imageUrl} 
                  alt={logoConfig.name} 
                  className={logoConfig.className} 
                />
              ) : (
                <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-5 py-2 rounded-md font-bold text-xl">
                  {logoConfig.textContent}
                </div>
              )}
              <div className="ml-3 hidden md:block">
                <div className="text-xs text-gray-500 font-medium">Premium Energielösungen</div>
                <div className="text-sm font-semibold text-gray-800">Seit 1998</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              Startseite
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/produkte" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              Heizöl
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/liefergebiet" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              Lieferung
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/service" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              Über Uns
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/kontakt" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              Kundenservice
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePriceCalculatorClick}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-2 rounded-md font-medium hover:from-blue-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
            >
              Preis berechnen
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
            className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4"
          >
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-blue-600 font-medium py-1" 
                onClick={() => setIsMenuOpen(false)}
              >
                Startseite
              </Link>
              <Link 
                to="/produkte" 
                className="text-gray-600 hover:text-blue-600 font-medium py-1" 
                onClick={() => setIsMenuOpen(false)}
              >
                Heizöl
              </Link>
              <Link 
                to="/liefergebiet" 
                className="text-gray-600 hover:text-blue-600 font-medium py-1" 
                onClick={() => setIsMenuOpen(false)}
              >
                Lieferung
              </Link>
              <Link 
                to="/service" 
                className="text-gray-600 hover:text-blue-600 font-medium py-1" 
                onClick={() => setIsMenuOpen(false)}
              >
                Über Uns
              </Link>
              <Link 
                to="/kontakt" 
                className="text-gray-600 hover:text-blue-600 font-medium py-1" 
                onClick={() => setIsMenuOpen(false)}
              >
                Kundenservice
              </Link>
              <div className="pt-3 border-t border-gray-100">
                <button 
                  onClick={handlePriceCalculatorClick}
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-md font-medium w-full"
                >
                  Preis berechnen
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
