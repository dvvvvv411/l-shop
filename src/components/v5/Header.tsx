
import React, { useState } from 'react';
import { Menu, X, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getLogoConfigForV5 } from '@/config/logoConfig';
import { useDomainShop } from '@/hooks/useDomainShop';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logoConfig = getLogoConfigForV5();
  const shopConfig = useDomainShop();

  // Determine if we should use root URLs (production Italian shop) or prefixed URLs (preview)
  const isProductionItalianShop = shopConfig.shopType === 'italy' && 
    typeof window !== 'undefined' && 
    window.location.hostname === 'gasolio-express.it';
  
  const getUrl = (path: string) => {
    return isProductionItalianShop ? path : `/5${path}`;
  };

  // Logo should always go to root domain
  const getLogoUrl = () => {
    return '/';
  };

  const isActive = (path: string) => {
    const dynamicPath = getUrl(path);
    if (path === '/home') {
      return location.pathname === dynamicPath || location.pathname === getUrl('/') || 
             (isProductionItalianShop && location.pathname === '/');
    }
    return location.pathname === dynamicPath;
  };

  const scrollToCalculator = () => {
    // Check if we're on the home page (either root or with prefix)
    const isOnRootHome = location.pathname === '/';
    const isOnPrefixedHome = location.pathname === '/5/home' || location.pathname === '/5/';
    const isOnHome = isOnRootHome || isOnPrefixedHome;
    
    if (isOnHome) {
      const calculatorElement = document.querySelector('#calculator');
      if (calculatorElement) {
        calculatorElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Navigate to root home and then scroll
      navigate('/');
      setTimeout(() => {
        const calculatorElement = document.querySelector('#calculator');
        if (calculatorElement) {
          calculatorElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { href: '/home', label: 'Home' },
    { href: '/prodotti', label: 'Prodotti' },
    { href: '/consegna', label: 'Zone di consegna' },
    { href: '/servizio', label: 'Servizio' },
    { href: '/contatto', label: 'Contatto' }
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-green-600 sticky top-0 z-50">
      {/* Top Bar - Italian Style */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Consegna rapida in tutta Italia</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@gasolio-express.it</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-3 h-2 bg-green-600"></div>
              <div className="w-3 h-2 bg-white"></div>
              <div className="w-3 h-2 bg-red-600"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Always goes to root domain */}
          <Link 
            to={getLogoUrl()} 
            className="lg:flex lg:items-center lg:ml-8 flex justify-center w-full lg:w-auto hover:scale-105 transition-transform duration-300"
          >
            {logoConfig.useImage && logoConfig.imageUrl ? (
              <img 
                src={logoConfig.imageUrl} 
                alt={logoConfig.name}
                className="h-20 lg:h-18 w-auto"
              />
            ) : (
              <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-3 rounded-xl shadow-lg">
                <span className="text-2xl font-bold">{logoConfig.textContent}</span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={getUrl(item.href)}
                className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-green-600 bg-green-50 rounded-lg'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-green-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              onClick={scrollToCalculator}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Calcola il prezzo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-green-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={getUrl(item.href)}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <Button 
                onClick={scrollToCalculator}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white mt-4"
              >
                Calcola il prezzo
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
