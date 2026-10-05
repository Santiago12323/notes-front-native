import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { useTranslation } from '@/i18n/i18n-provider';
import { type MessageKey } from '@/i18n/types';
import { borders } from '@/theme/borders';
import { sizes } from '@/theme/sizes';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';
import { paperBackgrounds, type PaperBackground } from '../models/paper-background';
import { ToolbarButton } from './toolbar-button';
import { type ToolbarPanel } from '../models/toolbar-panel';

const paperMessageKeys = {
  blank: 'drawing.blank',
  grid: 'drawing.grid',
  lined: 'drawing.lined',
  dotted: 'drawing.dotted',
} as const satisfies Record<PaperBackground, MessageKey>;

const paperIcons = {
  blank: 'paperBlank',
  grid: 'paperGrid',
  lined: 'paperLined',
  dotted: 'paperDotted',
} as const satisfies Record<PaperBackground, IconName>;

const papers: PaperBackground[] = [
  paperBackgrounds.blank,
  paperBackgrounds.grid,
  paperBackgrounds.lined,
  paperBackgrounds.dotted,
];

interface PaperPickerProps {
  paper: PaperBackground;
  onPaperChange: (paper: PaperBackground) => void;
  onTogglePanel: (panel: ToolbarPanel) => void;
}

export function PaperPicker({ paper, onPaperChange, onTogglePanel }: PaperPickerProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <ToolbarButton
      accessibilityLabel={`${t('drawing.paper')}, ${t(paperMessageKeys[paper])}`}
      selected={false} // This button doesn't stay selected
      onPress={() => onTogglePanel('paper')}
    >
      <Icon name={paperIcons[paper]} color={colors.textPrimary} />
    </ToolbarButton>
  );
}

interface PaperPaletteProps {
  selected: PaperBackground;
  onSelect: (paper: PaperBackground) => void;
}

export function PaperPalette({ selected, onSelect }: PaperPaletteProps) {
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
      {papers.map((currentPaper) => {
        const isSelected = currentPaper === selected;

        return (
          <Pressable
            key={currentPaper}
            accessibilityLabel={t(paperMessageKeys[currentPaper])}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onSelect(currentPaper)}
            style={[
              styles.option,
              {
                backgroundColor: isSelected ? colors.selected : colors.surfaceSecondary,
                borderColor: isSelected ? colors.accent : colors.border,
              },
            ]}
          >
            <Icon
              name={paperIcons[currentPaper]}
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
