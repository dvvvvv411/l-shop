
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLogoConfigForV5 } from '@/config/logoConfig';
import { useDomainShop } from '@/hooks/useDomainShop';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoConfig = getLogoConfigForV5();
  const shopConfig = useDomainShop();
  
  // Determine if we should use root URLs (production Italian shop) or prefixed URLs (preview)
  const isProductionItalianShop = shopConfig.shopType === 'italy' && 
    typeof window !== 'undefined' && 
    window.location.hostname === 'gasolio-veloce.it';
  
  const getUrl = (path: string) => {
    return isProductionItalianShop ? path : path;
  };

  const navigationLinks = [
    { label: 'Home', href: getUrl('/') },
    { label: 'Prodotti', href: getUrl('/prodotti') },
    { label: 'Zone di consegna', href: getUrl('/consegna') },
    { label: 'Servizio', href: getUrl('/servizio') },
    { label: 'Contatto', href: getUrl('/contatto') }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative bg-gradient-to-r from-green-800 via-white to-red-600 shadow-xl">
      {/* Italian flag stripe */}
      <div className="h-1 bg-gradient-to-r from-green-600 via-white to-red-600"></div>
      
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
                <div className="bg-gradient-to-br from-green-600 to-red-600 text-white p-3 rounded-xl">
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
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone size={16} />
                <span className="text-sm font-medium">+39 02 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail size={16} />
                <span className="text-sm font-medium">info@gasolio-veloce.it</span>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden z-50 relative p-2 text-gray-700 hover:text-green-600 transition-colors"
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
                      className="text-gray-700 hover:text-green-600 font-medium py-2 border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                
                {/* Mobile Contact Info */}
                <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone size={16} />
                    <span className="text-sm font-medium">+39 02 1234 5678</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail size={16} />
                    <span className="text-sm font-medium">info@gasolio-veloce.it</span>
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
