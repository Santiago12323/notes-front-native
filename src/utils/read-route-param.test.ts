import { describe, expect, it } from '@jest/globals';

import { readRouteParam } from './read-route-param';

describe('readRouteParam', () => {
  it('returns a string param', () => {
    expect(readRouteParam('notebook-1')).toBe('notebook-1');
  });

  it('returns the first array value', () => {
    expect(readRouteParam(['notebook-1', 'notebook-2'])).toBe('notebook-1');
  });

  it('returns undefined when the param is missing', () => {
    expect(readRouteParam(undefined)).toBeUndefined();
  });
});
