
import React from 'react';
import { Shield, Leaf, Zap, Award } from 'lucide-react';

interface ProductInfoProps {
  productKey: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productKey }) => {
  const productDetails = {
    standard: {
      title: 'Gasolio Standard',
      description: 'Il nostro gasolio standard di alta qualità conforme alle normative EN 590',
      features: [
        {
          icon: Shield,
          title: 'Certificato EN 590',
          description: 'Conforme a tutti gli standard europei di qualità'
        },
        {
          icon: Award,
          title: 'Qualità Garantita',
          description: 'Testato e verificato per prestazioni ottimali'
        },
        {
          icon: Zap,
          title: 'Efficienza Energetica',
          description: 'Combustione pulita ed efficiente'
        }
      ],
      specs: [
        'Densità: 0,82-0,86 kg/l',
        'Punto di infiammabilità: >55°C',
        'Contenuto di zolfo: <10 mg/kg'
      ]
    },
    premium: {
      title: 'Gasolio Premium',
      description: 'Gasolio premium con additivi speciali per massime prestazioni e protezione',
      features: [
        {
          icon: Leaf,
          title: 'Additivi Premium',
          description: 'Con additivi anti-corrosione e stabilizzanti'
        },
        {
          icon: Shield,
          title: 'Protezione Motore',
          description: 'Formula avanzata per proteggere il sistema di riscaldamento'
        },
        {
          icon: Zap,
          title: 'Prestazioni Superiori',
          description: 'Combustione ottimizzata e maggiore durata'
        }
      ],
      specs: [
        'Densità: 0,82-0,86 kg/l',
        'Punto di infiammabilità: >55°C',
        'Contenuto di zolfo: <10 mg/kg',
        'Additivi antiossidanti inclusi'
      ]
    }
  };

  const product = productDetails[productKey as keyof typeof productDetails];

  if (!product) {
    return <div>Informazioni prodotto non disponibili</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-bold text-lg text-gray-900 mb-2">{product.title}</h4>
        <p className="text-sm text-gray-600">{product.description}</p>
      </div>

      <div className="space-y-3">
        <h5 className="font-semibold text-gray-800">Caratteristiche principali:</h5>
        {product.features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="bg-green-100 p-1.5 rounded-lg mt-0.5">
              <feature.icon className="h-3 w-3 text-green-600" />
            </div>
            <div>
              <div className="font-medium text-sm text-gray-900">{feature.title}</div>
              <div className="text-xs text-gray-600">{feature.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-3">
        <h5 className="font-semibold text-gray-800 mb-2">Specifiche tecniche:</h5>
        <ul className="text-xs text-gray-600 space-y-1">
          {product.specs.map((spec, index) => (
            <li key={index} className="flex items-center">
              <div className="w-1 h-1 bg-green-600 rounded-full mr-2"></div>
              {spec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
