import { describe, expect, it } from '@jest/globals';

import { formatIsoDate } from './format-iso-date';

describe('formatIsoDate', () => {
  it('returns the calendar date from an ISO timestamp', () => {
    expect(formatIsoDate('2026-10-05T12:00:00.000Z')).toBe('2026-10-05');
  });
});
