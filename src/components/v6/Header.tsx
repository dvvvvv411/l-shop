
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLogoConfigForV6 } from '@/config/logoConfig';
import { useDomainShop } from '@/hooks/useDomainShop';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoConfig = getLogoConfigForV6();
  const shopConfig = useDomainShop();
  
  // Determine if we should use root URLs (production Malta shop) or prefixed URLs (preview)
  const isProductionMaltaShop = shopConfig.shopType === 'malta' && 
    typeof window !== 'undefined' && 
    window.location.hostname === 'malta-heating-oil.com';
  
  const getUrl = (path: string) => {
    return isProductionMaltaShop ? path : path;
  };

  const navigationLinks = [
    { label: 'Home', href: getUrl('/') },
    { label: 'Products', href: getUrl('/products') },
    { label: 'Delivery Areas', href: getUrl('/delivery-areas') },
    { label: 'Service', href: getUrl('/service') },
    { label: 'Contact', href: getUrl('/contact') }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative bg-gradient-to-r from-amber-600 via-white to-red-600 shadow-xl">
      {/* Malta flag stripe */}
      <div className="h-1 bg-gradient-to-r from-gray-300 via-white to-red-600"></div>
      
      <div className="bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={getUrl('/')} className="flex items-center space-x-3 z-10">
              {logoConfig.useImage && logoConfig.imageUrl ? (
                <img 
                  src={logoConfig.imageUrl} 
                  alt={logoConfig.name}
                  className={logoConfig.className}
                />
              ) : (
                <div className="bg-gradient-to-br from-amber-600 to-red-600 text-white p-3 rounded-xl">
                  <span className="text-xl font-bold">{logoConfig.textContent}</span>
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone size={16} />
                <span className="text-sm font-medium">+356 2123 4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail size={16} />
                <span className="text-sm font-medium">info@malta-heating-oil.com</span>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden z-50 relative p-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="container mx-auto px-4 py-6">
                <nav className="flex flex-col space-y-4">
                  {navigationLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-700 hover:text-amber-600 font-medium py-2 border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                
                {/* Mobile Contact Info */}
                <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone size={16} />
                    <span className="text-sm font-medium">+356 2123 4567</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail size={16} />
                    <span className="text-sm font-medium">info@malta-heating-oil.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
