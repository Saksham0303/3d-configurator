import { useMemo, useRef } from 'react';
import { Mesh } from 'three';
import { DiamondShape } from '@/lib/store';

interface DiamondProps {
  shape: DiamondShape;
  position: [number, number, number];
}

export function Diamond({ shape, position }: DiamondProps) {
  const meshRef = useRef<Mesh>(null);

  const geometry = useMemo(() => {
    switch (shape) {
      case 'round':
        return <sphereGeometry args={[0.15, 32, 32]} />;
      case 'princess':
        return <boxGeometry args={[0.22, 0.22, 0.22]} />;
      case 'oval':
        return <sphereGeometry args={[0.15, 48, 48]} />;
      default:
        return <sphereGeometry args={[0.15, 32, 32]} />;
    }
  }, [shape]);

  const scale: [number, number, number] =
    shape === 'oval' ? [1.4, 0.95, 1] : [1, 1, 1];

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={[0, 0, shape === 'princess' ? Math.PI / 4 : 0]}
    >
      {geometry}
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0}
        roughness={0.05}
        transmission={0.95}
        thickness={0.5}
        clearcoat={1}
        clearcoatRoughness={0}
        ior={2.42}
        envMapIntensity={1}
        transparent
      />
    </mesh>
  );
}
