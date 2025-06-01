
import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface CheckoutStepsProps {
  steps: Step[];
  currentStep: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ steps, currentStep }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center space-x-3">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${currentStep > step.id 
                    ? 'bg-green-600 text-white' 
                    : currentStep === step.id 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}
              >
                {currentStep > step.id ? (
                  <Check size={16} />
                ) : (
                  step.id
                )}
              </div>
              <div className="hidden md:block">
                <div
                  className={`
                    font-medium text-sm
                    ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'}
                  `}
                >
                  {step.title}
                </div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-px mx-4
                  ${currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'}
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;
