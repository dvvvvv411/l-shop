import React, { useState } from 'react';
import { Menu, X, Phone, Mail, ShoppingCart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getLogoConfig } from '../../config/logoConfig';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoConfig = getLogoConfig('/2/home');
  return <header className="bg-white border-b border-gray-100 relative z-50">
      {/* Top Bar */}
      <div className="bg-slate-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone size={14} />
              <span>0800 987 654 3</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail size={14} />
              <span>kontakt@oilexpress.de</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span>Persönliche Beratung täglich 8-18 Uhr</span>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                <User size={14} />
                <span>Login</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                <ShoppingCart size={14} />
                <span>Warenkorb</span>
              </button>
              <Link to="/admin" className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6
        }} className="flex items-center">
            <Link to="/2/home" className="flex items-center">
              {logoConfig.useImage && logoConfig.imageUrl ? <img src={logoConfig.imageUrl} alt={logoConfig.name} className={logoConfig.className} /> : <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-5 py-2 rounded-md font-bold text-xl">
                  {logoConfig.textContent}
                </div>}
              <div className="ml-3 hidden md:block">
                <div className="text-xs text-gray-500 font-medium">Premium Energielösungen</div>
                <div className="text-sm font-semibold text-gray-800">Seit 1998</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <Link to="/2/produkte" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              Sortiment
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/2/liefergebiet" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              Lieferservice
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/2/service" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              Premium Service
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/2/kontakt" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              Support
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-2 rounded-md font-medium hover:from-blue-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg">
              Preis berechnen
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/2/produkte" className="text-gray-600 hover:text-blue-600 font-medium py-1" onClick={() => setIsMenuOpen(false)}>
                Sortiment
              </Link>
              <Link to="/2/liefergebiet" className="text-gray-600 hover:text-blue-600 font-medium py-1" onClick={() => setIsMenuOpen(false)}>
                Lieferservice
              </Link>
              <Link to="/2/service" className="text-gray-600 hover:text-blue-600 font-medium py-1" onClick={() => setIsMenuOpen(false)}>
                Premium Service
              </Link>
              <Link to="/2/kontakt" className="text-gray-600 hover:text-blue-600 font-medium py-1" onClick={() => setIsMenuOpen(false)}>
                Support
              </Link>
              <div className="flex flex-col space-y-2 pt-3 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 py-1">
                  <User size={16} />
                  <span>Login</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 py-1">
                  <ShoppingCart size={16} />
                  <span>Warenkorb</span>
                </button>
                <Link to="/admin" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 py-1" onClick={() => setIsMenuOpen(false)}>
                  <span>Admin</span>
                </Link>
                <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-md font-medium w-full mt-2">
                  Preis berechnen
                </button>
              </div>
            </nav>
          </motion.div>}
      </div>
    </header>;
};
export default Header;