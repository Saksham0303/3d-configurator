'use client';

import { METAL_OPTIONS } from '@/lib/configurator';
import { useConfiguratorStore, MetalType } from '@/lib/store';
import { cn } from '@/lib/utils';

export function MetalTypeStep() {
  const { metal, setMetal, setStep } = useConfiguratorStore();

  const handleSelect = (metalType: MetalType) => {
    setMetal(metalType);
    setTimeout(() => setStep(4), 300);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-light sm:text-3xl">Choose Your Metal</h2>
        <p className="text-sm text-neutral-600 sm:text-base">Select the perfect finish</p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {METAL_OPTIONS.map((m) => (
          <button
            key={m.value}
            onClick={() => handleSelect(m.value)}
            aria-pressed={metal === m.value}
            aria-label={`${m.label} metal`}
            data-active={metal === m.value}
            className={cn(
              'auto-shine shine-card rounded-lg border-2 p-5 transition-all hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-lg sm:p-6',
              metal === m.value
                ? 'border-neutral-900 bg-neutral-50'
                : 'border-neutral-200'
            )}
          >
            <div
              className="mx-auto mb-4 h-14 w-14 rounded-full shadow-inner sm:h-16 sm:w-16"
              style={{ backgroundColor: m.color }}
            />
            <h3 className="text-base font-medium sm:text-lg">{m.label}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}
