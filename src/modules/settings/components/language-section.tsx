import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Card } from '@/components/card';
import { Text } from '@/components/text';
import { useTranslation } from '@/i18n/i18n-provider';
import { spacing } from '@/theme/spacing';
import { LanguageSelector } from './language-selector';

interface LanguageSectionProps {
  style?: StyleProp<ViewStyle>;
}

export function LanguageSection({ style }: LanguageSectionProps) {
  const { t } = useTranslation();

  return (
    <View style={[styles.section, style]}>
      <Text variant="label">{t('settings.language')}</Text>
      <Card style={styles.card}>
        <LanguageSelector />
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
});
