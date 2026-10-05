import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Text } from '@/components/text';
import { MIN_TOUCH_TARGET } from '@/constants/layout';
import { useTranslation } from '@/i18n/i18n-provider';
import { type MessageKey } from '@/i18n/types';
import { borders } from '@/theme/borders';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';
import { COVER_CHECK_ICON_SIZE, COVER_SWATCH_SIZE } from '../constants/layout';
import { notebookCoverNames, notebookCovers, type NotebookCover } from '../models/notebook-cover';

const coverMessageKeys = {
  sage: 'notebooks.covers.sage',
  clay: 'notebooks.covers.clay',
  ink: 'notebooks.covers.ink',
  sand: 'notebooks.covers.sand',
} as const satisfies Record<NotebookCover, MessageKey>;

interface CoverPickerProps {
  selected: NotebookCover;
  onSelect: (cover: NotebookCover) => void;
}

export function CoverPicker({ selected, onSelect }: CoverPickerProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text variant="label">{t('notebooks.coverLabel')}</Text>
      <View style={styles.row}>
        {notebookCoverNames.map((cover) => {
          const isSelected = cover === selected;

          return (
            <Pressable
              key={cover}
              accessibilityLabel={`${t('notebooks.coverLabel')} ${t(coverMessageKeys[cover])}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelect(cover)}
              style={styles.option}
            >
              <View style={[styles.swatch, { backgroundColor: notebookCovers[cover] }]}>
                {isSelected ? (
                  <Icon name="check" size={COVER_CHECK_ICON_SIZE} color={colors.onAccent} />
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  option: {
    minWidth: MIN_TOUCH_TARGET,
    minHeight: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatch: {
    width: COVER_SWATCH_SIZE,
    height: COVER_SWATCH_SIZE,
    borderRadius: borders.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
