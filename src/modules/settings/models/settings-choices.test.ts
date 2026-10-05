import { describe, expect, it } from '@jest/globals';

import { locales } from '@/i18n/locales';
import { colorSchemes } from '@/theme/colors';
import { languageChoices } from './language-choice';
import { themeChoices } from './theme-choice';

describe('settings choices', () => {
  it('exposes light and dark theme options', () => {
    expect(themeChoices.map((choice) => choice.value)).toEqual([
      colorSchemes.light,
      colorSchemes.dark,
    ]);
  });

  it('exposes english and spanish language options', () => {
    expect(languageChoices.map((choice) => choice.value)).toEqual([locales.en, locales.es]);
  });
});
