import { sizes } from '@/theme/sizes';
import { spacing } from '@/theme/spacing';
import { type StrokeWidthName } from './style';

export const TOOLBAR_PADDING_REGULAR = spacing.md;
export const TOOLBAR_PADDING_COMPACT = spacing.sm;
export const TOOLBAR_GAP_REGULAR = spacing.sm;
export const TOOLBAR_GAP_COMPACT = spacing.xs;
export const TOOLBAR_BUTTON_SIZE = sizes.control;
export const TOOLBAR_SWATCH_SIZE = 22;
export const TOOLBAR_WELL_SIZE = 28;
export const TOOLBAR_SEPARATOR_HEIGHT = 22;
export const TOOLBAR_PALETTE_COLUMNS = 6;
export const TOOLBAR_INSET = spacing.lg;

export const strokeWidthPreviews: Record<StrokeWidthName, number> = {
  small: 6,
  medium: 10,
  large: 16,
  extraLarge: 22,
};

export const strokeWidthOrder: readonly StrokeWidthName[] = [
  'small',
  'medium',
  'large',
  'extraLarge',
];
