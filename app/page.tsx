'use client';

import dynamic from 'next/dynamic';
import { ConfiguratorPanel } from '@/components/configurator/ConfiguratorPanel';
import { Toaster } from 'sonner';
import { useEffect, useState } from 'react';

const Scene = dynamic(() => import('@/components/ring/Scene').then((mod) => mod.Scene), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-neutral-300 rounded-full animate-spin mx-auto mb-6" style={{ borderTopColor: 'transparent' }} />
          <div className="absolute inset-0 w-20 h-20 border-4 border-neutral-400 rounded-full animate-ping mx-auto opacity-20" />
        </div>
        <p className="text-neutral-700 text-lg font-light tracking-wide animate-pulse">Crafting Your Dream Ring...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <main className={`h-screen flex flex-col bg-gradient-to-br from-neutral-50 via-white to-neutral-100 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Premium Header with Glassmorphism */}
        <header className="relative bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 px-8 py-6 shadow-sm z-10">
          <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-light tracking-wider text-neutral-900">
                  Eternal <span className="font-semibold bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text text-transparent">Rings</span>
                </h1>
                <p className="text-xs text-neutral-500 tracking-wide">Design Your Perfect Moment</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors font-light tracking-wide">
                Gallery
              </button>
              <button className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors font-light tracking-wide">
                About
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white rounded-full text-sm font-light tracking-wide hover:shadow-lg hover:scale-105 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden relative">
          {/* 3D Scene Side with Floating Elements */}
          <div className="w-full lg:w-3/5 relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-neutral-300 to-neutral-500 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Premium Badge */}
            <div className="absolute top-8 left-8 z-10">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl px-6 py-3 shadow-xl border border-neutral-200/50">
                <p className="text-xs text-neutral-500 tracking-wider uppercase mb-1">Live Preview</p>
                <p className="text-sm font-light text-neutral-800">360° Interactive View</p>
              </div>
            </div>

            {/* Controls Hint */}
            <div className="absolute bottom-8 left-8 z-10">
              <div className="bg-white/90 backdrop-blur-md rounded-xl px-5 py-3 shadow-lg border border-neutral-200/50">
                <p className="text-xs text-neutral-600 font-light">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Drag to rotate • Scroll to zoom
                </p>
              </div>
            </div>

            <Scene />
          </div>

          {/* Configurator Side with Premium Card */}
          <div className="w-full lg:w-2/5 bg-white relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-neutral-100 via-transparent to-transparent opacity-50 pointer-events-none" />
            
            {/* Premium Card Container */}
            <div className="relative h-full overflow-y-auto">
              <div className="p-8">
                {/* Welcome Section */}
                <div className="mb-8 animate-fade-in">
                  <h2 className="text-3xl font-light text-neutral-900 mb-2 tracking-wide">
                    Craft Your <span className="font-semibold">Masterpiece</span>
                  </h2>
                  <p className="text-neutral-600 text-sm leading-relaxed font-light">
                    Every detail matters. Create a ring that tells your unique story with our intuitive designer.
                  </p>
                </div>

                {/* Configurator Panel */}
                <ConfiguratorPanel />

                {/* Trust Badges */}
                <div className="mt-12 pt-8 border-t border-neutral-200">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div className="group cursor-pointer">
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💎</div>
                      <p className="text-xs text-neutral-600 font-light">Premium Quality</p>
                    </div>
                    <div className="group cursor-pointer">
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">✨</div>
                      <p className="text-xs text-neutral-600 font-light">Handcrafted</p>
                    </div>
                    <div className="group cursor-pointer">
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🎁</div>
                      <p className="text-xs text-neutral-600 font-light">Free Shipping</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider Line with Glow */}
          <div className="hidden lg:block absolute left-[60%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-300 to-transparent">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-400 to-transparent blur-sm" />
          </div>
        </div>
      </main>
      
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            fontWeight: '300',
          },
        }}
      />

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f5f5f5;
        }

        ::-webkit-scrollbar-thumb {
          background: #d4d4d4;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a3a3a3;
        }
      `}</style>
    </>
  );
}