import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { I18nProvider } from '@/i18n/i18n-provider';
import { NotebooksProvider } from '@/modules/notebooks/hooks/notebooks-provider';
import { NotesProvider } from '@/modules/notes/hooks/notes-provider';
import { colorSchemes } from '@/theme/colors';
import { ThemeProvider, useTheme } from '@/theme/theme-provider';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider>
        <I18nProvider>
          <ThemedRoot />
        </I18nProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function ThemedRoot() {
  const { colors, scheme } = useTheme();

  return (
    <NotebooksProvider>
      <NotesProvider>
        <StatusBar style={scheme === colorSchemes.dark ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        />
      </NotesProvider>
    </NotebooksProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
