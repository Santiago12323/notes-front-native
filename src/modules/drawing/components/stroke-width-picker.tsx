import { Pressable, StyleSheet, View } from 'react-native';

import { useTranslation } from '@/i18n/i18n-provider';
import { type MessageKey } from '@/i18n/types';
import { borders } from '@/theme/borders';
import { sizes } from '@/theme/sizes';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';
import { strokeWidthOrder, strokeWidthPreviews } from '../constants/layout';
import { strokeWidths, type StrokeWidthName } from '../constants/style';
import { ToolbarButton } from './toolbar-button';
import { type ToolbarPanel } from '../models/toolbar-panel';

const widthMessageKeys = {
  small: 'drawing.small',
  medium: 'drawing.medium',
  large: 'drawing.large',
  extraLarge: 'drawing.extraLarge',
} as const satisfies Record<StrokeWidthName, MessageKey>;

function previewForWidth(width: number): number {
  const match = strokeWidthOrder.find((name) => strokeWidths[name] === width);

  return match === undefined ? strokeWidthPreviews.medium : strokeWidthPreviews[match];
}

interface StrokeDotProps {
  size: number;
  color: string;
}

function StrokeDot({ size, color }: StrokeDotProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: borders.radius.full,
        backgroundColor: color,
      }}
    />
  );
}

interface StrokeWidthPickerProps {
  width: number;
  onWidthChange: (width: number) => void;
  onTogglePanel: (panel: ToolbarPanel) => void;
}

export function StrokeWidthPicker({ width, onWidthChange, onTogglePanel }: StrokeWidthPickerProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const selectedName = strokeWidthOrder.find((name) => strokeWidths[name] === width);
  const accessibilityLabel =
    selectedName === undefined
      ? t('drawing.width')
      : `${t('drawing.width')}, ${t(widthMessageKeys[selectedName])}`;

  return (
    <ToolbarButton
      accessibilityLabel={accessibilityLabel}
      selected={false} // This button doesn't stay selected
      onPress={() => onTogglePanel('width')}
    >
      <StrokeDot size={previewForWidth(width)} color={colors.textPrimary} />
    </ToolbarButton>
  );
}

interface StrokeWidthPaletteProps {
  selected: number;
  onSelect: (width: number) => void;
}

export function StrokeWidthPalette({ selected, onSelect }: StrokeWidthPaletteProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View
      accessibilityRole="radiogroup"
      style={[
        styles.palette,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      {strokeWidthOrder.map((name) => {
        const currentWidth = strokeWidths[name];
        const isSelected = currentWidth === selected;

        return (
          <Pressable
            key={name}
            accessibilityLabel={t(widthMessageKeys[name])}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(currentWidth)}
            style={[
              styles.option,
              {
                backgroundColor: isSelected ? colors.selected : colors.surfaceSecondary,
                borderColor: isSelected ? colors.accent : colors.border,
              },
            ]}
          >
            <StrokeDot
              size={strokeWidthPreviews[name]}
              color={isSelected ? colors.accent : colors.textPrimary}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  palette: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: borders.radius.lg,
    borderWidth: borders.width.thin,
  },
  option: {
    width: sizes.controlComfortable,
    height: sizes.controlComfortable,
    borderRadius: borders.radius.md,
    borderWidth: borders.width.thin,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
