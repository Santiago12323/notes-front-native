import { describe, expect, it } from '@jest/globals';

import { colorSchemes, darkColors, getPalette, lightColors } from './colors';

describe('theme palettes', () => {
  it('exposes the same semantic tokens in light and dark', () => {
    expect(Object.keys(lightColors).sort()).toEqual(Object.keys(darkColors).sort());
  });

  it('keeps light and dark palettes distinct', () => {
    expect(lightColors.background).not.toBe(darkColors.background);
    expect(lightColors.textPrimary).not.toBe(darkColors.textPrimary);
    expect(lightColors.canvasBackground).not.toBe(darkColors.canvasBackground);
  });

  it('resolves palettes by scheme', () => {
    expect(getPalette(colorSchemes.light)).toBe(lightColors);
    expect(getPalette(colorSchemes.dark)).toBe(darkColors);
  });

  it('mirrors semantic colors onto legacy aliases', () => {
    expect(lightColors.text).toBe(lightColors.textPrimary);
    expect(lightColors.primary).toBe(lightColors.accent);
    expect(lightColors.primaryText).toBe(lightColors.onAccent);
  });
});
