'use client';

import { useConfiguratorStore, DiamondShape } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Diamond, Square, Circle } from 'lucide-react';

const shapes: { value: DiamondShape; label: string; icon: any }[] = [
  { value: 'round', label: 'Round', icon: Circle },
  { value: 'princess', label: 'Princess', icon: Square },
  { value: 'oval', label: 'Oval', icon: Diamond },
];

export function DiamondShapeStep() {
  const { diamondShape, setDiamondShape, setStep } = useConfiguratorStore();

  const handleSelect = (shape: DiamondShape) => {
    setDiamondShape(shape);
    setTimeout(() => setStep(2), 300);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-light mb-2">Choose Your Diamond Shape</h2>
        <p className="text-neutral-600">Select the cut that speaks to you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {shapes.map((shape) => {
          const Icon = shape.icon;
          return (
            <button
              key={shape.value}
              onClick={() => handleSelect(shape.value)}
              className={cn(
                'p-8 border-2 rounded-lg transition-all hover:border-neutral-900 hover:shadow-lg',
                diamondShape === shape.value
                  ? 'border-neutral-900 bg-neutral-50'
                  : 'border-neutral-200'
              )}
            >
              <Icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">{shape.label}</h3>
              <p className="text-sm text-neutral-600">
                {shape.value === 'round' && 'Classic and timeless'}
                {shape.value === 'princess' && 'Modern and geometric'}
                {shape.value === 'oval' && 'Elegant and elongated'}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
