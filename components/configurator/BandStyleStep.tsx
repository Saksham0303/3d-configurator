'use client';

import { BAND_STYLE_OPTIONS } from '@/lib/configurator';
import { useConfiguratorStore, BandStyle } from '@/lib/store';
import { cn } from '@/lib/utils';

export function BandStyleStep() {
  const { bandStyle, setBandStyle, setStep } = useConfiguratorStore();

  const handleSelect = (style: BandStyle) => {
    setBandStyle(style);
    setTimeout(() => setStep(3), 300);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-light sm:text-3xl">Select Your Band Style</h2>
        <p className="text-sm text-neutral-600 sm:text-base">Choose the perfect width</p>
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {BAND_STYLE_OPTIONS.map((style) => (
          <button
            key={style.value}
            onClick={() => handleSelect(style.value)}
            aria-pressed={bandStyle === style.value}
            aria-label={`${style.label} band style`}
            data-active={bandStyle === style.value}
            className={cn(
              'auto-shine shine-card rounded-lg border-2 p-6 transition-all hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-lg sm:p-8',
              bandStyle === style.value
                ? 'border-neutral-900 bg-neutral-50'
                : 'border-neutral-200'
            )}
          >
            <div className="mb-4 flex justify-center">
              <div
                className={cn(
                  'bg-neutral-900 rounded',
                  style.value === 'thin' && 'h-1 w-24',
                  style.value === 'classic' && 'h-2 w-24',
                  style.value === 'wide' && 'h-3 w-24'
                )}
              />
            </div>
            <h3 className="mb-2 text-lg font-medium sm:text-xl">{style.label}</h3>
            <p className="text-sm text-neutral-600">{style.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
