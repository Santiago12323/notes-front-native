import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Button } from '@/components/button';
import { EmptyState } from '@/components/empty-state';
import { Header } from '@/components/header';
import { IconButton } from '@/components/icon-button';
import { useTranslation } from '@/i18n/i18n-provider';
import { sizes } from '@/theme/sizes';
import { useTheme } from '@/theme/theme-provider';
import { CreateNotebookModal } from '../components/create-notebook-modal';
import { NotebookList } from '../components/notebook-list';
import { useNotebooks } from '../hooks/notebooks-provider';
import { type CreateNotebookInput } from '../models/notebook';

export default function NotebookListPage() {
  const { notebooks, create } = useNotebooks();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [isCreateVisible, setIsCreateVisible] = useState(false);

  function handleCreate(input: CreateNotebookInput) {
    const result = create(input);

    if (result.ok) {
      setIsCreateVisible(false);
    }
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Header
        title={t('notebooks.listTitle')}
        left={
          <IconButton
            name="settings"
            accessibilityLabel={t('settings.title')}
            onPress={() => router.push('/settings')}
          />
        }
        right={
          <IconButton
            name="add"
            accessibilityLabel={t('notebooks.addNotebook')}
            onPress={() => setIsCreateVisible(true)}
          />
        }
      />
      <NotebookList
        notebooks={notebooks}
        onPressNotebook={(id) =>
          router.push({
            pathname: '/notebooks/[id]',
            params: { id },
          })
        }
        empty={
          <EmptyState
            title={t('notebooks.emptyTitle')}
            message={t('notebooks.emptyMessage')}
            action={
              <Button
                label={t('notebooks.createAction')}
                onPress={() => setIsCreateVisible(true)}
              />
            }
          />
        }
      />
      {isCreateVisible ? (
        <CreateNotebookModal
          visible
          onClose={() => setIsCreateVisible(false)}
          onSubmit={handleCreate}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    maxWidth: sizes.contentMax,
    width: '100%',
    alignSelf: 'center',
  },
});
