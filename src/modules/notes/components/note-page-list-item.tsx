import { Pressable, StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { IconButton } from '@/components/icon-button';
import { Text } from '@/components/text';
import { PRESSED_OPACITY } from '@/constants/layout';
import { useTranslation } from '@/i18n/i18n-provider';
import { spacing } from '@/theme/spacing';
import { type NotePage } from '../models/note-page';

interface NotePageListItemProps {
  page: NotePage;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onPress: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function NotePageListItem({
  page,
  canMoveUp,
  canMoveDown,
  onPress,
  onMoveUp,
  onMoveDown,
}: NotePageListItemProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={page.title}
        onPress={onPress}
        style={({ pressed }) => [styles.main, pressed && styles.pressed]}
      >
        <Card style={styles.card}>
          <Text variant="subtitle" numberOfLines={1}>
            {page.title}
          </Text>
          {page.subject ? (
            <Text variant="caption" numberOfLines={1}>
              {page.subject}
            </Text>
          ) : null}
          <Text variant="caption">{page.date}</Text>
        </Card>
      </Pressable>
      <View style={styles.orderActions}>
        <IconButton
          name="up"
          accessibilityLabel={t('notes.moveUp')}
          disabled={!canMoveUp}
          onPress={onMoveUp}
        />
        <IconButton
          name="down"
          accessibilityLabel={t('notes.moveDown')}
          disabled={!canMoveDown}
          onPress={onMoveDown}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  main: {
    flex: 1,
  },
  pressed: {
    opacity: PRESSED_OPACITY,
  },
  card: {
    gap: spacing.xs,
  },
  orderActions: {
    justifyContent: 'center',
  },
});
