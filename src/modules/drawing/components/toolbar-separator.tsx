import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme/theme-provider';
import { spacing } from '@/theme/spacing';
import { TOOLBAR_SEPARATOR_HEIGHT } from '../constants/layout';

export function ToolbarSeparator() {
  const { colors } = useTheme();

  return <View style={[styles.separator, { backgroundColor: colors.border }]} />;
}

const styles = StyleSheet.create({
  separator: {
    width: StyleSheet.hairlineWidth,
    height: TOOLBAR_SEPARATOR_HEIGHT,
    marginHorizontal: spacing.xs,
  },
});
