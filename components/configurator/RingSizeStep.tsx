'use client';

import { useConfiguratorStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const sizes = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

export function RingSizeStep() {
  const { ringSize, setRingSize } = useConfiguratorStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-light sm:text-3xl">Select Your Ring Size</h2>
        <p className="text-sm text-neutral-600 sm:text-base">Choose your perfect fit</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setRingSize(size)}
              aria-pressed={ringSize === size}
              aria-label={`Ring size ${size}`}
              data-active={ringSize === size}
              className={cn(
                'auto-shine shine-card rounded-lg border-2 p-3 transition-all hover:-translate-y-0.5 hover:border-neutral-900 sm:p-4',
                ringSize === size
                  ? 'border-neutral-900 bg-neutral-50'
                  : 'border-neutral-200'
              )}
            >
              <span className="text-base font-medium sm:text-lg">{size}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-lg bg-neutral-50 p-4 sm:mt-8 sm:p-6">
          <h3 className="font-medium mb-2">Need help finding your size?</h3>
          <p className="text-sm text-neutral-600">
            Visit a local jeweler for professional sizing, or order a ring sizer online.
            Most engagement rings are between size 5 and 8.
          </p>
        </div>
      </div>
    </div>
  );
}
