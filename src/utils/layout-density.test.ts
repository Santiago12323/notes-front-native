import { describe, expect, it } from '@jest/globals';

import { layoutDensities } from '@/constants/layout';
import { getLayoutDensity } from './layout-density';

describe('getLayoutDensity', () => {
  it('uses compact chrome in landscape', () => {
    expect(getLayoutDensity(1194, 834)).toBe(layoutDensities.compact);
  });

  it('uses regular chrome in portrait', () => {
    expect(getLayoutDensity(834, 1194)).toBe(layoutDensities.regular);
  });
});
