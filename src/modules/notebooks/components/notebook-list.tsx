import { type ReactElement } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { sizes } from '@/theme/sizes';
import { spacing } from '@/theme/spacing';
import { type Notebook } from '../models/notebook';
import { NotebookListItem } from './notebook-list-item';

interface NotebookListProps {
  notebooks: readonly Notebook[];
  onPressNotebook: (id: string) => void;
  empty: ReactElement;
}

export function NotebookList({ notebooks, onPressNotebook, empty }: NotebookListProps) {
  return (
    <FlatList
      data={notebooks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NotebookListItem notebook={item} onPress={() => onPressNotebook(item.id)} />
      )}
      ListEmptyComponent={empty}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: spacing.xl,
    gap: spacing.md,
    width: '100%',
    maxWidth: sizes.contentMax,
    alignSelf: 'center',
  },
});
