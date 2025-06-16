
import React, { useState } from 'react';
import { Menu, X, Fuel } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { getLogoConfigByShopType } from '../../config/logoConfig';
import { useDomainShop } from '../../hooks/useDomainShop';
import { useBelgianTranslations } from '../../hooks/useBelgianTranslations';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const shopConfig = useDomainShop();
  const logoConfig = getLogoConfigByShopType(shopConfig.shopType);
  const t = useBelgianTranslations();

  const handlePriceCalculatorClick = () => {
    navigate('/');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-blue-100 relative z-50 shadow-sm">
      {/* Top Bar with Belgian styling */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <Fuel className="h-4 w-4 text-yellow-300" />
            <span>Persoonlijke service dagelijks 8-18u | België-breed</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-yellow-100">{shopConfig.email}</span>
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
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-bold text-xl shadow-lg border border-yellow-300">
                  <Fuel className="inline h-6 w-6 mr-2 text-yellow-300" />
                  {logoConfig.textContent}
                </div>
              )}
              <div className="ml-4 hidden md:block">
                <div className="text-xs text-blue-600 font-medium">Premium Mazout voor België</div>
                <div className="text-sm font-semibold text-gray-800">Sinds 2009</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              {t.nav.home}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-yellow-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/produkte" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              {t.nav.products}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-yellow-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/liefergebiet" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              {t.nav.delivery}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-yellow-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/service" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              {t.nav.about}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-yellow-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/kontakt" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              {t.nav.contact}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-yellow-500 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* CTA Button with Belgian styling */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePriceCalculatorClick}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl border border-yellow-300/50"
            >
              <Fuel className="inline h-4 w-4 mr-2" />
              {t.nav.calculate}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-blue-600"
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
            className="lg:hidden mt-4 pb-4 border-t border-blue-100 pt-4"
          >
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                to="/produkte"
                className="text-gray-600 hover:text-blue-600 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.products}
              </Link>
              <Link
                to="/liefergebiet"
                className="text-gray-600 hover:text-blue-600 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.delivery}
              </Link>
              <Link
                to="/service"
                className="text-gray-600 hover:text-blue-600 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.about}
              </Link>
              <Link
                to="/kontakt"
                className="text-gray-600 hover:text-blue-600 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.contact}
              </Link>
              <div className="pt-3 border-t border-blue-100">
                <button
                  onClick={handlePriceCalculatorClick}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg font-medium w-full border border-yellow-300/50"
                >
                  <Fuel className="inline h-4 w-4 mr-2" />
                  {t.nav.calculate}
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
