
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingDown, Flame, Star } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      text: "DIN-zertifiziert",
      color: "text-green-600"
    },
    {
      icon: TrendingDown,
      text: "Bis zu 15% sparen",
      color: "text-red-600"
    },
    {
      icon: Flame,
      text: "Premium Qualität",
      color: "text-orange-600"
    },
    {
      icon: Star,
      text: "25+ Jahre Erfahrung",
      color: "text-yellow-600 fill-current"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex flex-wrap justify-center items-center gap-8 mb-16 text-sm text-gray-600"
    >
      {badges.map((badge, index) => {
        const IconComponent = badge.icon;
        return (
          <div key={index} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
            <IconComponent size={18} className={badge.color} />
            <span className="font-semibold">{badge.text}</span>
          </div>
        );
      })}
    </motion.div>
  );
};

export default TrustBadges;
