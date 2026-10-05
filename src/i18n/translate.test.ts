import { describe, expect, it } from '@jest/globals';

import { translations } from './translations';
import { translate } from './translate';

describe('translate', () => {
  it('resolves nested keys for English', () => {
    expect(translate(translations.en, 'notebooks.listTitle')).toBe('Notebooks');
  });

  it('resolves nested keys for Spanish', () => {
    expect(translate(translations.es, 'notebooks.listTitle')).toBe('Cuadernos');
  });

  it('interpolates values', () => {
    expect(translate(translations.en, 'notebooks.created', { date: '2026-10-05' })).toBe(
      'Created 2026-10-05',
    );
    expect(translate(translations.es, 'notebooks.created', { date: '2026-10-05' })).toBe(
      'Creado el 2026-10-05',
    );
  });

  it('keeps the same message keys in both locales', () => {
    expect(Object.keys(translations.en)).toEqual(Object.keys(translations.es));
    expect(Object.keys(translations.en.drawing)).toEqual(Object.keys(translations.es.drawing));
    expect(Object.keys(translations.en.drawing.colors)).toEqual(
      Object.keys(translations.es.drawing.colors),
    );
    expect(Object.keys(translations.en.settings)).toEqual(Object.keys(translations.es.settings));
  });

  it('resolves settings labels in both locales', () => {
    expect(translate(translations.en, 'settings.title')).toBe('Settings');
    expect(translate(translations.es, 'settings.title')).toBe('Ajustes');
    expect(translate(translations.en, 'settings.light')).toBe('Light');
    expect(translate(translations.es, 'settings.dark')).toBe('Oscuro');
  });
});
