import { type IconName } from '@/components/icon';
import { locales, type Locale } from '@/i18n/locales';
import { type MessageKey } from '@/i18n/types';

export interface LanguageChoice {
  value: Locale;
  icon: IconName;
  labelKey: MessageKey;
}

export const languageChoices: readonly LanguageChoice[] = [
  {
    value: locales.en,
    icon: 'globe',
    labelKey: 'settings.english',
  },
  {
    value: locales.es,
    icon: 'globe',
    labelKey: 'settings.spanish',
  },
];
