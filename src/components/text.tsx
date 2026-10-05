import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { useTheme } from '@/theme/theme-provider';
import { textVariants, type TextVariant } from '@/theme/typography';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
}

const secondaryVariants: readonly TextVariant[] = ['caption'];

export function Text({ variant = 'body', style, ...rest }: TextProps) {
  const { colors } = useTheme();
  const color = secondaryVariants.includes(variant) ? colors.textSecondary : colors.textPrimary;

  return <RNText style={[{ color }, textVariants[variant], style]} {...rest} />;
}
