import { describe, expect, it } from '@jest/globals';

import { isIsoCalendarDate } from './iso-calendar-date';

describe('isIsoCalendarDate', () => {
  it('accepts a valid calendar date', () => {
    expect(isIsoCalendarDate('2026-10-05')).toBe(true);
  });

  it('rejects a malformed value', () => {
    expect(isIsoCalendarDate('05-10-2026')).toBe(false);
  });

  it('rejects an impossible calendar date', () => {
    expect(isIsoCalendarDate('2026-02-31')).toBe(false);
  });
});
