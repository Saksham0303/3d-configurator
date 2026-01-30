'use client';

import { useConfiguratorStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export function Summary() {
  const { diamondShape, bandStyle, metal, ringSize, reset } = useConfiguratorStore();
  const [saving, setSaving] = useState(false);

  const metalLabels = {
    'gold': 'Yellow Gold',
    'white-gold': 'White Gold',
    'rose-gold': 'Rose Gold',
    'platinum': 'Platinum',
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast.success('Your ring design has been saved!');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-light mb-2">Your Custom Ring</h2>
        <p className="text-neutral-600">Review your selections</p>
      </div>

      <div className="max-w-md mx-auto bg-white border border-neutral-200 rounded-lg p-8 space-y-4">
        <div className="flex justify-between py-3 border-b border-neutral-100">
          <span className="text-neutral-600">Diamond Shape</span>
          <span className="font-medium capitalize">{diamondShape}</span>
        </div>
        <div className="flex justify-between py-3 border-b border-neutral-100">
          <span className="text-neutral-600">Band Style</span>
          <span className="font-medium capitalize">{bandStyle}</span>
        </div>
        <div className="flex justify-between py-3 border-b border-neutral-100">
          <span className="text-neutral-600">Metal</span>
          <span className="font-medium">{metalLabels[metal]}</span>
        </div>
        <div className="flex justify-between py-3">
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
