'use client';

import { useConfiguratorStore, BandStyle } from '@/lib/store';
import { cn } from '@/lib/utils';

const styles: { value: BandStyle; label: string; description: string }[] = [
  { value: 'thin', label: 'Thin', description: 'Delicate and refined' },
  { value: 'classic', label: 'Classic', description: 'Timeless elegance' },
  { value: 'wide', label: 'Wide', description: 'Bold and modern' },
];

export function BandStyleStep() {
  const { bandStyle, setBandStyle, setStep } = useConfiguratorStore();

  const handleSelect = (style: BandStyle) => {
    setBandStyle(style);
    setTimeout(() => setStep(3), 300);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-light mb-2">Select Your Band Style</h2>
        <p className="text-neutral-600">Choose the perfect width</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {styles.map((style) => (
          <button
            key={style.value}
            onClick={() => handleSelect(style.value)}
            className={cn(
              'p-8 border-2 rounded-lg transition-all hover:border-neutral-900 hover:shadow-lg',
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
            <h3 className="text-xl font-medium mb-2">{style.label}</h3>
            <p className="text-sm text-neutral-600">{style.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
