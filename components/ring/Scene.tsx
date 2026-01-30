'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Ring } from './Ring';
import { Suspense } from 'react';

export function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ 
          position: [2.5, 1.8, 3.5], // Side angle for better ring view
          fov: 35,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true
        }}
      >
        <color attach="background" args={['#f5f5f5']} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          
          {/* Main directional light - from top-front for natural shadow below */}
          <directionalLight
            position={[3, 10, 6]}
            intensity={2}
            castShadow
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={6}
            shadow-camera-bottom={-3}
            shadow-camera-near={1}
            shadow-camera-far={30}
            shadow-bias={-0.0001}
          />
          
          {/* Fill lights */}
          <directionalLight position={[-4, 4, -3]} intensity={0.5} />
          <directionalLight position={[2, 3, -4]} intensity={0.3} />
          
          {/* Soft top light - no shadow casting */}
          <spotLight
            position={[0, 8, 0]}
            intensity={0.5}
            angle={0.6}
            penumbra={1}
          />

          {/* Ring is now standing upright - no rotation needed */}
          <Ring />

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={8}
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={Math.PI / 12}
            autoRotate
            autoRotateSpeed={0.5}
            target={[0, 0.5, 0]}
          />

          <Environment preset="studio" />

          {/* Ground plane with shadow - positioned properly below ring */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.8, 0]}
            receiveShadow
          >
            <planeGeometry args={[30, 30]} />
            <shadowMaterial opacity={0.25} color="#000000" />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}