import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getLogoConfig } from '../../config/logoConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const logoConfig = getLogoConfig('/2/home');

  const companyInfo = [
    {
      icon: MapPin,
      title: "Hauptsitz",
      content: ["OilExpress GmbH", "Energiestraße 45", "20355 Hamburg"]
    },
    {
      icon: Phone,
      title: "Telefon",
      content: ["0800 987 654 3", "(kostenlos)"]
    },
    {
      icon: Mail,
      title: "E-Mail",
      content: ["kontakt@oilexpress.de"]
    },
    {
      icon: Clock,
      title: "Servicezeiten",
      content: ["Mo-Fr: 7:00-20:00 Uhr", "Sa: 8:00-16:00 Uhr"]
    }
  ];

  const quickLinks = [
    { label: "Sortiment", path: "/2/produkte" },
    { label: "Lieferservice", path: "/2/liefergebiet" },
    { label: "Premium Service", path: "/2/service" },
    { label: "Support", path: "/2/kontakt" }
  ];

  const legalLinks = [
    { label: "Impressum", path: "/2/impressum" },
    { label: "Datenschutz", path: "/2/datenschutz" },
    { label: "AGB", path: "/2/agb" },
    { label: "Widerrufsrecht", path: "/2/widerrufsrecht" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <Link to="/2/home" className="flex items-center mb-4">
                {logoConfig.useImage && logoConfig.imageUrl ? (
                  <img 
                    src={logoConfig.imageUrl} 
                    alt={logoConfig.name} 
                    className={logoConfig.className}
                  />
                ) : (
                  <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-5 py-2 rounded-md font-bold text-xl">
                    {logoConfig.textContent}
                  </div>
                )}
              </Link>
              <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                Seit 1998 Ihr vertrauensvoller Partner für Premium-Heizöl in ganz Deutschland. 
                Persönlicher Service, höchste Qualität und faire Preise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companyInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-blue-600/20 p-2 rounded-lg flex-shrink-0 mt-1">
                    <info.icon size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200 mb-1">{info.title}</div>
                    {info.content.map((line, lineIndex) => (
                      <div key={lineIndex} className="text-xs text-slate-400">{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">Unsere Services</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-slate-300 hover:text-emerald-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-emerald-400 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">Rechtliches</h3>
            <ul className="space-y-3 mb-6">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-slate-300 hover:text-emerald-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-emerald-400 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-slate-200">Folgen Sie uns</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-slate-700 hover:bg-blue-600 p-2 rounded-lg transition-colors group"
                  >
                    <social.icon size={16} className="text-slate-300 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <div>
              © {currentYear} OilExpress GmbH. Alle Rechte vorbehalten.
            </div>
            <div className="flex items-center space-x-4 mt-3 md:mt-0">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Persönliche Beratung verfügbar</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
