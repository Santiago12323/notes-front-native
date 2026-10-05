import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { Text } from '@/components/text';
import { borders } from '@/theme/borders';
import { sizes } from '@/theme/sizes';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';
import { typography } from '@/theme/typography';

interface InputProps extends Omit<TextInputProps, 'placeholderTextColor'> {
  label?: string;
}

export function Input({ label, style, ...rest }: InputProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {label ? <Text variant="label">{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.textTertiary}
        style={[
          styles.input,
          {
            borderColor: colors.border,
            backgroundColor: colors.surfaceSecondary,
            color: colors.textPrimary,
          },
          style,
        ]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  input: {
    minHeight: sizes.controlComfortable,
    borderWidth: borders.width.thin,
    borderRadius: borders.radius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.size.md,
  },
});
