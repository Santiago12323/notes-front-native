import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Modal } from '@/components/modal';
import { Text } from '@/components/text';
import { useTranslation } from '@/i18n/i18n-provider';
import { spacing } from '@/theme/spacing';
import { DESCRIPTION_INPUT_MIN_HEIGHT } from '../constants/layout';
import { type CreateNotebookInput } from '../models/notebook';
import { DEFAULT_NOTEBOOK_COVER, type NotebookCover } from '../models/notebook-cover';
import { CoverPicker } from './cover-picker';

interface CreateNotebookModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (input: CreateNotebookInput) => void;
}

export function CreateNotebookModal({ visible, onClose, onSubmit }: CreateNotebookModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState<NotebookCover>(DEFAULT_NOTEBOOK_COVER);
  const { t } = useTranslation();
  const canSubmit = title.trim().length > 0;

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.content}>
        <Text variant="subtitle">{t('notebooks.createTitle')}</Text>
        <Input
          label={t('notebooks.titleLabel')}
          placeholder={t('notebooks.titlePlaceholder')}
          value={title}
          onChangeText={setTitle}
        />
        <Input
          label={t('notebooks.descriptionLabel')}
          placeholder={t('notebooks.descriptionPlaceholder')}
          value={description}
          onChangeText={setDescription}
          multiline
          style={styles.description}
        />
        <CoverPicker selected={cover} onSelect={setCover} />
        <View style={styles.actions}>
          <Button label={t('common.cancel')} variant="secondary" onPress={onClose} />
          <Button
            label={t('common.create')}
            disabled={!canSubmit}
            onPress={() => onSubmit({ title, description, cover })}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
  },
  description: {
    minHeight: DESCRIPTION_INPUT_MIN_HEIGHT,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
});
