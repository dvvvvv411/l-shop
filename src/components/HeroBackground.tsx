
import React from 'react';

const HeroBackground = () => {
  return (
    <>
      {/* Enhanced Background Pattern with Oil Drop Animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full blur-3xl oil-drop-animation"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-red-400 rounded-full blur-3xl oil-drop-animation-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-300 rounded-full blur-3xl wave-animation"></div>
      </div>

      {/* Floating oil drops */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-400 rounded-full opacity-30 oil-float-1"></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-red-500 rounded-full opacity-20 oil-float-2"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-red-600 rounded-full opacity-25 oil-float-3"></div>
      </div>
    </>
  );
};

export default HeroBackground;
