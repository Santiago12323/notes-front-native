export const colorSchemes = {
  light: 'light',
  dark: 'dark',
} as const;

export type ColorScheme = (typeof colorSchemes)[keyof typeof colorSchemes];

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceSecondary: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  accent: string;
  accentSecondary: string;
  success: string;
  warning: string;
  danger: string;
  selected: string;
  disabled: string;
  canvasBackground: string;
  toolbarBackground: string;
  overlay: string;
  onAccent: string;
  text: string;
  primary: string;
  primaryText: string;
  paperPattern: string;
}

function withLegacyAliases(
  palette: Omit<ThemeColors, 'text' | 'primary' | 'primaryText' | 'paperPattern'>,
): ThemeColors {
  return {
    ...palette,
    text: palette.textPrimary,
    primary: palette.accent,
    primaryText: palette.onAccent,
    paperPattern: palette.border, // Default for now, will be overridden
  };
}

export const lightColors = withLegacyAliases({
  background: '#F3EDE3',
  surface: '#FFFDF9',
  surfaceSecondary: '#EFE6D8',
  textPrimary: '#1C1610',
  textSecondary: '#6A5F54',
  textTertiary: '#94887C',
  border: '#E3D6C6',
  accent: '#0C8F72',
  accentSecondary: '#E25A2C',
  success: '#2B9A55',
  warning: '#D39212',
  danger: '#D13B3B',
  selected: '#CDEFE4',
  disabled: '#B3A89C',
  canvasBackground: '#FFFCF7',
  toolbarBackground: '#FFFDF9',
  overlay: 'rgba(28, 22, 16, 0.45)',
  onAccent: '#FFFFFF',
});
lightColors.paperPattern = '#EFE6D8';

export const darkColors = withLegacyAliases({
  background: '#12100E',
  surface: '#1F1B18',
  surfaceSecondary: '#2B2622',
  textPrimary: '#F6F0E6',
  textSecondary: '#B9AFA4',
  textTertiary: '#8C8278',
  border: '#3E3731',
  accent: '#2FBE9A',
  accentSecondary: '#F07A4A',
  success: '#57D08A',
  warning: '#E6B54A',
  danger: '#EE6B6B',
  selected: '#1A433A',
  disabled: '#6F675E',
  canvasBackground: '#1A1714',
  toolbarBackground: '#1F1B18',
  overlay: 'rgba(0, 0, 0, 0.55)',
  onAccent: '#FFFFFF',
});
darkColors.paperPattern = '#2B2622';

export const palettes: Record<ColorScheme, ThemeColors> = {
  light: lightColors,
  dark: darkColors,
};

export const colors: ThemeColors = {
  background: '#F6F1E8',
  surface: '#FFFCF7',
  surfaceSecondary: '#F0EAE0',
  textPrimary: '#1F1A16',
  textSecondary: '#6F675F',
  textTertiary: '#8F877E',
  border: '#E4DCD0',
  accent: '#2F5D50',
  accentSecondary: '#A65D3F',
  success: '#2F7D4A',
  warning: '#C4841D',
  danger: '#9B2C2C',
  selected: '#D7E8E2',
  disabled: '#B8B2AA',
  canvasBackground: '#FFFCF7',
  toolbarBackground: '#FFFCF7',
  overlay: 'rgba(31, 26, 22, 0.4)',
  onAccent: '#FFFFFF',
  paperPattern: lightColors.paperPattern,
  text: '#1F1A16',
  primary: '#2F5D50',
  primaryText: '#FFFFFF',
};

export type ColorName = keyof ThemeColors;

export function getPalette(scheme: ColorScheme): ThemeColors {
  return palettes[scheme];
}
