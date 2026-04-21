'use client';

import { useConfiguratorStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { CONFIGURATOR_STEPS } from '@/lib/configurator';

export function StepIndicator() {
  const { step, setStep } = useConfiguratorStore();
  const visibleSteps = CONFIGURATOR_STEPS.slice(0, 4);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-max items-start gap-3 sm:gap-4">
          {visibleSteps.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <button
                onClick={() => setStep(s.number)}
                className="group flex w-20 flex-shrink-0 flex-col items-center rounded-xl px-2 py-1 text-center sm:w-24"
                aria-current={step === s.number ? 'step' : undefined}
                aria-label={`Go to step ${s.number}: ${s.title}`}
              >
                <div
                  className={cn(
                    'auto-shine shine-card flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all sm:h-10 sm:w-10',
                    step >= s.number
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-200 text-neutral-400'
                  )}
                >
                  {s.number}
                </div>
                <span
                  className={cn(
                    'mt-2 text-[11px] leading-tight transition-colors sm:text-xs',
                    step >= s.number ? 'text-neutral-900' : 'text-neutral-400'
                  )}
                >
                  {s.title}
                </span>
              </button>
              {index < visibleSteps.length - 1 && (
                <div
                  className={cn(
                    'shine-card relative h-0.5 w-8 overflow-hidden transition-colors sm:w-12',
                    step > s.number ? 'bg-neutral-900' : 'bg-neutral-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
