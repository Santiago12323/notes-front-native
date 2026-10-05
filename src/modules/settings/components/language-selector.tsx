import { View } from 'react-native';

import { useTranslation } from '@/i18n/i18n-provider';
import { languageChoices } from '../models/language-choice';
import { SettingOptionRow } from './setting-option-row';

export function LanguageSelector() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <View accessibilityRole="radiogroup">
      {languageChoices.map((choice, index) => (
        <SettingOptionRow
          key={choice.value}
          icon={choice.icon}
          label={t(choice.labelKey)}
          selected={locale === choice.value}
          showSeparator={index < languageChoices.length - 1}
          onPress={() => setLocale(choice.value)}
        />
      ))}
    </View>
  );
}
