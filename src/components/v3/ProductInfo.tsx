
import React from 'react';
import { CheckCircle, Award, Shield } from 'lucide-react';

interface ProductInfoProps {
  productKey: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ productKey }) => {
  if (productKey === 'standard') {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-violet-800 mb-2">Standard EL Heizöl</h3>
          <p className="text-gray-600 text-sm mb-3">
            Bewährte Qualität nach ÖNORM - unser zuverlässiges Standardprodukt für alle österreichischen Haushalte.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-700">Schwefelarm (max. 50 mg/kg)</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-700">ÖNORM C 1109 zertifiziert</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-700">Optimal für alle Brennertypen</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-700">Hoher Heizwert (ca. 10 kWh/l)</span>
          </div>
        </div>

        <div className="bg-violet-50 p-3 rounded-lg">
          <h4 className="font-semibold text-violet-800 mb-2 text-sm">Technische Daten</h4>
          <div className="text-xs text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span>Schwefelgehalt:</span>
              <span>max. 50 mg/kg</span>
            </div>
            <div className="flex justify-between">
              <span>Flammpunkt:</span>
              <span>min. 55°C</span>
            </div>
            <div className="flex justify-between">
              <span>Dichte bei 15°C:</span>
              <span>0,820-0,860 kg/l</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold text-amber-700 mb-2">Premium EL Heizöl</h3>
        <p className="text-gray-600 text-sm mb-3">
          Mit speziellen Additiven für optimale Leistung und verlängerte Lagerfähigkeit.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-700">Alle Eigenschaften von Standard EL</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-700">Antioxidantien für längere Lagerfähigkeit</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-700">Metallinaktivatoren gegen Korrosion</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-700">Verbesserte Fließeigenschaften</span>
        </div>
      </div>

      <div className="bg-amber-50 p-3 rounded-lg">
        <h4 className="font-semibold text-amber-700 mb-2 text-sm">Zusätzliche Vorteile</h4>
        <div className="text-xs text-gray-700 space-y-1">
          <div>• Verlängerte Lagerfähigkeit bis zu 2 Jahre</div>
          <div>• Reduzierte Ablagerungen im Tank</div>
          <div>• Optimierter Verbrennungsprozess</div>
          <div>• Schutz vor Mikroorganismen</div>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-xs text-amber-600 bg-amber-100 p-2 rounded">
        <Award className="h-3 w-3" />
        <span className="font-medium">Premium-Qualität mit Additiven</span>
      </div>
    </div>
  );
};

export default ProductInfo;
