
import React, { useState } from 'react';
import { Menu, X, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getLogoConfigForV4 } from '@/config/logoConfig';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logoConfig = getLogoConfigForV4();

  const isActive = (path: string) => {
    if (path === '/4/home') {
      return location.pathname === '/4/home' || location.pathname === '/4/';
    }
    return location.pathname === path;
  };

  const scrollToCalculator = () => {
    // If we're already on the home page, just scroll
    if (location.pathname === '/4/home' || location.pathname === '/4/') {
      const calculatorElement = document.querySelector('#calculator');
      if (calculatorElement) {
        calculatorElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // If we're on a different page, navigate to home first then scroll
      navigate('/4/home');
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
    { href: '/4/home', label: 'Accueil' },
    { href: '/4/produits', label: 'Produits' },
    { href: '/4/livraison', label: 'Zones de livraison' },
    { href: '/4/service', label: 'Service' },
    { href: '/4/contact', label: 'Contact' }
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-red-600 sticky top-0 z-50">
      {/* Top Bar - French Style */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Livraison rapide en France</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@fioul-rapide.fr</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-3 h-2 bg-blue-600"></div>
              <div className="w-3 h-2 bg-white"></div>
              <div className="w-3 h-2 bg-red-600"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/4/home" 
            className="lg:flex lg:items-center lg:ml-8 flex justify-center w-full lg:w-auto hover:scale-105 transition-transform duration-300"
          >
            {logoConfig.useImage && logoConfig.imageUrl ? (
              <img 
                src={logoConfig.imageUrl} 
                alt={logoConfig.name}
                className="h-20 lg:h-18 w-auto"
              />
            ) : (
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-3 rounded-xl shadow-lg">
                <span className="text-2xl font-bold">{logoConfig.textContent}</span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-4 py-2 font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-red-600 bg-red-50 rounded-lg'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-red-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              onClick={scrollToCalculator}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Calculer le prix
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-red-600 transition-colors"
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
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <Button 
                onClick={scrollToCalculator}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white mt-4"
              >
                Calculer le prix
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
