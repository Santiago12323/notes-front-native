import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Card } from '@/components/card';
import { Text } from '@/components/text';
import { useTranslation } from '@/i18n/i18n-provider';
import { spacing } from '@/theme/spacing';
import { ThemeSelector } from './theme-selector';

interface AppearanceSectionProps {
  style?: StyleProp<ViewStyle>;
}

export function AppearanceSection({ style }: AppearanceSectionProps) {
  const { t } = useTranslation();

  return (
    <View style={[styles.section, style]}>
      <Text variant="label">{t('settings.appearance')}</Text>
      <Card style={styles.card}>
        <Text variant="caption" style={styles.caption}>
          {t('settings.theme')}
        </Text>
        <ThemeSelector />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.sm,
  },
  card: {
    padding: spacing.none,
    overflow: 'hidden',
  },
  caption: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
});
