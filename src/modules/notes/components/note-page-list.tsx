import { type ReactElement } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { spacing } from '@/theme/spacing';
import { type NotePage } from '../models/note-page';
import { NotePageListItem } from './note-page-list-item';

interface NotePageListProps {
  pages: readonly NotePage[];
  onPressPage: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  empty: ReactElement;
}

export function NotePageList({
  pages,
  onPressPage,
  onMoveUp,
  onMoveDown,
  empty,
}: NotePageListProps) {
  return (
    <FlatList
      data={pages}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <NotePageListItem
          page={item}
          canMoveUp={index > 0}
          canMoveDown={index < pages.length - 1}
          onPress={() => onPressPage(item.id)}
          onMoveUp={() => onMoveUp(item.id)}
          onMoveDown={() => onMoveDown(item.id)}
        />
      )}
      ListEmptyComponent={empty}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    gap: spacing.md,
  },
});
