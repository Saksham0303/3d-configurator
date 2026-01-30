'use client';

import { Band } from './Band';
import { Head } from './Head';
import { Diamond } from './Diamond';
import { useConfiguratorStore } from '@/lib/store';
import { useMemo } from 'react';

export function Ring() {
  const { diamondShape, bandStyle, metal, ringSize } = useConfiguratorStore();

  const tubeRadius = useMemo(() => {
    switch (bandStyle) {
      case 'thin':
        return 0.07;
      case 'wide':
        return 0.13;
      default:
        return 0.1;
    }
  }, [bandStyle]);

  const baseRadius = useMemo(() => {
    return 0.8 + (ringSize - 7) * 0.05;
  }, [ringSize]);

  // Head sits ON the band at top, not floating above
  const headYPosition = 0;

  // Diamond sits above the head
  const diamondPosition: [number, number, number] = useMemo(() => {
    return [0, baseRadius + 0.45, 0];
  }, [baseRadius]);

  return (
    <group>
      <Band style={bandStyle} metal={metal} ringSize={ringSize} />
      
      {/* Head positioned at top of ring - on the band itself */}
      <group position={[0, baseRadius, 0]}>
        <Head metal={metal} bandStyle={bandStyle} ringSize={ringSize} />
      </group>
      
      <Diamond shape={diamondShape} position={diamondPosition} />
    </group>
  );
}