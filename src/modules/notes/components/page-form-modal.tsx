import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Modal } from '@/components/modal';
import { Text } from '@/components/text';
import { useTranslation } from '@/i18n/i18n-provider';
import { spacing } from '@/theme/spacing';
import { type PageFormInput } from '../models/note-page';

interface PageFormModalProps {
  heading: string;
  submitLabel: string;
  initial: PageFormInput;
  onClose: () => void;
  onSubmit: (input: PageFormInput) => void;
}

export function PageFormModal({
  heading,
  submitLabel,
  initial,
  onClose,
  onSubmit,
}: PageFormModalProps) {
  const [title, setTitle] = useState(initial.title);
  const [subject, setSubject] = useState(initial.subject);
  const [date, setDate] = useState(initial.date);
  const { t } = useTranslation();
  const canSubmit = title.trim().length > 0;

  return (
    <Modal visible onClose={onClose}>
      <View style={styles.content}>
        <Text variant="subtitle">{heading}</Text>
        <Input
          label={t('notes.titleLabel')}
          placeholder={t('notes.titlePlaceholder')}
          value={title}
          onChangeText={setTitle}
        />
        <Input
          label={t('notes.subjectLabel')}
          placeholder={t('notes.subjectPlaceholder')}
          value={subject}
          onChangeText={setSubject}
        />
        <Input
          label={t('notes.dateLabel')}
          placeholder={t('notes.datePlaceholder')}
          value={date}
          onChangeText={setDate}
        />
        <View style={styles.actions}>
          <Button label={t('common.cancel')} variant="secondary" onPress={onClose} />
          <Button
            label={submitLabel}
            disabled={!canSubmit}
            onPress={() => onSubmit({ title, subject, date })}
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
});
