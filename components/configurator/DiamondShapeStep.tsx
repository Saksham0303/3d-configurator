'use client';

import { Diamond, Square, Circle } from 'lucide-react';
import { DIAMOND_SHAPE_OPTIONS } from '@/lib/configurator';
import { useConfiguratorStore, DiamondShape } from '@/lib/store';
import { cn } from '@/lib/utils';

const shapeIcons: Record<DiamondShape, typeof Circle> = {
  round: Circle,
  princess: Square,
  oval: Diamond,
};

export function DiamondShapeStep() {
  const { diamondShape, setDiamondShape, setStep } = useConfiguratorStore();

  const handleSelect = (shape: DiamondShape) => {
    setDiamondShape(shape);
    setTimeout(() => setStep(2), 300);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-light sm:text-3xl">Choose Your Diamond Shape</h2>
        <p className="text-sm text-neutral-600 sm:text-base">Select the cut that speaks to you</p>
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {DIAMOND_SHAPE_OPTIONS.map((shape) => {
          const Icon = shapeIcons[shape.value];
          return (
            <button
              key={shape.value}
              onClick={() => handleSelect(shape.value)}
              aria-pressed={diamondShape === shape.value}
              aria-label={`${shape.label} diamond shape`}
              data-active={diamondShape === shape.value}
              className={cn(
                'auto-shine shine-card rounded-lg border-2 p-6 transition-all hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-lg sm:p-8',
                diamondShape === shape.value
                  ? 'border-neutral-900 bg-neutral-50'
                  : 'border-neutral-200'
              )}
            >
              <Icon className="mx-auto mb-4 h-10 w-10 sm:h-12 sm:w-12" />
              <h3 className="mb-2 text-lg font-medium sm:text-xl">{shape.label}</h3>
              <p className="text-sm text-neutral-600">{shape.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
