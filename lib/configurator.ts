import type { BandStyle, DiamondShape, MetalType } from '@/lib/store';

export const CONFIGURATOR_STEPS = [
  { number: 1, title: 'Diamond Shape' },
  { number: 2, title: 'Band Style' },
  { number: 3, title: 'Metal Type' },
  { number: 4, title: 'Ring Size' },
  { number: 5, title: 'Review' },
] as const;

export const DIAMOND_SHAPE_OPTIONS: {
  value: DiamondShape;
  label: string;
  description: string;
}[] = [
  { value: 'round', label: 'Round', description: 'Classic and timeless' },
  { value: 'princess', label: 'Princess', description: 'Modern and geometric' },
  { value: 'oval', label: 'Oval', description: 'Elegant and elongated' },
];

export const BAND_STYLE_OPTIONS: {
  value: BandStyle;
  label: string;
  description: string;
}[] = [
  { value: 'thin', label: 'Thin', description: 'Delicate and refined' },
  { value: 'classic', label: 'Classic', description: 'Timeless elegance' },
  { value: 'wide', label: 'Wide', description: 'Bold and modern' },
];

export const METAL_OPTIONS: {
  value: MetalType;
  label: string;
  color: string;
}[] = [
  { value: 'gold', label: 'Yellow Gold', color: '#FFD700' },
  { value: 'white-gold', label: 'White Gold', color: '#E5E5E5' },
  { value: 'rose-gold', label: 'Rose Gold', color: '#ECC5C0' },
  { value: 'platinum', label: 'Platinum', color: '#E5E4E2' },
];

export const METAL_LABELS: Record<MetalType, string> = Object.fromEntries(
  METAL_OPTIONS.map((option) => [option.value, option.label])
) as Record<MetalType, string>;

const DIAMOND_PRICING: Record<DiamondShape, number> = {
  round: 2400,
  princess: 2200,
  oval: 2550,
};

const BAND_STYLE_PRICING: Record<BandStyle, number> = {
  thin: 450,
  classic: 600,
  wide: 780,
};

const METAL_PRICING: Record<MetalType, number> = {
  gold: 900,
  'white-gold': 980,
  'rose-gold': 960,
  platinum: 1450,
};

const RING_SIZE_PRICING = 40;

export function estimateRingPrice(config: {
  diamondShape: DiamondShape;
  bandStyle: BandStyle;
  metal: MetalType;
  ringSize: number;
}) {
  const subtotal =
    DIAMOND_PRICING[config.diamondShape] +
    BAND_STYLE_PRICING[config.bandStyle] +
    METAL_PRICING[config.metal] +
    config.ringSize * RING_SIZE_PRICING;

  return Math.round(subtotal / 10) * 10;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}
