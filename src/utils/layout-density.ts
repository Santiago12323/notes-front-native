import { layoutDensities, type LayoutDensity } from '@/constants/layout';

export function getLayoutDensity(width: number, height: number): LayoutDensity {
  return width > height ? layoutDensities.compact : layoutDensities.regular;
}
