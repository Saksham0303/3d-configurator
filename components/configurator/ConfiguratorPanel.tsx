'use client';

import { useEffect, useRef } from 'react';
import { useConfiguratorStore } from '@/lib/store';
import { StepIndicator } from './StepIndicator';
import { DiamondShapeStep } from './DiamondShapeStep';
import { BandStyleStep } from './BandStyleStep';
import { MetalTypeStep } from './MetalTypeStep';
import { RingSizeStep } from './RingSizeStep';
import { Summary } from './Summary';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CONFIGURATOR_STEPS } from '@/lib/configurator';

export function ConfiguratorPanel() {
  const { step, setStep } = useConfiguratorStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const currentStepLabel = CONFIGURATOR_STEPS[Math.min(step, CONFIGURATOR_STEPS.length) - 1]?.title;

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

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
      <div className="border-b border-neutral-200 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
              Step {step} of {CONFIGURATOR_STEPS.length}
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-800">{currentStepLabel}</p>
          </div>
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-neutral-100 sm:w-32">
            <div
              className="h-full rounded-full bg-neutral-900 transition-all duration-500"
              style={{ width: `${(step / CONFIGURATOR_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          Step {step} of {CONFIGURATOR_STEPS.length}. {currentStepLabel}.
        </p>
        <StepIndicator />
      </div>

      <div ref={contentRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
        {renderStep()}
      </div>

      <div className="border-t border-neutral-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="w-full sm:w-auto"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={() => setStep(Math.min(5, step + 1))}
            disabled={step === 5}
            className="w-full sm:w-auto"
          >
            {step === 4 ? 'Review' : 'Next'}
            {step < 4 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
