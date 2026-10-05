import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Button } from '@/components/button';
import { EmptyState } from '@/components/empty-state';
import { Header } from '@/components/header';
import { IconButton } from '@/components/icon-button';
import { useLayoutDensity } from '@/hooks/use-layout-density';
import { useTranslation } from '@/i18n/i18n-provider';
import { DrawingCanvas } from '@/modules/drawing/components/drawing-canvas';
import { type Drawing } from '@/modules/drawing/models/drawing';
import { type PaperBackground } from '@/modules/drawing/models/paper-background';
import { useTheme } from '@/theme/theme-provider';
import { readRouteParam } from '@/utils/read-route-param';
import { DeletePageModal } from '../components/delete-page-modal';
import { NotePageEditorHeader } from '../components/note-page-editor-header';
import { PageFormModal } from '../components/page-form-modal';
import { useNotes } from '../hooks/notes-provider';
import { type PageFormInput } from '../models/note-page';

export default function NotePageDetailsPage() {
  const params = useLocalSearchParams<{ id: string; pageId: string }>();
  const notebookId = readRouteParam(params.id);
  const pageId = readRouteParam(params.pageId);
  const { getById, listByNotebookId, edit, remove, setDrawing, setPaper } = useNotes();
  const { colors: themeColors } = useTheme();
  const { t } = useTranslation();
  const { density } = useLayoutDensity();
  const page = pageId === undefined ? undefined : getById(pageId);
  const belongsToNotebook =
    page !== undefined && notebookId !== undefined && page.notebookId === notebookId;
  const siblings = notebookId === undefined ? [] : listByNotebookId(notebookId);
  const currentIndex = page === undefined ? -1 : siblings.findIndex((item) => item.id === page.id);
  const previousPage = currentIndex > 0 ? siblings[currentIndex - 1] : undefined;
  const nextPage = currentIndex >= 0 ? siblings[currentIndex + 1] : undefined;
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const handleDrawingChange = useCallback(
    (drawing: Drawing) => {
      if (pageId === undefined) {
        return;
      }

      setDrawing(pageId, drawing);
    },
    [pageId, setDrawing],
  );

  const handlePaperChange = useCallback(
    (paper: PaperBackground) => {
      if (pageId === undefined) {
        return;
      }

      setPaper(pageId, paper);
    },
    [pageId, setPaper],
  );

  function openPage(targetId: string) {
    if (notebookId === undefined) {
      return;
    }

    router.replace({
      pathname: '/notebooks/[id]/pages/[pageId]',
      params: { id: notebookId, pageId: targetId },
    });
  }

  function handleEdit(input: PageFormInput) {
    if (pageId === undefined) {
      return;
    }

    const result = edit(pageId, input);

    if (result.ok) {
      setIsEditVisible(false);
    }
  }

  function handleDelete() {
    if (pageId === undefined) {
      return;
    }

    const result = remove(pageId);

    if (result.ok) {
      setIsDeleteVisible(false);
      router.back();
    }
  }

  if (!belongsToNotebook || page === undefined) {
    return (
      <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
        <Header
          title={t('notes.listTitle')}
          left={
            <IconButton
              name="back"
              accessibilityLabel={t('common.back')}
              onPress={() => router.back()}
            />
          }
        />
        <EmptyState
          title={t('notes.notFoundTitle')}
          message={t('notes.notFoundMessage')}
          action={<Button label={t('common.back')} onPress={() => router.back()} />}
        />
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
      <NotePageEditorHeader
        title={page.title}
        density={density}
        canGoPrevious={previousPage !== undefined}
        canGoNext={nextPage !== undefined}
        onBack={() => router.back()}
        onPrevious={() => previousPage && openPage(previousPage.id)}
        onNext={() => nextPage && openPage(nextPage.id)}
        onEdit={() => setIsEditVisible(true)}
        onDelete={() => setIsDeleteVisible(true)}
      />
      <View style={styles.workspace}>
        <DrawingCanvas
          key={page.id}
          drawing={page.drawing}
          paper={page.paper}
          onDrawingChange={handleDrawingChange}
          onPaperChange={handlePaperChange}
        />
      </View>
      {isEditVisible ? (
        <PageFormModal
          heading={t('notes.editTitle')}
          submitLabel={t('common.save')}
          initial={{ title: page.title, subject: page.subject, date: page.date }}
          onClose={() => setIsEditVisible(false)}
          onSubmit={handleEdit}
        />
      ) : null}
      {isDeleteVisible ? (
        <DeletePageModal onClose={() => setIsDeleteVisible(false)} onConfirm={handleDelete} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: 0,
  },
  workspace: {
    flex: 1,
    minHeight: 0,
    minWidth: 0,
  },
});
