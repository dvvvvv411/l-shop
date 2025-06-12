
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Clock } from 'lucide-react';
import { getLogoConfigForV5 } from '@/config/logoConfig';
import { useDomainShop } from '@/hooks/useDomainShop';

const Footer = () => {
  const logoConfig = getLogoConfigForV5();
  const shopConfig = useDomainShop();
  
  // Determine if we should use root URLs (production Italian shop) or prefixed URLs (preview)
  const isProductionItalianShop = shopConfig.shopType === 'italy' && 
    typeof window !== 'undefined' && 
    window.location.hostname === 'gasolio-veloce.it';
  
  const getUrl = (path: string) => {
    return isProductionItalianShop ? path : path;
  };

  const footerLinks = {
    company: [
      { label: 'Servizio', href: getUrl('/servizio') },
      { label: 'Prodotti', href: getUrl('/prodotti') },
      { label: 'Zone di consegna', href: getUrl('/consegna') },
      { label: 'Contatto', href: getUrl('/contatto') }
    ],
    legal: [
      { label: 'Note legali', href: getUrl('/note-legali') },
      { label: 'Termini e condizioni', href: getUrl('/termini') },
      { label: 'Privacy', href: getUrl('/privacy') },
      { label: 'Diritto di recesso', href: getUrl('/recesso') }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-600/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-red-600/20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to={getUrl('/')} className="flex items-center mb-6">
              {logoConfig.footerImageUrl ? (
                <img 
                  src={logoConfig.footerImageUrl} 
                  alt={logoConfig.name}
                  className="h-16 w-auto"
                />
              ) : logoConfig.useImage && logoConfig.imageUrl ? (
                <img 
                  src={logoConfig.imageUrl} 
                  alt={logoConfig.name}
                  className="h-16 w-auto filter brightness-0 invert"
                />
              ) : (
                <div className="bg-gradient-to-br from-green-600 to-red-600 text-white p-3 rounded-xl">
                  <span className="text-xl font-bold">{logoConfig.textContent}</span>
                </div>
              )}
            </Link>
            
            <div className="flex space-x-1 mb-4">
              <div className="w-6 h-4 bg-green-600 rounded-sm"></div>
              <div className="w-6 h-4 bg-white rounded-sm"></div>
              <div className="w-6 h-4 bg-red-600 rounded-sm"></div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-green-400">Contatto</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <div>
                  <p className="font-semibold">info@gasolio-veloce.it</p>
                  <p className="text-gray-400 text-sm">Risposta entro 24h</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-400 mt-1" />
                <div>
                  <p className="font-semibold">Gasolio Veloce S.r.l.</p>
                  <p className="text-gray-400 text-sm">
                    Via Roma 123<br />
                    20121 Milano, Italia
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-green-400" />
                <div>
                  <p className="font-semibold">Orari di apertura</p>
                  <p className="text-gray-400 text-sm">Lun-Ven: 8:00-18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-green-400">Link rapidi</h4>
            <div className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="block text-gray-300 hover:text-white hover:text-green-400 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-green-400">Informazioni legali</h4>
            <div className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="block text-gray-300 hover:text-white hover:text-green-400 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Company Legal Info - Bottom Section Only */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Gasolio Veloce S.r.l. Tutti i diritti riservati.
            </div>
            <div className="flex items-center justify-end space-x-6 text-sm text-gray-400">
              <span>Pagamento sicuro SSL</span>
              <span>•</span>
              <span>Consegna assicurata</span>
              <span>•</span>
              <span>Servizio clienti italiano</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
