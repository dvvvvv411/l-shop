
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator = ({ currentStep }: ProgressIndicatorProps) => {
  const steps = [
    { id: 1, title: 'Produktauswahl', description: 'Heizöl konfigurieren' },
    { id: 2, title: 'Bestellung', description: 'Adresse & Zahlung' },
    { id: 3, title: 'Bestätigung', description: 'Bestellung abschließen' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200 z-0">
          <motion.div
            className="h-full bg-red-600"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isCompleted
                    ? 'bg-red-600 border-red-600 text-white'
                    : isCurrent
                    ? 'bg-white border-red-600 text-red-600'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
                whileHover={{ scale: 1.05 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: step.id * 0.1 }}
              >
                {isCompleted ? (
                  <Check size={20} />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </motion.div>
              
              <div className="mt-3 text-center">
                <div className={`font-medium text-sm ${
                  isCurrent || isCompleted ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </div>
                <div className={`text-xs mt-1 ${
                  isCurrent || isCompleted ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
