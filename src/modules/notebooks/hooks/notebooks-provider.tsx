import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { type Result } from '@/types/result';
import { createId } from '@/utils/create-id';
import { nowIso } from '@/utils/now';
import { type CreateNotebookInput, type Notebook } from '../models/notebook';
import { type NotebookErrorCode } from '../models/notebook-error';
import {
  createNotebook,
  deleteNotebook,
  getNotebookById,
  renameNotebook,
} from '../services/notebook-service';

interface NotebooksContextValue {
  notebooks: readonly Notebook[];
  create: (input: CreateNotebookInput) => Result<Notebook[], NotebookErrorCode>;
  rename: (id: string, title: string) => Result<Notebook[], NotebookErrorCode>;
  remove: (id: string) => Result<Notebook[], NotebookErrorCode>;
  getById: (id: string) => Notebook | undefined;
}

const NotebooksContext = createContext<NotebooksContextValue | null>(null);

interface NotebooksProviderProps {
  children: ReactNode;
}

export function NotebooksProvider({ children }: NotebooksProviderProps) {
  const [notebooks, setNotebooks] = useState<readonly Notebook[]>([]);

  const create = useCallback(
    (input: CreateNotebookInput) => {
      const result = createNotebook(notebooks, input, {
        id: createId(),
        now: nowIso(),
      });

      if (result.ok) {
        setNotebooks(result.value);
      }

      return result;
    },
    [notebooks],
  );

  const rename = useCallback(
    (id: string, title: string) => {
      const result = renameNotebook(notebooks, id, title, nowIso());

      if (result.ok) {
        setNotebooks(result.value);
      }

      return result;
    },
    [notebooks],
  );

  const remove = useCallback(
    (id: string) => {
      const result = deleteNotebook(notebooks, id);

      if (result.ok) {
        setNotebooks(result.value);
      }

      return result;
    },
    [notebooks],
  );

  const getById = useCallback((id: string) => getNotebookById(notebooks, id), [notebooks]);

  const value = useMemo(
    () => ({
      notebooks,
      create,
      rename,
      remove,
      getById,
    }),
    [create, getById, notebooks, remove, rename],
  );

  return <NotebooksContext.Provider value={value}>{children}</NotebooksContext.Provider>;
}

export function useNotebooks(): NotebooksContextValue {
  const value = useContext(NotebooksContext);

  if (value === null) {
    throw new Error('useNotebooks must be used within NotebooksProvider');
  }

  return value;
}
