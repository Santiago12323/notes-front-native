import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/text';
import { layoutDensities, type LayoutDensity } from '@/constants/layout';
import { sizes } from '@/theme/sizes';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';

interface HeaderProps {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
  density?: LayoutDensity;
}

export function Header({ title, left, right, density = layoutDensities.regular }: HeaderProps) {
  const { colors } = useTheme();
  const isCompact = density === layoutDensities.compact;

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={[styles.container, isCompact && styles.containerCompact]}>
        <View style={styles.side}>{left}</View>
        <Text variant={isCompact ? 'label' : 'subtitle'} numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={[styles.side, styles.sideRight]}>{right}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    minHeight: sizes.controlComfortable,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  side: {
    minWidth: sizes.control,
    minHeight: sizes.control,
    justifyContent: 'center',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  containerCompact: {
    minHeight: sizes.control,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.none,
  },
});
