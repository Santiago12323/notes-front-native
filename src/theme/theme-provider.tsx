import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { colorSchemes, getPalette, type ColorScheme, type ThemeColors } from '@/theme/colors';

export const themePreferences = {
  light: colorSchemes.light,
  dark: colorSchemes.dark,
  system: 'system',
} as const;

export type ThemePreference = (typeof themePreferences)[keyof typeof themePreferences];

interface ThemeContextValue {
  scheme: ColorScheme;
  preference: ThemePreference;
  colors: ThemeColors;
  setPreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  scheme?: ColorScheme;
  palette?: ThemeColors;
}

function resolveScheme(
  systemScheme: string | null | undefined,
  preference: ThemePreference,
  forcedScheme: ColorScheme | undefined,
): ColorScheme {
  if (forcedScheme !== undefined) {
    return forcedScheme;
  }

  if (preference === themePreferences.system) {
    return systemScheme === colorSchemes.dark ? colorSchemes.dark : colorSchemes.light;
  }

  return preference;
}

export function ThemeProvider({ children, scheme: forcedScheme, palette }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>(themePreferences.system);

  const value = useMemo(() => {
    const scheme = resolveScheme(systemScheme, preference, forcedScheme);

    return {
      scheme,
      preference: forcedScheme ?? preference,
      colors: palette ?? getPalette(scheme),
      setPreference,
    };
  }, [forcedScheme, palette, preference, systemScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);

  if (value === null) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return value;
}
