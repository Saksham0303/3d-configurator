'use client';

import { useConfiguratorStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const steps = [
  { number: 1, title: 'Diamond Shape' },
  { number: 2, title: 'Band Style' },
  { number: 3, title: 'Metal Type' },
  { number: 4, title: 'Ring Size' },
];

export function StepIndicator() {
  const { step, setStep } = useConfiguratorStore();

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((s, index) => (
          <div key={s.number} className="flex items-center flex-1">
            <button
              onClick={() => setStep(s.number)}
              className="flex flex-col items-center group"
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all',
                  step >= s.number
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-200 text-neutral-400'
                )}
              >
                {s.number}
              </div>
              <span
                className={cn(
                  'text-xs mt-2 transition-colors',
                  step >= s.number ? 'text-neutral-900' : 'text-neutral-400'
                )}
              >
                {s.title}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-4 transition-colors',
                  step > s.number ? 'bg-neutral-900' : 'bg-neutral-200'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
