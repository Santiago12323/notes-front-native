import { Pressable, StyleSheet } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { DISABLED_OPACITY, PRESSED_OPACITY } from '@/constants/layout';
import { sizes } from '@/theme/sizes';

interface IconButtonProps {
  name: IconName;
  onPress: () => void;
  accessibilityLabel: string;
  color?: string;
  disabled?: boolean;
}

export function IconButton({
  name,
  onPress,
  accessibilityLabel,
  color,
  disabled = false,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Icon name={name} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: sizes.control,
    minHeight: sizes.control,
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
