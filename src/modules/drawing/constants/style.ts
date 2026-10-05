import { spacing } from '@/theme/spacing';

export const MIN_POINT_DISTANCE = 2;

export const strokeWidths = {
  small: 2,
  medium: 5,
  large: 12,
  extraLarge: 22,
} as const;

export type StrokeWidthName = keyof typeof strokeWidths;

export const DEFAULT_STROKE_WIDTH = strokeWidths.medium;

export const inkColors = {
  black: '#1A1612',
  white: '#FFFFFF',
  red: '#E23D3D',
  orange: '#E67A2E',
  yellow: '#E8C547',
  green: '#2F9E5A',
  teal: '#1A9E8F',
  blue: '#3D6CB9',
  indigo: '#4F46A5',
  purple: '#7C3AED',
  pink: '#E056A0',
  brown: '#8B5A3C',
} as const;

export type InkColorName = keyof typeof inkColors;

export const DEFAULT_INK_COLOR = inkColors.black;

export const PEN_OPACITY = 1;
export const BRUSH_OPACITY = 0.45;

export const SINGLE_POINTER_COUNT = 1;

export const paperSpacings = {
  blank: spacing.none,
  grid: spacing.xl,
  lined: spacing.xxl,
  dotted: spacing.lg,
} as const;
