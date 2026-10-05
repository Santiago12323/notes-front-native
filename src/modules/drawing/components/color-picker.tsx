import { Pressable, StyleSheet, View } from 'react-native';

import { useTranslation } from '@/i18n/i18n-provider';
import { type MessageKey } from '@/i18n/types';
import { borders } from '@/theme/borders';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';
import {
  TOOLBAR_PALETTE_COLUMNS,
  TOOLBAR_SWATCH_SIZE,
  TOOLBAR_WELL_SIZE,
} from '../constants/layout';
import { inkColors, type InkColorName } from '../constants/style';
import { ToolbarButton } from './toolbar-button';
import { type ToolbarPanel } from '../models/toolbar-panel';

const colorMessageKeys = {
  black: 'drawing.colors.black',
  white: 'drawing.colors.white',
  red: 'drawing.colors.red',
  orange: 'drawing.colors.orange',
  yellow: 'drawing.colors.yellow',
  green: 'drawing.colors.green',
  teal: 'drawing.colors.teal',
  blue: 'drawing.colors.blue',
  indigo: 'drawing.colors.indigo',
  purple: 'drawing.colors.purple',
  pink: 'drawing.colors.pink',
  brown: 'drawing.colors.brown',
} as const satisfies Record<InkColorName, MessageKey>;

const inkColorNames = Object.keys(inkColors) as InkColorName[];

interface ColorSwatchProps {
  color: string;
  selected: boolean;
  size: number;
}

function ColorSwatch({ color, selected, size }: ColorSwatchProps) {
  const { colors } = useTheme();
  const isWhite = color === inkColors.white;

  return (
    <View
      style={[
        styles.ring,
        {
          width: size + spacing.sm,
          height: size + spacing.sm,
          borderColor: selected ? colors.accent : 'transparent',
        },
      ]}
    >
      <View
        style={[
          styles.swatch,
          {
            width: size,
            height: size,
            backgroundColor: color,
            borderColor: isWhite || selected ? colors.border : 'transparent',
          },
        ]}
      />
    </View>
  );
}

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
  onTogglePanel: (panel: ToolbarPanel) => void;
}

export function ColorPicker({ color, onColorChange, onTogglePanel }: ColorPickerProps) {
  const { t } = useTranslation();
  const selectedName = inkColorNames.find((name) => inkColors[name] === color);
  const accessibilityLabel =
    selectedName === undefined
      ? t('drawing.color')
      : `${t('drawing.color')}, ${t(colorMessageKeys[selectedName])}`;

  return (
    <ToolbarButton
      accessibilityLabel={accessibilityLabel}
      selected={false} // This button doesn't stay selected
      onPress={() => onTogglePanel('color')}
    >
      <ColorSwatch color={color} selected size={TOOLBAR_SWATCH_SIZE} />
    </ToolbarButton>
  );
}

interface ColorPaletteProps {
  selected: string;
  onSelect: (color: string) => void;
}

export function ColorPalette({ selected, onSelect }: ColorPaletteProps) {
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
      {inkColorNames.map((name) => {
        const currentColor = inkColors[name];
        const isSelected = currentColor === selected;

        return (
          <Pressable
            key={name}
            accessibilityLabel={t(colorMessageKeys[name])}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(currentColor)}
            style={styles.hit}
          >
            <ColorSwatch color={currentColor} selected={isSelected} size={TOOLBAR_WELL_SIZE} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    borderRadius: borders.radius.full,
    borderWidth: borders.width.thick,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatch: {
    borderRadius: borders.radius.full,
    borderWidth: borders.width.thin,
  },
  palette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: TOOLBAR_PALETTE_COLUMNS * (TOOLBAR_WELL_SIZE + spacing.xl),
    padding: spacing.sm,
    borderRadius: borders.radius.lg,
    borderWidth: borders.width.thin,
  },
  hit: {
    width: TOOLBAR_WELL_SIZE + spacing.xl,
    height: TOOLBAR_WELL_SIZE + spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
