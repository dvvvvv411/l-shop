
import React from 'react';
import { Link } from 'react-router-dom';
import { getLogoConfig } from '../../config/logoConfig';

const CheckoutHeader = () => {
  const referrer = localStorage.getItem('orderReferrer');
  const logoConfig = getLogoConfig(referrer || undefined);

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Centered Logo - Now links to domain root */}
        <div className="flex justify-center mb-4">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            {logoConfig.useImage && logoConfig.imageUrl ? (
              <img 
                src={logoConfig.imageUrl} 
                alt={logoConfig.name} 
                className={logoConfig.className}
              />
            ) : logoConfig.name === 'OilExpress' ? (
              <div className={logoConfig.className}>
                {logoConfig.textContent}
              </div>
            ) : (
              <>
                <div className={logoConfig.className}>
                  <span className="text-white font-bold text-sm">{logoConfig.textContent}</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">{logoConfig.name}</span>
              </>
            )}
          </Link>
        </div>
        
        {/* Security Indicators - Centered below logo */}
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Sichere Zahlung</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>SSL verschlüsselt</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;
