'use client';

import { useConfiguratorStore } from '@/lib/store';
import { StepIndicator } from './StepIndicator';
import { DiamondShapeStep } from './DiamondShapeStep';
import { BandStyleStep } from './BandStyleStep';
import { MetalTypeStep } from './MetalTypeStep';
import { RingSizeStep } from './RingSizeStep';
import { Summary } from './Summary';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ConfiguratorPanel() {
  const { step, setStep } = useConfiguratorStore();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <DiamondShapeStep />;
      case 2:
        return <BandStyleStep />;
      case 3:
        return <MetalTypeStep />;
      case 4:
        return <RingSizeStep />;
      default:
        return <Summary />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-8 border-b border-neutral-200">
        <StepIndicator />
      </div>

      <div className="flex-1 overflow-y-auto p-8">{renderStep()}</div>

      <div className="p-6 border-t border-neutral-200 flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={() => setStep(Math.min(5, step + 1))}
          disabled={step === 5}
        >
          {step === 4 ? 'Review' : 'Next'}
          {step < 4 && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
