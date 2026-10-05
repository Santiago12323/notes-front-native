import { StyleSheet, View } from 'react-native';

import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';

export function Divider() {
  const { colors } = useTheme();

  return <View style={[styles.divider, { backgroundColor: colors.border }]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: spacing.md,
  },
});
