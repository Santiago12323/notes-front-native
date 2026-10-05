import { Pressable, StyleSheet } from 'react-native';

import { Text } from '@/components/text';
import { DISABLED_OPACITY, PRESSED_OPACITY } from '@/constants/layout';
import { borders } from '@/theme/borders';
import { sizes } from '@/theme/sizes';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export function Button({ label, onPress, variant = 'primary', disabled = false }: ButtonProps) {
  const { colors } = useTheme();
  const backgroundColor =
    variant === 'danger' ? colors.danger : variant === 'secondary' ? colors.surface : colors.accent;
  const borderColor = variant === 'secondary' ? colors.border : backgroundColor;
  const labelColor = variant === 'secondary' ? colors.textPrimary : colors.onAccent;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor,
          borderColor,
        },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text variant="label" style={{ color: labelColor }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: sizes.control,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borders.radius.md,
    borderWidth: borders.width.thin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: PRESSED_OPACITY,
  },
  disabled: {
    opacity: DISABLED_OPACITY,
  },
});
