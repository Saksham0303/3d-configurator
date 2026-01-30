'use client';

import { useConfiguratorStore, MetalType } from '@/lib/store';
import { cn } from '@/lib/utils';

const metals: { value: MetalType; label: string; color: string }[] = [
  { value: 'gold', label: 'Yellow Gold', color: '#FFD700' },
  { value: 'white-gold', label: 'White Gold', color: '#E5E5E5' },
  { value: 'rose-gold', label: 'Rose Gold', color: '#ECC5C0' },
  { value: 'platinum', label: 'Platinum', color: '#E5E4E2' },
];

export function MetalTypeStep() {
  const { metal, setMetal, setStep } = useConfiguratorStore();

  const handleSelect = (metalType: MetalType) => {
    setMetal(metalType);
    setTimeout(() => setStep(4), 300);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-light mb-2">Choose Your Metal</h2>
        <p className="text-neutral-600">Select the perfect finish</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {metals.map((m) => (
          <button
            key={m.value}
            onClick={() => handleSelect(m.value)}
            className={cn(
              'p-6 border-2 rounded-lg transition-all hover:border-neutral-900 hover:shadow-lg',
              metal === m.value
                ? 'border-neutral-900 bg-neutral-50'
                : 'border-neutral-200'
            )}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 shadow-inner"
              style={{ backgroundColor: m.color }}
            />
            <h3 className="text-lg font-medium">{m.label}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}
