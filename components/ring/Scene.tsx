'use client';

import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Ring } from './Ring';

export function Scene() {
  const [isMobile, setIsMobile] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);

    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  const cameraPosition = useMemo<[number, number, number]>(
    () => (isMobile ? [2.15, 1.4, 3.95] : [2.5, 1.8, 3.5]),
    [isMobile]
  );

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{
          position: cameraPosition,
          fov: isMobile ? 34 : 35,
          near: 0.1,
          far: 1000,
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#f5f5f5']} />

        <Suspense fallback={null}>
          <ambientLight intensity={isMobile ? 0.5 : 0.42} />

          <directionalLight
            position={[0, 8, 1.2]}
            intensity={isMobile ? 0.95 : 1.15}
          />

          <directionalLight position={[-4, 4, -3]} intensity={isMobile ? 0.28 : 0.38} />
          <directionalLight position={[2, 3, -4]} intensity={isMobile ? 0.16 : 0.24} />

          <spotLight
            position={[0, 8, 0]}
            intensity={isMobile ? 0.35 : 0.45}
            angle={0.55}
            penumbra={1}
          />

          <group scale={isMobile ? 1 : 1}>
            <Ring />
          </group>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={isMobile ? 3.2 : 3}
            maxDistance={isMobile ? 4.8 : 8}
            maxPolarAngle={isMobile ? Math.PI / 1.9 : Math.PI / 2}
            minPolarAngle={isMobile ? Math.PI / 8 : Math.PI / 12}
            rotateSpeed={isMobile ? 0.75 : 1}
            zoomSpeed={isMobile ? 0.85 : 1}
            autoRotate={!isInteracting}
            autoRotateSpeed={isMobile ? 0.65 : 0.5}
            target={isMobile ? [0, 0.25, 0] : [0, 0.55, 0]}
            onStart={() => setIsInteracting(true)}
            onEnd={() => setIsInteracting(false)}
          />

          <Environment preset="studio" />

          <ContactShadows
            position={[0, -0.82, 0]}
            opacity={isMobile ? 0.6 : 0.72}
            scale={5.2}
            blur={isMobile ? 1.6 : 1.35}
            far={1.8}
            resolution={isMobile ? 1024 : 2048}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
