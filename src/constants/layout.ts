export const MIN_TOUCH_TARGET = 44;
export const ICON_SIZE = 24;
export const PRESSED_OPACITY = 0.8;
export const DISABLED_OPACITY = 0.5;

export const layoutDensities = {
  regular: 'regular',
  compact: 'compact',
} as const;

export type LayoutDensity = (typeof layoutDensities)[keyof typeof layoutDensities];
