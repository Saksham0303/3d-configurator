'use client';

import { estimateRingPrice, formatPrice, METAL_LABELS } from '@/lib/configurator';
import { useConfiguratorStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export function Summary() {
  const { diamondShape, bandStyle, metal, ringSize, reset } = useConfiguratorStore();
  const [saving, setSaving] = useState(false);
  const estimatedPrice = useMemo(
    () => estimateRingPrice({ diamondShape, bandStyle, metal, ringSize }),
    [diamondShape, bandStyle, metal, ringSize]
  );

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast.success('Your ring design has been saved!');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-light sm:text-3xl">Your Custom Ring</h2>
        <p className="text-sm text-neutral-600 sm:text-base">Review your selections</p>
      </div>

      <div className="shine-card mx-auto max-w-md space-y-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="shine-card rounded-xl bg-neutral-950 px-4 py-4 text-white">
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-300">Estimated Price</p>
          <p className="mt-2 text-3xl font-light">{formatPrice(estimatedPrice)}</p>
          <p className="mt-2 text-sm text-neutral-300">
            Final pricing may vary slightly based on stone grading and finishing.
          </p>
        </div>

        <div className="flex items-start justify-between gap-4 border-b border-neutral-100 py-3 text-sm sm:text-base">
          <span className="text-neutral-600">Diamond Shape</span>
          <span className="font-medium capitalize">{diamondShape}</span>
        </div>
        <div className="flex items-start justify-between gap-4 border-b border-neutral-100 py-3 text-sm sm:text-base">
          <span className="text-neutral-600">Band Style</span>
          <span className="font-medium capitalize">{bandStyle}</span>
        </div>
        <div className="flex items-start justify-between gap-4 border-b border-neutral-100 py-3 text-sm sm:text-base">
          <span className="text-neutral-600">Metal</span>
          <span className="font-medium">{METAL_LABELS[metal]}</span>
        </div>
        <div className="flex items-start justify-between gap-4 py-3 text-sm sm:text-base">
          <span className="text-neutral-600">Ring Size</span>
          <span className="font-medium">{ringSize}</span>
        </div>

        <div className="pt-6 space-y-3">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full h-12 text-lg"
          >
            {saving ? 'Saving...' : 'Save Design'}
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className="w-full h-12"
          >
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
}
