import { Pressable, StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { Text } from '@/components/text';
import { PRESSED_OPACITY } from '@/constants/layout';
import { borders } from '@/theme/borders';
import { spacing } from '@/theme/spacing';
import { COVER_BAR_HEIGHT } from '../constants/layout';
import { type Notebook } from '../models/notebook';
import { notebookCovers } from '../models/notebook-cover';

interface NotebookListItemProps {
  notebook: Notebook;
  onPress: () => void;
}

export function NotebookListItem({ notebook, onPress }: NotebookListItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={notebook.title}
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Card style={styles.card}>
        <View style={[styles.cover, { backgroundColor: notebookCovers[notebook.cover] }]} />
        <View style={styles.body}>
          <Text variant="subtitle" numberOfLines={1}>
            {notebook.title}
          </Text>
          {notebook.description ? (
            <Text variant="caption" numberOfLines={2}>
              {notebook.description}
            </Text>
          ) : null}
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: PRESSED_OPACITY,
  },
  card: {
    padding: spacing.none,
    overflow: 'hidden',
  },
  cover: {
    height: COVER_BAR_HEIGHT,
    borderTopLeftRadius: borders.radius.lg,
    borderTopRightRadius: borders.radius.lg,
  },
  body: {
    gap: spacing.xs,
    padding: spacing.lg,
  },
});
