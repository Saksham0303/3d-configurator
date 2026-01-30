import { useRef, useMemo } from 'react';
import { Mesh } from 'three';
import { MetalType, BandStyle } from '@/lib/store';

interface HeadProps {
  metal: MetalType;
  bandStyle: BandStyle;
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

export function Head({ metal, bandStyle, ringSize }: HeadProps) {
  const cylinderRef = useRef<Mesh>(null);
  const torusRef = useRef<Mesh>(null);
  const prongs = useRef<Mesh[]>([]);

  const baseRadius = useMemo(() => {
    return 0.8 + (ringSize - 7) * 0.05;
  }, [ringSize]);

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

  const headYPosition = tubeRadius * 1.5;
  const properties = metalProperties[metal];

  return (
    <group position={[0, headYPosition, 0]}>
      {/* Base cylinder - wider at bottom for stability */}
      <mesh ref={cylinderRef} castShadow receiveShadow>
        <cylinderGeometry args={[0.11, 0.16, 0.18, 32]} />
        <meshStandardMaterial
          color={metalColors[metal]}
          metalness={properties.metalness}
          roughness={properties.roughness}
          envMapIntensity={2}
        />
      </mesh>

      {/* Middle reinforcement ring */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.14, 0.025, 16, 32]} />
        <meshStandardMaterial
          color={metalColors[metal]}
          metalness={properties.metalness}
          roughness={properties.roughness}
          envMapIntensity={2}
        />
      </mesh>

      {/* Top gallery ring */}
      <mesh position={[0, 0.12, 0]} ref={torusRef} castShadow receiveShadow>
        <torusGeometry args={[0.17, 0.022, 16, 32]} />
        <meshStandardMaterial
          color={metalColors[metal]}
          metalness={properties.metalness}
          roughness={properties.roughness}
          envMapIntensity={2}
        />
      </mesh>

      {/* Four prongs - positioned at 45-degree angles for classic look */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * Math.PI) / 2 + Math.PI / 4; // Offset by 45 degrees
        const x = Math.cos(angle) * 0.165;
        const z = Math.sin(angle) * 0.165;
        return (
          <group key={i}>
            {/* Main prong */}
            <mesh
              ref={(el) => {
                if (el) prongs.current[i] = el;
              }}
              position={[x, 0.12, z]}
              castShadow
            >
              <cylinderGeometry args={[0.018, 0.025, 0.28, 12]} />
              <meshStandardMaterial
                color={metalColors[metal]}
                metalness={properties.metalness}
                roughness={properties.roughness}
                envMapIntensity={2}
              />
            </mesh>

            {/* Prong tip (claw) */}
            <mesh position={[x * 0.95, 0.26, z * 0.95]} castShadow>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshStandardMaterial
                color={metalColors[metal]}
                metalness={properties.metalness}
                roughness={properties.roughness * 0.9}
                envMapIntensity={2}
              />
            </mesh>
          </group>
        );
      })}

      {/* Center post for diamond support */}
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.035, 0.045, 0.08, 16]} />
        <meshStandardMaterial
          color={metalColors[metal]}
          metalness={properties.metalness}
          roughness={properties.roughness}
          envMapIntensity={2}
        />
      </mesh>

      {/* Decorative beading on base */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i * Math.PI * 2) / 8;
        const x = Math.cos(angle) * 0.145;
        const z = Math.sin(angle) * 0.145;
        return (
          <mesh key={`bead-${i}`} position={[x, -0.02, z]} castShadow>
            <sphereGeometry args={[0.012, 12, 12]} />
            <meshStandardMaterial
              color={metalColors[metal]}
              metalness={properties.metalness}
              roughness={properties.roughness * 0.8}
              envMapIntensity={2.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}