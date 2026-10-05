import { describe, expect, it } from '@jest/globals';

import { pointsToPathData } from './points-to-path-data';

describe('pointsToPathData', () => {
  it('returns an empty string without points', () => {
    expect(pointsToPathData([])).toBe('');
  });

  it('creates a dot-sized path for a single point', () => {
    expect(pointsToPathData([{ x: 1, y: 2 }])).toBe('M1 2 L1 2');
  });

  it('joins multiple points', () => {
    expect(
      pointsToPathData([
        { x: 0, y: 0 },
        { x: 4, y: 0 },
      ]),
    ).toBe('M0 0 L4 0');
  });
});
