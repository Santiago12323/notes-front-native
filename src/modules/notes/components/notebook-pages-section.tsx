import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Button } from '@/components/button';
import { EmptyState } from '@/components/empty-state';
import { IconButton } from '@/components/icon-button';
import { Text } from '@/components/text';
import { useTranslation } from '@/i18n/i18n-provider';
import { spacing } from '@/theme/spacing';
import { formatIsoDate } from '@/utils/format-iso-date';
import { nowIso } from '@/utils/now';
import { useNotes } from '../hooks/notes-provider';
import { pageMoveDirection, type PageFormInput } from '../models/note-page';
import { NotePageList } from './note-page-list';
import { PageFormModal } from './page-form-modal';

interface NotebookPagesSectionProps {
  notebookId: string;
}

export function NotebookPagesSection({ notebookId }: NotebookPagesSectionProps) {
  const { listByNotebookId, create, move } = useNotes();
  const pages = listByNotebookId(notebookId);
  const { t } = useTranslation();
  const [isCreateVisible, setIsCreateVisible] = useState(false);

  function handleCreate(input: PageFormInput) {
    const result = create({
      notebookId,
      title: input.title,
      subject: input.subject,
      date: input.date,
    });

    if (result.ok) {
      setIsCreateVisible(false);
    }
  }

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text variant="subtitle">{t('notes.listTitle')}</Text>
        <IconButton
          name="add"
          accessibilityLabel={t('notes.addPage')}
          onPress={() => setIsCreateVisible(true)}
        />
      </View>
      <NotePageList
        pages={pages}
        onPressPage={(pageId) =>
          router.push({
            pathname: '/notebooks/[id]/pages/[pageId]',
            params: { id: notebookId, pageId },
          })
        }
        onMoveUp={(pageId) => move(pageId, pageMoveDirection.up)}
        onMoveDown={(pageId) => move(pageId, pageMoveDirection.down)}
        empty={
          <EmptyState
            title={t('notes.emptyTitle')}
            message={t('notes.emptyMessage')}
            action={
              <Button label={t('notes.createAction')} onPress={() => setIsCreateVisible(true)} />
            }
          />
        }
      />
      {isCreateVisible ? (
        <PageFormModal
          heading={t('notes.createTitle')}
          submitLabel={t('common.create')}
          initial={{ title: '', subject: '', date: formatIsoDate(nowIso()) }}
          onClose={() => setIsCreateVisible(false)}
          onSubmit={handleCreate}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
