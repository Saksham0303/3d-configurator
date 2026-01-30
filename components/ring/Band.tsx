import { useRef, useMemo } from 'react';
import { Mesh } from 'three';
import { BandStyle, MetalType } from '@/lib/store';

interface BandProps {
  style: BandStyle;
  metal: MetalType;
  ringSize: number;
}

const metalColors = {
  'gold': '#FFD700',
  'white-gold': '#F5F5F5',
  'rose-gold': '#ECC5C0',
  'platinum': '#E8E8E8',
};

const metalProperties = {
  'gold': { metalness: 0.98, roughness: 0.15 },
  'white-gold': { metalness: 0.95, roughness: 0.2 },
  'rose-gold': { metalness: 0.96, roughness: 0.18 },
  'platinum': { metalness: 0.97, roughness: 0.22 },
};

export function Band({ style, metal, ringSize }: BandProps) {
  const meshRef = useRef<Mesh>(null);

  const { radius, tubeRadius } = useMemo(() => {
    const baseRadius = 0.8 + (ringSize - 7) * 0.05;
    let tubeRadius = 0.1;

    switch (style) {
      case 'thin':
        tubeRadius = 0.07;
        break;
      case 'wide':
        tubeRadius = 0.13;
        break;
      default:
        tubeRadius = 0.1;
    }

    return { radius: baseRadius, tubeRadius };
  }, [style, ringSize]);

  const properties = metalProperties[metal];

  return (
    <group>
      {/* Main band - NO rotation, stands upright naturally */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusGeometry args={[radius, tubeRadius, 64, 128]} />
        <meshStandardMaterial
          color={metalColors[metal]}
          metalness={properties.metalness}
          roughness={properties.roughness}
          envMapIntensity={2}
        />
      </mesh>

      {/* Inner edge highlight for realism */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[radius, tubeRadius * 0.98, 64, 128]} />
        <meshStandardMaterial
          color={metalColors[metal]}
          metalness={properties.metalness}
          roughness={properties.roughness * 0.8}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Outer subtle edge */}
      <mesh receiveShadow>
        <torusGeometry args={[radius, tubeRadius * 1.02, 64, 128]} />
        <meshStandardMaterial
          color={metalColors[metal]}
          metalness={properties.metalness}
          roughness={properties.roughness * 1.2}
          envMapIntensity={1.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}