export const locales = {
  en: 'en',
  es: 'es',
} as const;

export type Locale = (typeof locales)[keyof typeof locales];

export const DEFAULT_LOCALE: Locale = locales.en;
