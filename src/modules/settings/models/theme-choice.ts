import { type IconName } from '@/components/icon';
import { type MessageKey } from '@/i18n/types';
import { colorSchemes, type ColorScheme } from '@/theme/colors';

export interface ThemeChoice {
  value: ColorScheme;
  icon: IconName;
  labelKey: MessageKey;
}

export const themeChoices: readonly ThemeChoice[] = [
  {
    value: colorSchemes.light,
    icon: 'sun',
    labelKey: 'settings.light',
  },
  {
    value: colorSchemes.dark,
    icon: 'moon',
    labelKey: 'settings.dark',
  },
];
