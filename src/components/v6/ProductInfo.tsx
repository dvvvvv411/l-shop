
import React from 'react';
import { Shield, Leaf, Zap, Award } from 'lucide-react';

interface ProductInfoProps {
  productKey: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productKey }) => {
  const productDetails = {
    standard: {
      title: 'Standard Heating Oil',
      description: 'Our premium standard heating oil compliant with EN 590 regulations',
      features: [
        {
          icon: Shield,
          title: 'EN 590 Certified',
          description: 'Meets all European quality standards'
        },
        {
          icon: Award,
          title: 'Quality Guaranteed',
          description: 'Tested and verified for optimal performance'
        },
        {
          icon: Zap,
          title: 'Energy Efficient',
          description: 'Clean and efficient combustion'
        }
      ],
      specs: [
        'Density: 0.82-0.86 kg/l',
        'Flash point: >55°C',
        'Sulphur content: <10 mg/kg'
      ]
    },
    premium: {
      title: 'Premium Heating Oil',
      description: 'Premium heating oil with special additives for maximum performance and protection',
      features: [
        {
          icon: Leaf,
          title: 'Premium Additives',
          description: 'With anti-corrosion and stabilizing additives'
        },
        {
          icon: Shield,
          title: 'Engine Protection',
          description: 'Advanced formula to protect heating systems'
        },
        {
          icon: Zap,
          title: 'Superior Performance',
          description: 'Optimized combustion and extended lifespan'
        }
      ],
      specs: [
        'Density: 0.82-0.86 kg/l',
        'Flash point: >55°C',
        'Sulphur content: <10 mg/kg',
        'Antioxidant additives included'
      ]
    }
  };

  const product = productDetails[productKey as keyof typeof productDetails];

  if (!product) {
    return <div>Product information not available</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-bold text-lg text-gray-900 mb-2">{product.title}</h4>
        <p className="text-sm text-gray-600">{product.description}</p>
      </div>

      <div className="space-y-3">
        <h5 className="font-semibold text-gray-800">Key Features:</h5>
        {product.features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="bg-amber-100 p-1.5 rounded-lg mt-0.5">
              <feature.icon className="h-3 w-3 text-amber-600" />
            </div>
            <div>
              <div className="font-medium text-sm text-gray-900">{feature.title}</div>
              <div className="text-xs text-gray-600">{feature.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-3">
        <h5 className="font-semibold text-gray-800 mb-2">Technical Specifications:</h5>
        <ul className="text-xs text-gray-600 space-y-1">
          {product.specs.map((spec, index) => (
            <li key={index} className="flex items-center">
              <div className="w-1 h-1 bg-amber-600 rounded-full mr-2"></div>
              {spec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
