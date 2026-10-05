import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { DEFAULT_LOCALE, type Locale } from './locales';
import { translations } from './translations';
import { translate } from './translate';
import { type InterpolationValues, type MessageKey, type Messages } from './types';

interface I18nContextValue {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, values?: InterpolationValues) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  const t = useCallback(
    (key: MessageKey, values?: InterpolationValues) => translate(translations[locale], key, values),
    [locale],
  );

  const value = useMemo(
    () => ({
      locale,
      messages: translations[locale],
      setLocale,
      t,
    }),
    [locale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation(): I18nContextValue {
  const value = useContext(I18nContext);

  if (value === null) {
    throw new Error('useTranslation must be used within I18nProvider');
  }

  return value;
}
