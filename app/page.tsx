'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { Gem, Gift, Menu, Sparkles } from 'lucide-react';
import { Toaster } from 'sonner';
import { ConfiguratorPanel } from '@/components/configurator/ConfiguratorPanel';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  CONFIGURATOR_STEPS,
  estimateRingPrice,
  formatPrice,
  METAL_LABELS,
} from '@/lib/configurator';
import { useConfiguratorStore } from '@/lib/store';

const Scene = dynamic(() => import('@/components/ring/Scene').then((mod) => mod.Scene), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200">
      <div className="text-center">
        <div className="relative">
          <div
            className="mx-auto mb-6 h-20 w-20 animate-spin rounded-full border-4 border-neutral-300"
            style={{ borderTopColor: 'transparent' }}
          />
          <div className="absolute inset-0 mx-auto h-20 w-20 animate-ping rounded-full border-4 border-neutral-400 opacity-20" />
        </div>
        <p className="animate-pulse text-lg font-light tracking-wide text-neutral-700">
          Crafting Your Dream Ring...
        </p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { step, diamondShape, bandStyle, metal, ringSize } = useConfiguratorStore();
  const estimatedPrice = useMemo(
    () => estimateRingPrice({ diamondShape, bandStyle, metal, ringSize }),
    [diamondShape, bandStyle, metal, ringSize]
  );
  const currentStep = CONFIGURATOR_STEPS[Math.min(step, CONFIGURATOR_STEPS.length) - 1];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <main
        className={`flex min-h-screen flex-col bg-gradient-to-br from-neutral-50 via-white to-neutral-100 transition-opacity duration-1000 lg:h-screen ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <header className="relative z-10 border-b border-neutral-200/50 bg-white/80 px-4 py-4 shadow-sm backdrop-blur-xl sm:px-6 sm:py-5 lg:px-8 lg:py-6">
          <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900 shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-light tracking-wider text-neutral-900 sm:text-2xl">
                  Eternal{' '}
                  <span className="bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text font-semibold text-transparent">
                    Rings
                  </span>
                </h1>
                <p className="text-xs tracking-wide text-neutral-500">Design Your Perfect Moment</p>
              </div>
            </div>

            <div className="hidden items-center gap-4 md:flex lg:gap-6">
              <button className="auto-shine rounded-full px-3 py-2 text-sm font-light tracking-wide text-neutral-600 transition-colors hover:text-neutral-900">
                Gallery
              </button>
              <button className="auto-shine rounded-full px-3 py-2 text-sm font-light tracking-wide text-neutral-600 transition-colors hover:text-neutral-900">
                About
              </button>
              <button className="auto-shine rounded-full bg-gradient-to-r from-neutral-800 to-neutral-900 px-5 py-2.5 text-sm font-light tracking-wide text-white transition-all duration-300 hover:scale-105 hover:shadow-lg lg:px-6">
                Contact Us
              </button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l-neutral-200 bg-white/95 backdrop-blur-xl">
                <SheetHeader>
                  <SheetTitle>Explore The Configurator</SheetTitle>
                  <SheetDescription>
                    Browse the brand links and keep an eye on your live design summary.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-6">
                  <div className="space-y-2">
                    {['Gallery', 'About', 'Contact Us'].map((item) => (
                      <SheetClose asChild key={item}>
                        <button className="auto-shine flex w-full items-center justify-between rounded-xl border border-neutral-200 px-4 py-3 text-left text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50">
                          {item}
                        </button>
                      </SheetClose>
                    ))}
                  </div>
                  <div className="rounded-2xl bg-neutral-950 px-5 py-5 text-white">
                    <p className="text-xs uppercase tracking-[0.22em] text-neutral-300">Current Design</p>
                    <p className="mt-2 text-2xl font-light">{formatPrice(estimatedPrice)}</p>
                    <div className="mt-4 space-y-2 text-sm text-neutral-300">
                      <p>Step {step}: {currentStep?.title}</p>
                      <p>{diamondShape} diamond / {bandStyle} band</p>
                      <p>{METAL_LABELS[metal]} / size {ringSize}</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <div className="relative flex flex-1 flex-col lg:min-h-0 lg:flex-row lg:overflow-hidden">
          <div className="relative min-h-[44svh] w-full overflow-hidden sm:min-h-[32rem] lg:min-h-0 lg:w-3/5">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute left-20 top-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-neutral-400 to-neutral-600 blur-3xl" />
              <div className="absolute bottom-20 right-20 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-neutral-300 to-neutral-500 blur-3xl delay-1000" />
            </div>

            <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6 lg:left-8 lg:top-8">
              <div className="rounded-2xl border border-neutral-200/50 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md sm:px-6">
                <p className="mb-1 text-xs uppercase tracking-wider text-neutral-500">Live Preview</p>
                <p className="text-sm font-light text-neutral-800">360 Interactive View</p>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 z-10 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
              <div className="rounded-xl border border-neutral-200/50 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md sm:px-5">
                <p className="text-xs font-light text-neutral-600">
                  <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  Drag to rotate / Scroll to zoom
                </p>
              </div>
            </div>

            <Scene />
          </div>

          <div className="relative w-full overflow-hidden border-t border-neutral-200/60 bg-white lg:w-2/5 lg:border-l lg:border-t-0">
            <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 bg-gradient-to-bl from-neutral-100 via-transparent to-transparent opacity-50 sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

            <div className="relative h-full overflow-y-auto">
              <div className="px-4 pb-6 pt-6 sm:px-6 sm:pt-8 lg:px-8">
                <div className="mb-6 animate-fade-in sm:mb-8">
                  <h2 className="mb-2 text-2xl font-light tracking-wide text-neutral-900 sm:text-3xl">
                    Craft Your <span className="font-semibold">Masterpiece</span>
                  </h2>
                  <p className="max-w-xl text-sm font-light leading-relaxed text-neutral-600">
                    Every detail matters. Create a ring that tells your unique story with our intuitive designer.
                  </p>
                </div>

                <div className="mb-6 grid gap-4 sm:mb-8 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="shine-card rounded-2xl border border-neutral-200 bg-neutral-50/70 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">Live Summary</p>
                    <div className="mt-3 grid gap-2 text-sm text-neutral-700 sm:grid-cols-2">
                      <p className="capitalize">{diamondShape} diamond</p>
                      <p className="capitalize">{bandStyle} band</p>
                      <p>{METAL_LABELS[metal]}</p>
                      <p>Size {ringSize}</p>
                    </div>
                  </div>
                  <div className="shine-card rounded-2xl bg-neutral-950 px-5 py-4 text-white">
                    <p className="text-xs uppercase tracking-[0.22em] text-neutral-300">Estimated Price</p>
                    <p className="mt-2 text-2xl font-light">{formatPrice(estimatedPrice)}</p>
                    <p className="mt-1 text-xs text-neutral-300">
                      Step {step} of {CONFIGURATOR_STEPS.length}
                    </p>
                  </div>
                </div>

                <ConfiguratorPanel />

                <div className="mt-10 border-t border-neutral-200 pt-6 sm:mt-12 sm:pt-8">
                  <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 sm:gap-6">
                    <div className="shine-card group cursor-pointer rounded-xl bg-neutral-50/70 px-4 py-4">
                      <Gem className="mx-auto mb-2 h-6 w-6 text-neutral-700 transition-transform group-hover:scale-110" />
                      <p className="text-xs font-light text-neutral-600">Premium Quality</p>
                    </div>
                    <div className="shine-card group cursor-pointer rounded-xl bg-neutral-50/70 px-4 py-4">
                      <Sparkles className="mx-auto mb-2 h-6 w-6 text-neutral-700 transition-transform group-hover:scale-110" />
                      <p className="text-xs font-light text-neutral-600">Handcrafted</p>
                    </div>
                    <div className="shine-card group cursor-pointer rounded-xl bg-neutral-50/70 px-4 py-4">
                      <Gift className="mx-auto mb-2 h-6 w-6 text-neutral-700 transition-transform group-hover:scale-110" />
                      <p className="text-xs font-light text-neutral-600">Free Shipping</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-[60%] top-0 hidden w-px bg-gradient-to-b from-transparent via-neutral-300 to-transparent lg:block">
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
