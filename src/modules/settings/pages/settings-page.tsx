import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';

import { Header } from '@/components/header';
import { IconButton } from '@/components/icon-button';
import { useTranslation } from '@/i18n/i18n-provider';
import { sizes } from '@/theme/sizes';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';
import { AppearanceSection } from '../components/appearance-section';
import { LanguageSection } from '../components/language-section';
import {
  SETTINGS_LANDSCAPE_PADDING_VERTICAL,
  SETTINGS_PORTRAIT_PADDING_VERTICAL,
  SETTINGS_SECTION_GAP,
} from '../constants/layout';

export default function SettingsPage() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const useColumns = width >= sizes.tablet && isLandscape;

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Header
        title={t('settings.title')}
        left={<IconButton name="back" accessibilityLabel={t('common.back')} onPress={handleBack} />}
      />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingVertical: isLandscape
              ? SETTINGS_LANDSCAPE_PADDING_VERTICAL
              : SETTINGS_PORTRAIT_PADDING_VERTICAL,
          },
          useColumns && styles.columns,
        ]}
      >
        <AppearanceSection style={useColumns ? styles.column : undefined} />
        <LanguageSection style={useColumns ? styles.column : undefined} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: sizes.settingsMax,
    alignSelf: 'center',
    paddingHorizontal: spacing.xl,
    gap: SETTINGS_SECTION_GAP,
    paddingBottom: spacing.xxxl,
  },
  columns: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  column: {
    flex: 1,
    minWidth: 0,
  },
});
