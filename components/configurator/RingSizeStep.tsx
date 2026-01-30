'use client';

import { useConfiguratorStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const sizes = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

export function RingSizeStep() {
  const { ringSize, setRingSize } = useConfiguratorStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-light mb-2">Select Your Ring Size</h2>
        <p className="text-neutral-600">Choose your perfect fit</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setRingSize(size)}
              className={cn(
                'p-4 border-2 rounded-lg transition-all hover:border-neutral-900',
                ringSize === size
                  ? 'border-neutral-900 bg-neutral-50'
                  : 'border-neutral-200'
              )}
            >
              <span className="text-lg font-medium">{size}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 p-6 bg-neutral-50 rounded-lg">
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
