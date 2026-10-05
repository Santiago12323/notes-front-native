import { type ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { DISABLED_OPACITY, PRESSED_OPACITY } from '@/constants/layout';
import { borders } from '@/theme/borders';
import { shadows } from '@/theme/shadows';
import { useTheme } from '@/theme/theme-provider';
import { TOOLBAR_BUTTON_SIZE } from '../constants/layout';

interface ToolbarButtonProps {
  accessibilityLabel: string;
  selected?: boolean;
  disabled?: boolean;
  onPress: () => void;
  children: ReactNode;
}

export function ToolbarButton({
  accessibilityLabel,
  selected = false,
  disabled = false,
  onPress,
  children,
}: ToolbarButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: selected ? colors.accent : colors.surface,
          borderColor: selected ? colors.accent : colors.border,
        },
        selected && shadows.sm,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: TOOLBAR_BUTTON_SIZE,
    height: TOOLBAR_BUTTON_SIZE,
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
