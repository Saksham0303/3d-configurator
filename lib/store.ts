import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DiamondShape = 'round' | 'princess' | 'oval';
export type MetalType = 'gold' | 'white-gold' | 'rose-gold' | 'platinum';
export type BandStyle = 'classic' | 'thin' | 'wide';
export type HeadStyle = 'classic';

interface ConfiguratorState {
  step: number;
  diamondShape: DiamondShape;
  bandStyle: BandStyle;
  headStyle: HeadStyle;
  metal: MetalType;
  ringSize: number;
  setStep: (step: number) => void;
  setDiamondShape: (shape: DiamondShape) => void;
  setBandStyle: (style: BandStyle) => void;
  setHeadStyle: (style: HeadStyle) => void;
  setMetal: (metal: MetalType) => void;
  setRingSize: (size: number) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  diamondShape: 'round' as DiamondShape,
  bandStyle: 'classic' as BandStyle,
  headStyle: 'classic' as HeadStyle,
  metal: 'white-gold' as MetalType,
  ringSize: 7,
};

export const useConfiguratorStore = create<ConfiguratorState>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ step }),
      setDiamondShape: (diamondShape) => set({ diamondShape }),
      setBandStyle: (bandStyle) => set({ bandStyle }),
      setHeadStyle: (headStyle) => set({ headStyle }),
      setMetal: (metal) => set({ metal }),
      setRingSize: (ringSize) => set({ ringSize }),
      reset: () => set(initialState),
    }),
    {
      name: 'ring-configurator',
    }
  )
);
