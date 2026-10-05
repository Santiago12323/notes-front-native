import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';

export function Loading() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
});
