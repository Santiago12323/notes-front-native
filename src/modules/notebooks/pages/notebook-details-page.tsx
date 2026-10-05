import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Button } from '@/components/button';
import { EmptyState } from '@/components/empty-state';
import { Header } from '@/components/header';
import { IconButton } from '@/components/icon-button';
import { Text } from '@/components/text';
import { useTranslation } from '@/i18n/i18n-provider';
import { NotebookPagesSection } from '@/modules/notes/components/notebook-pages-section';
import { useNotes } from '@/modules/notes/hooks/notes-provider';
import { spacing } from '@/theme/spacing';
import { useTheme } from '@/theme/theme-provider';
import { formatIsoDate } from '@/utils/format-iso-date';
import { readRouteParam } from '@/utils/read-route-param';
import { DeleteNotebookModal } from '../components/delete-notebook-modal';
import { RenameNotebookModal } from '../components/rename-notebook-modal';
import { COVER_DETAILS_HEIGHT } from '../constants/layout';
import { useNotebooks } from '../hooks/notebooks-provider';
import { notebookCovers } from '../models/notebook-cover';

export default function NotebookDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const notebookId = readRouteParam(id);
  const { getById, rename, remove } = useNotebooks();
  const { removeByNotebookId } = useNotes();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const notebook = notebookId === undefined ? undefined : getById(notebookId);
  const [isRenameVisible, setIsRenameVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  function handleRename(title: string) {
    if (notebookId === undefined) {
      return;
    }

    const result = rename(notebookId, title);

    if (result.ok) {
      setIsRenameVisible(false);
    }
  }

  function handleDelete() {
    if (notebookId === undefined) {
      return;
    }

    const result = remove(notebookId);

    if (result.ok) {
      removeByNotebookId(notebookId);
      setIsDeleteVisible(false);
      router.back();
    }
  }

  if (notebook === undefined) {
    return (
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <Header
          title={t('notebooks.listTitle')}
          left={
            <IconButton
              name="back"
              accessibilityLabel={t('common.back')}
              onPress={() => router.back()}
            />
          }
        />
        <EmptyState
          title={t('notebooks.notFoundTitle')}
          message={t('notebooks.notFoundMessage')}
          action={<Button label={t('common.back')} onPress={() => router.back()} />}
        />
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Header
        title={notebook.title}
        left={
          <IconButton
            name="back"
            accessibilityLabel={t('common.back')}
            onPress={() => router.back()}
          />
        }
      />
      <View style={[styles.cover, { backgroundColor: notebookCovers[notebook.cover] }]} />
      <View style={styles.content}>
        <Text variant="title">{notebook.title}</Text>
        {notebook.description ? <Text variant="body">{notebook.description}</Text> : null}
        <Text variant="caption">
          {t('notebooks.created', { date: formatIsoDate(notebook.createdAt) })}
        </Text>
        <Text variant="caption">
          {t('notebooks.updated', { date: formatIsoDate(notebook.updatedAt) })}
        </Text>
        <View style={styles.actions}>
          <Button
            label={t('common.rename')}
            variant="secondary"
            onPress={() => setIsRenameVisible(true)}
          />
          <Button
            label={t('common.delete')}
            variant="danger"
            onPress={() => setIsDeleteVisible(true)}
          />
        </View>
      </View>
      <NotebookPagesSection notebookId={notebook.id} />
      {isRenameVisible ? (
        <RenameNotebookModal
          visible
          title={notebook.title}
          onClose={() => setIsRenameVisible(false)}
          onSubmit={handleRename}
        />
      ) : null}
      {isDeleteVisible ? (
        <DeleteNotebookModal
          visible
          onClose={() => setIsDeleteVisible(false)}
          onConfirm={handleDelete}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  cover: {
    height: COVER_DETAILS_HEIGHT,
  },
  content: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  actions: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
});
