import { describe, expect, it } from '@jest/globals';

import { shouldKeepPoint } from './point-distance';

describe('shouldKeepPoint', () => {
  it('keeps the first point', () => {
    expect(shouldKeepPoint(undefined, { x: 0, y: 0 }, 2)).toBe(true);
  });

  it('ignores a point that is too close', () => {
    expect(shouldKeepPoint({ x: 0, y: 0 }, { x: 1, y: 0 }, 2)).toBe(false);
  });

  it('keeps a point that is far enough', () => {
    expect(shouldKeepPoint({ x: 0, y: 0 }, { x: 3, y: 0 }, 2)).toBe(true);
  });
});
