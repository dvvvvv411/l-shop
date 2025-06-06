
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Clock } from 'lucide-react';
import { getLogoConfigForV4 } from '@/config/logoConfig';

const Footer = () => {
  const logoConfig = getLogoConfigForV4();

  const footerLinks = {
    company: [
      { label: 'Service', href: '/4/service' },
      { label: 'Produits', href: '/4/produits' },
      { label: 'Zones de livraison', href: '/4/livraison' },
      { label: 'Contact', href: '/4/contact' }
    ],
    legal: [
      { label: 'Mentions légales', href: '/4/mentions-legales' },
      { label: 'CGV', href: '/4/cgv' },
      { label: 'Confidentialité', href: '/4/confidentialite' },
      { label: 'Droit de rétractation', href: '/4/retractation' }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-600/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/4/home" className="flex items-center mb-6">
              {logoConfig.footerImageUrl ? (
                <img 
                  src={logoConfig.footerImageUrl} 
                  alt={logoConfig.name}
                  className="h-18 w-auto"
                />
              ) : logoConfig.useImage && logoConfig.imageUrl ? (
                <img 
                  src={logoConfig.imageUrl} 
                  alt={logoConfig.name}
                  className="h-18 w-auto filter brightness-0 invert"
                />
              ) : (
                <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-3 rounded-xl">
                  <span className="text-xl font-bold">{logoConfig.textContent}</span>
                </div>
              )}
            </Link>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Votre spécialiste français du fioul domestique depuis 1995. 
              Livraison rapide et service client d'exception dans toute la France.
            </p>
            
            <div className="flex space-x-1 mb-4">
              <div className="w-6 h-4 bg-blue-600 rounded-sm"></div>
              <div className="w-6 h-4 bg-white rounded-sm"></div>
              <div className="w-6 h-4 bg-red-600 rounded-sm"></div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-red-400">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400" />
                <div>
                  <p className="font-semibold">info@fioul-rapide.fr</p>
                  <p className="text-gray-400 text-sm">Réponse sous 24h</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-400 mt-1" />
                <div>
                  <p className="font-semibold">Energy OIL Company Sàrl</p>
                  <p className="text-gray-400 text-sm">
                    95 rue Compans<br />
                    75019 Paris, France
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-red-400" />
                <div>
                  <p className="font-semibold">Horaires d'ouverture</p>
                  <p className="text-gray-400 text-sm">Lun-Ven: 8h-18h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-red-400">Liens rapides</h4>
            <div className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="block text-gray-300 hover:text-white hover:text-red-400 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-6 text-red-400">Informations légales</h4>
            <div className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="block text-gray-300 hover:text-white hover:text-red-400 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-red-600/20 rounded-xl border border-red-600/30">
              <h5 className="font-semibold text-red-400 mb-2">Qualité garantie</h5>
              <p className="text-gray-300 text-sm">
                Fioul domestique conforme aux normes françaises NF EN 14213
              </p>
            </div>
          </div>
        </div>

        {/* Company Legal Info */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <div>
              <h5 className="font-semibold text-red-400 mb-3">Informations légales</h5>
              <div className="text-gray-400 text-sm space-y-1">
                <p>Energy OIL Company Sàrl</p>
                <p>SIRET: 40538489200015</p>
                <p>TVA intracommunautaire: FR03145160497</p>
                <p>RCS Paris: 405 384 892</p>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-6 text-sm text-gray-400">
              <span>Paiement sécurisé SSL</span>
              <span>•</span>
              <span>Livraison assurée</span>
              <span>•</span>
              <span>Service client français</span>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2023 Energy OIL Company Sàrl. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
