import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { Text } from '@/components/text';
import { PRESSED_OPACITY } from '@/constants/layout';
import { borders } from '@/theme/borders';
import { sizes } from '@/theme/sizes';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';
import {
  SETTING_CHEVRON_SIZE,
  SETTING_ICON_SIZE,
  SETTING_ROW_MIN_HEIGHT,
} from '../constants/layout';

interface SettingOptionRowProps {
  icon: IconName;
  label: string;
  selected: boolean;
  showSeparator: boolean;
  onPress: () => void;
}

export function SettingOptionRow({
  icon,
  label,
  selected,
  showSeparator,
  onPress,
}: SettingOptionRowProps) {
  const { colors } = useTheme();
  const iconBackground = selected ? colors.accent : colors.surfaceSecondary;
  const iconColor = selected ? colors.onAccent : colors.accent;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        selected && { backgroundColor: colors.selected },
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.iconBadge, { backgroundColor: iconBackground }]}>
        <Icon name={icon} size={SETTING_ICON_SIZE} color={iconColor} />
      </View>
      <View
        style={[
          styles.content,
          showSeparator && styles.contentSeparator,
          showSeparator && { borderBottomColor: colors.border },
        ]}
      >
        <Text variant="body" style={styles.label}>
          {label}
        </Text>
        {selected ? (
          <Icon name="check" size={SETTING_CHEVRON_SIZE} color={colors.accent} />
        ) : (
          <Icon name="forward" size={SETTING_CHEVRON_SIZE} color={colors.textTertiary} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: SETTING_ROW_MIN_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.lg,
  },
  pressed: {
    opacity: PRESSED_OPACITY,
  },
  iconBadge: {
    width: sizes.iconBadge,
    height: sizes.iconBadge,
    borderRadius: borders.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    minHeight: SETTING_ROW_MIN_HEIGHT,
    marginLeft: spacing.md,
    paddingRight: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  contentSeparator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    flex: 1,
  },
});
