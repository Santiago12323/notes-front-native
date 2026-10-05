import { View } from 'react-native';

import { useTranslation } from '@/i18n/i18n-provider';
import { useTheme } from '@/theme/theme-provider';
import { themeChoices } from '../models/theme-choice';
import { SettingOptionRow } from './setting-option-row';

export function ThemeSelector() {
  const { scheme, setPreference } = useTheme();
  const { t } = useTranslation();

  return (
    <View accessibilityRole="radiogroup">
      {themeChoices.map((choice, index) => (
        <SettingOptionRow
          key={choice.value}
          icon={choice.icon}
          label={t(choice.labelKey)}
          selected={scheme === choice.value}
          showSeparator={index < themeChoices.length - 1}
          onPress={() => setPreference(choice.value)}
        />
      ))}
    </View>
  );
}
