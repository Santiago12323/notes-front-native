import { describe, expect, it } from '@jest/globals';

import { inkColors, strokeWidths } from './style';

describe('drawing style tokens', () => {
  it('exposes twelve ink colors', () => {
    expect(Object.keys(inkColors)).toEqual([
      'black',
      'white',
      'red',
      'orange',
      'yellow',
      'green',
      'teal',
      'blue',
      'indigo',
      'purple',
      'pink',
      'brown',
    ]);
  });

  it('exposes four visual stroke widths', () => {
    expect(strokeWidths.small).toBeLessThan(strokeWidths.medium);
    expect(strokeWidths.medium).toBeLessThan(strokeWidths.large);
    expect(strokeWidths.large).toBeLessThan(strokeWidths.extraLarge);
  });
});
